const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeaders("Content-Type", "text/html");
    res.write("Hello World to my Homepage");
    res.end();
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
