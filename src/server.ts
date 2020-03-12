
import app from "./App";
import http from 'http';
const PORT = 3000;
import dotenv  from 'dotenv';
dotenv.config();

const server = http.createServer(app);

server.listen(process.env.PORT, () =>  { 
    console.log(`Example app listening on port !${process.env.PORT}`); 
});

export { server };