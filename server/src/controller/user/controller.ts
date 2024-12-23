import { Request, Response } from "express";
import { asyncHandler } from "../../helper/async-handler";
import { getUniqueCodev3 } from "../../helper/common";
import { BuildResponse } from "../../modules/response/app_response";
import { router } from "../../routes/public";
import { UserService } from "./sercvice";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/imgProfile");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadImgProfile = multer({ storage });

// ***** checkNickName
router.get(
  "/user/checkNickName/:nickname",
  asyncHandler(async function checkNickName(req: Request, res: Response) {
    const formData = req.params.nickname;
    const result = await UserService.checkNickName(formData);
    res.json(result);
  })
);
// ***** getUserInfo
router.get(
  "/getUserInfo/:email",
  async function getAllUserData(req: Request, res: Response) {
    const data = req.params.email;
    const userData = await UserService.getUserInfo(data);
    const buildResponse = BuildResponse.get(userData);
    return res.json(buildResponse);
  }
);
// ***** confirm
router.post(
  "/user/confirm",
  asyncHandler(async function confirmEmail(req: Request, res: Response) {
    const formData = req.body;
    const result = await UserService.confrimEmail(formData);
    res.status(result.code).json(result);
  })
);
// ***** getOTP
router.get(
  "/user/getOTP/:email",
  asyncHandler(async function getOTP(req: Request, res: Response) {
    const formData = req.params.email;
    const verify_code = getUniqueCodev3();
    const result = await UserService.getVerifyCode(formData, verify_code);
    const buildResponse = await BuildResponse.get(result);
    res.json(buildResponse);
  })
);
// ***** updateProfile
router.put(
  `/user/updateProfile`,
  asyncHandler(async function updateProfileUser(req: Request, res: Response) {
    const formData = req.body;
    const result = await UserService.updateProfileuser(formData);
    const buildResponse = await BuildResponse.get(result);
    res.json(buildResponse);
  })
);

// ***** forgot-passsword

router.get(
  "/user/forgot-passsword/:email",
  asyncHandler(async function forgetPsssword(req: any, res: any) {
    const email = req.params.email;
    const data = await UserService.sendFrogetPasswordToken(email);
    const buildResponse = await BuildResponse.get(data);
    res.json(buildResponse);
  })
);

router.post(
  `/user/change-password`,
  asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const getData = await UserService.changePassword(data);
    const buildResponse = BuildResponse.get(getData);
    res.json(buildResponse);
  })
);

// **** uploadImage
router.post(
  "/admin/uploadImage",
  uploadImgProfile.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    res.json({
      message: "File uploaded seccessfully",
      filename: req.file.filename,
    });
    const imagePath = req.file.path;
    res.json({ imagePath });
  }
);
