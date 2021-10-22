import React, {Component} from 'react';

class HistorySample extends Component {
    //뒤로 가기
    handleGoBack = () => {
        this.props.history.goBack();
    }

    //홈으로 가기
    handleGoHome = () => {
        this.props.history.push('/');
    }

    componentDidMount() {
        //이 함수 설정 시 페이지 변화가 생길 때마다 설정한 질문을 한다
        this.unblock = this.props.history.block('정말 떠나실 건가요?');
    }

    componentWillUnmount() {
        //컴포넌트가 언마운트 될 시 질문 멈춤
        if (this.unblock) {
            this.unblock();
        }
    }

    render() {
        return (
            <div>
                <button onClick={this.handleGoBack}>뒤로</button>
                <button onClick={this.handleGoHome}>홈으로</button>
            </div>
        );
    }
}

export default HistorySample;