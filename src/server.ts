
import app from "./App";
import http from 'http';
const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () =>  { 
    console.log('Example app listening on port 3000!'); 
});

export { server };