import "../styles/createFlashcardModal.css";
import { useState } from "react";
import closeIcon from "../assets/close-button-icon.svg";
import FileInput from "./FileInput"; // Importing the new FileInput component
import { useToast } from "../context/ToastContext";

export default function CreateFlashcardModal({ onClose }) {
    const [manually, setManually] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const { addToast } = useToast();

    return (
        <div className="create-flashcard-modal-overlay">
            <div className="create-flashcard-container">
                <div className="create-flashcard-modal-header">
                    <p>{manually ? "Create Flashcard" : "Generate Flashcards"}</p>
                    <button className="create-flashcard-close" onClick={onClose}>
                        <img src={closeIcon} alt="close-button-icon" className="create-flashcard-close-icon" />
                    </button>
                </div>
                <div className="create-flashcard-switch-container">
                    <button className={manually ? "active" : ""} onClick={() => setManually(true)}>
                        <p>Manually</p>
                    </button>
                    <button className={!manually ? "active" : ""} onClick={() => setManually(false)}>
                        <p>Generate</p>
                    </button>
                </div>
                <div className="create-flashcard-input-container">
                    {manually ? (
                        <div className="manual-flashcard-input">
                            <input type="text" placeholder="Question" required />
                            <textarea placeholder="Answer" required />
                        </div>
                    ) : (
                        <FileInput onFileSelected={setUploadedFile} />
                    )}
                </div>
                <button className="create-flashcard-button">
                    <p>{manually ? "Create" : "Generate"}</p>
                </button>
            </div>
        </div>
    );
}
