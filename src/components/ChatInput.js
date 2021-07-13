import { Button } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../Firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Banner from "./Banner";

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  // console.log(channelId);

  const sendMessage = (e) => {
    e.preventDefault(); //prevents refresh

    // Implementing the send message
    if (!channelId) {
      return false;
    }

    // Getting the message sent and stored from database
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef.current.scrollIntoView({ behavior: "smooth", block: "end" });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${channelName}`}
        />
        <Button type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;
  z-index: 100;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > textArea {
    position: fixed;
    bottom: 30px;
    /* width: 72%; */
    max-height: 15px;
    min-height: 15px;
    max-width: 72%;
    min-width: 72%;
    word-wrap: wrap auto;
    border: 1px solid green;
    border-radius: 3px;
    padding: 20px;
    outline: none;
    @media screen and (max-width: 480px) {
      position: fixed;
      /* width: 60%; */
      max-height: 15px;
      min-height: 15px;
      max-width: 50%;
      min-width: 50%;
      left: 65px;
    }
  }

  > form > button {
    position: fixed;
    font-weight: 600rem;
    bottom: 30px;
    right: 150px;
    color: white;
    background-color: green;
    border-radius: 3px;
    padding: 17px;
    outline: none;

    @media screen and (max-width: 480px) {
      right: 35px;
    }
  }
`;
