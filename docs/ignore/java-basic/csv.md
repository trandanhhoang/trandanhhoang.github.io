---
sidebar_position: 5
---

# Đọc file csv

## Tóm tắt:
- Nhận data từ file csv (có thể call thông qua postman)
- Code example xử lý blocking hoặc non blocking

## Code example
- blocking world
```java
    @PostMapping("/upload")
    public void uploadFromCsv(@RequestParam("file") MultipartFile file) {
        getDataFromCsv(file.getInputStream());
    }
```

- Reactor project
```java
    @PostMapping("/upload")
    public Mono<ResponseApi<String>> uploadFromCsv(FilePart file) {
        return file.content()
                .map(
                        dataBuffer -> {
                            getDataFromCsv(dataBuffer.asInputStream());
                            return "Success";
                        })
                .then(Mono.just(ResponseApi.success(new ResponseStatus(STATUS_SUCCESS, ""), "Success")))
                .onErrorResume(
                        e -> Mono.just(ResponseApi.error("ERROR WHEN UPLOAD CSV FILE", e.getMessage())));
    }
```

```java
public void getDataFromCsv(InputStream is) {
        try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                CSVParser csvParser =
                        new CSVParser(
                                fileReader,
                                CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim()); ) {

            List<Application> applications = new ArrayList<>();
            List<OriginationInfo> originationInfos = new ArrayList<>();

            Iterable<CSVRecord> csvRecords = csvParser.getRecords();

            for (CSVRecord csvRecord : csvRecords) {
                String data = csvRecord.get("data");
            }
            
        } catch (IOException e) {
            throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
        }
    }
```

- Library
```java
package com.example.csvhandlerecords;

import com.google.common.collect.Iterators;
import com.opencsv.CSVReader;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
@Service
public class CSVService {

  public void save(MultipartFile file) {
    try {
      BufferedReader fileReader =
              new BufferedReader(
                      new InputStreamReader(
                              file.getInputStream(),
                              StandardCharsets.UTF_8));
      CSVReader csvReader = new CSVReader(fileReader);
      HeaderColumnNameMappingStrategy<SinhVien> strategy =
              new HeaderColumnNameMappingStrategy<>();
      strategy.setType(SinhVien.class);
      CsvToBeanBuilder<SinhVien> onboardingDtoCsvToBeanBuilder =
              new CsvToBeanBuilder<SinhVien>(csvReader)
                      .withType(SinhVien.class)
                      .withMappingStrategy(strategy)
                      .withSeparator(',')
                      .withIgnoreLeadingWhiteSpace(true)
                      .withIgnoreEmptyLine(true);

      CsvToBean<SinhVien> datas = onboardingDtoCsvToBeanBuilder.build();
      Iterators.partition(datas.stream().iterator(), 100)
              .forEachRemaining(
                      onboardingDtoList -> {
                        try {
                          onboardingDtoList.forEach(
                                  onboardingDto -> {
                                      System.out.println(onboardingDto);
                                      System.out.println(onboardingDto);
                                  });
                        } catch (Exception ex) {
                            System.out.println();
                        }
                      });
    } catch (IOException e) {
      throw new RuntimeException("fail to store csv data: " + e.getMessage());
    }
  }
}

```