import {
  DataContainer,
  HeartContainer,
  Name,
  PharmarcyContainer,
  PhoneNumber,
} from "./Pharmarcy.style";

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
      <HeartContainer>heart</HeartContainer>
    </PharmarcyContainer>
  );
}

export default Pharmarcy;
