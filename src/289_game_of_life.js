const dirs = [
  [-1, 0], // top
  [-1, 1], // top right
  [0, 1], // right
  [1, 1], // bottom right
  [1, 0], // bottom
  [1, -1], // bottom left
  [0, -1], // left
  [-1, -1], // top left
];

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const gameOfLife = function (board) {
  const new_board = board.map(arr => arr.slice(0));

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const live = find_live_neighbours(board, i, j);

      if (board[i][j] === 1) {
        if (live <= 1) new_board[i][j] = 0;
        else if (live <= 3) new_board[i][j] = 1;
        else new_board[i][j] = 0;
      } else {
        if (live === 3) new_board[i][j] = 1;
        else new_board[i][j] = 0;
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      board[i][j] = new_board[i][j];
    }
  }
};

const find_live_neighbours = (board, i, j) => {
  let live = 0;

  for (const [di, dj] of dirs) {
    const ni = i + di;
    const row = board[ni];
    if (row) {
      const nj = j + dj;
      if (row[nj] === 1) live += 1;
    }
    if (live > 3) break;
  }

  return live;
};

// save some space
const gameOfLife2 = function (board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const live = find_live_neighbours2(board, i, j);
      if (board[i][j] === 1) {
        if (live < 2 || live > 3) board[i][j] = [1, 0];
      } else {
        if (live === 3) board[i][j] = [0, 1];
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (Array.isArray(board[i][j])) {
        board[i][j] = board[i][j][1];
      }
    }
  }
};

const find_live_neighbours2 = (board, i, j) => {
  let live = 0;

  for (const [di, dj] of dirs) {
    const row = board[i + di];
    if (row) {
      const val = row[j + dj];
      if (val !== undefined) {
        const state = Array.isArray(val) ? val[0] : val;
        if (state === 1) live += 1;
      }
    }
    if (live > 3) break;
  }

  return live;
};

// save even more space
const gameOfLife3 = function (board) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      const live = find_live_neighbours3(board, i, j);
      if (board[i][j] === 1) {
        if (live < 2 || live > 3) board[i][j] = 'B';
      } else {
        if (live === 3) board[i][j] = 'A';
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] === 'A') board[i][j] = 1;
      if (board[i][j] === 'B') board[i][j] = 0;
    }
  }
};

const find_live_neighbours3 = (board, i, j) => {
  let live = 0;

  for (const [di, dj] of dirs) {
    const row = board[i + di];
    if (row) {
      const val = row[j + dj];
      if (val === 1 || val === 'B') live += 1;
    }
    if (live > 3) break;
  }

  return live;
};

const run = (logger) => {
  const g = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]];
  console.log('board in start state', g);
  gameOfLife3(g);
  console.log('board in next state', g);
};

// run();

export default run;
