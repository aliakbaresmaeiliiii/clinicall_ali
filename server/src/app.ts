/* eslint-disable no-unused-vars */
import hpp from "hpp";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import requestIp from "request-ip";
import compression from "compression";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import { routes } from "./routes/index";
import userAgent from "express-useragent";
import { ExpressErrorYup } from "./middlewares/express_error_yup";
import express, { NextFunction, Request, Response } from "express";
import { allowedOrigins } from "./constants/constants_allowed_orginal";
import { ExpressErrorResponse } from "./middlewares/express_error_response";
import { ExpressAutoHandleTransaction } from "./middlewares/express_auto_handle_transaction";
import { Client } from "@elastic/elasticsearch";
import { syncDoctorsToElasticsearch } from "./scripts/syncDoctors";

// TODO: change to .ts
const optCors: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
const app = express();


const esClient = new Client({
  node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",  // ✅ مقدار پیش‌فرض اضافه شد
});

// ******  Elastic Search/ ******
async function testConnection() {
  try {
    const health = await esClient.cluster.health({});
    console.log("✅ Elasticsearch is connected:", health);

    // ✅ اگر اتصال موفقیت‌آمیز بود، داده‌ها را سینک کن
    await syncDoctorsToElasticsearch();
  } catch (error) {
    console.error("❌ Elasticsearch connection error:", error);
  }
}
testConnection();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELTE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// view engine setup
app.set("views", path.join(`${__dirname}/../`, "views"));
// app.set('view engine', 'pug')

app.use(helmet());
app.use(cors(optCors));
// app.use(logger('combined', { stream: winstonStream }))
app.use(express.urlencoded({ extended: false })); // TODO :  check it should be false or true
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
