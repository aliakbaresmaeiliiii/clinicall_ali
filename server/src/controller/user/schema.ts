import * as yup from "yup";

export const createSchema = yup.object().shape({
  fistName: yup.string().required("fistName is required"),
  lastName: yup.string().required("lastName is required"),
  nickName: yup.string().required("nickName is required"),
  gender: yup.string().required("gender is required"),
  birthDay: yup.string().required("birthDay is required"),
  email: yup.string().email("invalid email").required("email is required"),
  phoneNumber: yup.string().nullable(),
  tokenVerify: yup.string().nullable(),
password: yup
    .string()
    .min(8, "at least 8 characters")
    .oneOf([yup.ref("confirmPassword")], "passwords are not the same"),
  confirmPassword: yup
    .string()
    .min(8, "at least 8 characters")
    .oneOf([yup.ref("password")], "passwords are not the same"),
});
export const createPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .min(8, "at least 8 characters")
    .oneOf([yup.ref("confirmPassword")], "passwords are not the same"),
  confirmPassword: yup
    .string()
    .min(8, "at least 8 characters")
    .oneOf([yup.ref("newPassword")], "passwords are not the same"),
});
export const userRolesSchema = yup
  .object()
  .shape({
    userId: yup.string().required("userId is required"),
  })
  .required();

  export  const latestTemplatesSchema = yup
  .object()
  .shape({
    userId: yup.string().required("userId is required"),
  })
  .required();

  export  const confirmEmailSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  // id: yup.string().required("user id is required"),
  verify_code: yup
    .string()
    .required("verify code is required")
    .min(4, "verify code should be 4 chr")
    .max(4, "verify code should be 4 chr"),
});

export const checkEmailSchema = yup.object().shape({
  email: yup.string().required("email is required!"),
});


