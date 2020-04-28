import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


class Post extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      comments : [],
      users : []
    }
  }
  // async componentDidMount(){
  //   await axios.get(`http://localhost:4000/comments`).then((results) => {
  //     this.setState({comments : results.data})
  //   });
  // }

  render(){
    // this.asyncTest();
    let comments = this.props.comments.filter((comment, idx) => {
      if (comment.post_id === this.props.post.id){
       return comment;
      } 
      else return null;
    });

    let user = this.props.users.find((user) => {
      console.log('user.id', user.id);
      return user.id === this.props.post.user_id ? <p>by {this.props.post.first_name}</p> : null
    })

    return (
      <div className="post">
          <h3>title : {this.props.post.title}</h3>
          <p>body : {this.props.post.body}</p>
          <h2> by {user.first_name} user.id {user.id}</h2>
          {comments.map((comment, idx) => {
            return <div className="comment" key={idx}>
              {comment.body} by {this.props.users.map((user) => {
                 return user.id === comment.user_id ? <p>{user.first_name} {user.last_name}</p> : null
              })}
            </div>
          })}
      <button onClick={this.props.newComment}>new comment _todo_</button>

      </div>
    )
  }
}

export default Post;

