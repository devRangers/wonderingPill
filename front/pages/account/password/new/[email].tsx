import { GetServerSideProps } from "next";
import Container from "@userContainer/Container";
import NewPasswordForm from "components/account/newPassword/NewPasswordForm";
import { get } from "@api";

interface NewPasswordProp {
  data: boolean;
}

function NewPassword({ data }: NewPasswordProp) {
  return (
    <Container>
      <NewPasswordForm data={data} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await get(`/auth/change-password/check/${context.params}`);
  const result = await res.json();
  const data = true;

  return {
    props: {
      data,
    },
  };
};

export default NewPassword;
