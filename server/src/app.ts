/* eslint-disable no-unused-vars */
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import userAgent from "express-useragent";
import helmet from "helmet";
import hpp from "hpp";
import createError from "http-errors";
import path from "path";
import requestIp from "request-ip";
import { allowedOrigins } from "./constants/constants_allowed_orginal";
import { ExpressAutoHandleTransaction } from "./middlewares/express_auto_handle_transaction";
import { ExpressErrorResponse } from "./middlewares/express_error_response";
import { ExpressErrorYup } from "./middlewares/express_error_yup";
import { routes } from "./routes/index";

// TODO: change to .ts
const optCors: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
const app = express();



// view engine setup
app.set("views", path.join(`${__dirname}/../`, "views"));
// app.set('view engine', 'pug')

app.use(helmet());
app.use(cors(optCors));
// app.use(logger('combined', { stream: winstonStream }))
app.use(express.urlencoded({ extended: true })); // TODO :  check it should be false or true
app.use(
  express.json({
    limit: "200mb",
    type: "application/json",
  })
);

app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(`${__dirname}/../`, "public")));
app.use(hpp());
app.use(userAgent.express());
app.use(requestIp.mw());
// TODO : add this later

// Initial Route
app.use(routes);

// app.use('/v1', handleRollbackTransaction)
app.use("/v1", ExpressErrorYup);
app.use("/v1", ExpressErrorResponse);
app.use(ExpressAutoHandleTransaction);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
