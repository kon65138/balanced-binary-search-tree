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

  addAndSort2(arr, val) {
    arr.push(val);
    let i = arr.length - 1;
    let item = arr[i];
    while (i > 0 && item < arr[i - 1]) {
      arr[i] = arr[i - 1];
      i -= 1;
    }
    arr[i] = item;
    return arr;
  }

  buildTree(array) {
    let sortedArr = [];
    array.forEach((element) => {
      this.addAndSort2(sortedArr, element);
    });

    for (let i = 0; i < sortedArr.length; i++) {
      if (sortedArr[i] === sortedArr[i + 1]) {
        throw new Error('array cannot have duplicates');
      }
    }
    let start = 0;
    let end = sortedArr.length - 1;

    function recursiveBuildTree(array, start, end) {
      if (start > end) return null;

      let mid = start + Math.floor((end - start) / 2);

      let root = new Node(array[mid]);

      root.left = recursiveBuildTree(array, start, mid - 1);
      root.right = recursiveBuildTree(array, mid + 1, end);

      return root;
    }

    return recursiveBuildTree(sortedArr, start, end);
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
    if (node === null) return null;
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

  depth(node) {
    if (node === null) return null;
    function recursiveFind(currentNode, Value, depth = 0) {
      if (currentNode === null) {
        return currentNode;
      }
      if (currentNode.data > Value) {
        return recursiveFind(currentNode.left, Value, (depth += 1));
      } else if (currentNode.data < Value) {
        return recursiveFind(currentNode.right, Value, (depth += 1));
      } else {
        return depth;
      }
    }

    return recursiveFind(this.root, node.data);
  }

  isBalanced() {
    function recDepthTraversal(currentNode, callback) {
      let leftHeight = callback(currentNode.left);
      let rightHeight = callback(currentNode.right);

      if (leftHeight === null) leftHeight = -1;
      if (rightHeight === null) rightHeight = -1;

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

  rebalance() {
    let array = [];
    function addToArray(node) {
      array.push(node.data);
    }
    this.inOrder(addToArray);
    console.log(array);
    this.root = this.buildTree(array);
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

function randomNumArrayNoDuplicates(length = 16, numRange = 100) {
  let array = [];
  for (let i = 0; i < length; i++) {
    let num = Math.floor(Math.random() * numRange);
    if (!array.includes(num)) array.push(num);
  }
  return array;
}

function printElement(node) {
  console.log(node.data);
}

let ar = randomNumArrayNoDuplicates();

let ok = new Tree(ar);
prettyPrint(ok.root);
console.log(ok.isBalanced());
ok.insert(108);
prettyPrint(ok.root);
console.log(ok.isBalanced());
ok.rebalance();
prettyPrint(ok.root);
console.log(ok.isBalanced());
console.log('LEVEL ORDER BELOW');
ok.levelOrder(printElement);
console.log('PRE ORDER BELOW');
ok.preOrder(printElement);
console.log('IN ORDER BELOW');
ok.inOrder(printElement);
console.log('POST ORDER BELOW');
ok.postOrder(printElement);
