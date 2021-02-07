---
title: '[알고리즘] 완전 탐색 : 소수 찾기'
date: 2021-02-03
tags:
  - Algorithm
  - 프로그래머스
---
프로그래머스 코딩 테스트 [완전 탐색 : 소수 찾기] 문제를 풀며 공부한 내용을 정리한 글입니다.

[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/42839)

## 문제 요약

주어진 numbers를 가지고 만들 수 있는 모든 조합 중, 소수에 해당하는 조합의 개수를 return하는 solution 함수를 작성하시오.

| numbers | return | 설명                                                           |
| --------| -------| --------------                                                 |
| "17"    | 3      | [1, 7]으로는 소수 [7, 17, 71]을 만들 수 있으므로 3을 return한다.  |
| "011"   | 2      | [0, 1, 1]으로는 소수 [11, 101]을 만들 수 있으므로 2를 return한다. |


## 최종 작성 코드
```javascript
function solution(numbers) {
    var answer = new Set(); // answer로 new Set()
    let nums = numbers.split(''); 
    
    // 소수 여부를 판별하는 함수.
    const isPrimeNum = (num) => {
         if (num <= 1) return false;
         if (num === 2) return true;
         for (let i = 2; i <= Math.sqrt(num); i++) {
              if (num % i === 0) return false;
         }
         return true;
    }
    
    const getPermutation = (arr, fixed) => {
        if(arr.length >= 1) {
            for (let i=0; i<arr.length; i++) {
                const newFixed = fixed + arr[i]; //기 고정값에 배열의 i번째 요소를 합쳐 새로운 고정값으로 지정.
                const copyArr = arr.slice();
                copyArr.splice(i, 1); // newFixed로 고정한 요소를 배열에서 제거하여, 고정되지 않은 요소들로 배열을 채운다.
                
                // 도출된 조합이 answer에 들어있지 않고, 소수일 경우 answer에 추가.
                if (!answer.has(parseInt(newFixed)) && isPrimeNum(parseInt(newFixed))){
                    answer.add(parseInt(newFixed)) //newFixed 조합을 answer에 추가.
                }
                
                getPermutation(copyArr, newFixed); // 고정되지 않은 요소들이 담긴 배열과, 새로운 고정값을 인자로 전달하여 getPermutation 호출.
            }
        }
    }
    
    getPermutation(nums, '');
     
    return answer.size;
}
```
# 키포인트
<br>위 코드에서 중요하게 생각되는 포인트는 다음과 같습니다.


1. 완전 탐색으로 모든 조합 구하기.
2. 소수 찾기 알고리즘으로 소수 판별하기.
3. 중복되는 조합 걸러내기.


## 1. 완전 탐색으로 모든 조합 구하기.

<br>**완전 탐색**
> 전체 요소를 일일이 순회하여 가능한 모든 경우의 수를 도출하는 것

<br>
말 그대로 모든 요소들을 하나하나 확인해 가능한 조합들을 전부 찾아내는 방법입니다. 
<br>완전 탐색을 수행할 수 있는 방법으로는 브루트 포스, 비트 마스트, 백 트래킹, 순열 등 여러 가지가 있는데, 여기서는 재귀 함수를 통해 순열을 구하는 것으로 문제를 해결하였습니다.

<br><br>**어떻게 순열로 완전 탐색을 수행할 수 있을까?**

<br>**순열의 원리**를 이미지로 살펴보면 다음과 같습니다.

