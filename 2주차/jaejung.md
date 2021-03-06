# 2주차 React 스터디 정리

| 장   | 제목          |
| ---- | ------------- |
| 4장 | 이벤트 핸들링       |
| 5장 | ref.DOM 에 이름달기 |

-----

# 4장 이벤트 핸들링 

- 사용자가 웹브라우저에서 DOM 요소들과 상호작용하는것을 이벤트(event)라고 합니다
- 비슷하면서도 다른 HTML 과 React 이벤트 사용법에 대해 알아봅시다  🤸‍♀️

먼저 HTML 코드를 보도록 하겠습니다

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>JS Bin</title>  
  </head>
  <body>
    <button onclick="alert('executed')"> Click me</button>
  </body>
</html>
```
뭔가 많이 부족해 보이는 html코드.. 바로 감이 오시나요?   
리액트에서 이벤트 사용시, 알아야 하는 사항이 몇가지 있습니다!

⚠ 주의사항
1. 이벤트 이름은 카멜 표기법으로 작성한다.  
 `ex) onclick => onClick`  
2. 이벤트에 JS 코드가 아닌, 함수값 형태를 전달한다.  
 `화살표 함수 문법으로 함수를 만들어 전달하거나 렌더링 부분 외부에서 미리 만들어 전달도 가능 ` 
3. 돔(DOM) 요소에만 이벤트를 설정할 수 있다.  
 `만약 돔형식으로 설정하지 않을 경우, 이름이 onClick인 props를 MyComponent에게 전달하게 되는 꼴입니다!`
 
 
> 리액트에서 지원하는 이벤트는 종류는 꽤 다양한데요  
Touch, Form, UI, Media 등등..  
위 종류 말고도 다른 리액트 이벤트가 궁금하시다면 아래 링크를 참고해 주세요  
https://reactjs.org/docs/events.html

위 사항들을 숙지하며 리액트 코드작성해 보도록 하겠습니다!  

#### 1. onChange 이벤트 핸들링하기

```javascript
import React, { Component } from 'react';

class EventPractice extends Component {
    render() {
        return (
            <div>
                <h1>onChange 이벤트 핸들링하기</h1>
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해보세요"
                    
                    onChange={
                        (e)=>{
                            console.log(e.target.value);
                        }
                    }
                    />
            </div>
        );
    }
}

export default EventPractice;
```
> 🍯Tip,  
> 콘솔에 기록되는 e 객체는 SyntheicEvent로 웹브라우저의 네이티브 이벤트를 감싸는 객체입니다.  
> 네이티브 이벤트와 인터페이스가 같으므로 순수 JS에서 html이벤트를 다룰때와 똑같이 사용하면 안됩니다. 
> 이벤트가 끝나면 내부가 초기화 되는 SyntheicEvent 특성상 이벤트를 참조해야하는 일이 있다면   
> e.persist() 함수를 호출해야 합니다.  



 #### 🧪결과화면
 <kbd><img src="https://user-images.githubusercontent.com/67777124/134998586-c0f99013-6d44-43ca-98c2-e19c34ad00ad.png"></kbd>



#### 2. state에 input 값 담기
생성자 메서드인 constuctor에서 state 초깃값을 설정하고, 
이벤트 핸들링 내부에서 ```this.setState```를 호출해 업데이트 해봅시다!  

```javascript
import React, { Component } from 'react';

class EventPractice extends Component {
    state={
        message: ''
    }
    render() {
        return (
            <div>
                <h1>state에 input 값 담기</h1>
                <input
                    type="text"
                    name="message"
                    placeholder="아무거나 입력해보세요"
                    
                    value={this.state.message}
                    onChange={
                        (e)=>{
                            this.setState({
                                message: e.target.value
                            })
                        }
                    }
                    />
                    <h1>내가 적은값: {this.state.message}</h1>
            </div>
        );
    }
}

export default EventPractice;
```

 #### 🧪결과화면   
 #### 오류가 나지않고  아래와 같이 제대로 입출력이 된다면 성공! 
 <kbd><img src="https://user-images.githubusercontent.com/67777124/134999899-0f26f0cb-ee12-4cf6-b03b-f4a1e936b7c6.png" height="200"/></kbd>



#### 3. 버튼을 누를 때 comment 값을 공백으로 설정
정말 우리가 입력한 값이 state에 잘 들어갔는지 검증하기 위해  
클릭 이벤트가 발생하면 현재 comment값을 메시지로 띄운 후, 공백으로 설정하겠습니다.

```javascript
import React, { Component } from 'react';

