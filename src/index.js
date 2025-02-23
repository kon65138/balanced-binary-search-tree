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
    this.root = this.buildTree(this.array);
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
    function recursiveInsertNode(currentNode, insertValue) {
      if (currentNode === null) return new Node(insertValue);
      if (currentNode.data === insertValue) throw new Error('no duplicates');
      if (value < currentNode.data) {
        currentNode.left = recursiveInsertNode(currentNode.left, insertValue);
      } else if (value > currentNode.data) {
        currentNode.right = recursiveInsertNode(currentNode.right, insertValue);
      }
      return currentNode;
    }

    this.root = recursiveInsertNode(this.root, value);
  }

  delete(value) {
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
    this.root = recursiveRemoveNode(this.root, value);
  }

  getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  find(value) {
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

  levelOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('level order must be called with a fucntion');
    }
    if (this.root === null) return;
    let queue = [];
    queue.push(this.root);
    this.root = queue[0];
    while (queue.length > 0) {
      let currentNode = queue[0];
      callback(currentNode);
      if (currentNode.left !== null) queue.push(currentNode.left);
      if (currentNode.right !== null) queue.push(currentNode.right);
      queue.shift();
    }
  }

  preOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('level order must be called with a fucntion');
    }
    if (this.root === null) return;
    function recPreOrderTraversal(currentNode, callback) {
      callback(currentNode);
      if (currentNode.left !== null) {
        recPreOrderTraversal(currentNode.left, callback);
      }
      if (currentNode.right !== null) {
        recPreOrderTraversal(currentNode.right, callback);
      }

      return currentNode;
    }

    this.root = recPreOrderTraversal(this.root, callback);
  }

  inOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('level order must be called with a fucntion');
    }
    if (this.root === null) return;
    function recInOrderTraversal(currentNode, callback) {
      if (currentNode.left !== null) {
        recInOrderTraversal(currentNode.left, callback);
      }
      callback(currentNode);
      if (currentNode.right !== null) {
        recInOrderTraversal(currentNode.right, callback);
      }
      return currentNode;
    }

    this.root = recInOrderTraversal(this.root, callback);
  }

  postOrder(callback) {
    if (typeof callback !== 'function') {
      throw new Error('level order must be called with a fucntion');
    }
    if (this.root === null) return;
    function recPostOrderTraversal(currentNode, callback) {
      if (currentNode.left !== null) {
        recPostOrderTraversal(currentNode.left, callback);
      }
      if (currentNode.right !== null) {
        recPostOrderTraversal(currentNode.right, callback);
      }
      callback(currentNode);
      return currentNode;
    }

    this.root = recPostOrderTraversal(this.root, callback);
  }

  height(node) {
    if (node === null) return -1;
    let leafHeight = 0;
    function recDepthTraversal(currentNode, height = 0) {
      if (currentNode.left !== null) {
        recDepthTraversal(currentNode.left, (height += 1));
        height -= 1;
      }
      if (currentNode.right !== null) {
        recDepthTraversal(currentNode.right, (height += 1));
        height -= 1;
      }

      if (height > leafHeight) leafHeight = height;
      return;
    }

    recDepthTraversal(node);
    return leafHeight;
  }

  isBalanced() {
    function recDepthTraversal(currentNode, callback) {
      let leftHeight = callback(currentNode.left);
      let rightHeight = callback(currentNode.right);

      if (rightHeight > leftHeight) {
        if (rightHeight - leftHeight > 1) {
          return false;
        }
      } else {
        if (leftHeight - rightHeight > 1) {
          return false;
        }
      }
      if (currentNode.left !== null) {
        if (recDepthTraversal(currentNode.left, callback) === false) {
          return false;
        }
      }
      if (currentNode.right !== null) {
        if (recDepthTraversal(currentNode.right, callback) === false) {
          return false;
        }
      }
      return true;
    }

    return recDepthTraversal(this.root, this.height);
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

function timesTwo(node) {
  return (node.data *= 2);
}

let ok = new Tree(ar);
console.log('this is default');
prettyPrint(ok.root);

ok.delete(10);
console.log('this is after delteing 10');
prettyPrint(ok.root);

console.log(ok.find(1), 'ok.find(1) return');
console.log('after finding 1');
prettyPrint(ok.root);
ok.levelOrder(timesTwo);
console.log('after leveorder times two');
prettyPrint(ok.root);
ok.insert(11);
console.log('after inserting 10');
prettyPrint(ok.root);
ok.preOrder(timesTwo);
console.log('after timesTwo preOrder');
prettyPrint(ok.root);
ok.inOrder(timesTwo);
console.log('after timesTwo inOrder');
prettyPrint(ok.root);
ok.postOrder(timesTwo);
console.log('after timesTwo postOrder');
prettyPrint(ok.root);
ok.insert(13);
ok.insert(12);
prettyPrint(ok.root);
console.log(ok.isBalanced());
ok.delete(12);
ok.insert(17);
ok.insert(18);
prettyPrint(ok.root);
console.log(ok.isBalanced());
console.log(ok.height(ok.root));
