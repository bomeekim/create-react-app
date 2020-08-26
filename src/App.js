import React, { Component } from "react";
import "./styles.css";

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

class TOC extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li>
            <a href="1.html">HTML</a>
          </li>
          <li>
            <a href="2.html">CSS</a>
          </li>
          <li>
            <a href="3.html">JavaScript</a>
          </li>
        </ul>
      </nav>
    );
  }
}

class Content extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        {this.props.desc}
      </article>
    );
  }
}

// React에서 Component를 만드는 코드
class App extends Component {
  render() {
    return (
      <div className="App">
        <Subject title="WEB" sub="world wide web!"></Subject>
        <TOC></TOC>
        <Content
          title="HTML"
          desc="HTML is HyperText Markup Language."
        ></Content>
      </div>
    );
  }
}

export default App;
