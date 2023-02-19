const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connUri = process.env.MONGO_LOCAL_CONN_URL;
const User = require('../models/users');

function set_cors(req,res) {
  if (req.get('origin')) {
  res.header('Access-Control-Allow-Origin', req.get('origin'))
  res.header('Access-Control-Allow-Credentials', true)
  } else {
  res.header('Access-Control-Allow-Origin', null)
  res.header('Access-Control-Allow-Credentials', true)
  }
  return res;
};



module.exports = {
  add: (req, res) => {

      let result = {};
      let status = 201;
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
        const { username, password } = req.body;

      
        User.findOne({username}, function(err,obj) { 
          if (obj != null) {
            if (obj.username) {
              res.writeHead(409, {'Content-Type': 'text/plain'});
              res.write('User ' + obj.username + ' already exists');
              res.end(); 
            } 
          } else {
            const { username, password } = req.body;
            const user = new User(req.body); // document = instance of a model
            // TODO: We can hash the password here as well before we insert
            user.save((err, user) => {
              if (!err) {
                result.status = status;
                result.user = user.username;
                result.password = user.password;
              } else {
                status = 500;
                result.status = status;
                result.error = err;
              }
              res.status(status).send(result);

            });
          }
        });
  },

  checkadmin: (req, res) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
    const options = {
        expiresIn: '2d',
        issuer: 'https://hackon.es',
        permissions: ["user:admin"],
        algorithms: ["HS256"],
        ignoreExpiration: true
      };

    result = jwt.verify(token, process.env.JWT_SECRET, options);
    if (result.permissions.includes('user:admin')) {
        endresult = {}
        endresult['Success'] = 'User is Admin Privileged'
        endresult['AdminURL'] = '/api/v2/users'
        endresult['User'] = result.user
        res.send(endresult);
      } else {
        endresult = {}
        endresult['Error'] = 'Error: User is missing [user:admin] privilege'
        endresult['User'] = result.user
        res.send(endresult);

      }
  },

  logout: (req, res) => {

    res.redirect("http://" + req.params.redirect);
      
  },


  login: (req, res) => {
    const { username, password } = req.body;
    //set_cors(req,res);
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
      let result = {};
      let status = 200;
        User.findOne({username}, (err, user) => {
          if (!err && user) {
            // We could compare passwords in our model instead of below as well
            bcrypt.compare(password, user.password).then(match => {
              if (match) {
                status = 200;
                if (user.admin == true) {
                  const payload = { user: user.username,"permissions": [
                    "user:read",
                    "user:write",
                    "user:admin"
                  ] };
                  const options = { expiresIn: '2d', issuer: 'https://hackon.es', algorithm: "HS256"};
                  const secret = process.env.JWT_SECRET;
                  const token = jwt.sign(payload, secret, options);
                  
                  result.token = token;
                  result.status = status;
                  result.result = user;
                } else {

                  const payload = { user: user.username,"permissions": [
                    "user:read",
                    "user:write"
                  ] };
                  const options = { expiresIn: '2d', issuer: 'https://hackon.es', algorithm: "HS256"};
                  const secret = process.env.JWT_SECRET;
                  const token = jwt.sign(payload, secret, options);
                  
                  result.token = token;
                  result.status = status;
                  result.result = user;
                }
                // Create a token
              
              } else {
                status = 401;
                result.status = status;
                result.error = `Authentication error`;
              }
              res.setHeader('Authorization', 'Bearer '+ result.token); 
              //res.cookie("SESSIONID", result.token, {httpOnly:true, secure:true});
              res.status(status).send(result);
            }).catch(err => {
              status = 500;
              result.status = status;
              result.error = err;
              res.status(status).send(result);

            });
          } else {
            status = 404;
            result.status = status;
            result.error = 'Login Failed! User ' + username + ' not found!';
            res.status(status).send(result);
          }
        })


  },

  getAll: (req, res) => {
    //res = set_cors(req,res)
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
      let result = {};
      let status = 200;


          User.find({}, (err, users) => {
            if (!err) {
              result.status = status;
              result.error = err;
              result.result = users;
            } else {
              status = 500;
              result.status = status;
              result.error = err;
            }
            res.status(status).send(result);
          })

  }
};