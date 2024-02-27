# Back Server Configuration

## 개발 환경

- Framework : Nest.js
- Orm : TypeORM
- Database : MySQL

## 시작하기

### 환경변수 파일 생성

```
.env.local => 로컬 서버에서 실행 시
.env.development => 개발용 서버에서 실행 시
.env.production => 배포용 서버에서 실행 시
```

```
.env.*

DB_PASSWORD=DB 패스워드
DB_USERNAME=root
DB_HOST=localhost
DB_DATABASE=DB 이름
```

### 데이터베이스 설정

```
# 로컬 DB 생성
npm run db:create:local

# typeorm entities와 로컬 DB 동기화
npm run schema:sync:local

```

### 서버 실행

```
# 의존성 설치
npm install

# 로컬 서버 실행 (3005 포트)
npm run start:local
```