![](screenshot.gif)
[출처 : https://www.geeksforgeeks.org/wp-content/uploads/NewPermutation.gif]

<br>A와 A를 스왑합니다. 스왑된 A는 고정(fixed)되며, A가 고정된 상태에서 나머지 B, C 역시 A와 같은 과정을 거칩니다. B와 B가 스왑되면, 고정된 AB를 제외하고 C만 남기 때문에 [A, B, C]가 AB를 고정했을 때 만들 수 있는 조합이 됩니다. 다음으로 B와 C를 스왑해 AC를 고정시키면 C만 남기 때문에 [A, C, B]가 AC를 고정했을 때 만들 수 있는 조합이 됩니다. 그리고 이 두 가지 조합이 A를 고정했을 때 만들 수 있는 조합이 되는 겁니다. 이 과정을 A와 B가 스왑 될 때, A와 C가 스왑될 때 역시 동일하게 진행하면 그림과 같이 총 여섯 가지의 조합을 얻을 수 있습니다. (제시된 문제에서는 자리 수와 상관없이 모든 조합을 구해야 하지만 원리는 이와 동일합니다.)


<br>위 내용을 토대로 ["0", "1", "1"]의 순열을 구하여 result에 push하는 코드를 작성해보았습니다.

```javascript
const arr = ["0", "1", "1"];
let result = [];

const getPermutation = (arr, fixed) => {
        if(arr.length >= 1) {
            for (let i=0; i<arr.length; i++) {
                const newFixed = fixed + arr[i];
                const copyArr = arr.slice();
                copyArr.splice(i, 1);

                result.push(newFixed);

                getPermutation(copyArr, newFixed);
            }
        }
    }

getPermutation(arr, '')

console.log(result);
// ["0", "01", "011", "01", "011", "1", "10", "101", "11", "110", "1", "10", "101", "11" ,"110"]
```

**코드 설명**  
<br>순열을 얻을 수 있는 getPermutation 함수에 요소가 담긴 배열과 비어있는 String을 인자로 제공하여 호출합니다. (아직 고정 값이 없기 때문에 빈 String 제공)  
제공된 String과 배열의 i번째 요소(arr[i])를 합쳐 새로운 고정 값(newFixed)으로 지정하고, 고정된 요소(arr[i])를 splice로 배열에서 제거하여 고정되지 않은 요소들로 copyArr를 구성합니다.   
copyArr와 newFixed를 getPermutation의 인자로 제공해 재귀 함수를 호출하면, 전달받은 arr에 요소가 1개 이상이기 때문에 코드가 실행되고, fixed로 제공된 값에 배열의 i번째 요소(arr[i])를 붙여 newFixed로 만든 후, 붙인 요소를 배열에서 제거합니다. 이후 해당 배열과 newFixed를 다시 getPermutation의 인자로 주어 재귀 함수를 호출합니다. 모든 요소가 fixed 되어 arr로 전달되는 요소가 없어질 때까지 재귀 함수가 호출되며, 탐색이 끝나면 모든 조합이 도출됩니다.

## 2. 소수 찾기 알고리즘으로 소수 판별하기.
**소수**
> 1과 자기 자신으로만 나누어 떨어지는 1보다 큰 양의 정수.  
(1과 자기 자신으로만 떨어진다 = 약수가 두 개 뿐이다)  
<br>예) 19의 약수는 [1, 19] 이므로, 19는 소수이다.

<br>

**약수**
> 나눴을 때 나머지가 0이 되는 수.  
<br>예) 9의 약수는 [1, 3, 9] 이므로, 9는 소수가 아니다.

<br>위의 정의를 그대로 적용하면 소수 여부를 판별하는 방법은 어렵지 않습니다.   
판별하고자 하는 수를 2부터 자신보다 작은 수로 전부 나눴을 때 약수가 하나라도 나오면 소수가 아니라는 뜻이니까요.

<br>이를 코드로 작성하면 다음과 같습니다.

```javascript
const isPrimeNum = (num) => {
     if (num <= 1) return false;
     if (num === 2) return true;
     for (let i = 2; i < num; i++) {
          if (num % i === 0) return false;
     } 
     return true;
}
```

