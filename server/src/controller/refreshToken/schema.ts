import * as yup from "yup";

const create = yup.object().shape({
  email: yup.string().required("usre email is required"),
  token: yup.string().required("token is required"),
});

export default {
  create,
};
