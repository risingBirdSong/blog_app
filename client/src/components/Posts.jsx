import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Post from './Post.jsx';

class PostList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    console.log('this props', this.props);
    return(
      <div>
        {this.props.posts.map((data, idx) => {
          return (
            <Post newComment={this.props.newComment} users={this.props.users} comments={this.props.comments} key={idx} post={data}/>
          )
        })}
      </div>
    )
  }
}

export default PostList;