import  express from 'express';
import {router} from './public';
import {ResponseError} from '../modules/error/response_error';

export const routes = express.Router();

/* Home Page. */
routes.get('/', function (req, res, next) {

    return res.send(`<h1>Welcome To Clicnic Support Center server</h1><br/><br/>
                    <h3>Find Api docs Here :</h3>
                    <h3><a>/v1/api-docs</a></h3>`)
  })

/* Forbidden Page. */
routes.get('/v1', function (req, res, next ) {
    throw new ResponseError.Forbidden('forbidden, wrong access endpoint')
  })

/* Declare Route */
routes.use('/v1', router)


