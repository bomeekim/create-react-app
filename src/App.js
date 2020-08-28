import React, { Component } from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';
import './styles.css';

// React에서 Component를 만드는 코드
class App extends Component {
  // 생성자: 제일 먼저 실행되며 초기화를 담당
  constructor(props) {
    super(props);
    // 리액트에서는 state 또는 props 의 값이 바뀌었을 때
    // 1. render() 함수가 다시 호출된다.
    // 2. render() 함수 내에 있는 컴포넌트들의 render() 함수가 호출된다.
    // 3. 화면이 다시 그려지게 된다.
    // => state, props가 바뀌면 화면이 다시 그려진다.
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      welcome: { title: 'Welcome', desc: 'Hello, React!' },
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText Markup Language.' },
        { id: 2, title: 'CSS', desc: 'CSS is for design.' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive.' }
      ]
    };
  }

  // 리액트에서 state를 변경하는 방법
  // [X] this.state.state.mode = 'welcome' 이렇게 작성하면 리액트가 변경을 감지할 수 없다.
  // [O] this.setState({ mode: 'welcome'})

  render() {
    var _title,
      _desc = null;

    switch (this.state.mode) {
      case 'welcome':
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        break;
      case 'read':
        var i = 0;
        while (i < this.state.contents.length) {
          var data = this.state.contents[i];

          if (data.id === this.state.selected_content_id) {
            _title = data.title;
            _desc = data.desc;
            break;
          }

          i = i + 1;
        }
        break;
      default:
        break;
    }

    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
          }.bind(this)}></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
