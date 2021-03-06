var ws = require("nodejs-websocket")

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
  console.log("New connection")
  conn.sendText("New connection")
  conn.on("text", function (str) {
    console.log("Received "+str)
    conn.sendText(str.toUpperCase()+"!!!")
  })
  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  })
  conn.on('error',function (errobj) {
    console.log(JSON.stringify(errobj))
  })
}).listen(8001)
