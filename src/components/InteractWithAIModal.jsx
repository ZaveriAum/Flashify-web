import { useState } from "react";
import closeIcon from "../assets/close-button-icon.svg";
import "../styles/interactWithAIModal.css";
import sendIcon from "../assets/send-icon.svg";

export default function InteractWithAIModal({ onClose, interactions, handleChatSubmit }) {
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (input.trim() === "") return;
        handleChatSubmit(input);
        setInput("");
    };

    return (
        <div className="chat-modal-overlay">
            <div className="chat-modal-container">
                <div className="chat-modal-header">
                    <p>Chatify</p>
                    <button className="chat-close-button" onClick={onClose}>
                        <img src={closeIcon} alt="close-button-icon" className="chatify-button-icon"/>
                    </button>
                </div>
                <div className="chat-messages">
                    {interactions.map((chat, index) => (
                        <div key={index} className="chat-message">
                            <p className="user-message">{chat.prompt}</p>
                            <p className="ai-message">{chat.chatifyBot}</p>
                        </div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <input 
                        type="text" 
                        placeholder="Ask Chatify..."
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button className="chat-send-button" onClick={sendMessage}>
                        <img src={sendIcon} className="send-button-icon"/>
                    </button>
                </div>
            </div>
        </div>
    );
}
