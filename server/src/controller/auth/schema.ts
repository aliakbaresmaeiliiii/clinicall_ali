import * as yup from 'yup';

export const registerSchema = yup.object().shape({
    userName: yup.string().required('userName is required'),
    email: yup.string().email('invalid email').required('email is required'),
    tokenVerify: yup.string().nullable(),
    password: yup.string().min(8, 'at least 8 charecters')
        .oneOf([yup.ref('confirmPassword')], 'password are not the same'),
    confirmPassword: yup.string().min(8, 'at least 8 charecters')
        .oneOf([yup.ref('password')], 'password are not the same')
});

export  const loginSchema = yup.object()
    .shape({
        email: yup.string().required('email is required'),
        password: yup.string().required('password is required'),
    }).required();
