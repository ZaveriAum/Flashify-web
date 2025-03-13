import "../styles/createFlashcardModal.css";
import { useState } from "react";
import closeIcon from "../assets/close-button-icon.svg";
import FileInput from "./FileInput";

export default function CreateNoteModal({ onClose, handleCreateNote }) {
    const [manually, setManually] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");

    const createNote = () => {
        if (!note.trim() && !title.trim()) return;
        handleCreateNote({ note, title });
    }

    return (
        <div className="create-flashcard-modal-overlay">
            <div className="create-flashcard-container">
                <div className="create-flashcard-modal-header">
                    <p>{manually ? "Create Note" : "Generate Note"}</p>
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
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title" required />
                            <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" required />
                        </div>
                    ) : (
                        <FileInput onFileSelected={setUploadedFile} />
                    )}
                </div>
                <button className="create-flashcard-button" onClick={createNote}>
                    <p >{manually ? "Create" : "Generate"}</p>
                </button>
            </div>
        </div>
    );
}
