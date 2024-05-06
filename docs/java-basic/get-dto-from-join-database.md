
# Get dto class from jpa after join table.

## Tóm tắt
- Hướng dẫn tạo class dto từ 2 bảng join với nhau thay vì nhận `List<Map<String,String>>` 

## reference
- https://thorben-janssen.com/spring-data-jpa-dto-native-queries/

## Code example
- Bước 1: tạo interface dto
```java
public interface LeadWithSessionDto {
    Long getId();
    String getCifNumber();
}
```
- Bước 2: tạo method trong repository, chú ý cần native query và định nghĩa alias camel case cho từng column 
```java
/*
    * 1. JPA can't map snake case with getter methods, so need to define alisa in camel case for each column.
    * 2. You need to use native query
    * */
    @Query(value = """
        SELECT
          lm.id,
          lm.cif_number as cifNumber
        FROM lead_managements lm
        INNER JOIN lead_sessions ls ON lm.id = ls.lead_id
        WHERE lm.product_id = :productId
            AND lm.cif_number = :cifNumber
        ORDER BY ls.updated_at DESC
        LIMIT 1
          """, nativeQuery = true)
    LeadWithSessionDto getCurrentLead(String productId, String cifNumber);
```