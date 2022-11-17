import { get, patch } from "@api";
import { AUTH, USERS } from "@utils/endpoint";
import { SigninResponse } from "@modelTypes/signinResponse";
import { GetPresignedUrlResponseDto } from "@modelTypes/getPresignedUrlResponseDto";

export const getSignedURL = () => {
  return get<GetPresignedUrlResponseDto>(USERS.PRESIGNED_URL);
};

export const putImageOnGCS = (url: string, file: File) => {
  return fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": "application/octet-stream",
    },
  });
};

export const patchProfileImg = (imgURL: string) => {
  return patch(USERS.PROFILE_IMG(imgURL));
};

export const getUser = () => {
  return get<SigninResponse>(AUTH.CURRENT);
};
