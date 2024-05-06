---
sidebar_position: 1
---

# Heap
- 

## Code in java
```java
    public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(2, 4, 3, 5, 1);

        buildHeap(integers);
    }

    private static void buildHeap(List<Integer> integers) {
        for (int i = integers.size() / 2-1; i >= 0; i--) {
            heapDown(integers, i);
        }
        System.out.println(integers);
    }

    private static int getLeft(int i) {
        return i * 2 + 1;
    }

    private static int getRight(int i) {
        return i * 2 + 2;
    }

    private static void heapDown(List<Integer> integers, int i) {
        int size = integers.size();
        int largest = i;
        int left = getLeft(i);
        int right = getRight(i);
        if (left < size && integers.get(left) > integers.get(largest)) {
            largest = left;
        }
        if (right < size && integers.get(right) > integers.get(largest)) {
            largest = right;
        }
        if (largest != i) {
            swap(integers, largest, i);
            heapDown(integers, largest);
        }
    }

    private static void swap(List<Integer> integers, int left, int right) {
        int temp = integers.get(left);
        integers.set(left, integers.get(right));
        integers.set(right, temp);
    }
```

## Complexity and Analysis the time complexity of average case