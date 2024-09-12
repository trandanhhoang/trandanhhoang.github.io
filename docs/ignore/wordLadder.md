

# Word ladder

## Code in java
```java
public static int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // build map
        wordList.add(beginWord);
        Map<String, List<String>> map = new HashMap<>();
        for (String word : wordList) {
            for (int i = 0; i < word.length(); i++) {
                String pattern = word.substring(0, i) + "*" + word.substring(i + 1, word.length());
                if (map.containsKey(pattern)) {
                    map.get(pattern).add(word);
                } else {
                    List<String> listWord = new ArrayList<>();
                    listWord.add(word);
                    map.put(pattern, listWord);
                }
            }
        }
        // solve by BFS
        Queue<String> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        queue.offer(beginWord);
        visited.add(beginWord);

        int res = 1;
//        red -> ted->tex->tax
        while (!queue.isEmpty()) {
            int sizeQueue = queue.size();
            for (int indexQueue = 0; indexQueue < sizeQueue; indexQueue++) {
                String word = queue.poll();
                if (word.equals(endWord)) {
                    return res;
                }

                for (int i = 0; i < word.length(); i++) {
                    String patternFromWord = word.substring(0, i) + "*" + word.substring(i + 1, word.length());
                    for (String newWord : map.get(patternFromWord)) {
                        if (!visited.contains(newWord)) {
                            queue.offer(newWord);
                            visited.add(newWord);
                        }
                    }
                }
            }
            res++;
        }

        return 0;
    }
```

## Analysis complexity of alogrithm 
