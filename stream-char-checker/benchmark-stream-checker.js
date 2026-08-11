// MIN_WORD_LEN=3 MAX_WORD_LEN=12 WORD_COUNT=3000 STREAM_LENGTH=300000 node benchmark-stream-checker.js

const fs = require("fs");
const path = require("path");
const ts = require("typescript");
const { performance } = require("perf_hooks");

function loadTypeScriptModule(relativePath) {
  const absolutePath = path.resolve(__dirname, relativePath);
  const source = fs.readFileSync(absolutePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2019,
      esModuleInterop: true,
    },
  });

  const module = { exports: {} };
  const wrapper = new Function(
    "require",
    "module",
    "exports",
    transpiled.outputText,
  );
  wrapper(require, module, module.exports);
  return module.exports;
}

const reversedTrieModule = loadTypeScriptModule("./stream-checker.ts");
const StreamCheckerReversedTrie =
  reversedTrieModule.default || reversedTrieModule.StreamChecker;

const ahoCorasickModule = loadTypeScriptModule(
  "./stream-checker-aho-corasick.ts",
);
const StreamCheckerAhoCorasick =
  ahoCorasickModule.default || ahoCorasickModule.StreamChecker;

const streamCheckerV2Module = loadTypeScriptModule(
  "./stream-char-checker_v2.ts",
);
const StreamCheckerV2 =
  streamCheckerV2Module.StreamChecker || streamCheckerV2Module.default;

