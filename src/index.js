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
  constructor(array) {}

  buildTree(array) {
    for (let i = 0; i < array.length; i++)
      if (array[i] === array[i + 1])
        throw new Error('array cannot have duplicates');

    function recursiveBuildTree(array, start, end) {
      if (start > end) return null;

      let mid = Math.floor((end - start) / 2);

      let root = new Node(array[mid]);

      root.left = recursiveBuildTree(array, start, array[mid] - 1);
      root.right = recursiveBuildTree(array, array[mid] + 1, end);

      return root;
    }
  }
}
