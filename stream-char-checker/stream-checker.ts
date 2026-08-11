// Reversed Trie

type TrieNode = {
  children: Map<string, TrieNode>;
  isWord: boolean;
};

class StreamChecker {
  private readonly root: TrieNode;

  private readonly stream: string[];

  private readonly maxWordLength: number;

  constructor(words: string[]) {
    this.root = { children: new Map(), isWord: false };
    this.stream = [];
    this.maxWordLength = words.reduce(
      (maxLen, word) => Math.max(maxLen, word.length),
      0,
    );

    for (const word of words) {
      this.insertReversed(word);
    }
  }

  query(letter: string): boolean {
    this.stream.push(letter);

    // Keep only the tail that can possibly match the longest word.
    if (this.stream.length > this.maxWordLength) {
      this.stream.shift();
    }

    let node = this.root;

    for (let i = this.stream.length - 1; i >= 0; i--) {
      const ch = this.stream[i];
      const next = node.children.get(ch);

      if (!next) {
        return false;
      }

      node = next;
      if (node.isWord) {
        return true;
      }
    }

    return false;
  }

  private insertReversed(word: string): void {
    let node = this.root;

    for (let i = word.length - 1; i >= 0; i--) {
      const ch = word[i];

      if (!node.children.has(ch)) {
        node.children.set(ch, { children: new Map(), isWord: false });
      }

      node = node.children.get(ch)!;
    }

    node.isWord = true;
  }
}

export default StreamChecker;
