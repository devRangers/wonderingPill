import type { NextApiRequest, NextApiResponse } from "next";
import { FindAccountResponse } from "@modelTypes/findAccountResponse";
import { AUTH } from "@utils/endpoint";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, code } = JSON.parse(req.body);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}${AUTH.VERIFY_CODE}?phone=${phone}&code=${code}`,
  );
  const result: FindAccountResponse = await response.json();

  if (result.statusCode >= 400) {
    return res.status(result.statusCode).json({ message: result.message });
  }

  return res
    .status(result.statusCode)
    .json({ message: result.message, user: result.user });
};
