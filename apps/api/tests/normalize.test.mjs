import assert from "node:assert/strict";
import test from "node:test";
import { normalizeHotels } from "../src/normalize.mjs";

test("normalizes Bayer preferred and diamond hotel tags", () => {
  const result = normalizeHotels({ hotelInfo: [{ hotelBaseInfo: { hotelId: 1, hotelName: "测试酒店" }, hotelTagList: [{ tagCode: "GSTJ" }, { tagCode: "ZSTY" }] }] });
  assert.deepEqual(result.hotels[0].tags, { bayerPreferred: true, diamond: true });
});
