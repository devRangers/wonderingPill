import type { NextPage } from "next";
import ErrorPage from "@errorContainer/ErrorPage";
import { SnsLoginError } from "@errorContainer/ErrorTypes";

const LoginErrorPage: NextPage = () => {
  return <ErrorPage {...SnsLoginError} />;
};

export default LoginErrorPage;
