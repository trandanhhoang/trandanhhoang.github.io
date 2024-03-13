## 4 tính chất của OOP

- **Tính bao đóng (Encapsulation)**
    - Mục đích: che giấu thông tin, thể hiện bằng **access modifier → private, get, set**. Ngoài ra, các lớp liên quan tới nhau được gom chung lại thành **package**.
- **Tính kế thừa (Inheritance)**
    - Mục đích: Kế thừa những thuộc tính hay hành vi từ lớp cha xuống lớp con. Có thể mở rộng các đặc tính đó hay thay đổi các hành vi.
- **Tính trừu trượng (Abstraction)**
    - Mục đích: trừu tượng hóa đối tượng từ phức tạp thành đơn giản. Kiểu như 1 sinh viên thì chỉ cần quan tâm tới tên, mssv và điểm của họ. Không cần biết cân nặng, chiều cao, chúng ta sẽ lược bỏ nó.
- **Tính đa hình (Polymorphism)**
    - the same method have different implementation
    - Cùng 1 phương thức có thể được thực hiện theo nhiều cách khác nhau gọi là tính đa hình.
    - Dùng overloading: để có 1 phương thức, nhưng tham số khác nhau → hành động khác nhau.
    - Dùng overriding: con sẽ ghi đè lại phương thức của cha.