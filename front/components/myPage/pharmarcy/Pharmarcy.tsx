import {
  DataContainer,
  HeartContainer,
  Name,
  PharmarcyContainer,
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
        <Name>{phoneNumber}</Name>
      </DataContainer>
      <HeartContainer>heart</HeartContainer>
    </PharmarcyContainer>
  );
}

export default Pharmarcy;
