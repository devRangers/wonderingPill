import { atomWithStorage } from "jotai/utils";
import { SigninResponseUser as User } from "@modelTypes/signinResponseUser";

const initialState: User = {
  id: "",
  email: "",
  name: "",
  profileImg: "",
};

export const userAtom = atomWithStorage<User>("user", initialState);
