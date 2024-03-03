
# Longest Increasing Subsequence.
- https://leetcode.com/problems/longest-increasing-subsequence/description/

## Code in java
```java
public int lengthOfLIS(int[] nums) {
    int[] dp = new int[nums.length];
    Arrays.fill(dp,1);
    for (int j = nums.length-2; j >= 0; j--) {
        for (int i = j+1; i < nums.length; i++) {
            if(nums[i] > nums[j])
                dp[j] = Math.max(dp[j],dp[i]+1);
        }
    }

    return Arrays.stream(dp).max().getAsInt();   
}
```