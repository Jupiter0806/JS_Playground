export interface Node {
  // go to left to tail
  next: Node | null;

  // go to right to head
  prev: Node | null;

  value: number;
}

export class LinkedNode {
  private tail: Node;
  private head: Node;
  size: number;

  constructor() {
    this.tail = {
      next: null,
      prev: null,
      value: -1,
    };

    this.head = {
      next: null,
      prev: null,
      value: -1,
    };

    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.size = 0;
  }

  addToFront(node: Node) {
    // link node
    node.prev = this.head;
    node.next = this.head.next;

    // link head next to curr
    this.head.next!.prev = node;

    // link head to curr
    this.head.next = node;

    this.size++;
  }

  remove(node: Node) {
    // one either of prev/next is null, it's head/tail
    // it should not be removed
    if (!node.prev || !node.next) return null;

    node.next.prev = node.prev;
    node.prev.next = node.next;
    node.prev = null;
    node.next = null;

    this.size--;
  }

  popTail(): Node | null {
    const popped = this.tail.prev;

    // don't remove head
    if (!popped || popped === this.head) return null;

    this.remove(popped);

    return popped;
  }

  toString(): string {
    let curr = this.tail.prev;
    let output = "";

    while (curr && curr !== this.head) {
      output += `${output ? " => " : ""}${curr.value}`;

      curr = curr.prev;
    }

    return output;
  }
}
