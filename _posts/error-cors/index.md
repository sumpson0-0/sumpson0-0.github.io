---
title: 'CORS 에러와 이별하기'
date: 2021-02-25
tags:
  - Error
  - CORS
---

CORS에 대해 알기 위해서는 동일 출처 정책(SOP)을 알고 넘어가야 한다.  
이게 뭔가 싶어도 조금만 더 글을 읽어보자.

# 동일 출처 정책(SOP)과 CORS

<br />


우리가 `<script>`내에서 보내는 HTTP 요청(XMLHttpRequest와 Fetch API 등)은 **서로의 출처가 동일한 경우에만 리소스 공유를 허용하는 정책**을 따른다. 

이를 **동일 출처 정책(Same-Origin-Policy)**이라고 부르는데, 이 정책을 따름으로써 잠재적으로 해로울 수 있는 문서를 분리하여 공격받을 수 있는 경로를 줄일 수 있게 되는 것이다.

<br />


여기서 말하는 **동일한 출처**란, **두 URL의 프로토콜, 호스트, 포트**(명시한 경우)**가 모두 같은 경우**를 말한다.

아래의 예시를 통해 동일 출처 여부를 판별해보자.

| URL | 성공/실패 | 설명          |
| --------| -------| --------------|
| <span style="color:blue">http://store.company.com</span>/dir2/other.html| 성공      |  경로만 다름 |
| <span style="color:blue">http://store.company.com</span>/dir/inner/another.html  | 성공     |  경로만 다름 |
|  <span style="color:red">https</span>://store.company.com/secure.html   | 실패      | 프로토콜 다름|
| http://<span style="color:red">news.company.com</span> /dir/other.html | 실패     |호스트다름 |
| http://store.company.com:<span style="color:red">81</span>/dir/etc.html  | 실패     |포트 다름 (80이 기본) |

그렇다면 **다른 출처의 리소스를 가져올 수 있는 방법**은 없을까?

<br/>

웹에서는 동일 출처 정책을 우선시하지만 **출처가 달라도 특정 조항을 지켰을 경우 리소스 공유가 가능**하도록 하는데, 그중 하나가 바로 **CORS**다. 

즉, **동일 출처 정책을 벗어난 URL에서 리소스 공유를 요청해도 CORS 정책을 지킨 응답을 반환받기만 한다면 리소스 공유가 가능**하다는 것이다.

<br />

# CORS 정책을 지킨 응답을 얻는 방법

<br />

프론트엔드 단에서 개발을 하다 보면 한 번쯤 마주하게 되는 다음의 에러(🤦🏻‍♀️)는 두 URL의 출처가 다른 상태에서 CORS 정책까지 위반했을 경우 나타나는 것이다. 

> 🚨<span style="color:red">Access to XMLHttpRequest at 'Request URL' from origin 'Origin' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.</span> 🚨

<br />

이제 이 **지긋지긋한 CORS 에러와 이별할 수 있는 방법**을 알아보자.🤚🏻🤚🏻

<br />

## 서버에서 해결하는 방법(근본적인 해결책)

<br />

### 1. 서버측에서 응답 헤더에 'Access-Control-Allow-Origin'을 설정한다.

<br />

서버는 ‘Access-Control-Allow-Origin’에 허용할 출처(origin)를 입력하고 이를 응답 헤더에 넣음으로써 CORS 정책을 허용할 수 있도록 한다.

 **‘Access-Control-Allow-Origin’**은 **CORS 정책에 허용할 출처를 명시하는 헤더**이다. 리소스 접근을 허용할 특정 출처를 입력하거나 (*)를 사용하여 모든 출처를 허용할 수 있다. 

이후 서버에서 ‘Access-Control-Allow-Origin’를 담은 응답 헤더를 브라우저로 반환하면, 브라우저는 응답 헤더에 있는 ‘Access-Control-Allow-Origin’과 자신이 요청 시 보냈던 'Origin'을 비교해 이 응답이 유효한지 판별한다. 유효하다고 판별했을 경우 CORS 에러 없이 성공적으로 리소스를 공유 받을 수 있다. 

