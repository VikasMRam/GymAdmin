const http = require('http');
const redis = require('redis');
const connect = require('connect');
const cookie = require('cookie'); // cookie parser
const BSON = require('bson');

const PORT = 3030;

const redis_validate = redis.createClient('redis://localhost:6379/2');
const app = connect();

app.use((req, res, next) => {
  if (req.headers.cookie) {
    req.cookie = cookie.parse(req.headers.cookie);
    next();
  } else {
    next('Unauthorized user');
  }
});

app.use((req, res, next) => {
  const session_id = 'senly:session:' + req.cookie['_senly_session'];
  // retrieve session = require(redis using the unique key stored in cookies
  redis_validate.get(session_id, function (err, json) {
    if (err || !json) {
      return next('Unauthorized user', false);
    }
    const session = JSON.parse(json);
    session.user_id = session['warden.user.user.key'][0][0];
    session.session_id = session_id;
    req.session = session;
    next(null, true);
  });
});

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const { user_id, session_id } = req.session;
  res.end(`User: ${user_id}, logged in with session ${session_id}<br/><a style="text-decoration: none;" href="/">☠️ </a>`);
});

const server = http.createServer(app);
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`Node server started ${PORT}`);
});

