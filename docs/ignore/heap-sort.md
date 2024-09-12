
# Heap sort
- We will learn some keyword, notation, statement in english.
- Let say we have the following array `[2, 4, 3, 5, 1,6,7,8]`, and we want it sorted in increasing order.
- First we need to build a max heap, then we swap the root with the last index of list, we decrease the size of the rest list by one, then we heap down the rest of the tree.
  - Loop process above again, swap the root with the last index of list, ... until the array just exist 1 element.
  - We will have the list is sorted

## Code in java
```java
public static void main(String[] args) {
        List<Integer> integers = Arrays.asList(2, 4, 3, 5, 1,6,7,8);

        buildHeap(integers);
        heapSort(integers);

        System.out.println(integers);
    }

    private static void heapSort(List<Integer> integers) {
        for (int i = integers.size() - 1; i >=1; i--) {
            swap(integers, 0, i);
            heapDown(integers,i,0);
        }
    }

    private static void buildHeap(List<Integer> integers) {
        for (int i = integers.size() / 2 - 1; i >= 0; i--) {
            heapDown(integers,integers.size(), i);
        }
    }

    private static int getLeft(int i) {
        return i * 2 + 1;
    }

    private static int getRight(int i) {
        return i * 2 + 2;
    }

    private static void heapDown(List<Integer> integers,int size, int i) {
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
            heapDown(integers,size, largest);
        }
    }

    private static void swap(List<Integer> integers, int left, int right) {
        int temp = integers.get(left);
        integers.set(left, integers.get(right));
        integers.set(right, temp);
    }
```