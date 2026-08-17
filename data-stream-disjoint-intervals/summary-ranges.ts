/**
 * current solution not working, but seems a good idea
 *
 * tried to save the index of interval into curesRequired, but after merged two
 * intervals, the following indexes changed
 *
 * tried to save the reference of an interval, but after an interval removed,
 * the one saved in curesRequired still persist
 *
 *
 */

export class SummaryRanges {
  private intervals: number[][];

  // Map<CureRequired, intervals>
  private curesRequired: Map<number, number[][]>;

  constructor() {
    this.intervals = [];
    this.curesRequired = new Map();
  }

  addNum(value: number): void {
    const intervals = this.curesRequired.get(value);
    if (intervals) {
      this.cureIntervals(intervals);
      this.curesRequired.delete(value);
    } else {
      this.createIntervals(value);
    }
  }

  getIntervals(): number[][] {
    return this.intervals;
  }

  private createIntervals(value: number) {
    const newInterval = [value, value];

    let insertIndex = -1;

    for (let i = 0; i < this.intervals.length; i++) {
      const [min, max] = this.intervals[i];

      if (value < min) {
        // insert before
        insertIndex = i;
        break;
      } else if (value <= max) {
        break;
      } else if (i === this.intervals.length - 1) {
        insertIndex = this.intervals.length;
        break;
      }
    }

    this.intervals.splice(insertIndex, 0, newInterval);
    this.findCure(this.intervals.length - 1);
  }

  private cureIntervals(intervals: number[][]) {
    const [interval1, interval2] = intervals;

    const index1 = this.intervals.findIndex((intvl) => intvl === interval1);
    const index2 = interval2 ? index1 + 1 : undefined;

    console.debug({
      intervals: this.intervals,
      index1,
      index2,
      interval1,
      interval2,
      cures: this.curesRequired,
    });

    const newList = [...interval1, ...(interval2 ?? [])];

    const newIntervalLeft = Math.min(...newList);
    const newIntervalRight = Math.max(...newList);

    const newInterval = [newIntervalLeft, newIntervalRight];

    this.intervals.splice(index1, 1, newInterval);
    if (index2 !== undefined) this.intervals.splice(index2, 1);
  }

  private findCure(intervalIndex: number) {
    const interval = this.intervals[intervalIndex];
    const leftCure = interval[0] - 1;
    const rightCure = interval[1] + 1;

    this.addCureRequired(leftCure, interval);

    if (leftCure !== rightCure) {
      this.addCureRequired(rightCure, interval);
    }
  }

  private addCureRequired(cure: number, interval: number[]) {
    if (cure >= 0) {
      if (!this.curesRequired.has(cure)) {
        this.curesRequired.set(cure, []);
      }

      this.curesRequired.get(cure)!.push(interval);
    }
  }
}

/**
 * Your SummaryRanges object will be instantiated and called as such:
 * var obj = new SummaryRanges()
 * obj.addNum(value)
 * var param_2 = obj.getIntervals()
 */
