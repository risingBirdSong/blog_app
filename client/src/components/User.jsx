import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      first_name : '',
      last_name : '',
      email : '',
      password : '',
      location : '',
      dept : '',
      is_admin : false
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
    axios.post('/users', this.state).then((results) => {
      console.log('results', results);
    })
  }

  render () {
    return(
      <div>
        <h2>users</h2>
        <form className="userform">
          <p>first_name</p>
          <input onChange={this.handleClick} type="text" name="first_name" value={this.state.first_name}/>
          <p>last_name</p>
          <input onChange={this.handleClick} type="text" name="last_name" value={this.state.last_name}/>
          <p>email</p>
          <input onChange={this.handleClick} type="text" name="email" value={this.state.email}/>
          <p>password</p>
          <input onChange={this.handleClick} type="text" name="password" value={this.state.password} />
          <p>location</p>
          <input onChange={this.handleClick} type="text" name="location" value={this.state.location} />
          <p>dept</p>
          <input onChange={this.handleClick} type="text" name="dept" value={this.state.dept} />
          <p>is_admin</p>
          <input onChange={this.handleClick} type="text" name="is_admin" value={this.state.is_admin} />
          <button onClick={this.onSubmit}>submit user</button>
        </form>
      </div>
    )
  }
}

export default User;