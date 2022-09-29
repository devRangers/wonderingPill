import {
  DataContainer,
  HeartContainer,
  Name,
  PharmarcyContainer,
  PhoneNumber,
} from "./Pharmarcy.style";
import { BsHeartFill } from "react-icons/bs";

interface PharmarcyProps {
  name: string;
  phoneNumber: string;
}

function Pharmarcy({ name, phoneNumber }: PharmarcyProps) {
  return (
    <PharmarcyContainer>
      <DataContainer>
        <Name>{name}</Name>
        <PhoneNumber>{phoneNumber}</PhoneNumber>
      </DataContainer>
      <HeartContainer>
        <BsHeartFill />
      </HeartContainer>
    </PharmarcyContainer>
  );
}

export default Pharmarcy;
