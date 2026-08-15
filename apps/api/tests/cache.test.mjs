import assert from "node:assert/strict";
import test from "node:test";
import { TtlLruCache, stableCacheKey } from "../src/cache.mjs";
import { redact } from "../src/diagnostics.mjs";
import { assertBusinessSuccess } from "../src/ctrip-client.mjs";
import { filterFuzzyLocations } from "../src/normalize.mjs";

test("cache key is stable across object key order", () => {
  assert.equal(stableCacheKey("x", { b: 2, a: 1 }), stableCacheKey("x", { a: 1, b: 2 }));
});

test("ttl cache returns values and expires them", async () => {
  const cache = new TtlLruCache(2);
  cache.set("a", 1, 5);
  assert.equal(cache.get("a").value, 1);
  await new Promise((resolve) => setTimeout(resolve, 10));
  assert.equal(cache.get("a"), null);
});

test("redaction masks secrets and identity fields", () => {
  assert.deepEqual(redact({ Ticket: "secret", AppKey: "key", AppSecurity: "hidden", uid: "12345678" }), {
    Ticket: "***",
    AppKey: "***",
    AppSecurity: "***",
    uid: "12***78",
  });
});

test("explicit success wins over endpoint-specific success codes", () => {
  assert.doesNotThrow(() => assertBusinessSuccess({ status: { success: true, errorCode: 22700000, errorMessage: "处理成功" } }));
  assert.doesNotThrow(() => assertBusinessSuccess({ ResponseStatus: { Ack: "Success", Errors: [] } }));
});

test("explicit upstream failures are rejected", () => {
  assert.throws(() => assertBusinessSuccess({ status: { success: false, errorCode: 10810025, errorMessage: "cityID不能为空" } }), /cityID不能为空/);
});

test("fuzzy locations keep only landmark, corporate place and Baidu suggestions", () => {
  const items = [
    { id: 1, name: "地标", type: "LANDMARK", cityId: 2 },
    { id: 2, name: "企业地标", type: "CORP_PLACE", cityId: 2 },
    { id: 3, name: "百度联想", type: "PLAIN_TEXT", cityId: 2 },
    { id: 4, name: "酒店", type: "HOTEL", cityId: 2 },
    { id: 1, name: "地标", type: "LANDMARK", cityId: 2 },
  ];
  assert.deepEqual(filterFuzzyLocations(items).map((item) => item.type), ["LANDMARK", "CORP_PLACE", "PLAIN_TEXT"]);
});
