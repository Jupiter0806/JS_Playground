class KthLargest {
  // largest->smallest
  private allKLargest: number[];
  private k: number;

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.allKLargest = new Array().fill(-Infinity);

    this.adjustAllKLargest(nums);
  }

  add(val: number): number {
    this.adjustAllKLargest([val]);

    return this.kth;
  }

  get kth() {
    return this.allKLargest[this.k - 1];
  }

  private adjustAllKLargest(nums: number[]) {
    this.allKLargest = [...this.allKLargest, ...nums].sort().slice(0, this.k);
    console.debug(this.allKLargest);
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
