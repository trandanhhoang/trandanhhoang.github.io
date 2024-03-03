# Đọc file csv

## Tóm tắt:
- Nhận data từ file csv, call thông qua postman

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