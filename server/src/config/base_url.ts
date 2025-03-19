
import dotenv from "dotenv";
dotenv.config();


const URL_CLIENT = {
    development: 'http://localhost:4200',
    staging: '',
    production: 'http://172.20.10.5:8000',
}

const URL_SERVER = {
    development: `http://localhost:${process.env.PORT || 8000}`,
    staging: '',
    production: '',
}

const ENV = process.env.NODE_ENV || 'development'
// @ts-ignore
const BASE_URL_CLIENT = URL_CLIENT[ENV]
// @ts-ignore
const BASE_URL_SERVER = URL_SERVER[ENV]

export { BASE_URL_CLIENT, BASE_URL_SERVER }


export const config = {
    elasticsearch: {
      host: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
      username: process.env.ELASTICSEARCH_USERNAME || "elastic",
      password: process.env.ELASTICSEARCH_PASSWORD || "",
    },
  };