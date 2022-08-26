import { atom } from "jotai";
import { SigninResponseUser as User } from "@modelTypes/signinResponseUser";

const initialState: User = {
  id: "",
  email: "",
  name: "",
  profileImg: "",
  provider: "",
  phone: "",
};

export const userAtom = atom(initialState);
