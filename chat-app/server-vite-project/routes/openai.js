// will represent all routes that point to openai

import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index.js";

dotenv.config();

//will allow to use routes in a different file
const router = express.Router();

router.post("/text", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    // console.log('req.body', req.body);

    //making the API call:

    const response = await openai.chat.completions.create({
      //refer openai api reference
      //temperature: more random/ creative vs direct
      //max-tokens- length of response
      //see more on guide

      model: "gpt-3.5-turbo",
      messages: [
        // this represents the bot and what role they will assume
        {
          role: "system",
          content:
            "You are a helpful assistant. Your name is AI_Bot_Pete. Don't help the user in cheating.",
        },
        //the message the user sends
        { role: "user", content: text },
      ],
    });

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.choices[0].message.content });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/code", async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    // console.log('req.body', req.body);

    //making the API call:

    const response = await openai.chat.completions.create({
      //refer openai api reference
      //temperature: more random/ creative vs direct
      //max-tokens- length of response
      //see more on guide

      model: "gpt-3.5-turbo",
      messages: [
        // this represents the bot and what role they will assume
        {
          role: "system",
          content:
            "You are an assistant coder who responds with only code and no explanations.",
        },
        //the message the user sends
        { role: "user", content: text },
      ],
    });

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.choices[0].message.content },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );

    res.status(200).json({ text: response.choices[0].message.content });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/assist", async (req, res) => {
  try {
    const { text } = req.body;
    // console.log('req.body', req.body);

    //making the API call:

    const response = await openai.chat.completions.create({
      //refer openai api reference
      //temperature: more random/ creative vs direct
      //max-tokens- length of response
      //see more on guide

      model: "gpt-3.5-turbo",
      messages: [
        // this represents the bot and what role they will assume
        {
          role: "system",
          content:
            "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
        },
        //the message the user sends
        { role: "user", content: `Finish my thought: ${text}` },
      ],
    });

    //console.log('assist response:', response.choices[0].message.content)

    res.status(200).json({ text: response.choices[0].message.content });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: error.message });
  }
});

//need to export the router since we will use this in index.js

export default router;
