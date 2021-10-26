/**
 * @param {number[][]} grid
 * @return {number}
 */
export const uniquePathsWithObstacles = (grid) => {
  const rows = grid.length;
  const cols = grid[0].length;

  const last = grid[rows - 1][cols - 1];
  const first = grid[0][0];
  if (last === 1) return 0;
  if (first === 1) return 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) grid[i][j] = 0;
      if (grid[i][j] === 1) grid[i][j] = 'X';
    }
  }

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (i === 0 && j === 0) {
        if (grid[i][j] !== 'X') grid[i][j] = 1;
      } else if (i === 0) {
        // filling first row
        if (grid[i][j] !== 'X') {
          grid[i][j] = grid[i][j - 1] === 'X' ? 0 : grid[i][j - 1];
        }
      } else if (j === 0) {
        if (grid[i][j] !== 'X') {
          grid[i][j] = grid[i - 1][j] === 'X' ? 0 : grid[i - 1][j];
        }
      } else {
        if (grid[i][j] === 'X') continue;
        else {
          const prev_row = grid[i][j - 1] === 'X' ? 0 : grid[i][j - 1];
          const prev_col = grid[i - 1][j] === 'X' ? 0 : grid[i - 1][j];
          grid[i][j] = prev_row + prev_col;
        }
      }
    }
  }
  return grid[rows - 1][cols - 1];
};

const uniquePathsWithObstacles2 = (grid) => {
  const first = grid[0][0];
  if (first === 1) return 0;

  const rows = grid.length;
  const cols = grid[0].length;
  const last = grid[rows - 1][cols - 1];
  if (last === 1) return 0;

  const moves = rows + cols - 2;
  const move = next_move(grid, rows, cols);

  let pos = [{ i: 0, j: 0 }];
  for (let m = 0; m < moves; m++) {
    const new_pos = [];
    pos.forEach(p => {
      new_pos.push(...move(p));
    });
    pos = new_pos;
    if (pos.length === 0) return 0;
  }
  return pos.length;
};

const next_move = (grid, rows, cols) => ({ i, j }) => {
  const new_pos = [];
  if (i < rows - 1) {
    if (grid[i + 1][j] === 0) new_pos.push({ i: i + 1, j });
  }
  if (j < cols - 1) {
    if (grid[i][j + 1] === 0) new_pos.push({ i, j: j + 1 });
  }
  console.log(i, j, new_pos);
  return new_pos;
};

const obstacles = [[[0, 1, 0, 0, 0], [1, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]];
const result = uniquePathsWithObstacles2(obstacles);
console.log('result --> ', result);
