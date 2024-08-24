import  express from 'express';
import publicRoute from './public';
import ResponseError from '../modules/error/response_error';

const router = express.Router();

/* Home Page. */
router.get('/', function (req, res, next) {

    return res.send(`<h1>Welcome To BeED Support Center server</h1><br/><br/>
                    <h3>Find Api docs Here :</h3>
                    <h3><a>/v1/api-docs</a></h3>`)
  })

/* Forbidden Page. */
router.get('/v1', function (req, res, next ) {
    throw new ResponseError.Forbidden('forbidden, wrong access endpoint')
  })

/* Declare Route */
router.use('/v1', publicRoute)

export default router

