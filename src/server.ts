
import app from "./App";
import http from 'http';

const server = http.createServer(app);

server.listen(process.env.PORT, () =>  { 
    console.log(`Example app listening on port !${process.env.PORT}`); 
});

export { server };