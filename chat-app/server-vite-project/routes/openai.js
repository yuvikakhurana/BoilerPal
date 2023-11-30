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
    console.log("text", text);

    const response = await openai.chat.completions.create({
      //refer openai api reference
      //temperature: more random/ creative vs direct
      //max-tokens- length of response
      //see more on guide

      model: "gpt-3.5-turbo-0613",
      messages: [
        // this represents the bot and what role they will assume
        {
          role: "system",
          content:
            "You are a helpful assistant for Purdue students who gives a Purdue Trivia bit after every reply. Answer the questions being asked using context of Purdue University. You may also need to call functions related to classes and events for some questions. ",
        },
        //the message the user sends
        { role: "user", content: text + "End your reply with an appropriate Purdue phrase" },
      ],
      functions: [
        {
          name: "create_event",
          description:
            "Creates an event/task using the name, date given, and time interval for that when the user asks to create an event. If the date is not given, it just uses the current date - Nov 30 2023.",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the event/task to be created",
              },
              date: {
                type: "string",
                description: "The date of the event/task in the format YYYY-MM-DD",
              },
              time_slot: {
                type: "string",
                description:
                  "The time interval of the event/task in the format HH:MM-HH:MM in 24 hour format",
              },
            },
            required: ["name", "date", "time_slot"],
          },
        },
        {
          name: "edit_event",
          description:
            "Edits an event/task's time slot or date only if name of event is given. Only name and field to be changed needs to be passed to the function. Convert 12 hour time to 24 hour time.",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the event/task to be edited",
              },
              date: {
                type: "string",
                description: "The new/original date of the event/task in the format YYYY-MM-DD",
              },
              time_slot: {
                type: "string",
                description:
                  "The new/original time interval of the event/task in the format HH:MM-HH:MM in 24 hour format",
              },
            },
            required: ["name"],
          },
        },
        {
          name: "delete_event",
          description:
            "Deletes an event using the given name",
          parameters: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "The name of the event/task to be deleted",
              },
            },
            required: ["name"],
          },
        }
      ],
    });

    console.log("response", response);
    let reply = response.choices[0].message.content;
    const finishReason = response.choices[0].finish_reason;

    if (finishReason === "function_call") {
      // Extract eventData from the message field
      const function_name = response.choices[0].message.function_call.name;

      if (function_name === "create_event") {
        const eventData = JSON.parse(response.choices[0].message.function_call.arguments); // Adjust according to the actual structure
        console.log("eventData", eventData);
        // Perform the POST request
        axios
          .post("http://localhost:5000/api/users/event", eventData)
          .then((res) => {
            console.log("Response:", res.data);
          })
          .catch((err) => {
            console.error("Error:", err);
          });
        reply = "Event " + eventData.name + " created for you boilermaker on " + eventData.date + " at " + eventData.time_slot;
      }

      if (function_name === "edit_event") {
        const eventData = JSON.parse(response.choices[0].message.function_call.arguments); // Adjust according to the actual structure
        console.log("eventData", eventData);
        // Perform the PUT request
        axios
          .put("http://localhost:5000/api/users/event", eventData)
          .then((res) => {
            console.log("Response:", res.data);
          })
          .catch((err) => {
            console.error("Error:", err);
          });
        reply = "Event " + eventData.name + " edited for you boilermaker";
      }

      if (function_name === "delete_event") {
        const eventData = JSON.parse(response.choices[0].message.function_call.arguments); // Adjust according to the actual structure
        console.log("eventData", eventData);
        // Perform the PUT request
        axios
          .delete("http://localhost:5000/api/users/event", { data: eventData }) // Replace with your actual eventData)
          .then((res) => {
            console.log("Response:", res.data);
          })
          .catch((err) => {
            console.error("Error:", err);
          });
        reply = "Event " + eventData.name + " deleted for you boilermaker";
      }
    }

    // const eventData = {
    //   date: "2023-11-24",
    //   time_slot: "06:00 - 07:00",
    //   name: "Painting",
    // };

    // let req_resp = await axios.post(
    //   "http://localhost:5000/api/users/event",
    //   eventData
    // );
    // console.log("Response:", req_resp);

    console.log("GPT REPLY:", reply);

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: reply },
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
    //console.log("error", error);
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
          "Project-ID": "d019a317-9e5c-4421-858f-7b054ac7860e",
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
