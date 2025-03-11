import { useState } from "react";
import "../styles/createFolderModal.css";
import closeIcon from "../assets/close-button-icon.svg";

export default function CreateFolderModal({ closeModal, onCreateFolder }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if (!name.trim()) return;
        onCreateFolder({ name, description });
    };

    return (
        <div className="modal">
            <img 
                src={closeIcon} 
                alt="Close" 
                className="close-icon" 
                onClick={closeModal} 
            />
            <p>Create Folder</p>
            <label>
                Name
                <input 
                    type="text" 
                    placeholder="Enter folder name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </label>
            <label>
                Description
                <textarea 
                    placeholder="Enter folder description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <button onClick={handleSubmit}>Create</button>
        </div>
    );
}
