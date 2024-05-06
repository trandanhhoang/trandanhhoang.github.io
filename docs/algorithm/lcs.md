


# Longest common subsequence
- https://leetcode.com/problems/longest-common-subsequence/description/

## Code in java
```java
public static int longestCommonSubsequence(String text1, String text2) {
    int row = text1.length();
    int col = text2.length();
    int[][] dp = new int[row+1][col+1];
    for (int r = 1; r <= row; r++) {
        for (int c = 1; c <= col; c++) {
            if (text1.charAt(r-1) == text2.charAt(c-1)) {
                dp[r][c] = dp[r-1][c-1]+1;
            } else {
                dp[r][c] = Math.max(dp[r-1][c],dp[r][c-1]);
            }
        }
    }
    return dp[row][col];
}
```

## Analysis the complexity of problem
- Time complexity is 