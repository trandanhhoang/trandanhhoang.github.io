
# Longest Substring Without Repeating Character

## Code in java
```java
public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")==3);
        System.out.println(lengthOfLongestSubstring("bbbbb")==1);
        System.out.println(lengthOfLongestSubstring("pwwkew")==3);
        System.out.println(lengthOfLongestSubstring("")==0);
        System.out.println(lengthOfLongestSubstring(" ")==1);
        System.out.println(lengthOfLongestSubstring("au")==2);
        System.out.println(lengthOfLongestSubstring("dvdf")==3);
        System.out.println(lengthOfLongestSubstring("tmmzuxt")==5);
        System.out.println(lengthOfLongestSubstring("aabaab!bb")==3);
    }

    public static int lengthOfLongestSubstring(String s) {
        int left = 0;
        Map<Character, Integer> map = new HashMap<>();

        int max = 0;
        int res = 0;

        for (int right = 0; right < s.length(); right++) {
            if (!map.containsKey(s.charAt(right))) {
                map.put(s.charAt(right), right);
                res++;
            } else {
                int oldIndex = map.get(s.charAt(right));
                if (left <= oldIndex && oldIndex <= right) {
                    left = map.get(s.charAt(right)) + 1;
                    map.put(s.charAt(right),right);
                    max = Math.max(max, res);
                    res = right-left+1;
                }else{
                    map.put(s.charAt(right),right);
                    res++;
                }
            }
        }
        max = Math.max(max,res);
        return max;
    }
```

## Analysis complexity of algorithm.
Time: O(n)