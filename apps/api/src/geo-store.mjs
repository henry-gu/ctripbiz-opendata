import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { config } from "./config.mjs";
import { callCtrip, assertCountrySuccess, assertGeoSuccess } from "./ctrip-client.mjs";
import { AppError } from "./errors.mjs";

const CHINA_ID = 1;
const FILES = {
  raw: "geo-full.json",
  cities: "china-cities.json",
  countries: "countries.json",
  metadata: "geo-metadata.json",
};

function json(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function list(value) {
  return Array.isArray(value) ? value : [];
}

export function normalizeStandardCities(raw) {
  const cities = [];
  for (const province of list(raw?.dataList)) {
    for (const city of list(province?.prefectureLevelCityInfoList)) {
      if (Number(city?.corpTag) !== 0 || !city?.cityId) continue;
      cities.push({
        cityId: Number(city.cityId),
        cityName: city.cityName || "未命名城市",
        cityEnName: city.cityEnName || "",
        cityPinYin: city.cityPinYin || "",
        provinceId: Number(province?.provinceId) || null,
        provinceName: province?.provinceName || "",
        provinceEnName: province?.provinceEnName || "",
        districtCode: city.districtCode || "",
        cityCode: city.cityCode || "",
      });
    }
  }
  return cities;
}

function containsQuery(values, needle) {
  return values.some((value) => String(value || "").toLocaleLowerCase().includes(needle));
}

function searchableRows(snapshot, needle) {
  const cities = snapshot.cities.map((city) => ({
    ...city,
    resultType: "CITY",
    resultId: city.cityId,
    resultName: city.cityName,
    parentCityId: null,
    parentCityName: "",
  }));
  if (!needle) return cities;

  const counties = [];
  for (const province of list(snapshot.raw?.dataList)) {
    for (const city of list(province?.prefectureLevelCityInfoList)) {
      if (Number(city?.corpTag) !== 0 || !city?.cityId) continue;
      for (const county of list(city?.countyList)) {
        if (Number(county?.corpTag) !== 0 || !county?.countyId) continue;
        if (!containsQuery([county.countyName, county.countyEnName, county.countyPinyin], needle)) continue;
        counties.push({
          resultType: "COUNTY",
          resultId: Number(county.countyId),
          resultName: county.countyName || "未命名县级市",
          cityId: Number(county.countyId),
          cityName: county.countyName || "未命名县级市",
          cityEnName: county.countyEnName || "",
          cityPinYin: county.countyPinyin || "",
          provinceId: Number(province?.provinceId) || null,
          provinceName: province?.provinceName || "",
          provinceEnName: province?.provinceEnName || "",
          districtCode: county.districtCode || county.countyCode || "",
          cityCode: county.countyCode || "",
          parentCityId: Number(city.cityId),
          parentCityName: city.cityName || "",
        });
      }
    }
  }
  return [...cities, ...counties];
}

export function filterStandardProvince(province) {
  if (!province) return null;
  return {
    ...province,
    prefectureLevelCityInfoList: list(province.prefectureLevelCityInfoList).filter((city) => Number(city?.corpTag) === 0),
  };
}

export class GeoStore {
  constructor({ dataDir = join(config.root, "data"), fetchCountries, fetchGeo } = {}) {
    this.dataDir = dataDir;
    this.fetchCountries = fetchCountries;
    this.fetchGeo = fetchGeo;
    this.pending = null;
    this.snapshot = null;
  }

  path(name) {
    return join(this.dataDir, FILES[name]);
  }

  async readSnapshot() {
    if (this.snapshot) return this.snapshot;
    try {
      const [raw, cities, countries, metadata] = await Promise.all(
        Object.values(FILES).map(async (file) => JSON.parse(await readFile(join(this.dataDir, file), "utf8"))),
      );
      this.snapshot = { raw, cities, countries, metadata };
      return this.snapshot;
    } catch (error) {
      if (error?.code === "ENOENT") return null;
      throw new AppError("GEO_DATA_CORRUPTED", "本地基础地理数据无法读取，请重新更新", { statusCode: 500 });
    }
  }

  async writeAtomically(name, value) {
    const target = this.path(name);
    const temporary = `${target}.${process.pid}.${randomUUID()}.tmp`;
    await writeFile(temporary, json(value), "utf8");
    await rename(temporary, target);
  }

  async refresh() {
    if (this.pending) return this.pending;
    this.pending = (async () => {
      if (!this.fetchCountries || !this.fetchGeo) {
        throw new AppError("GEO_SERVICE_UNAVAILABLE", "基础地理数据服务未配置", { statusCode: 503 });
      }
      const countries = await this.fetchCountries();
      const china = list(countries?.countryList).find((country) => Number(country?.countryId) === CHINA_ID);
      if (!china) throw new AppError("GEO_CHINA_NOT_FOUND", "国家基础数据中未找到中国", { statusCode: 502 });
      const raw = await this.fetchGeo();
      const cities = normalizeStandardCities(raw);
      const metadata = {
        version: 1,
        countryId: CHINA_ID,
        countryName: china.name || "中国",
        updatedAt: new Date().toISOString(),
        cityCount: cities.length,
        provinceCount: list(raw?.dataList).length,
      };
      await mkdir(this.dataDir, { recursive: true });
      await Promise.all([
        this.writeAtomically("raw", raw),
        this.writeAtomically("cities", cities),
        this.writeAtomically("countries", countries),
        this.writeAtomically("metadata", metadata),
      ]);
      this.snapshot = { raw, cities, countries, metadata };
      return this.snapshot;
    })().finally(() => {
      this.pending = null;
    });
    return this.pending;
  }

  async ensure() {
    return (await this.readSnapshot()) || this.refresh();
  }

  async status() {
    const snapshot = await this.readSnapshot();
    return {
      state: this.pending ? "refreshing" : snapshot ? "ready" : "missing",
      ...(snapshot?.metadata || {}),
    };
  }

  async cities({ query = "", sortOrder = "asc", page = 1, pageSize = 50 } = {}) {
    const snapshot = await this.ensure();
    const needle = String(query).trim().toLocaleLowerCase();
    const rows = searchableRows(snapshot, needle)
      .filter((row) => !needle || containsQuery([row.cityName, row.cityEnName, row.cityPinYin], needle))
      .sort((left, right) => String(left.resultName).localeCompare(String(right.resultName), "zh-Hans-CN") * (sortOrder === "desc" ? -1 : 1));
    const size = Math.min(100, Math.max(1, Number(pageSize) || 50));
    const currentPage = Math.max(1, Number(page) || 1);
    return { items: rows.slice((currentPage - 1) * size, currentPage * size), total: rows.length, page: currentPage, pageSize: size };
  }

  async provinces() {
    const snapshot = await this.ensure();
    return list(snapshot.raw?.dataList).map((province) => {
      const standard = filterStandardProvince(province);
      return { provinceId: province.provinceId, provinceName: province.provinceName, provinceEnName: province.provinceEnName, cityCount: standard.prefectureLevelCityInfoList.length };
    });
  }

  async province(provinceId) {
    const snapshot = await this.ensure();
    return filterStandardProvince(list(snapshot.raw?.dataList).find((province) => Number(province.provinceId) === Number(provinceId)));
  }

  async raw() {
    return (await this.ensure()).raw;
  }
}

export const geoStore = new GeoStore({
  fetchCountries: async () => (await callCtrip("countries", { requestId: randomUUID(), locale: "zh-CN" }, { authField: "auth", validator: assertCountrySuccess, timeoutMs: 20000 })).raw,
  fetchGeo: async () => (await callCtrip("geo", {
    countryId: CHINA_ID,
    provinceConditions: {
      provinceIds: "",
      provinceNames: "",
      prefectureLevelCityConditions: { prefectureLevelCityIds: "", prefectureLevelCityNames: "", returnDistrict: true, returnCounty: true },
    },
    poiConditions: { returnAirport: true, returnTrainStation: true, returnBusStation: true },
  }, { authField: "auth", validator: assertGeoSuccess, timeoutMs: 60000 })).raw,
});
