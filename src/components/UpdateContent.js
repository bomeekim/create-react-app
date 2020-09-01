import React, { Component } from 'react';

class UpdateContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc
    };

    // 이렇게 선언해주면 onChange에 이벤트를 등록할 때마다 bind(this)를 안해줘도됨
    this.inputFormHandler = this.inputFormHandler.bind(this);
  }

  inputFormHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    console.log(this.props.data);
    return (
      <article>
        <h2>Update</h2>
        <form
          action="create_process"
          method="post"
          onSubmit={function (e) {
            // 페이지가 변경되지 않게 하기 위해 이벤트를 막음
            e.preventDefault();
            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
          }.bind(this)}>
          <input type="hidden" name="id" value="{this.state.id}"></input>
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.inputFormHandler}></input>
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={this.inputFormHandler}></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
