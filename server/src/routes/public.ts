import express from "express";

const router = express.Router();

export default router;

//  APIs
require("../controller/auth/controller");
require("../controller/user/controller");
require("../controller/nav-items/controller");
require("../controller/appointment/controller");
require("../controller/admin/controller");
require("../controller/patients/controller");
require("../controller/doctors/controller");


