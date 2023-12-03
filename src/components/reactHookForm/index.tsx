import "./styles.css";
import { FieldValues, useForm } from "react-hook-form";
import { PasswordStrength } from "./validation/PasswordStrength";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setReactHookForm } from "../../store/slice/reactHookFormSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ReactHookForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const countries = useAppSelector((state) => state.countries.country);
  const [password, setPassword] = useState<string>("");

  const schema = yup.object().shape({
    name: yup
      .string()
      .test("nameFirstLetter", "First letter must be uppercased", (value) => {
        return value?.slice(0, 1) === value?.slice(0, 1).toUpperCase();
      })
      .required("The field mustn't be empty"),
    age: yup
      .number()
      .typeError("Must be a number")
      .positive()
      .required("The field mustn't be empty"),
    email: yup
      .string()
      .email("e-mail address must contain an '@' and domain name")
      .required("The field mustn't be empty"),
    gender: yup.string().required("The field mustn't be empty"),
    password: yup
      .string()
      .min(8, "Password has to be longer than 8 characters!")
      .required("The field mustn't be empty"),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("The field mustn't be empty"),
    accept: yup
      .bool()
      .oneOf([true], "You must accept the terms and conditions"),
    image: yup
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
          ? (value as File[]).length > 0 &&
              (value as File[])[0]?.size <= 1000000
          : false;
      }),
    country: yup.string().required("The field mustn't be empty"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    data.image = URL.createObjectURL(data.image[0]);
    data.newInfo = true;
    dispatch(setReactHookForm(data));
    navigate("/");
  };

  function handleSetPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Name"
            {...register("name")}
          />
          <p className="errorMsg">{errors?.name && errors?.name.message}</p>
        </div>
        <div>
          <input
            type="number"
            id="age"
            placeholder="Age"
            {...register("age")}
          />
          <p className="errorMsg">{errors?.age && `${errors?.age.message}`}</p>
        </div>
        <div>
          <input
            type="text"
            id="email"
            placeholder="e-mail"
            {...register("email")}
          />
          <p className="errorMsg">
            {errors?.email && `${errors?.email.message}`}
          </p>
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password")}
            onChange={handleSetPassword}
          />
          <span
            className="hint"
            title="Password must contain at least one lowercase letter (a-z), at least one uppercase letter (A-Z), at least one digit and at least one special character "
          >
            ?
          </span>

          <span className="errorMsg errorPassword">
            {errors?.password && `${errors?.password.message}`}{" "}
            {password.length > 0 && (
              <PasswordStrength value={password} />
            )}
          </span>
        </div>
        <div>
          <input
            type="password"
            id="passwordConfirmation"
            placeholder="Password confirmation"
            {...register("passwordConfirmation")}
          />
          <p className="errorMsg">
            {errors?.passwordConfirmation &&
              `${errors?.passwordConfirmation.message}`}
          </p>
        </div>
        <div>
          <input
            list="countryList"
            id="country"
            {...register("country")}
            placeholder="Country"
          />

          <datalist id="countryList">
            {countries.map((country: string) => <option value={country}></option> )}
          </datalist>
          <p className="errorMsg">
            {errors?.country && `${errors?.country.message}`}
          </p>
        </div>
        <div>
          <legend>Gender:</legend>
          <label>
            Woman
            <input
              type="radio"
              id="woman"
              {...register("gender")}
              value="woman"
              defaultChecked
            />
          </label>
          <label>
            Man
            <input type="radio" id="man" value="man" {...register("gender")} />
          </label>
        </div>
        <div>
          <label>
            Picture :
            <input type="file" id="image" {...register("image")} />
          </label>
          <p className="errorMsg">
            {errors?.image && `${errors?.image.message}`}
          </p>
        </div>
        <div>
          <label>
            Accept terms and conditions
            <input type="checkbox" id="accept" {...register("accept")} />
          </label>
          <p className="errorMsg">
            {errors?.accept && `${errors?.accept.message}`}
          </p>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}
