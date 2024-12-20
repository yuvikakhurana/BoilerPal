import {
  PaperAirplaneIcon,
  PaperClipIcon,
  XMarkIcon,
  MicrophoneIcon,
  StopCircleIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Button } from "react-chat-engine-advanced";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const MessageFormUI = ({
  setAttachment,
  message,
  setMessage,
  handleChange,
  handleSubmit,
  appendText,
  handleKeyDown,
}) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const [isListsening, setIsListening] = useState(false);
  const handleSpeechOnClick = () => {
    SpeechRecognition.startListening();
    setIsListening(true);
  };

  const handleSpeechOffClick = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
    setMessage(transcript);
  };

  const {
    transcript,
    //listening,
    //resetTranscript,
    //browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            className="message-form-preview-image"
            src={preview}
            onLoad={() => URL.revokeObjectURL(preview)}
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("");
              setAttachment("");
            }}
          />
        </div>
      )}

      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
          />
          {appendText && (
            <input
              className="message-form-assist"
              type="text"
              disabled="disabled"
              value={`${message} ${appendText}`}
            />
          )}
        </div>

        <div className="message-form-icons">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0]);
              setPreview(URL.createObjectURL(acceptedFiles[0]));
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon
                  className="message-form-icon-clip"
                  onClick={open}
                />
              </div>
            )}
          </Dropzone>

          <hr className="vertical-line" />
          {isListsening && (
            <img
              className="message-form-icon-airplane"
              src="../../../giphy.gif"
            />
          )}
          {isListsening && (
            <StopCircleIcon
              className="message-form-icon-airplane"
              onClick={handleSpeechOffClick}
            />
          )}
          {!isListsening && (
            <MicrophoneIcon
              onClick={handleSpeechOnClick}
              className="message-form-icon-airplane"
            />
          )}

          <hr className="vertical-line" />

          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              setPreview("");
              handleSubmit();
            }}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          window.location.assign("http://localhost:3000/");
        }}
      >
        Exit
      </Button>
    </div>
  );
};

export default MessageFormUI;
