import * as yup from "yup";

export const registerClinicSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  owner_name: yup.string().required("owner_name is required"),
  email: yup.string().email("invalid email").required("email is required"),
  phone: yup.string().nullable(),
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
// export const userRolesSchema = yup
//   .object()
//   .shape({
//     userId: yup.string().required("userId is required"),
//   })
//   .required();

//   export  const latestTemplatesSchema = yup
//   .object()
//   .shape({
//     userId: yup.string().required("userId is required"),
//   })
//   .required();

export const confirmEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  verify_code: yup
    .string()
    .length(4, "Verify code should be 4 characters")
    .required("Verify code is required"),
});

export const checkEmailSchema = yup.object().shape({
  email: yup.string().required("email is required!"),
});
