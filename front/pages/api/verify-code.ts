import type { NextApiRequest, NextApiResponse } from "next";
import { FindAccountResponse } from "@modelTypes/findAccountResponse";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone, code } = JSON.parse(req.body);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-code?phone=${phone}&code=${code}`,
  );
  const result: FindAccountResponse = await response.json();

  if (result.statusCode >= 400) {
    return res.status(result.statusCode).json({ message: result.message });
  }

  return res
    .status(result.statusCode)
    .json({ message: result.message, user: result.user });
};
