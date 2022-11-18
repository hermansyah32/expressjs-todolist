import dotenv from './Infrastructures/env/env'; // load env first
import container from './Infrastructures/container';
import createServer from './Infrastructures/http/appServer';

const start = async () =>{
  const server = await createServer(container)
}

start();