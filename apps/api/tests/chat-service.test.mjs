import assert from "node:assert/strict";
import test from "node:test";
import { mergeTripState } from "../src/chat-service.mjs";

test("chat state keeps missing dates and never applies defaults", () => {
  const state = mergeTripState({}, { city: "重庆", location: "解放碑", checkInDate: "", checkOutDate: "" });
  assert.deepEqual(state.missing, ["checkInDate", "checkOutDate"]);
  assert.equal(state.checkInDate, "");
  assert.equal(state.checkOutDate, "");
});

test("chat state rejects invalid and reversed dates", () => {
  const invalid = mergeTripState({}, { city: "上海", location: "外滩", checkInDate: "2026-13-01", checkOutDate: "2026-08-10" });
  assert.ok(invalid.missing.includes("checkInDate"));
  const reversed = mergeTripState({}, { city: "上海", location: "外滩", checkInDate: "2026-08-10", checkOutDate: "2026-08-09" });
  assert.ok(reversed.missing.includes("dateOrder"));
});

test("validated county state preserves parent city and county keyword", () => {
  const state = mergeTripState({ cityId: 4, cityName: "重庆", countyName: "酉阳", keyword: "酉阳" }, { city: "酉阳", location: "桃花源", checkInDate: "2026-08-20", checkOutDate: "2026-08-21" });
  assert.equal(state.cityId, 4);
  assert.equal(state.cityName, "重庆");
  assert.equal(state.countyName, "酉阳");
  assert.equal(state.keyword, "酉阳");
  assert.deepEqual(state.missing, []);
});
