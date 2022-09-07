import connectMongo from "../../../utils/connectMongo";
import Word from "../../../models/word";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function addWord(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectMongo();
    const word = await Word.create(req.body);
    res.status(201).json({ word });
  } catch (err) {
    res.status(400).json({ error: "Internal server error" });
  }
}
