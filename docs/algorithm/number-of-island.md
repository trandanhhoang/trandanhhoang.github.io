---
sidebar_position: 1
---

# Number of islands.
- We will learn some keyword, notation, statement in english to solve this problem.

## Link to problem 
https://leetcode.com/problems/number-of-islands/description/

## Solve with english
- We will use recursive depth first search to solve this problem
  - For each cell at i,j of grid have values = 1
    - we increase counter (the result, number of island) by one
    - we will use method sink() to update 4 direction of this islands from '1' to '0'.

## Code in java
```java
public static void main(String[] args) {
        char[][] grid = new char[][]{{'1', '1', '1', '1', '0'},
                {'1', '1', '0', '1', '0'},
                {'0', '0', '0', '0', '1'}};
        System.out.println(Arrays.deepToString(grid));
        System.out.println(numIslands(grid));
    }

    public static int[][] DIRECTION = {{-1, 0}, {0, -1}, {1, 0}, {0, 1}};

    public static int numIslands(char[][] grid) {
        int row = grid.length;
        int col = grid[0].length;

        int counter = 0;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (grid[i][j] == '1') {
                    counter++;
                    sink(grid, i, j);
                }
            }
        }

        return counter;
    }

    public static void sink(char[][] grid, int row, int col) {
        if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
            return;
        }
        if (grid[row][col] == '1') {
            for (int[] d : DIRECTION) {
                grid[row][col] = '0';
                sink(grid, row + d[0], col + d[1]);
            }
        }
    }
```

## Analysis complexity of the algorithm
- Time complexity is O(N) when N is the total cell of the grid.
- Space complexity is O(1), when we don't use any additional memory space.