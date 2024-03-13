# Set up local stack with docker-compose

## Tóm tắt
- localstack aws s3
- springboot java

## ref
- https://github.com/localstack/localstack
- https://mmarcosab.medium.com/how-about-s3-bucket-and-localstack-b0816bab452a
- https://github.com/mmarcosab/s3-example

## Github
- https://github.com/trandanhhoang/aws-local-stack

## How to run
- Download aws cli
  - https://aws.amazon.com/vi/cli/

- Set up config
```
$ aws configure
$ accesskey
$ secretkey
$ us-east-1
$ None
```

- Add bucket
  - aws --endpoint-url=http://127.0.0.1:4566 s3api create-bucket --bucket bucket-example
- Upload file
  - aws --endpoint-url=http://localhost:4566 s3 cp hoang.jpg s3://bucket-example
- Check list file in bucket
  - aws --endpoint-url=http://localhost:4566 s3 ls s3://bucket-example/

