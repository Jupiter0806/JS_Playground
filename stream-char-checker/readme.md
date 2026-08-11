# Data Stream Processing - Stream of Character

# Question

Design an algorithm that accepts a stream of characters and checks if a suffix of these characters is a string of a given array of strings words.

For example, if words = ["abc", "xyz"] and the stream added the four characters (one by one) 'a', 'x', 'y', and 'z', your algorithm should detect that the suffix "xyz" of the characters "axyz" matches "xyz" from words.

Implement the StreamChecker class:

- StreamChecker(String[] words) Initializes the object with the strings array words.
- boolean query(char letter) Accepts a new character from the stream and returns true if any non-empty suffix from the stream forms a word that is in words.

# Solution

## why my tower crawler not working

I've tried Map and Linked-Node to store the tower crawling scores, yet both of them are extremely slow. By changing to linked node, the performance improved, (from 9398 to 5034 ms).

Why? why not even close to Reversed Trie.

The comparing efficiency is too poor. For a letter, even most of the words starting with the same letter, it still need to compare them all, even though frequently updating the Map has been avoided with linked node, (that's why 9398 reduced to 5034).

E.G.

- Words: ab, ac, ad, aa, ae
- Letter: a

The goal is to find if any words start with "a", tower crawler will compare "a" to all words, and only one single comparison is required.

In this case, by building a tower with the "Words" and using the input to crawl this tower is the `Correct` answer, and which is exactly what Reversed Trie(stream-checker.ts) doing.

## aho-corasick

Not study yet.
