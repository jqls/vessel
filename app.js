var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3008);

var msg_list = new Array(15);
for(let i=0; i<15; i++){
  msg_list[i] = i.toString();
}


function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log('get request to connect');
  socket.emit('message', 'Connection established from socket server.');
  for(let i=0; i< 30; i++){
    socket.emit('message', 'Message N0.' + i.toString() + 'received from server.');
  }
  socket.on('my other event', function (data) {
    console.log(data);
    //socket.emit('message', 'ssfakhgakhgkah');
  });
});

function sleep(n) {
    var start = new Date().getTime();
    while(true)  
      if(new Date().getTime()-start > n) 
        break;
}

// for(let i=0; i< 15; i++){
//   io.socket.send('message', 'Message N0.' + i.toString() + 'received from server.');

// }