import { describe, it, expect } from "vitest";
import { calcRoi } from "./roi";

describe("calcRoi", () => {
  it("10,000 docs/month saves 600 hours and $39,000", () => {
    expect(calcRoi(10000)).toEqual({ hours: 600, monthly: 39000, annual: 468000 });
  });
});
