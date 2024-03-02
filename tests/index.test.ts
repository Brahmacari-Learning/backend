import { tD } from "@/models/SlokaModel";
import { describe, expect, it } from "bun:test";

describe('Convert digit', () => {
	it("should convert 3 to 003", () => {
		expect(tD(3)).toBe("003");
	})
	it("should convert 24 to 024", () => {
		expect(tD(24)).toBe("024")
	})
})
