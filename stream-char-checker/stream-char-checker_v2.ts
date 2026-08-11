// use link-node to store scores

/**
 * Dataset settings:
{
  words: 3000,
  streamLength: 300000,
  minWordLen: 3,
  maxWordLen: 12,
  alphabetSize: 26,
  seed: 42,
  rounds: 7,
  warmupRounds: 2
}

Benchmark result (lower is faster):
totalMs* is the LeetCode-like constructor+query time.
┌─────────┬────────────────────┬───────────────┬───────────────┬───────────────┬────────────┬────────────┬────────────┬────────────┐
│ (index) │ implementation     │ buildMsMedian │ queryMsMedian │ totalMsMedian │ buildMsAvg │ queryMsAvg │ totalMsAvg │ matchCount │
├─────────┼────────────────────┼───────────────┼───────────────┼───────────────┼────────────┼────────────┼────────────┼────────────┤
│ 0       │ 'Reversed Trie'    │ 0.95          │ 26.8          │ 27.64         │ 1.04       │ 26.9       │ 27.93      │ 5601       │
│ 1       │ 'Aho-Corasick'     │ 8.69          │ 20.72         │ 29.94         │ 10.22      │ 20.97      │ 31.2       │ 5601       │
│ 2       │ 'StreamChecker v2' │ 0.07          │ 5194.81       │ 5194.88       │ 0.06       │ 5034.71    │ 5034.78    │ 5601       │
└─────────┴────────────────────┴───────────────┴───────────────┴───────────────┴────────────┴────────────┴────────────┴────────────┘
 */

interface Node<T> {
  // to left
  next: Node<T> | null;
  // to right
  prev: Node<T> | null;

  data: T;
}

class LinkedNode<T> {
  private head: Node<T>;
  private tail: Node<T>;

  private linkSize;

  private locked: boolean;
  private removedNodesWhenLocked: Node<T>[];
  private addedNodesWhenLocked: Node<T>[];

  constructor() {
    this.head = {
      next: null,
      prev: null,
      data: {} as any,
    };

    this.tail = {
      next: null,
      prev: null,
      data: {} as any,
    };

    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.linkSize = 0;

    this.locked = false;
    this.removedNodesWhenLocked = [];
    this.addedNodesWhenLocked = [];
  }

  get size() {
    return this.linkSize;
  }

  addToFont(node: Node<T>) {
    if (this.locked) {
      this.addedNodesWhenLocked.push(node);
      return;
    }

    node.prev = this.head;
    node.next = this.head.next;

    this.head.next!.prev = node;
    this.head.next = node;
  }

  removeNode(node: Node<T>) {
    if (this.locked) {
      this.removedNodesWhenLocked.push(node);
      return;
    }

    if (!node.next || !node.prev) {
      console.warn(
        "Trying to remove head/tail, which is not allowed. Skipped.",
      );
      return;
    }

    node.next.prev = node.prev;
    node.prev.next = node.next;

    node.next = null;
    node.prev = null;
  }

  forEach(
    func: (node: Node<T>) => void,
    { locked }: { locked?: boolean } = {},
  ) {
    this.locked = true;

    let curr = this.tail.prev;
    const lastNode = this.head.next;

    while (curr && curr !== this.head) {
      func(curr);

      curr = curr.prev;

      // when locked, it only iterate current linked nodes,
      // and ignore any newly added nodes while looping
      if (locked && curr && curr === lastNode) {
        func(curr);
        break;
      }
    }

    this.locked = false;
    this.removedNodesWhenLocked.forEach(this.removeNode.bind(this));
    this.addedNodesWhenLocked.forEach(this.addToFont.bind(this));

    this.removedNodesWhenLocked = [];
    this.addedNodesWhenLocked = [];
  }

  toString() {
    let output = "";

    this.forEach((node) => {
      output += "=>" + JSON.stringify(node.data);
    });

    return output;
  }
}

interface ScoreData {
  str: string;
  score: number;
  wordIndex: number;
}

export class StreamChecker {
  private words: string[];

  private scores: LinkedNode<ScoreData>;

  // output = [
  //   null,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   true,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   false,
  //   true,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   false,
  //   false,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  //   true,
  //   false,
  // ];
  // oi = 1;

  constructor(words: string[]) {
    this.words = words;

    this.scores = new LinkedNode();
  }

  query(letter: string): boolean {
    const crawlingRes = this.crawlWordTower(letter);
    const calcRes = this.calcLetterScores(letter);

    const res = crawlingRes || calcRes;

    // if (this.output[this.oi] !== res)
    //   console.log(
    //     `result not matched, expect ${this.output[this.oi]}, received ${res}, i ${this.oi}`,
    //   );

    // this.oi++;

    return res;
  }

  private crawlWordTower(letter: string) {
    let succeed = false;

    this.scores.forEach(
      (node) => {
        const { str: oldStr, score, wordIndex } = node.data;
        const newStr = oldStr + letter;

        const matched = this.words[wordIndex][score] === letter;

        if (matched) {
          if (this.words[wordIndex].length === score + 1) {
            succeed = true;
          } else {
            this.scores.addToFont({
              next: null,
              prev: null,
              data: {
                str: newStr,
                score: score + 1,
                wordIndex,
              },
            });
          }
        }

        // todo fix
        // after remove node, the forEach break
        this.scores.removeNode(node);
      },
      { locked: true },
    );

    // console.log("after crawling", letter, this.scores.toString());

    return succeed;
  }

  private calcLetterScores(letter: string) {
    if (letter.length !== 1) {
      console.warn("calcLetterScores: only able to calc letter scores.");
      return false;
    }

    // console.log("before calc", letter, this.scores);

    let matched = false;

    for (let i = 0; i < this.words.length; i++) {
      const aWord = this.words[i];

      if (aWord[0] === letter) {
        if (aWord.length === 1) {
          matched = true;
          continue;
        }

        this.scores.addToFont({
          next: null,
          prev: null,
          data: {
            str: letter,
            score: 1,
            wordIndex: i,
          },
        });
      }
    }

    // console.log("after calc", letter, this.scores.toString());

    // no match
    // if (scores.size === 0) {
    //   this.scores.delete()
    // } else {
    //   this.scores.set(letter, scores);
    // }

    // ["ab","ba","aaab","abab","baa"]
    return matched;
  }
}
