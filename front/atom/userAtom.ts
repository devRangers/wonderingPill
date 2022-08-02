import { atom } from "jotai";
import { SigninResponseUser as User } from "@modelTypes/signinResponseUser";

const initialState: User = {
  id: "",
  email: "",
  name: "",
  profileImg: "",
};

export const userAtom = atom(initialState);