위 과정은 당연하게 소수 여부를 판별할 수 있지만, 2부터 자신 보다 작은 수까지 전부 탐색 해야 한다는 단점을 가지고 있습니다. 예를 들어, num이 9일 경우 코드상으로 2부터 8까지 모든 수를 순회해야만 9가 소수가 아니라는 결론을 얻을 수 있지만, 실제론 3으로 나누는 시점이 결론이 도출되는 분기점이 되기 때문에 4에서 8까지의 탐색은 불필요하다는 것을 알 수 있습니다.

<br>그렇다면 모든 수를 순회하지 않도록 **과정을 최소화**할 수 있는 방법은 무엇일까요?  

<br>2부터 자신의 양의 제곱근 이하의 수까지 나누어 소수 여부를 판별할 수 있는 **소수판별법**을 사용하면 불필요한 과정을 단축 시킬 수 있습니다. 9의 경우 양의 제곱근인 3까지, 25의 경우 양의 제곱근인 5까지 자신을 나눴을 때 0으로 떨어지면 소수가 아니고, 떨어지지 않으면 소수가 되는 것입니다.  
(소수 판별법에 대한 자세한 설명은 아래 링크를 참조하시길 바랍니다.)

[소수 판별볍 - 위키백과](https://ko.wikipedia.org/wiki/%EC%86%8C%EC%88%98%ED%8C%90%EB%B3%84%EB%B2%95)


<br>JavaScript에는 양의 제곱근을 구하는 `Math.sqrt()` 메서드가 있으므로, 이를 이용해 for문이 순회할 범위를 좁혀주면 다음과 같은 코드가 완성됩니다.

```javascript
 const isPrimeNum = (num) => {
     if (num <= 1) return false; // 소수는 1보다 큰 양의 정수입니다.
     if (num === 2) return true; // 2는 짝수 중 유일하게 소수인 숫자입니다.
     for (let i = 2; i <= Math.sqrt(num); i++) {
          if (num % i === 0) return false;
     }
     return true; //위 과정들을 통과하면 true를 반환합니다.
 }
```

## 3. 중복되는 조합 걸러내기.
JavaScript에는 Set이라는 메서드가 있는데요,  
<모던 JavaScript 튜토리얼>에서는 다음과 같이 Set의 정의를 게재하고 있습니다.

**Set**
> Set(셋)은 중복을 허용하지 않는 값을 모아 놓은 특별한 컬렉션입니다.

<br>Set에 같은 값을 추가할 경우 최종적으로 하나의 값만 저장되기 때문에, 얻은 조합들을 `set.add()`로 추가하면 중복된 값을 추가로 저장하지 않도록 할 수 있습니다.

여기에 `set.size`를 이용하면 앞서 Set에 저장한 값의 개수를 얻을 수 있습니다.

<br>Set에 대한 자세한 설명이 필요하다면 아래 링크로 방문하길 추천합니다.

[모던 JavaScript - 맵과 셋](https://ko.javascript.info/map-set)

<br>

# 글을 마치며
취업을 위해 코딩 테스트 문제를 풀며 알고리즘을 접하기 시작했는데, 이를 통해 알고리즘의 원리와 JavaScript의 메서드를 전보다 깊이 있게 알 수 있게 되어서 매우 다행이라는 생각이 들었습니다. 향후에도 취업과 관계없이 알고리즘 문제를 꾸준히 풀어보면 좋을 것 같다는 생각이 들었고, 현재는 많이 부족하지만 꾸준히 문제를 풀어 알고리즘에 더욱 익숙해질 수 있도록 노력할 예정입니다. 
<br>아울러 개발 블로그를 시작하면 좋을 것 같다는 생각을 막연하게 품고 있던 찰나에 정리하고 싶은 내용이 생겨 이렇게 첫 글을 쓰게 되었습니다. 배워가는 입장에서 쓴 글이기에 문제점이 있을 수 있으니 이에 대하여 지적해 주는 분이 계시다면 열린 귀로 듣고 개선할 수 있도록 하겠습니다 :)