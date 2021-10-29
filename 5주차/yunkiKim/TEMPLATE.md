# 5주차 React 스터디 정리

| 장   | 제목                                 |
| ---- | ------------------------------------ |
| 13장 | 리액트 라우터로 SPA 개발하기         |
| 14장 | 외부 API를 연동하여 뉴스 뷰어 만들기 |

## 13장

### 13.1 SPA란?

### 13.2 프로젝트 준비 및 기본적인 사용법

### 13.3 Route 하나에 여러 개의 path 설정하기
react-router-dom에서 Link 컴포넌트를 사용해 클라이언트의 path를 바꾼 후 새로고침을 하면 에러가 발생한다  \

### 13.4 URL 파라미터와 쿼리
쿼리: useLocation().search로 접근(qs로 파싱 필요)  
파라미터: useParams().paramName으로 접근 가능(paramName은 본인이 지정한 이름)  

### 13.5 서브 라우트

### 13.6 리액트 라우터 부가 기능
Location, History객체는 props로 받을 필요 없기 useLocation, useHistory로 접근이 가능하다.  
History 객체는 mutable이다
### 13.7 정리
(3장 정리)[https://iskull-dev.tistory.com/152?category=947081]
## 14장

### 14.1 비동기 작업의 이해

### 14.2 axios로 API 호출해서 데이터 받아 오기

### 14.3 newsapi API 키 발급받기

### 14.4 뉴스 뷰어 UI 만들기
(14장 정리)[https://iskull-dev.tistory.com/152?category=947081]  
뉴스 api 호출 횟수가 제한된 관계로 카카오 api로 대체  
(14장 프로젝트)[https://github.com/skullkim/recommend-books-react]   
(axios interceptor)[https://www.bezkoder.com/axios-interceptors-refresh-token/]
---

질문, 이해가 안 갔던 것, 궁금한 것, 스터디장이나 다른 사람들에게 물어보고 싶은 것, 기타 등등이 있으시면 써주시고, 이 문구는 지워주세요!
