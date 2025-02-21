import { ro } from 'date-fns/locale';
import './style.css';

class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.tree = this.buildTree(array);
  }

  buildTree(array) {
    for (let i = 0; i < array.length; i++)
      if (array[i] === array[i + 1]) {
        throw new Error('array cannot have duplicates');
      }

    let start = array[0];
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

let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let ok = new Tree(ar);
prettyPrint(ok.tree);
