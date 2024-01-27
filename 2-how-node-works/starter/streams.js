const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  //   fs.readFile(`${__dirname}/test-file.txt`, (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  //Solution 2: Streams
  //   const readable = fs.createReadStream(`${__dirname}/test-file.txt`);
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File not found");
  //   });
  // });

  //Solution 3: Pipe
  const readable = fs.createReadStream(`${__dirname}/test-file.txt`);
  readable.pipe(res);
});
server.listen(8000, "localhost", () => {
  console.log("Waiting for requests...");
});
