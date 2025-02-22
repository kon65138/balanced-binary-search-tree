import './style.css';

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === array[i + 1]) {
        throw new Error('array cannot have duplicates');
      }
    }
    let start = 0;
    let end = array.length - 1;

    function recursiveBuildTree(array, start, end) {
      if (start > end) return null;

      let mid = start + Math.floor((end - start) / 2);

      let root = new Node(array[mid]);

      root.left = recursiveBuildTree(array, start, mid - 1);
      root.right = recursiveBuildTree(array, mid + 1, end);

      return root;
    }

    return recursiveBuildTree(array, start, end);
  }

  insert(value) {
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] === value) {
        throw new Error('array cannot have duplicates');
      }
    }

    function recursiveInsertNode(currentNode, insertValue) {
      if (currentNode.data > insertValue) {
        if (currentNode.left === null) {
          currentNode.left = new Node(insertValue);
          return;
        }
        return recursiveInsertNode(currentNode.left, insertValue);
      } else if (currentNode.data < insertValue) {
        if (currentNode.right === null) {
          currentNode.right = new Node(insertValue);
          return;
        }
        return recursiveInsertNode(currentNode.right, insertValue);
      }
    }

    recursiveInsertNode(this.root, value);
    this.updateArray(value);
  }

  updateArray(val) {
    this.array.push(val);
    let i = this.array.length - 1;
    let item = this.array[i];
    while (i > 0 && item < this.array[i - 1]) {
      this.array[i] = this.array[i - 1];
      i -= 1;
    }
    this.array[i] = item;
  }

  delete(value) {
    if (this.array.indexOf(value) === -1) return null;
    function recursiveRemoveNode(currentNode, removeValue) {
      if (currentNode === null) {
        return currentNode;
      }
      if (currentNode.data > removeValue) {
        currentNode.left = recursiveRemoveNode(currentNode.left, removeValue);
      } else if (currentNode.data < removeValue) {
        currentNode.right = recursiveRemoveNode(currentNode.right, removeValue);
      } else {
        if (currentNode.left === null) return currentNode.right;

        if (currentNode.right === null) return currentNode.left;

        let succ = this.getSuccessor(currentNode);
        currentNode.data = succ.data;
        currentNode.right = recursiveRemoveNode(currentNode.right, succ.data);
      }
      return currentNode;
    }
    this.array.splice(this.array.indexOf(value), 1);
    return recursiveRemoveNode(this.root, value);
  }

  getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
    if (this.array.indexOf(value) === -1) return null;
    function recursiveFind(currentNode, Value) {
      if (currentNode === null) {
        return currentNode;
      }
      if (currentNode.data > Value) {
        return recursiveFind(currentNode.left, Value);
      } else if (currentNode.data < Value) {
        return recursiveFind(currentNode.right, Value);
      } else {
        return currentNode;
      }
    }

    return recursiveFind(this.root, value);
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let ok = new Tree(ar);
prettyPrint(ok.root);
prettyPrint(ok.delete(10));
console.log(ok.find(1));
