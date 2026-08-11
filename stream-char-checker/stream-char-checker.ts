/**
 * {
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
  ┌─────────┬───────────────────┬───────────────┬───────────────┬───────────────┬────────────┬────────────┬────────────┬────────────┐
  │ (index) │ implementation    │ buildMsMedian │ queryMsMedian │ totalMsMedian │ buildMsAvg │ queryMsAvg │ totalMsAvg │ matchCount │
  ├─────────┼───────────────────┼───────────────┼───────────────┼───────────────┼────────────┼────────────┼────────────┼────────────┤
  │ 0       │ 'Reversed Trie'   │ 0.97          │ 28.85         │ 29.78         │ 1.16       │ 29.13      │ 30.29      │ 5601       │
  │ 1       │ 'Aho-Corasick'    │ 2.61          │ 21.22         │ 23.76         │ 3.25       │ 22.1       │ 25.35      │ 5601       │
  │ 2       │ 'towerCrawler_v1' │ 1.41          │ 9538.22       │ 9538.25       │ 1.69       │ 9397.17    │ 9398.85    │ 5601       │
  └─────────┴───────────────────┴───────────────┴───────────────┴───────────────┴────────────┴────────────┴────────────┴────────────┘
 */

export class StreamChecker {
  private words: string[];

  private scores: Map<string, Map<number, number>>;

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

    this.scores = new Map();
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

    Array.from(this.scores.keys()).forEach((key) => {
      const scores = this.scores.get(key)!;

      const newStr = key + letter;

      for (let index of scores.keys()) {
        let score = scores.get(index)!;

        const matched = this.words[index][score] === letter;

        if (matched) {
          if (this.words[index].length === score + 1) {
            succeed = true;
          } else {
            if (!this.scores.has(newStr)) {
              this.scores.set(newStr, new Map());
            }

            this.scores.get(newStr)!.set(index, ++score);
          }
        }

        scores.delete(index);

        if (scores.size === 0) {
          this.scores.delete(key);
        }
      }

      // console.log("crawl tower", ` key: ${key}, score: `, scores);

      if (scores.size === 0) {
        this.scores.delete(key);
      }
    });

    // for (let key of this.scores.forEach()) {}

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

        if (!this.scores.has(letter)) {
          this.scores.set(letter, new Map());
        }

        this.scores.get(letter)!.set(i, 1);
      }
    }

    // console.log("after calc", letter, this.scores);

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
