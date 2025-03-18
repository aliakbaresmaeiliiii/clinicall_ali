"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmailSchema = exports.confirmEmailSchema = exports.createPasswordSchema = exports.doctorSchema = void 0;
var yup = require("yup");
exports.doctorSchema = yup.object().shape({
    first_name: yup.string().required("first_name is required"),
    last_name: yup.string().required("last_name is required"),
    Specialization: yup.string().required("Specialization is required"),
    licenseNumber: yup.string().required("licenseNumber is required"),
    owner_name: yup.string().required("email is required"),
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
exports.createPasswordSchema = yup.object().shape({
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
exports.confirmEmailSchema = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
    verify_code: yup
        .string()
        .length(4, "Verify code should be 4 characters")
        .required("Verify code is required"),
});
exports.checkEmailSchema = yup.object().shape({
    email: yup.string().required("email is required!"),
});
