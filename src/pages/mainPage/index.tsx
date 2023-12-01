import './styles.css';
import FormTitle from "../../components/formTitle";
import { FormType } from "../../types/types";
import InfoCard from '../../components/infoCard';

export default function HomePage() {
  return (
    <>
      <div className="pageContainer">
        <div className="formBlock">
          <FormTitle form={FormType.reactHook} />
          <InfoCard/>
        </div>
        <div className="formBlock">
          <FormTitle form={FormType.uncontrolled} />
          <InfoCard/>

        </div>
      </div>
    </>
  );
}
