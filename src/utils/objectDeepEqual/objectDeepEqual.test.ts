const { objectDeepEqual } = require(".");

describe("objectDeepEqual", () => {
  test("Should check for undefined args", () => {
    expect(objectDeepEqual(undefined, undefined)).toBeTruthy();
    expect(objectDeepEqual(undefined, { a: 1 })).toBeFalsy();
  });

  test("Should handle null values", () => {
    const toBeFalsyTests = [
      [
        { a: 1, b: null, e: ["hello", "testing"] },
        { a: 1, b: { c: 2, d: [1, 2, 3] }, e: null },
      ],
      [
        { b: null, a: 1, e: ["hello", "testing"] },
        { a: null, b: { c: 2, d: [1, 2, 3] }, e: null },
      ],
    ];
    const toBeTruthyTests = [
      [
        { a: 1, b: { c: 2, d: [1, 2, 3] }, e: null },
        { a: 1, b: { c: 2, d: [1, 2, 3] }, e: null },
      ],
      [
        { a: 1, b: { c: 2, d: null }, e: null },
        { a: 1, e: null, b: { d: null, c: 2 } },
      ],
    ];

    // Should return true
    for (const test of toBeTruthyTests) {
      expect(objectDeepEqual(test[0], test[1])).toBeTruthy();
    }

    // Should return false
    for (const test of toBeFalsyTests) {
      expect(objectDeepEqual(test[0], test[1])).toBeFalsy();
    }
  });

  test("Should return true when objects are equal", () => {
    const tests = [
      [
        { a: 1, b: 2 },
        { a: 1, b: 2 },
      ],
      [
        { b: 2, a: 1 },
        { a: 1, b: 2 },
      ],
      [
        { a: 1, b: { c: 2, d: [1, 2, 3] } },
        { a: 1, b: { c: 2, d: [1, 2, 3] } },
      ],
      [
        { a: 1, b: { c: 2, d: [1, 2, 3] }, e: ["hello", "testing"] },
        { a: 1, b: { c: 2, d: [1, 2, 3] }, e: ["hello", "testing"] },
      ],
    ];

    for (const test of tests) {
      expect(objectDeepEqual(test[0], test[1])).toBeTruthy();
    }
  });

  test("Should return false when objects are not equal", () => {
    const tests = [
      [
        { a: 1, b: 22 },
        { a: 1, b: 2 },
      ],
      [
        { b: 12, a: 1 },
        { a: 1, b: 2 },
      ],
      [
        { a: 1, b: { c: 2, d: [1, 2, 3] } },
        { a: 1, b: { c: 2, d: [1, 2, 3, 4] } },
      ],
      [
        { a: 1, b: { c: 2, d: [1, 2, 3] }, e: ["hello", "testing"] },
        { a: 1, b: { c: 2, d: [1, 2, 3] }, e: ["hello", "testing", "more"] },
      ],
      [
        { a: undefined, b: { c: 2, d: [1, 2, 3] }, e: undefined },
        { a: 1, b: { c: 2, d: undefined }, e: ["hello", "testing", "more"] },
      ],
    ];

    for (const test of tests) {
      expect(objectDeepEqual(test[0], test[1])).toBeFalsy();
    }
  });
});
