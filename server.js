'use strict';
const express = require('express');
const database = require('mysql2');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(express.static('client/dist'));

const db = database.createConnection({
  host : '127.0.0.1',
  user : 'student',
  password : 'student',
  database : 'blogsDB',
});

db.connect();

app.get('/users', (req,res) => {
  let sql = 'SELECT * from users';
  db.promise().query(sql).then((data) => {
    console.log('data', data);
    res.json(data[0]);
  }).catch((err)=>console.log('err', err));
});

app.post('/users', (req, res) => {
  let newUser = req.body;
  console.log('newUser', newUser);
  let sql = 'INSERT INTO users (first_name, last_name, email, password, location, dept, is_admin) values (?,?,?,?,?,?,?)';
  db.promise().query(sql, [newUser.first_name, newUser.last_name, newUser.email, newUser.password, newUser.location, newUser.dept, newUser.is_admin]).then((results) => {
    console.log('success',  results);
    res.send('success');
  });
});

// "email" : "aaa email",
// "password" : "aaa password",
// "location" : "aaa location",


app.put('/users', (req, res) => {
  let body = req.body;
  // let sql = 'update users set first_name = "bill" where users.id = 3';
  // is thi possible
  // let sql = 'update users set ? = "peter" where users.id = 3';
  let sql = `update users set first_name = "${body.first_name || 'defualt'}", last_name = "${body.last_name || 'default'}", email = "${body.email || 'default'}", password = "${body.password || 'default'}", location = "${body.location || 'default'}" , dept = "${body.dept || 'default'}", is_admin = ${body.is_admin || 0} where users.id = ${body.id}`;
  //[body.col,body.content, Number(body.id)]
  console.log('sql statmement', sql);
  db.promise().query(sql).then((results) => {
    console.log('results', results);
    res.send(results);
  });
});

app.get('/users/:id', (req, res) => {
  let getId = Number(req.params.id);
  let query = `select * FROM users WHERE id = ${getId}`;
  db.promise().query(query).then((results) => {
    res.send(results[0]);
  });
});

app.get('/getusersposts/:userid', (req, res) =>{
  let userid = req.params.userid;
  // let sql = `select * from posts join users on posts.user_id = ${Number(userid)}`;
  let sql = `select users.first_name, users.last_name, posts.title, posts.body from users join posts on users.id = posts.user_id where posts.user_id = ${userid}`;
  db.promise().query(sql).then((results) => res.send(results[0]));
});



app.delete('/users/:id', (req, res) => {
  let getId = Number(req.params.id);
  let query = `DELETE FROM users WHERE id = ${getId}`;
  db.promise().query(query).then((results) => {
    res.send(results);
  });
});

app.get('/posts', (req, res) => {
  let query = 'select * from posts';
  db.promise().query(query).then((results) => {
    res.send(results[0]);
  });
});
app.get('/posts/:id', (req, res) => {
  let id = Number(req.params.id);
  let query = `select * from posts where id = ${id}`;
  db.promise().query(query).then((results) => {
    res.send(results[0]);
  });
});

app.put('/posts', (req, res) => {
  let body = req.body;
  let sql = `update posts set title = "${body.title}" , body = "${body.body}"  where id = ${body.id}`;
  db.promise().query(sql).then((results) => {
    res.send(results);
  });
});

app.delete('/posts/:id', (req, res) => {
  let getId = Number(req.params.id);
  let sql = `DELETE FROM posts WHERE id = ${getId}`;
  db.promise().query(sql).then((results) => {
    res.send(results);
  });
});

app.post('/posts', (req, res) => {
  let newPost = req.body;
  let sql = 'insert into posts (user_id, title, body) values(?, ? ,?)';
  db.promise().query(sql, [newPost.user_id, newPost.title, newPost.body]).then((results) => {
    console.log('results', results);
    res.send(results);
  });
  console.log('new post', newPost);
});

app.post('/comments', (req, res) => {
  let body = req.body;
  let qry = 'insert into comments (post_id, user_id, body) values (?, ?, ?)';
  db.promise().query(qry, [body.post_id, body.user_id, body.body]).then((val) => {
    res.send(val);
  });
});

app.put('/comments', (req, res) => {
  let body = req.body;
  let sql = `update comments set body = "${body.body}" where id = ${body.id}`;
  db.promise().query(sql).then(results => res.send(results));
});

app.get('/comments', (req, res) => {
  let qry = 'select * from comments';
  db.promise().query(qry).then(results => {
    res.send(results[0]);
  });
});

app.get('/getcommentsonpost/:postid', (req, res) => {
  let postid = req.params.postid;
  let sql = `select comments.body ,posts.title, users.first_name, users.last_name from comments join posts on comments.post_id = posts.id join users on users.id = comments.user_id where posts.id = "${postid}"`;
  db.promise().query(sql).then(results => res.send(results[0]));
});


app.delete('/comments/:id', (req, res) => {
  let id = Number(req.params.id);
  let qry = 'delete from comments where id = ?';
  db.promise().query(qry, id).then((results) => {
    res.send(results);
  });
});


app.listen(4000, () => {console.log('listening on port 4000');});