여기서 우리는 **CORS 정책의 위반 여부를 판단하는 것은 서버가 아닌 브라우저**라는 중요한 사실을 알 수 있다.

백엔드 개발자와 작업을 하는 경우라면  ‘Access-Control-Allow-Origin’ 설정을 요청하면 되지만, 제공되는 API를 사용하여 개발하는 (본인 같은) 경우에는 서버 측에 '내 Origin도 Access-Control-Allow-Origin에 넣어주세요.' 할 수 없어 당장 사용할 수 없는 방법이었다.😅

<br/>

## 프론트엔드에서 해결하는 방법

사실상 프론트엔드 개발자들이 CORS 에러를 가장 많이 마주할 것이라고 생각한다. (실제로도 그렇다고.)  그렇다면 서버 측에 직접 요청이 불가할 불가할 경우 (본인 포함) 프론트엔드 측에서 쓸 수 있는 해결책에는 어떤 것들이 있을까.

<br/>

### 1. 외부 요청을 가능하게 해주는 플러그인 설치.

<br/>

**크롬**의 경우 응답 헤더에  **Access-Control-Allow-Origin' : * 를 설정해 주는 확장 프로그램이 존재**한다. 이를 설치하여 사용하면 해당 플러그인이 설치된 크롬 브라우저에 한해서 CORS 에러 없이 리소스를 공유 받을 수 있다.


구글에 CORS 플러그인을 치면 다양한 것들이 나오니 원하는 것으로 사용하자.

(본인은 Moesif CORS를 사용해본 경험이 있다.)

<br/>

**문제점**

- 해당 플러그인이 설치된 크롬 브라우저에 한해서만 리소스 공유 가능한 **임시 방편**이다.

<br/>

### 2. Proxy 설정

<br/>

Proxy는 '대리'라는 의미를 가지고 있는데, 여기서 Proxy는 클라이언트와 백엔드 서버의 중간 다리 역할을 한다.
클라이언트 입장에서 Proxy는 원격 서버처럼 동작하고, 백엔드 서버 입장에서 Proxy는 클라이언트처럼 동작한다고 인식하게 된다. 

<br/>

이전에는 클라이언트 측에서 백엔드 서버 측에 직접적으로 리소스 공유를 요청했다면, Proxy 설정 시 클라이언트에서 Proxy 서버를 통해 백엔드 서버로 요청을 보내게 된다. 이후 서버에서 다시 Proxy 서버를 거쳐 브라우저로 응답을 반환한다. **CORS 정책을 우회하여 리소스를 공유 받을 수 있는 것**이다.

