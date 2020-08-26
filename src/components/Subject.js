import React, { Component } from "react";

// 아래 코드는 유사 자바스크립트 코드임
class Subject extends Component {
  // class 내부에 있는 함수는 function을 생략한다.
  render() {
    return (
      // 컴포넌트를 만들때는 하나의 최상위 태그가 필요하다.
      <header>
        {/* React 는 태그의 attribute 속성을 props 라고 표현한다. */}
        <h1>{this.props.title}</h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;
