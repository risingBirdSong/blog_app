import React from 'react';
import ReactDOM from 'react-dom';
import PostList from './components/Posts.jsx';
import User from './components/User.jsx';
import axios from 'axios';
import NewPost from './components/NewPost.jsx';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      users : [],
      comments : [],
      posts : [],
      currentUser : ''
    }
    this.handleClick = this.handleClick.bind(this);
    this.onSubmitPost = this.onSubmitPost.bind(this);
    this.newComment = this.newComment.bind(this);
  }

  async componentDidMount(){
    let getusers =  await axios.get(`http://localhost:4000/users`);
    let getcomments = await axios.get('http://localhost:4000/comments');
    let getposts = await axios.get('http://localhost:4000/posts');
    this.setState({
      users : getusers.data,
      comments : getcomments.data,
      posts : getposts.data,
      user_id : '',
      title : '',
      body : '',
    })
  }

  handleClick(e){
    this.setState({[e.target.name] : e.target.value})
  }

  onSubmitPost (e) {
    e.preventDefault();
    console.log('this --- state', this.state);
    let post = {
      user_id : this.state.user_id,
      title : this.state.title,
      body : this.state.body,
    }
    axios.post('/posts', post).then((results) => {
      results.data;
      // this.setState({posts : results.data });
    }).then(() => {
      
    })
  }

  newComment (comment){
    axios.post('/comments', comment).then((results) => {
      this.setState({comments : results.data.comments })
    })
  }

  render(){
    return (
      <div>
        <h1>Blog!</h1>
        <User/>
        <div>
          <h2>posts</h2>
          <form className="userform">
            <p>user_id</p>
            <input onChange={this.handleClick} type="text" name="user_id" value={this.state.user_id}/>
            <p>title</p>
            <input onChange={this.handleClick} type="text" name="title" value={this.state.title}/>
            <p>body</p>
            <input onChange={this.handleClick} type="text" name="body" value={this.state.body}/>
            <button onClick={this.onSubmitPost}>submit post</button>
          </form>
        </div>
        <div className="postsAndComments">
        <PostList users={this.state.users} comments={this.state.comments} posts={this.state.posts} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));