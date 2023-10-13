import React, {useEffect, useState} from 'react';
import MessageFormUI from './MessageFormUI';
import { usePostAiAssistMutation } from '@/state/api';


function useDebounce(value, delay) {
    const [debouncedValue, setDebounceValue] = useState(value);


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);
    //useeffect will trigger anytime value or delay change


    return debouncedValue;
    
}

const AiAssist = ({props, activeChat}) => {

    const [message, setMessage] = useState("");
    const [attachment, setAttachment] = useState("");
    const [appendText, setAppendText] = useState("");

    //If this was a query - we would be destructuring an object and getting data
    //Since we are using a mutation, we are destructuring an array and getting a function - TRIGGER  - which will trigger the actual API call
    //grabbing the result we get from backend
    const [triggerAssist, resultAssist] = usePostAiAssistMutation();


    const handleChange = (e) => setMessage(e.target.value);

    const handleSubmit = async() => {
        const date = new Date().toISOString().replace("T", " ").replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
        const at = attachment ? [{blob: attachment, file: attachment.name}] : [];
        const form = {
            attachments: at, 
            created: date, 
            sender_username: props.username, 
            text: message, 
            activeChatId: activeChat.id,
        };

        //going to submit message
        props.onSubmit(form);

        setMessage("");
        setAttachment("");
    };

    const debouncedValue = useDebounce(message, 1000);

    useEffect(() => {
        if(debouncedValue) {
            const form = {text: message};
            triggerAssist(form);
        }
    }, [debouncedValue]);

    const handleKeyDown = (e) => {
        if(e.keyCode === 9 || e.keyCode === 13) {
            e.preventDefault();
            setMessage(`${message} ${appendText}`)
        }

        setAppendText("");
    }

    useEffect(() => {
        if(resultAssist.data?.text) {
            setAppendText(resultAssist.data?.text);
        }
    }, [resultAssist]);


    return (
        <MessageFormUI
            setAttachment={setAttachment}
            message={message}
            handleChange={handleChange}
            handleSubmit={handleSubmit}

            appendText={appendText}
            handleKeyDown={handleKeyDown}
        />

    )
}

export default AiAssist;