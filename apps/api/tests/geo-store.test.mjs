import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { GeoStore, normalizeStandardCities } from "../src/geo-store.mjs";

const rawGeo = {
  status: { success: true, errorCode: 20000 },
  dataList: [
    {
      provinceId: 31,
      provinceName: "上海",
      prefectureLevelCityInfoList: [
        {
          cityId: 2, cityName: "上海", cityEnName: "Shanghai", cityPinYin: "shanghai", corpTag: 0, districtCode: "310000",
          countyList: [
            { countyId: 201, countyName: "崇明", countyEnName: "Chongming", countyPinyin: "chongming", corpTag: 0, districtCode: "310151" },
            { countyId: 202, countyName: "非标准县", corpTag: 1 },
          ],
        },
        { cityId: 21000001, cityName: "机票专用城市", corpTag: 1 },
      ],
    },
  ],
};

test("normalizes only standard prefecture-level cities", () => {
  assert.deepEqual(normalizeStandardCities(rawGeo), [{
    cityId: 2,
    cityName: "上海",
    cityEnName: "Shanghai",
    cityPinYin: "shanghai",
    provinceId: 31,
    provinceName: "上海",
    provinceEnName: "",
    districtCode: "310000",
    cityCode: "",
  }]);
});

test("writes one shared first-load refresh and supports city search and ordering", async () => {
  const dataDir = await mkdtemp(join(tmpdir(), "ctripbiz-geo-"));
  let countryCalls = 0;
  let geoCalls = 0;
  const store = new GeoStore({
    dataDir,
    fetchCountries: async () => { countryCalls += 1; return { responseCode: 20000, countryList: [{ countryId: 1, name: "中国" }] }; },
    fetchGeo: async () => { geoCalls += 1; return rawGeo; },
  });
  try {
    const [first, second] = await Promise.all([store.cities({ query: "上" }), store.provinces()]);
    assert.equal(first.total, 1);
    assert.equal(second[0].cityCount, 1);
    assert.equal(countryCalls, 1);
    assert.equal(geoCalls, 1);
    const status = await store.status();
    assert.equal(status.state, "ready");
    assert.equal(status.cityCount, 1);
    const county = await store.cities({ query: "崇明" });
    assert.equal(county.total, 1);
    assert.equal(county.items[0].resultType, "COUNTY");
    assert.equal(county.items[0].parentCityName, "上海");
    assert.equal(county.items[0].parentCityId, 2);
    const empty = await store.cities();
    assert.equal(empty.total, 1);
  } finally {
    await rm(dataDir, { recursive: true, force: true });
  }
});
