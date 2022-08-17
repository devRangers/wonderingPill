import { GetServerSideProps } from "next";
import Container from "@userContainer/Container";
import NewPasswordForm from "components/account/newPassword/NewPasswordForm";
import { get } from "@api";
import { FindPasswordResponse } from "@modelTypes/findPasswordResponse";

interface NewPasswordProp {
  isValidToken: boolean;
}

function NewPassword({ isValidToken }: NewPasswordProp) {
  return (
    <Container>
      <NewPasswordForm isValidToken={isValidToken} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await get<FindPasswordResponse>(
    `/auth/change-password/check?token=${context.query.token}&email=${context.query.email}`,
  );
  const isValidToken = res.result.result;
  return {
    props: {
      isValidToken,
    },
  };
};

export default NewPassword;
