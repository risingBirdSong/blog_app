import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class NewPost extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user_id : '',
      title : '',
      body : '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  
  handleClick(e){
    this.setState({[e.target.name] : e.target.value})
  }

  onSubmit (e) {
    e.preventDefault();
    console.log('this --- state', this.state);
    axios.post('/posts', this.state).then((results) => {
      console.log('results', results);
    })
  }

  render(){
    return(
      <div>
      <h2>posts</h2>
      <form className="userform">
        <p>user_id</p>
        <input onChange={this.handleClick} type="text" name="user_id" value={this.state.user_id}/>
        <p>title</p>
        <input onChange={this.handleClick} type="text" name="title" value={this.state.title}/>
        <p>body</p>
        <input onChange={this.handleClick} type="text" name="body" value={this.state.body}/>
        <button onClick={this.onSubmit}>submit post</button>
      </form>
    </div>
    )
  }
}

export default NewPost;