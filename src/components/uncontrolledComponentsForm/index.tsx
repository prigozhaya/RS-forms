import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import * as yup from "yup";
import { PasswordStrength } from "../reactHookForm/validation/PasswordStrength";
import { setuncontrolledComponentsForm } from "../../store/slice/uncontrolledComponentsFormSlice";
import { useNavigate } from "react-router-dom";
export default function UncontrolledComponentsForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries.country);

  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);
  const country = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const accept = useRef<HTMLInputElement>(null);

  const [nameError, setNameError] = useState<string | null>("");
  const [ageError, setAgeError] = useState<string | null>("");
  const [emailError, setEmailError] = useState<string | null>("");
  const [passwordError, setPasswordError] = useState<string | null>("");
  const [passwordConfirmationError, setPasswordConfirmationError] = useState<
    string | null
  >("");
  const [countryError, setCountryError] = useState<string | null>("");
  const [genderError, setGenderError] = useState<string | null>("");
  const [imageError, setImageError] = useState<string | null>("");
  const [acceptError, setAcceptError] = useState<string | null>("");
  const [gender, setGender] = useState<string | null>("");

  function handleSetGender(e: React.ChangeEvent<HTMLInputElement>) {
    setGender(e.target.value);
  }

  const nameSchema = yup
    .string()
    .test("nameFirstLetter", "First letter must be uppercased", (value) => {
      return value?.slice(0, 1) === value?.slice(0, 1).toUpperCase();
    })
    .required("The field mustn't be empty");
  const ageSchema = yup
    .number()
    .typeError("Must be a number")
    .positive()
    .required("The field mustn't be empty");

  const emailSchema = yup
    .string()
    .email("e-mail address must contain an '@' and domain name")
    .required("The field mustn't be empty");
  const genderSchema = yup.string().required("The field mustn't be empty");
  const passwordSchema = yup
    .string()
    .min(8, "Password has to be longer than 8 characters!")
    .required("The field mustn't be empty");
  const passwordConfirmationSchema = yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("The field mustn't be empty");
  const acceptSchema = yup
    .bool()
    .oneOf([true], "You must accept the terms and conditions");
  const imageSchema = yup
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
  const countrySchema = yup.string().required("The field mustn't be empty");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      name: name?.current?.value,
      age: age?.current?.value,
      email: email?.current?.value,
      password: password?.current?.value,
      passwordConfirmation: passwordConfirmation?.current?.value,
      country: country?.current?.value,
      gender: gender,
      file: image?.current?.files,
      image: "",
      accept: accept?.current?.checked,
      newInfo: true,
    };
    try {
      nameSchema.validateSync(formData.name);
      setNameError("");
    } catch (e) {
      setNameError((e as Error).message);
    }
    try {
      ageSchema.validateSync(formData.age);
      setAgeError("");
    } catch (e) {
      setAgeError((e as Error).message);
    }
    try {
      emailSchema.validateSync(formData.email);
      setEmailError("");
    } catch (e) {
      setEmailError((e as Error).message);
    }
    try {
      genderSchema.validateSync(formData.gender);
      setGenderError("");
    } catch (e) {
      setGenderError((e as Error).message);
    }
    try {
      genderSchema.validateSync(formData.gender);
      setGenderError("");
    } catch (e) {
      setGenderError((e as Error).message);
    }
    try {
      passwordSchema.validateSync(formData.password);
      setPasswordError("");
    } catch (e) {
      setPasswordError((e as Error).message);
    }
    try {
      passwordConfirmationSchema.validateSync(formData.passwordConfirmation);
      setPasswordConfirmationError("");
    } catch (e) {
      setPasswordConfirmationError((e as Error).message);
    }
    try {
      acceptSchema.validateSync(formData.accept);
      setAcceptError("");
    } catch (e) {
      setAcceptError((e as Error).message);
    }
    try {
      imageSchema.validateSync(formData.file);
      setImageError("");
    } catch (e) {
      setImageError((e as Error).message);
    }
    try {
      countrySchema.validateSync(formData.country);
      setCountryError("");
    } catch (e) {
      setCountryError((e as Error).message);
    }
    if (formData.file) formData.image = URL.createObjectURL(formData.file[0]);
    dispatch(setuncontrolledComponentsForm(formData));
    navigate("/");
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label htmlFor="name-field">
            <input type="text" id="name-field" placeholder="Name" ref={name} />
          </label>
          <p className="errorMsg">{nameError}</p>
        </div>
        <div>
          <label htmlFor="age-field">
            <input type="number" id="age-field" placeholder="Age" ref={age} />
          </label>

          <p className="errorMsg">{ageError}</p>
        </div>
        <div>
          <label htmlFor="email-field">
            <input
              type="text"
              id="email-field"
              placeholder="e-mail"
              ref={email}
            />
          </label>

          <p className="errorMsg">{emailError}</p>
        </div>
        <div>
          <label htmlFor="password-field">
            <input
              type="password"
              id="password-field"
              placeholder="Password"
              ref={password}
            />
          </label>

          <span
            className="hint"
            title="Password must contain at least one lowercase letter (a-z), at least one uppercase letter (A-Z), at least one digit and at least one special character "
          >
            ?
          </span>

          <span className="errorMsg errorPassword">
            {passwordError}
            {password.current?.value.length &&
              password.current?.value.length > 0 && (
                <PasswordStrength value={password?.current?.value || ""} />
              )}
          </span>
        </div>
        <div>
          <label htmlFor="password-confirmation-field">
            <input
              type="password"
              id="password-confirmation-field"
              placeholder="Password confirmation"
              ref={passwordConfirmation}
            />
          </label>

          <p className="errorMsg">{passwordConfirmationError}</p>
        </div>
        <div>
          <label htmlFor="country-field">
            <input
              list="countryList"
              id="country-field"
              placeholder="Country"
              ref={country}
            />
          </label>

          <datalist id="countryList">
            {countries.map((country: string) => (
              <option value={country} key={country}></option>
            ))}
          </datalist>
          <p className="errorMsg">{countryError}</p>
        </div>
        <div>
          <legend>Gender:</legend>
          <label htmlFor="genderWoman-field">
            Woman
            <input
              type="radio"
              id="genderWoman-field"
              value="woman"
              name="gender"
              onChange={handleSetGender}
            />
          </label>
          <label htmlFor="genderMan-field">
            Man
            <input
              type="radio"
              id="genderMan-field"
              value="man"
              name="gender"
              onChange={handleSetGender}
            />
          </label>
          <p className="errorMsg">{genderError}</p>
        </div>
        <div>
          <label htmlFor="image-field">
            Picture :
            <input type="file" id="image-field" ref={image} />
          </label>
          <p className="errorMsg">{imageError}</p>
        </div>
        <div>
          <label htmlFor="accept-field">
            Accept terms and conditions
            <input type="checkbox" id="accept-field" ref={accept} />
          </label>
          <p className="errorMsg">{acceptError}</p>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
