class MinHeap {
  private data: number[] = [];

  size(): number {
    return this.data.length;
  }

  peek(): number {
    return this.data[0];
  }

  push(value: number): void {
    this.data.push(value);
    this.bubbleUp(this.data.length - 1);
  }

  pop(): number | undefined {
    if (this.data.length === 0) return undefined;

    this.data.shift();

    const top = this.data[0];
    const last = this.data.pop()!;

    if (this.data.length > 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return top;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.data[parent] <= this.data[index]) break;

      [this.data[parent], this.data[index]] = [
        this.data[index],
        this.data[parent],
      ];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const n = this.data.length;

    while (true) {
      const left = index * 2 + 1;
      const right = index * 2 + 2;
      let smallest = index;

      if (left < n && this.data[left] < this.data[smallest]) {
        smallest = left;
      }

      if (right < n && this.data[right] < this.data[smallest]) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.data[index], this.data[smallest]] = [
        this.data[smallest],
        this.data[index],
      ];
      index = smallest;
    }
  }
}

export class KthLargest {
  private readonly k: number;
  private readonly minHeap: MinHeap;

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.minHeap = new MinHeap();

    for (const num of nums) {
      this.add(num);
    }
  }

  add(val: number): number {
    this.minHeap.push(val);

    // Keep only the k largest scores seen so far.
    if (this.minHeap.size() > this.k) {
      this.minHeap.pop();
    }

    return this.minHeap.peek();
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