class EventPractice extends Component {
    state={
        message: ''
    }
    render() {
        return (
            <div>
                <h1>버튼을 누를 때 comment 값을 공백으로 설정</h1>
                <input ... (생략)/>
                    <button onClick={
                        ()=>{
                            alert(this.state.message+'메시지 지워집니당~');
                            this.setState({
                                message: ''
                            });
                        }
                    }>확인</button>
            </div>
        );
    }
}

export default EventPractice;
```

 #### 🧪결과화면   
 <kbd><img src="https://user-images.githubusercontent.com/67777124/135002718-30022047-de7f-4b54-8e22-8d5ddc8cfb5a.png" height="200" style="border: 1px solid black"/></kbd>



#### 4. input 여러개 다루기

우리는 input값을 state에 넣는 방법을 배웠습니다.  
하지만 input이 여러 개일 때는 어떻게 해야할까요?  
이번엔 쉽게 여러 개를 처리하는 방법을 알아봅시다! 

```이벤트 객체 event.terget.name 활용```  
onChange 이벤트 핸들러에서 event.terget.name은 해당 인풋의 name을 가르킵니다.   
이 값을 사용하여 state를 설정하면 쉽게 해결할 수 있습니다.

```javascript

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClick = (e) => {
        alert(this.state.username+':'+this.state.message);
        this.setState({
            username: '',
            message: ''
        });
    }

    
    <input
       type="text"
       name="username"
       placeholder="유저명"
                    
       value={this.state.username}
       onChange={this.handleChange}
      />
    <input
       type="text"
       name="message"
       placeholder="아무거나 입력하세요"
                    
       value={this.state.message}
       onChange={this.handleChange}
      />

    
 ```
 
 
<details>
<summary>퀴즈! this 바인딩을 하는 이유!?</summary>
  </br>
  바인딩을 하지 않은 경우 this가 undfined를 가르키기 때문!  
  </br>
  생성자 메서드에서 하는것이 정석적인 방법이 있긴 하지만  
  </br>
  바벨 문법을 활용하여 화살표 함수 형태로 메서드를 정의하기도 하지요  
  </br>
  </br>
  <img src="https://user-images.githubusercontent.com/67777124/135077250-efc75237-e4a0-4203-a016-7274cde990f2.png" height="200"/>
  </br>
  

  </br>
  
 `상품은.. 요즘 멋사에서 애용하는 예빈벅스`
 </br>
<img src="https://user-images.githubusercontent.com/67777124/135031030-458a87be-47da-49fe-b34e-2c073cb72f7f.png" height="200"/>


</details>

 </br>
 </br>
 </br>

   #### 🧪결과화면   
 <kbd><img src="https://user-images.githubusercontent.com/67777124/135005386-6ff3715e-afc6-43f0-99d4-1329953f23d9.png" height="200"/></kbd>

</br>
</br>
</br>


> +번외
> onKeyPress 이벤트 핸들링 배워보기!

키를 눌렀을때 발생하는 KeyPress 이벤트를 처리하는 방법을 알아보겠습니다.
우선, Key 선언 방식인데요!

객체 안에서 Key를 []로 감싸면 그 안에 넣은 레퍼런스가 가르키는 실제 값이 Key값으로 사용됩니다.  
 
```javascript
const name = '샤이니 만능열쇠Key'
const object = {
 [name]: '재범쿤'
 };
 
 { '샤이니 만능열쇠Key' : '재범쿤'}
