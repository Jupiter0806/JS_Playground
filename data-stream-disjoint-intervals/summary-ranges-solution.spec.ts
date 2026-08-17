import { SummaryRanges } from "./summary-ranges-solution";

describe("SummaryRanges solution", () => {
  it("tracks disjoint intervals as numbers are added", () => {
    const summaryRanges = new SummaryRanges();

    const operations = [
      { action: "addNum", value: 1 },
      { action: "getIntervals" },
      { action: "addNum", value: 3 },
      { action: "getIntervals" },
      { action: "addNum", value: 7 },
      { action: "getIntervals" },
      { action: "addNum", value: 2 },
      { action: "getIntervals" },
      { action: "addNum", value: 6 },
      { action: "getIntervals" },
    ] as const;

    const expected = [
      [[1, 1]],
      [
        [1, 1],
        [3, 3],
      ],
      [
        [1, 1],
        [3, 3],
        [7, 7],
      ],
      [
        [1, 3],
        [7, 7],
      ],
      [
        [1, 3],
        [6, 7],
      ],
    ];

    operations.forEach((operation, index) => {
      if (operation.action === "addNum") {
        summaryRanges.addNum(operation.value);
        return;
      }

      expect(summaryRanges.getIntervals()).toEqual(
        expected[Math.floor(index / 2)],
      );
    });
  });
});
