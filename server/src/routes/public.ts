import express from "express";

export const router = express.Router();

//  APIs
require("../controller/auth/controller");
require("../controller/user/controller");
require("../controller/nav-items/controller");
require("../controller/appointment/controller");
require("../controller/admin/controller");
require("../controller/patients/controller");
require("../controller/doctors/controller");
require("../controller/medicine/controller");


