import { LinkedNode, Node as ListNode } from "./linked-node-list";

function createNode(value: number): ListNode {
  return {
    next: null,
    prev: null,
    value,
  };
}

describe("LinkedNode", () => {
  it("adds nodes to the front and keeps the expected order", () => {
    const list = new LinkedNode();
    const first = createNode(1);
    const second = createNode(2);

    list.addToFront(first);
    list.addToFront(second);

    expect(list.size).toBe(2);
    expect(list.toString()).toBe("1 => 2");
    expect(second.prev).not.toBeNull();
    expect(second.next).toBe(first);
    expect(first.prev).toBe(second);
  });

  it("pops from the tail and removes nodes from the middle", () => {
    const list = new LinkedNode();
    const first = createNode(1);
    const second = createNode(2);
    const third = createNode(3);

    list.addToFront(first);
    list.addToFront(second);
    list.addToFront(third);

    expect(list.popTail()).toBe(first);
    expect(list.size).toBe(2);
    expect(list.toString()).toBe("2 => 3");
    expect(first.prev).toBeNull();
    expect(first.next).toBeNull();

    list.remove(second);

    expect(list.size).toBe(1);
    expect(list.toString()).toBe("3");
    expect(second.prev).toBeNull();
    expect(second.next).toBeNull();

    expect(list.popTail()).toBe(third);
    expect(list.size).toBe(0);
    expect(list.toString()).toBe("");
  });

  it("ignores boundary-like nodes that are not linked into the list", () => {
    const list = new LinkedNode();

    expect(list.remove(createNode(99))).toBeNull();
    expect(list.size).toBe(0);
  });
});
