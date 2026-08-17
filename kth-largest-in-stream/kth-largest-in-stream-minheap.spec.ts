import { KthLargest } from "./kth-largest-in-stream-minheap";

describe("KthLargest (min-heap)", () => {
  it("matches the canonical stream example", () => {
    const kthLargest = new KthLargest(3, [4, 5, 8, 2]);

    expect(kthLargest.add(3)).toBe(4);
    expect(kthLargest.add(5)).toBe(5);
    expect(kthLargest.add(10)).toBe(5);
    expect(kthLargest.add(9)).toBe(8);
    expect(kthLargest.add(4)).toBe(8);
  });

  it("handles duplicates and negative scores", () => {
    const kthLargest = new KthLargest(2, [-1, -1]);

    expect(kthLargest.add(-1)).toBe(-1);
    expect(kthLargest.add(-2)).toBe(-1);
    expect(kthLargest.add(0)).toBe(-1);
    expect(kthLargest.add(0)).toBe(0);
  });

  it("returns the running maximum when k is 1", () => {
    const kthLargest = new KthLargest(1, [7, 1]);

    expect(kthLargest.add(3)).toBe(7);
    expect(kthLargest.add(9)).toBe(9);
    expect(kthLargest.add(2)).toBe(9);
  });
});
