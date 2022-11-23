import { get, delete as del } from "@api";
import { AI_SERVER_API, PILLS } from "@utils/endpoint";
import { GetPresignedUrlResponseDto as GetPresignedDto } from "@modelTypes/getPresignedUrlResponseDto";

export const getPreSignedURL = (id: string) => {
  return get<GetPresignedDto>(PILLS.PREGINED_URL(id));
};

export const postImageToAIServer = (body: { imgURL: string }) => {
  return fetch(AI_SERVER_API.PREDICT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};

export const deleteImageOnGCS = (id: string) => {
  return del(PILLS.PREGINED_URL(id));
};
