"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseError = void 0;
var base_response_1 = require("./base_response");
var internal_server_1 = require("./internal_server");
var unauthorized_1 = require("./unauthorized");
var forbidden_1 = require("./forbidden");
var not_found_1 = require("./not_found");
var bad_request_1 = require("./bad_request");
exports.ResponseError = {
    BaseResponse: base_response_1.BaseResponse,
    BadRequest: bad_request_1.BadRequest,
    NotFound: not_found_1.NotFound,
    Forbidden: forbidden_1.Forbidden,
    Unauthorized: unauthorized_1.Unauthorized,
    InternalServer: internal_server_1.InternalServer,
};
