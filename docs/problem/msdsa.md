

# Max Sum Distinct Sub Array

## Code in java
```java
public static void main(String[] args) {

        System.out.println(maximumSubarraySum(new int[]{1, 5, 4, 2, 9, 9, 9}, 3) == 15);
        System.out.println(maximumSubarraySum(new int[]{9, 9, 9, 2, 9, 9, 9}, 3) == 0);
        System.out.println(maximumSubarraySum(new int[]{1, 2, 2}, 2) == 3);
        System.out.println(maximumSubarraySum(new int[]{1, 1, 1, 7, 8, 9}, 3) == 24);
        System.out.println(maximumSubarraySum(new int[]{1, 3, 3, 3, 3, 2, 1, 3, 1, 1, 2}, 3) == 6);

    }

    public static long maximumSubarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        long res = 0;
        int left = 0;
        long max = 0;

        for (int right = 0; right < nums.length; right++) {
            if (map.containsKey(nums[right])) {
                if (left <= map.get(nums[right]) && map.get(nums[right]) < right) {
                    int oldLeft = left;
                    left = map.get(nums[right]) + 1;
                    for (int i = oldLeft; i < left; i++) {
                        res -= nums[i];
                    }
                }
            }

            if (right - left == k) {
                res -= nums[left];
                left++;
            }
            res += nums[right];
            map.put(nums[right], right);
            if (right - left + 1 == k) {
                max = Math.max(max, res);
            }
        }

        return max;
    }
```