# Nghĩ về exception hierarchy

## Giới thiệu tổng quan

- Mình muốn suy nghĩ về exception hierarchy, nên xử lý thế nào để đơn giản nhất với mình, với service, với các dev maintain sau này.

- Shop có các Domain:
  - PaymentTeam
    - service Authn, service Payment.
  - IntegrateTeam
    - Service A, B, C
  - OrderTeam
    - Service O, P, Q

## Exeception trong nội bộ service 
- Bao gồm `BusinessException` và `SystemException`.
  - BusinessException bao gồm:
    - liên quan tới nghiệp vụ
    - liên quan tới validate data.
  - SystemException
    - liên quan tới library bên ngoài, database, redis, ...

- Cấu trúc của nó sẽ nhìn như thế này:
DomainServiceException (eg: AuthnException)
├── BusinessException
│     ├── ValidationException
│     ├── TransactionException
│     └── AccountNotFoundException
└── SystemException
        ├── DatabaseException
        ├── ServiceUnavailableException
        └── TimeoutException

- Trong đó:
  - Application layer biết 2 loại exception này
  - Controller layer chỉ biết duy nhất BusinessException
  - Infrastructure layer chỉ biết duy nhất SystemException

## Mã lỗi của nội bộ service (Authn), của 1 Domain (PaymentTeam), của cả hệ thống (Shop).
- Mỗi service nên có 1 bộ errorCode riêng, không trùng lặp với các service khác.
- Nên xây dựng như stack-trace của code.
- Khi user tạo 1 đơn hàng, mặc dù đi qua nhiều hệ thống, nhưng chúng ta cũng nên biết được lỗi ở service nào, domain nào (chậm chí chỉ cần service nào là được)
  - chúng ta có thể mapping thành các enum mà không lộ thông tin lỗi ra ngoài.

- Khi probagate về các layer trên, ngoài mã lỗi, cũng nên có kí hiệu để biết nó tới từ service nào, để biết được lỗi ở đâu.

## Vậy client là nơi xác định hay là server ?
- Nên là server, với góc nhìn chủ quan từ phía client
  - Đối với luồng sync, khi gọi từ http hay grpc, phía client chỉ dựa vào path thì rất khó xác định được name của server.
  - Đối với luồng async, consume message từ queue cũng không thể biết được lỗi tới từ đâu.
