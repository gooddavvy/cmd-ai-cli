import React, { useState } from "react";
import "../styles/App.css";

let App: React.FC = () => {
  let [messages, setMessages] = useState<string[]>([]);
  let [input, setInput] = useState<string>("");
  let [cmdAiEnabled, setCmdAiEnabled] = useState<boolean>(false);
  let [usesDollarsign, setUsesDollarsign] = useState<boolean>(true);

  let handleSend = () => {
    if (input.trim()) {
      let newMessages: string[] = [];
      if (usesDollarsign) {
        newMessages = [...messages, `$ ${input.trim()}`];
      } else {
        newMessages = [...messages, `> ${input.trim()}`];
      }

      if (input.trim().startsWith("cmd-ai")) {
        let name =
          input.split(" ")[1] || "Anonymous (you didn't provide your name)";

        setCmdAiEnabled(true);
        newMessages.push("%%% Starting a new chat, please wait...");
        newMessages.push(
          `Greetings, ${name}! I'm your CMD AI. Think of me as a commandline-accessed bot here to answer basic questions for you. How may I help you today? (say "bye" to exit)`
        );
      } else if (cmdAiEnabled) {
        setUsesDollarsign(false);

        let message = input.trim();
        if (message.toLowerCase().includes("how are you")) {
          newMessages.push(
            "I'm doing excellent, thanks for asking! How about you?"
          );
        } else if (
          message.toLowerCase().includes("good") ||
          message.toLowerCase().includes("great")
        ) {
          newMessages.push("That is great!");
        } else if (message.toLowerCase().includes("tell me a joke")) {
          newMessages.push("I've said it before, and I'll say it again:\n");
          newMessages.push("I've said it before.");
        } else if (message.toLowerCase().includes("bye")) {
          newMessages.push(
            `Goodbye! If you need answers to any more questions, please let me know!`
          );
          newMessages.push("%%% Chat ending...");
          setCmdAiEnabled(false);
          setUsesDollarsign(true);
        } else {
          newMessages.push(
            "I'm just a bot, so I'm still learning new things. Please try a prompt that I am capable of answering."
          );
        }
      } else if (input.trim().startsWith("clear")) {
        newMessages = [];
      } else {
        newMessages.push(
          "Unrecognized command. Please use 'cmd-ai' to start a chat or a valid system command."
        );
      }

      setMessages(newMessages);
      setInput("");
    }
  };

  return (
    <div className="App">
      <h1>CMD AI CLI</h1>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default App;