```

```javascript

   <..생략>
   handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
   
    handleKeyPress=(e)=>{
        if(e.key == 'Enter'){
            this.handleClick();
        }
    }
    
    handleClick = (e) => {
        alert(this.state.username+':'+this.state.message);
        this.setState({
            username: '',
            message: ''
        });
    }

    
    <input
       type="text"
       name="message"
       placeholder="아무거나 입력하세요"
                    
       value={this.state.username}
       onChange={this.handleChange}
       onKeyPress={this.handleKeyPress}
      />
      
 ```
Key값 설정이 정상적으로 처리되었기에 `enter`를 누르면 메시지가 삭제됩니다!


-----

# 5장 ref.DOM 에 이름달기

HTML 코드를 작성할때, DOM요소에 id를 사용하여 이름을 달아줍니다.  

```html
<div id="디아븨븨" />
```

> id를 설정하게 되면 해당하는 DOM요소에만 스타일을 따로 적용하거나,  
> JS에서 해당 DOM요소에 접근하여 여러가지 작업을 할 수 있습니다.   
> 위 처럼 리액트 에서도 dom에 이름을 달 수 있는데 이 방법이 바로 `ref(reference)` 입니다.  

ref는 아래와 같은 상황에서 사용됩니다

- 리액트에서 ref는 state로만 해결할 수 없고 DOM을 직접 건드려야할때
- 특정 input에 포커스 주기
- 스크롤박스 조작하기
- Canvas 요소에 그림 그리기 등

 이제 프로젝트에서 ref 사용방법을 알아봅시다!   
 ref를 사용하는 방법은 총 두가지 입니다.  

1. 콜백함수를 통한 ref 설정   
　ref를 만드는 가장 기본적인 방법은 콜백함수를 사용하는 것입니다.   
　ref를 달고자 하는 요소에 ref라는 콜백 함수를 props로 전달해주면 됩니다.   
  ```javascript
  <input ref={(ref) => {this.input=ref}} />
  ```
　이 때, 이름은 `this.input` 뿐만 아니라 원하는 것으로 자유롭게 설정할 수 있습니다.


2. createRef를 통한 ref 설정   

ref를 만드는 또 다른 방법은 리액트 함수인 `createRef`를 사용하는 것입니다.  

```javascript
import React, {Component} from 'react';

class RefSample extends Component {
  input = React.createRef();

  handleFocus = () => {
    this.input.current.focus(); //하고싶은 기능 넣기
  };

  render() {
    return (
      <div>
        <input ref={this.input} />
      </div>
    );
  }
}

export default RefSample;
```
위와 같이 설정하고!   
DOM에 접근하려면 this.input.current 처럼 뒤에 .current 를 넣어주면 됩니다.   


리액트에서는 컴포넌트에도 ref를 쓸 수 있습니다.  
이 방법은 주로 컴포넌트 내부에 있는 DOM을 포넌트 외부에서 사용할때 씁니다.  
위에서 숙지한 방법으로 실습을 해보겠습니다!  

1. 컴포넌트 파일설정   
`step1) 책의 예시처럼 스크롤박스 컴포넌트 파일을 설정합니다!`   
`step2) 렌더링을 위해 최상위 DOM에 ref를 달아주세요`   
```javascript
import React, {Component} from 'react';

class ScrollBox extends Component {

    ScrollToBottom = () => {
        const { scrollHeight, clientHeight } = this.box;
        this.box.scrollTop = scrollHeight - clientHeight;
    }
    
  render() {
    const style = {
      border: '1px solid black',
      height: '300px',
      width: '300px',
      overflow: 'auto',
      position: 'relative',
    };

    const innerStyle = {
      width: '100%',
      height: '650px',
      background: 'linear-gradient(white, black)',
    };
    

    return (
      <div
        style={style}
        ref={(ref) => {
          this.box = ref;
        }}
      >
        <div style={innerStyle} />
      </div>
    );
  }
}

export default ScrollBox;
```

 <kbd><img src="https://user-images.githubusercontent.com/67777124/135083567-b60f26ba-358a-4dde-9e2b-34c6f55c0045.png" height="200"/></kbd>

2. App 컴포넌트에서(부모) 스크롤박스 컴포넌트 렌더링   
```javascript
import React, {Component} from 'react';

import ScrollBox from './ScrollBox';

class App extends Component{
  render(){
    return(
      <div>
      <ScrollBox ref={(ref)=> this.scrollBox=ref}/>
      <button onClick={()=> this.scrollBox.ScrollToBottom()}>
        맨 밑으로
      </button>
      </div>
    );
  }
}

export default App;
```

<kbd><img src="https://user-images.githubusercontent.com/67777124/135083793-31e95afc-2806-4b26-b333-1a9eb7721a6a.png" height="200"/></kbd>

⚠ 주의사항   
문법상으로는   
```javascript
onClick = {this.scrollBox.ScrollToBottom}
```
같은 형식도 틀린것은 아니지만  
컴포넌트가 처음 랜더링 될 때는 `this.scrollBox`값이 undfiend 이므로,   
위와같이 화살표 함수 문법을 사용하여 아예 새로운 함수를 만들고 그 내부에서   
`this.scrollBox.ScrollToBottom` 메서드를 실행하면, 버튼을 누를때 값을 읽어와서 실행오류가 발생하지 않습니다.




