import Container from "@userContainer/Container";
import FindPasswordForm from "components/account/findPassword/FindPasswordForm";
import { useRouter } from "next/router";
import React from "react";

function FindPassword() {
  const router = useRouter();

  return (
    <Container>
      <FindPasswordForm />
    </Container>
  );
}

export default FindPassword;
