---
sidebar_position: 1
---

# Two sum
- We will learn some keyword, notation, statement in english to solve this problem.

## Link to problem 
- https://leetcode.com/problems/two-sum/

## Solve with english
- First, we can solve it use brutal force approach. 
  - we perform a for loop, with each element x
    - we perform another for loop to find y, where x plus y equal TARGET.
  - this approach will cost O(N^2) time complexity. (where N is the length of the input array)
- We will optimize it by using HashMap
  - we create a hashmap, key is the value at index (we call it element now), and value is the index of it in list. 
  - we perform a for loop, with each element x = nums[i], we find in map that key is 'target minus x'
    - if it have, we return the result is 2 indices
    - if not, we save it in map and continue the for loop until we find out.
  - Now, time complexity is O(N).
## Code in java
```java
public static int[] twoSum(int[] nums, int target){
  Map<Integer, Integer> map = new HashMap<>();

  for (int i = 0; i < nums.length;i++){
    if (map.containsKey(target - nums[i])) {
      return new int[]{i, map.get(target - nums[i])};
    }
    map.put(nums[i],i);
  }
  return new int[]{};
}
```

## Analysis complexity of the algorithm
- Time complexity is O(N) when we iterate the list N elements
- Space complexity is O(N) because we create a map with N key-value.