![](screenshot.gif)
출처 : [https://en.wikipedia.org/wiki/Proxy_server](https://en.wikipedia.org/wiki/Proxy_server) 

<br/>

기본적으로 **Proxy를 설정하는 방법**은 **Webpack Dev Server 혹은 http-proxy-middleware를 사용**하는 것이다. (Webpack Dev Server 역시 내부적으로 http-proxy-middleware를 사용하여 백엔드 서버에 Proxy 한다고 하니, 둘 중 무엇을 사용해도 무방해 보인다.)

<br/>


두 가지 모두 매뉴얼에 방법이 잘 나와 있기에 부족한 설명 대신 링크를 첨부한다.

📎[Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)
📎[http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#options)

<br/>

**CRA(Create-React-App)를 이용해 만든 프로젝트의 경우**에는 **package.json에 "proxy"를 입력만 하면 간편하게 설정이 가능**하니 이를 활용하자. 

본인의 경우 CRA를 통해 프로젝트를 생성했기 때문에 package.json으로 설정을 진행했다.  
 (📎[create-react-app proxying](https://create-react-app.dev/docs/proxying-api-requests-in-development/))


<br/>

예) api url이 http://localhost:3000/api/recommend"인 경우 CRA Proxy 설정법
```javascript
// package.json
"proxy": "http://localhost:3000" //1. proxy에 Origin 입력

// api.js
fetch(/api/recommend); //2. url에서 Origin을 제외한 나머지 주소를 입력하여 요청
```

<br/>

**문제점**

- 중간단계가 있기 때문에 속도가 느려지는 단점이 있다.
- 로컬 개발 환경에서만 적용이 가능하다.

<br/>

**내가 직면한 문제**

로컬 환경에서 Proxy를 설정했을 때는 문제없이 작동하던 웹이, AWS S3로 배포를 진행하자 또다시 CORS 에러를 송출(🤦🏻‍♀️)하는 상황이 발생했다. 

<br/>

무엇이 문제였을까?

<br/>

Proxy를 통해 설정한 것은 개발 서버이기 때문에 배포 대상이 되는 환경에서는 사용할 수 없다. 배포 시 build를 하게 되면 단순 static 파일로 변환이 되기 때문이다.

<br/>

이를 해결하기 위해서는 배포할 서버에 별도로 웹서버를 구성해야 하고 필요에 따라서 Proxy 설정도 추가해 줘야 한다.

(여기서 막히는 바람에 1차 실패..🤦🏻‍♀️)

<br/>

### 3. 서버를 구축하여 서버간 통신으로 외부 API에 데이터 요청

<br/>

본인의 경우 로컬 환경에서 개발한 프로젝트를 포트폴리오 용으로 사용해야 했기 때문에 가급적이면 배포를 하고 싶었다. 그런데 위에서 언급한 대로 build된 환경에서는 proxy를 사용할 수 없어 또다시 CORS 에러를 보게 된 상황에 놓인 것이다.

<br/>

여기서 배포를 포기해야 하나 싶었지만 어딘가 돌파구가 있지 않겠냐는 마음으로 구글링을 하고 (또 하고..) 또 해서 서버에서 외부 API로 요청하는 방법이 있다는 사실을 알게 되었다.

<br/>

클라이언트-서버 간의 통신은 브라우저에서 CORS 정책을 확인하지만, 서버 간 통신은 브라우저가 개입하지 않는다. 즉, CORS 정책에 영향을 받지 않고 데이터를 받아올 수 있다.

<br/>

**백엔드 서버를 구축하여 서버 간 통신으로 리소스 공유를 받은 다음, 백엔드 서버의 응답 헤더에 'Access-Control-Allow-Origin'을 직접 설정한다. 그리고 클라이언트 측에서 백엔드 서버로 데이터를 요청하면 리소스를 공유 받을 수 있다.**

<br/>


(현재 서버를 구축하는 방법으로 CORS 해결을 시도하는 단계에 있다.🏃🏻‍♀️)

<br/>

# 글을 마치며

최근 프로젝트에서뿐 아니라 프론트엔드 개발을 시작하고 얼마 지나지 않았을 때부터 CORS 에러를 계속 봐왔다. 처음 CORS 에러에 직면했을 때는 개발을 시작한 지 얼마 지나지 않은 상태였기에 얼마나 당황스러웠는지 모른다. 당시 처음부터 CORS의 개념을 짚어가기엔 개발에 대한 지식이 많이 부족했기에 (지금도 부족하지만) 엄두가 나지 않아 우회할 수 있는 방법을 우선적으로 찾았던 것 같다.

<br/>

시간이 지나 처음보다 개발에 대한 시야가 넓어지게 되면서 CORS에 대해서 제대로 알아보고 싶다는 생각이 들어 이렇게 짚어보게 되었다. 아직 전부를 안다고 할 수는 없지만 CORS가 어떤 것이고 왜 이런 문제가 발생했는지 이해할 수 있어 유익한 시간이었다.

<br/>

지금 공부한 내용이 앞으로의 개발에 조금이나마 도움이 되길 바라며 글을 마친다.

<br/>

---
## 참조

[동일 출처 정책 - MDN](https://developer.mozilla.org/ko/docs/Web/Security/Same-origin_policy)

[교차 출처 리소스 공유(CORS)- MDN](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS)

[CORS 와 Webpack DevServer Proxy](https://react.vlpt.us/redux-middleware/09-cors-and-proxy.html)

[CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/)