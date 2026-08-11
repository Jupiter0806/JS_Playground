type ACNode = {
  children: Map<string, number>;
  fail: number;
  outputCount: number;
};

class StreamChecker {
  private readonly nodes: ACNode[];

  private state: number;

  constructor(words: string[]) {
    this.nodes = [{ children: new Map(), fail: 0, outputCount: 0 }];
    this.state = 0;

    for (const word of words) {
      this.insertWord(word);
    }

    this.buildFailureLinks();
  }

  query(letter: string): boolean {
    while (this.state !== 0 && !this.nodes[this.state].children.has(letter)) {
      this.state = this.nodes[this.state].fail;
    }

    const nextState = this.nodes[this.state].children.get(letter);
    this.state = nextState ?? 0;

    return this.nodes[this.state].outputCount > 0;
  }

  private insertWord(word: string): void {
    let current = 0;

    for (const ch of word) {
      const next = this.nodes[current].children.get(ch);

      if (next === undefined) {
        const newIndex = this.nodes.length;
        this.nodes.push({ children: new Map(), fail: 0, outputCount: 0 });
        this.nodes[current].children.set(ch, newIndex);
        current = newIndex;
      } else {
        current = next;
      }
    }

    this.nodes[current].outputCount += 1;
  }

  private buildFailureLinks(): void {
    const queue: number[] = [];

    for (const next of Array.from(this.nodes[0].children.values())) {
      this.nodes[next].fail = 0;
      queue.push(next);
    }

    for (let head = 0; head < queue.length; head++) {
      const state = queue[head];

      for (const [ch, next] of Array.from(
        this.nodes[state].children.entries(),
      )) {
        let fallback = this.nodes[state].fail;

        while (fallback !== 0 && !this.nodes[fallback].children.has(ch)) {
          fallback = this.nodes[fallback].fail;
        }

        const candidate = this.nodes[fallback].children.get(ch);
        this.nodes[next].fail = candidate ?? 0;

        // If the fail state is terminal, this state is terminal for a suffix match too.
        this.nodes[next].outputCount +=
          this.nodes[this.nodes[next].fail].outputCount;

        queue.push(next);
      }
    }
  }
}

export default StreamChecker;
