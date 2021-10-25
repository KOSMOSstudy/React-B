import React, {Component} from 'react';

// history 객체 내의 내장 함수 

class HistorySample extends Component {
  // 뒤로 가기
  handleGoBack = () => {
    this.props.history.goBack();
  };

  // 홈으로 이동
  handleGoHome = () => {
    this.props.history.push('/');
  };

  componentDidMount() {
    // 이것을 설정하고 나면 페이지에 변화가 생기려고 할 때마다 정말 나갈 것인지를 질문
    this.unblock = this.props.history.block('정말 떠나실 건가요?'); // 이벤트를 추가해준...? 느낌
    // 주소창이 변하려고 하면 질문을 한다. -> ok를 하면 바꿈
  }

  componentWillUnmount(){
    // 컴포넌트가 언마운트되면 질문을 멈춤
    if(this.unblock){
      this.unblock(); // 걸어놓은 이벤트를 삭제
    }
  }

  render(){
    return(
      <div>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.handleGoHome}>홈으로</button>
      </div>
    );
  }
}
  
export default HistorySample;