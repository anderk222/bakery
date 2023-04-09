import { config } from 'dotenv';

config();

export class Config {

    static app_port = process.env.PORT ? parseInt(process.env.PORT) : 3000  

}
  