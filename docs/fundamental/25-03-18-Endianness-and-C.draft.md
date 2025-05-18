# Endianness and C

## Little Endian và Big Endian
- Big-endian: Byte có trọng số cao (MSB - Most Significant Byte) được lưu ở địa chỉ thấp hơn.
  - Viết vào bộ nhớ từ trái qua phải (như cách mà ta viết số)
```text
mov eax, [num1]     ; Đọc số big-endian vào EAX
bswap eax           ; Đảo byte từ big-endian sang little-endian
mov ebx, [num2]     ; Đọc số thứ hai
bswap ebx           ; Đảo byte từ big-endian sang little-endian
add eax, ebx        ; Thực hiện phép cộng
bswap eax           ; Đảo byte lại để lưu kết quả dưới dạng big-endian
mov [result], eax   ; Lưu kết quả vào bộ nhớ
```

- Little-endian: Byte có trọng số thấp (LSB - Least Significant Byte) được lưu ở địa chỉ thấp hơn.
  - Viết vào bộ nhớ từ phải qua trái (cách ta tính toán từ phải qua trái)
  - Giúp việc tính toán nhanh hơn. Nếu có số nhớ (carry), nó được truyền tự nhiên lên byte tiếp theo mà không cần thao tác dịch dữ liệu.

```text
MOV EAX, [0x1000]  ; Load số đầu tiên vào thanh ghi
ADD EAX, [0x1004]  ; Cộng với số thứ hai
MOV [0x1008], EAX  ; Lưu kết quả vào bộ nhớ
```

## C

```c
#include <stdio.h>
#include <stdlib.h>

void
f(void)
{
    int a[4];
    int *b = malloc(16);
    int *c;
    int i;

    printf("1: a = %p, b = %p, c = %p\n", a, b, c);
    // 1: a = 0x7fff8a9a8220, b = 0x5f6ec83632a0, c = (nil)

    // Trong C, không có kiểm tra giới hạn mảng, a[5] vẫn sẽ lấy giá trị từ vùng nhớ gần đó, có thể là rác hoặc gây lỗi segmentation fault.

    c = a;
    for (i = 0; i < 4; i++)
	a[i] = 100 + i;
    c[0] = 200;
    printf("2: a[0] = %d, a[1] = %d, a[2] = %d, a[3] = %d\n",
	   a[0], a[1], a[2], a[3]);
    //    2: a[0] = 200, a[1] = 101, a[2] = 102, a[3] = 103

    c[1] = 300;
    *(c + 2) = 301;
    3[c] = 302;
    printf("3: a[0] = %d, a[1] = %d, a[2] = %d, a[3] = %d\n",
	   a[0], a[1], a[2], a[3]);
    // 3: a[0] = 200, a[1] = 300, a[2] = 301, a[3] = 302


    c = c + 1; // di chuyen int = 4 byte
    *c = 400;
    printf("4: a[0] = %d, a[1] = %d, a[2] = %d, a[3] = %d\n",
	   a[0], a[1], a[2], a[3]);
    // 4: a[0] = 200, a[1] = 400, a[2] = 301, a[3] = 302


    c = (int *) ((char *) c + 1); // di chuyen char = 1 byte
    *c = 500;
    printf("5: a[0] = %d, a[1] = %d, a[2] = %d, a[3] = %d\n",
	   a[0], a[1], a[2], a[3]);
    // 5: a[0] = 200, a[1] = 128144, a[2] = 256, a[3] = 302

    // Endianness come to play
    // little endianness for calculator
    // big endianness for read (network)

    b = (int *) a + 1;
    c = (int *) ((char *) a + 1);
    printf("6: a = %p, b = %p, c = %p\n", a, b, c);
    // 6: a = 0x7fff8a9a8220, b = 0x7fff8a9a8224, c = 0x7fff8a9a8221

int
main(int ac, char **av)
{
    f();
    return 0;
}
```

### Phân biệt phép khởi tạo (Initialization) và phép gán (Assignment)

- Phép khởi tạo (Initialization)

int x -> khởi tạo biến x
int *p = &x -> khởi tạo con trỏ p

- Phép gán (Assignment)
x = 10
p = &x -> gán giá trị cho con trỏ p  
print(p) -> in ra địa chỉ của biến x  
print(&p) -> in ra địa chỉ của con trỏ p
print(*p) = 10


### A few pointer common idioms are in particular worth remembering:
- If int *p = (int*)100, then (int)p + 1 and (int)(p + 1) are different numbers: the first is 101 but the second is 104. When adding an integer to a pointer, as in the second case, the integer is implicitly multiplied by the size of the object the pointer points to.  
- p[i] is defined to be the same as *(p+i), referring to the i'th object in the memory pointed to by p. The above rule for addition helps this definition work when the objects are larger than one byte.
- &p[i] is the same as (p+i), yielding the address of the i'th object in the memory pointed to by p.

```text
variable  |  address | value
x         |  0x0001  | 10
p         |  0xFF00  | 0x0001

p = 0x0001
*p = 10
&p = 0xFF00

```

