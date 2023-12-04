import "./styles.css";
import FormTitle from "../../components/formTitle";
import { FormType } from "../../types/types";
import InfoCard from "../../components/infoCard";
import { useAppSelector } from "../../store/hooks";

export default function HomePage() {
  const reactHookFormData = useAppSelector((state) => state.reactHookForm);
  const uncontrolledFormData = useAppSelector(
    (state) => state.uncontrolledComponentsForm,
  );
  return (
    <>
      <div className="pageContainer">
        <div className="formBlock">
          <FormTitle form={FormType.reactHook} />
          <InfoCard data={reactHookFormData} />
        </div>
        <div className="formBlock">
          <FormTitle form={FormType.uncontrolled} />
          <InfoCard data={uncontrolledFormData} />
        </div>
      </div>
    </>
  );
}
