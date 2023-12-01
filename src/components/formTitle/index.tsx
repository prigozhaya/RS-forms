import { useNavigate } from 'react-router-dom';
import { FormTitleProps, FormType } from '../../types/types';
import './styles.css';

export default function FormTitle(formProps: FormTitleProps) {
  const {form} = formProps
const title = form === FormType.reactHook ? "React Hook Form" : "Uncontrolled Form";
const link = form === FormType.reactHook ? "/reactHookForm" : "/uncontrolledComponentsForm";

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(link);
  };

  return (
<div className="formTitle">
<h3>{title}</h3>
<button className="formButton" onClick={handleNavigate}>Form</button>
</div>
  );
}
