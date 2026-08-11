import { StreamChecker } from "./stream-char-checker_v2";

describe("StreamChecker v2", () => {
  it("matches the LeetCode example input/output sequence", () => {
    const streamChecker = new StreamChecker(["cd", "f", "kl"]);

    const actual = [
      streamChecker.query("a"),
      streamChecker.query("b"),
      streamChecker.query("c"),
      streamChecker.query("d"),
      streamChecker.query("e"),
      streamChecker.query("f"),
      streamChecker.query("g"),
      streamChecker.query("h"),
      streamChecker.query("i"),
      streamChecker.query("j"),
      streamChecker.query("k"),
      streamChecker.query("l"),
    ];

    expect(actual).toEqual([
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
    ]);
  });
});
