import * as yup from "yup";

export const nameSchema = yup
  .string()
  .test("nameFirstLetter", "First letter must be uppercased", (value) => {
    return value?.slice(0, 1) === value?.slice(0, 1).toUpperCase();
  })
  .required("The field mustn't be empty");
export const ageSchema = yup
  .number()
  .typeError("Must be a number")
  .positive()
  .required("The field mustn't be empty");

export const emailSchema = yup
  .string()
  .email("e-mail address must contain an '@' and domain name")
  .required("The field mustn't be empty");
export const genderSchema = yup.string().required("The field mustn't be empty");
export const passwordSchema = yup
  .string()
  .min(8, "Password has to be longer than 8 characters!")
  .required("The field mustn't be empty");
export const passwordConfirmationSchema = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords must match")
  .required("The field mustn't be empty");
export const acceptSchema = yup
  .bool()
  .oneOf([true], "You must accept the terms and conditions");
export const imageSchema = yup
  .mixed()
  .test("type", "We only support jpeg/png", (value) => {
    return value
      ? (value as File[]).length > 0 &&
          value &&
          ((value as File[])[0]?.type === "image/jpeg" ||
            (value as File[])[0].type === "image/png")
      : false;
  })
  .test("fileSize", "The file is too large", (value) => {
    return value
      ? (value as File[]).length > 0 && (value as File[])[0]?.size <= 1000000
      : false;
  });
export const countrySchema = yup
  .string()
  .required("The field mustn't be empty");
