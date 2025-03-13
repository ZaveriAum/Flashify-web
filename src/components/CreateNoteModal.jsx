import "../styles/createFlashcardModal.css";
import { useState } from "react";
import closeIcon from "../assets/close-button-icon.svg";
import FileInput from "./FileInput";
import { useToast } from "../context/ToastContext";
import { generateNote } from "../services/ai";
import useAuth from "../hooks/useAuth";
import GenerateNoteModal from "./GenerateNoteModal";

export default function CreateNoteModal({ onClose, handleCreateNote }) {
    const [manually, setManually] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [note, setNote] = useState("");
    const [title, setTitle] = useState("");
    const { addToast } = useToast();
    const { auth } = useAuth();
    const [genNoteModal, setGenNoteModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const createNote = async () => {
        if (!note.trim() && !title.trim()) return;
        await handleCreateNote({ note, title });
    };

    const genNote = async () => {
        setLoading(true);
        try {
            let formData = new FormData();
            formData.append("file", uploadedFile);
            const response = await generateNote(formData, auth.accessToken);
            console.log(response);

            if (response.status === 200) {
                setNote(response.data.note);
                setGenNoteModal(true);
            } else if (response.data.status < 500) {
                addToast(response.data.message, "failure");
            } else {
                addToast("Unknown Error", "failure");
            }
        } catch (e) {
            addToast("Unknown Error in Note Generation", "failure");
        } finally {
            setLoading(false);
        }
    };

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
                            <input 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value)} 
                                type="text" 
                                placeholder="Title" 
                                required 
                            />
                            <textarea 
                                value={note} 
                                onChange={(e) => setNote(e.target.value)} 
                                placeholder="Note" 
                                required 
                            />
                        </div>
                    ) : (
                        <FileInput onFileSelected={setUploadedFile} />
                    )}
                </div>
                <button 
                    className="create-flashcard-button" 
                    onClick={manually ? createNote : genNote} 
                    disabled={loading}
                >
                    {loading ? <span className="loader"></span> : <p>{manually ? "Create" : "Generate"}</p>}
                </button>
            </div>
            {genNoteModal && <GenerateNoteModal note={note} handleAddNote={handleCreateNote} />}
        </div>
    );
}