function seededRandom(seed) {
  let state = seed >>> 0;
  return function next() {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

function randomWord(rand, minLen, maxLen, alphabet) {
  const len = minLen + Math.floor(rand() * (maxLen - minLen + 1));
  let word = "";
  for (let i = 0; i < len; i++) {
    word += alphabet[Math.floor(rand() * alphabet.length)];
  }
  return word;
}

function generateDataset({
  wordCount = 5000,
  minWordLen = 1,
  maxWordLen = 12,
  streamLength = 200000,
  alphabet = "abcdefghijklmnopqrstuvwxyz",
  seed = 42,
}) {
  const rand = seededRandom(seed);

  const wordSet = new Set();
  while (wordSet.size < wordCount) {
    wordSet.add(randomWord(rand, minWordLen, maxWordLen, alphabet));
  }
  const words = Array.from(wordSet);

  const stream = new Array(streamLength);
  for (let i = 0; i < streamLength; i++) {
    stream[i] = alphabet[Math.floor(rand() * alphabet.length)];
  }

  return { words, stream };
}

function average(values) {
  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }

  return (sorted[mid - 1] + sorted[mid]) / 2;
}

function benchmarkImplementation({
  label,
  CheckerClass,
  words,
  stream,
  rounds,
  warmupRounds,
}) {
  const queryOnlyMs = [];
  const totalMs = [];
  const buildMs = [];
  let matchCount = 0;

  for (let round = 0; round < warmupRounds + rounds; round++) {
    const buildStart = performance.now();
    const checker = new CheckerClass(words);
    const buildDone = performance.now();

    let currentMatchCount = 0;
    const queryStart = performance.now();

    for (let i = 0; i < stream.length; i++) {
      if (checker.query(stream[i])) {
        currentMatchCount++;
      }
    }

    const queryDone = performance.now();
    const currentBuildMs = buildDone - buildStart;
    const currentQueryMs = queryDone - queryStart;
    const currentTotalMs = queryDone - buildStart;

    if (round >= warmupRounds) {
      buildMs.push(currentBuildMs);
      queryOnlyMs.push(currentQueryMs);
      totalMs.push(currentTotalMs);
      matchCount = currentMatchCount;
    }
  }

  return {
    label,
    matchCount,
    buildMsMedian: median(buildMs),
    queryMsMedian: median(queryOnlyMs),
    totalMsMedian: median(totalMs),
    buildMsAvg: average(buildMs),
    queryMsAvg: average(queryOnlyMs),
    totalMsAvg: average(totalMs),
  };
}

function verifySameAnswers(words, stream) {
  const a = new StreamCheckerReversedTrie(words);
  const b = new StreamCheckerAhoCorasick(words);
  const c = new StreamCheckerV2(words);

  for (let i = 0; i < stream.length; i++) {
    const ra = a.query(stream[i]);
    const rb = b.query(stream[i]);
    const rc = c.query(stream[i]);

    if (ra !== rb || ra !== rc) {
      throw new Error(
        `Mismatch at index ${i}: trie=${ra}, aho=${rb}, streamCheckerV2=${rc}, char=${stream[i]}`,
      );
    }
  }
}

function main() {
  const rounds = Number(process.env.ROUNDS || 7);
  const warmupRounds = Number(process.env.WARMUP_ROUNDS || 2);

  const dataset = generateDataset({
    wordCount: Number(process.env.WORD_COUNT || 5000),
    minWordLen: Number(process.env.MIN_WORD_LEN || 1),
    maxWordLen: Number(process.env.MAX_WORD_LEN || 12),
    streamLength: Number(process.env.STREAM_LENGTH || 200000),
    alphabet: process.env.ALPHABET || "abcdefghijklmnopqrstuvwxyz",
    seed: Number(process.env.SEED || 42),
  });

  console.log("Dataset settings:");
  console.log({
    words: dataset.words.length,
    streamLength: dataset.stream.length,
    minWordLen: Number(process.env.MIN_WORD_LEN || 1),
    maxWordLen: Number(process.env.MAX_WORD_LEN || 12),
    alphabetSize: (process.env.ALPHABET || "abcdefghijklmnopqrstuvwxyz").length,
    seed: Number(process.env.SEED || 42),
    rounds,
    warmupRounds,
  });

  verifySameAnswers(dataset.words, dataset.stream);

  const reversedTrie = benchmarkImplementation({
    label: "Reversed Trie",
    CheckerClass: StreamCheckerReversedTrie,
    words: dataset.words,
    stream: dataset.stream,
    rounds,
    warmupRounds,
  });

  const ahoCorasick = benchmarkImplementation({
    label: "Aho-Corasick",
    CheckerClass: StreamCheckerAhoCorasick,
    words: dataset.words,
    stream: dataset.stream,
    rounds,
    warmupRounds,
  });

  const streamCheckerV2 = benchmarkImplementation({
    label: "StreamChecker v2",
    CheckerClass: StreamCheckerV2,
    words: dataset.words,
    stream: dataset.stream,
    rounds,
    warmupRounds,
  });

  console.log("\nBenchmark result (lower is faster):");
  console.log("totalMs* is the LeetCode-like constructor+query time.");
  console.table([
    {
      implementation: reversedTrie.label,
      buildMsMedian: Number(reversedTrie.buildMsMedian.toFixed(2)),
      queryMsMedian: Number(reversedTrie.queryMsMedian.toFixed(2)),
      totalMsMedian: Number(reversedTrie.totalMsMedian.toFixed(2)),
      buildMsAvg: Number(reversedTrie.buildMsAvg.toFixed(2)),
      queryMsAvg: Number(reversedTrie.queryMsAvg.toFixed(2)),
      totalMsAvg: Number(reversedTrie.totalMsAvg.toFixed(2)),
      matchCount: reversedTrie.matchCount,
    },
    {
      implementation: ahoCorasick.label,
      buildMsMedian: Number(ahoCorasick.buildMsMedian.toFixed(2)),
      queryMsMedian: Number(ahoCorasick.queryMsMedian.toFixed(2)),
      totalMsMedian: Number(ahoCorasick.totalMsMedian.toFixed(2)),
      buildMsAvg: Number(ahoCorasick.buildMsAvg.toFixed(2)),
      queryMsAvg: Number(ahoCorasick.queryMsAvg.toFixed(2)),
      totalMsAvg: Number(ahoCorasick.totalMsAvg.toFixed(2)),
      matchCount: ahoCorasick.matchCount,
    },
    {
      implementation: streamCheckerV2.label,
      buildMsMedian: Number(streamCheckerV2.buildMsMedian.toFixed(2)),
      queryMsMedian: Number(streamCheckerV2.queryMsMedian.toFixed(2)),
      totalMsMedian: Number(streamCheckerV2.totalMsMedian.toFixed(2)),
      buildMsAvg: Number(streamCheckerV2.buildMsAvg.toFixed(2)),
      queryMsAvg: Number(streamCheckerV2.queryMsAvg.toFixed(2)),
      totalMsAvg: Number(streamCheckerV2.totalMsAvg.toFixed(2)),
      matchCount: streamCheckerV2.matchCount,
    },
  ]);
}

main();
