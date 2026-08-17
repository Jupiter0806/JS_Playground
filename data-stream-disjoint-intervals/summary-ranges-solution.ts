export class SummaryRanges {
  private intervals: number[][];

  constructor() {
    this.intervals = [];
  }

  addNum(value: number): void {
    let index = 0;

    while (
      index < this.intervals.length &&
      this.intervals[index][1] < value - 1
    ) {
      index += 1;
    }

    const left = index > 0 ? this.intervals[index - 1] : null;
    const right = index < this.intervals.length ? this.intervals[index] : null;

    if (left && left[1] >= value - 1) {
      left[1] = Math.max(left[1], value);

      while (
        index < this.intervals.length &&
        this.intervals[index][0] <= left[1] + 1
      ) {
        left[1] = Math.max(left[1], this.intervals[index][1]);
        this.intervals.splice(index, 1);
      }

      return;
    }

    if (right && right[0] <= value + 1) {
      right[0] = Math.min(right[0], value);
      right[1] = Math.max(right[1], value);

      while (
        index + 1 < this.intervals.length &&
        this.intervals[index + 1][0] <= right[1] + 1
      ) {
        right[1] = Math.max(right[1], this.intervals[index + 1][1]);
        this.intervals.splice(index + 1, 1);
      }

      return;
    }

    this.intervals.splice(index, 0, [value, value]);
  }

  getIntervals(): number[][] {
    return this.intervals;
  }
}
