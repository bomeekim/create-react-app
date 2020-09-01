import React, { Component } from 'react';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
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
    this.max_content_id = 3; // ui에 영향을 주지 않으므로 state로 선언하지 않는다.
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

  getReadContent() {
    return this.state.contents.find(
      (o) => o.id === this.state.selected_content_id
    );
  }

  getContent() {
    var _title,
      _desc,
      _content,
      _article = null;

    switch (this.state.mode) {
      case 'welcome':
        _title = this.state.welcome.title;
        _desc = this.state.welcome.desc;
        _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
        break;
      case 'read':
        _content = this.getReadContent();
        _article = (
          <ReadContent
            title={_content.title}
            desc={_content.desc}></ReadContent>
        );
        break;
      case 'create':
        _article = (
          <CreateContent
            onSubmit={function (_title, _desc) {
              this.max_content_id = this.max_content_id + 1;
              /** push, concat 둘 다 배열에 값을 추가할 수 있음
            push는 원본을 바꿈 -> 큰 규모의 어플리케이션에서는 웬만하면 쓰지 말 것!
            concat은 원본을 바꾸지 않음 -> 추천! 성능향상!
            this.state.contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc
            }); */

              /** var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc
            }); */

              // push를 사용하는 방법 (배열일때만 가능)
              // ref. 객체를 바꾸고 싶을때? Object.assign({}, 변경할 Object)
              var _content = Array.from(this.state.contents);
              _content.push({
                id: this.max_content_id,
                title: _title,
                desc: _desc
              });

              this.setState({
                mode: 'read',
                selected_content_id: this.max_content_id,
                contents: _content
              });
            }.bind(this)}></CreateContent>
        );
        break;
      case 'update':
        _content = this.getReadContent();
        _article = (
          <UpdateContent
            data={_content}
            onSubmit={function (_id, _title, _desc) {
              // 직접 수정하지 않고 복제해서 새로운 배열에 수정함
              var _contents = Array.from(this.state.contents);
              var item = _contents.find((o) => o.id === _id);
              item.title = _title;
              item.desc = _desc;

              this.setState({
                mode: 'read',
                contents: _contents
              });
            }.bind(this)}></UpdateContent>
        );
        break;
      default:
        break;
    }

    return _article;
  }

  // 리액트에서 state를 변경하는 방법
  // [X] this.state.state.mode = 'welcome' 이렇게 작성하면 리액트가 변경을 감지할 수 없다.
  // [O] this.setState({ mode: 'welcome'})

  render() {
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
        <Control
          onChangeMode={function (_mode) {
            this.setState({
              mode: _mode
            });
          }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
