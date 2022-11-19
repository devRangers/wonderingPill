import { get, delete as del } from "@api";
import { PILLS } from "@utils/endpoint";
import { GetPresignedUrlResponseDto as GetPresignedDto } from "@modelTypes/getPresignedUrlResponseDto";

export const getPreSignedURL = (id: string) => {
  return get<GetPresignedDto>(PILLS.PREGINED_URL(id));
};

export const postImageToAIServer = (body: { imgURL: string }) => {
  return fetch(`${process.env.NEXT_PUBLIC_AI_SERVER_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const deleteImageOnGCS = (id: string) => {
  return del(PILLS.PREGINED_URL(id));
};
