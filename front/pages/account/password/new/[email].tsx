import { GetServerSideProps } from "next";
import Container from "@userContainer/Container";
import NewPasswordForm from "components/account/newPassword/NewPasswordForm";
import { get } from "@api";
import { FindPasswordResponse } from "@modelTypes/findPasswordResponse";

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
  const res = await get<FindPasswordResponse>(
    `/auth/change-password/check/${context.query.email}`,
  );
  const data = res.result.result;
  return {
    props: {
      data,
    },
  };
};

export default NewPassword;
