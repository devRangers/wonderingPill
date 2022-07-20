import type { NextPage } from "next";
import Container from "@userContainer/Container";
import FindEmailForm from "@accountComp/findEmail/FindEmailForm";

const FindEmailPage: NextPage = () => {
  return (
    <>
      <Container>
        <FindEmailForm />
      </Container>
    </>
  );
};

export default FindEmailPage;
