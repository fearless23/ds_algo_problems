
//  * Definition for singly-linked list.
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  let pointerx = null;
  let pointer = head;

  while (pointer && pointer.next) {
    const curr_val = pointer.val;
    const next_val = pointer.next.val;
    if (curr_val !== next_val) {
      pointerx = pointer;
      pointer = pointer.next;
    }
    else {
      const next_pointer = find_next_value_node(pointer, pointer.val)
      if(pointer.val === head.val) head = next_pointer;
      pointer = next_pointer
      if(pointerx) pointerx.next = pointer;
    }
  }
  return head;
};

const find_next_value_node = (start_node, val) => {
  let pointer = start_node.next;
  while (pointer && pointer.val === val) {
    pointer = pointer.next;
  }
  return pointer;
}


// const arr = [1, 2, 3, 3, 4, 4, 5, 5]
// const arr = [1, 2]
// const arr = [1, 2, 2]
// const arr = [1, 1, 2]
// const arr = [1, 1]
const arr = [1]


// make list
const nodes = arr.map(i => (new ListNode(i)))
for (let i = nodes.length - 1; i > 0; i--) {
  const prev_node = nodes[i - 1]
  prev_node.next = nodes[i]
}
const a = nodes[0]
console.log('LIST -> ', JSON.stringify(a))

const xxx = deleteDuplicates(a)
console.log('result --> ', JSON.stringify(xxx))