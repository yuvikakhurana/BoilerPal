import React, { useState } from "react";
import MessageFormUI from "./MessageFormUI";
import { usePostAiTextMutation } from "@/state/api";
import { MicrophoneIcon } from "@heroicons/react/24/solid";

const Ai = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");

  //If this was a query - we would be destructuring an object and getting data
  //Since we are using a mutation, we are destructuring an array and getting a function - TRIGGER  - which will trigger the actual API call
  const [trigger] = usePostAiTextMutation();

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    //going to submit message
    props.onSubmit(form);
    //at the same time going to trigger API call
    //OPENAI will handle...
    trigger(form);

    if (message == "Bye") {
      setTimeout(() => {
        window.location.assign("http://localhost:3000");
      }, 9000);
    }

    setMessage("");
    setAttachment("");
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      setMessage={setMessage}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Ai;
