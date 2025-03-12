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
require("../controller/medications/controller");
require("../controller/diseases/controller");
require("../controller/prescription-medicine/controller");
require("../controller/clinic_services/controller");
require("../controller/cities/controller");
require("../controller/insurance/controller");
require("../controller/clinic/controller");
require("../controller/elastic-search/controlleer");
