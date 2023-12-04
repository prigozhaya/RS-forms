import { InfoCardProps } from "../../types/types";
import "./styles.css";

export default function InfoCard({ data }: InfoCardProps) {
  const { name, age, email, gender, image, country, newInfo } = data;
  const newInfoIndicator = newInfo ? "newInfo" : "";
  return (
    <div className={`infoCard ${newInfoIndicator}`}>
      <img src={`${image}`} alt="img" className="avatar" />
      <h3>Name: {name}</h3>
      <h3>Age: {age}</h3>
      <h3>email: {email}</h3>
      <h3>Gender: {gender}</h3>
      <h3>Country: {country}</h3>
    </div>
  );
}
