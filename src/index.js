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

    function resursiveBuildTree(array, start, end) {}
  }
}
