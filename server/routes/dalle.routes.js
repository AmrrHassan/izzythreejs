import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: 'preventUseOfapiKeyToThisProject',
});
const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E Routes" });
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createImage({
      prompt,
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });

  } catch (error) {
    console.error("Avatar error message: ", error.message);
    console.error("Avatar error response data: ", error.response?.data);
    console.error("Avatar error status: ", error.response?.status);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
