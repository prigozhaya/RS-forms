import { useNavigate } from "react-router-dom";
import { FormTitleProps, FormType } from "../../types/types";
import "./styles.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setReactHookForm } from "../../store/slice/reactHookFormSlice";
import { setuncontrolledComponentsForm } from "../../store/slice/uncontrolledComponentsFormSlice";

export default function FormTitle(formProps: FormTitleProps) {
  const { form } = formProps;
  const title =
    form === FormType.reactHook ? "React Hook Form" : "Uncontrolled Form";
  const link =
    form === FormType.reactHook
      ? "/reactHookForm"
      : "/uncontrolledComponentsForm";

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const reactHookFormData = useAppSelector((state) => state.reactHookForm);
  const uncontrolledFormData = useAppSelector(
    (state) => state.uncontrolledComponentsForm,
  );

  const handleNavigate = () => {
    dispatch(setReactHookForm({ ...reactHookFormData, newInfo: false }));
    dispatch(
      setuncontrolledComponentsForm({
        ...uncontrolledFormData,
        newInfo: false,
      }),
    );
    navigate(link);
  };

  return (
    <div className="formTitle">
      <h3>{title}</h3>
      <button className="formButton" onClick={handleNavigate}>
        Form
      </button>
    </div>
  );
}
