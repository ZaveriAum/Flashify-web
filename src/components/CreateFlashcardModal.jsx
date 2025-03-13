import "../styles/createFlashcardModal.css";
import { useState } from "react";
import closeIcon from "../assets/close-button-icon.svg";
import FileInput from "./FileInput";
import GenerateFlashcardsModal from "./GeneratedFlashcardsModal";
import { useToast } from "../context/ToastContext";
import { generateFlashcards } from "../services/ai";
import useAuth from "../hooks/useAuth";

export default function CreateFlashcardModal({ onClose, handleCreateFlashcard }) {
    const [manually, setManually] = useState(true);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatedFlashcards, setGeneratedFlashcards] = useState([]);
    const [generateFlashcardModal, setGenerateFlashcardModal] = useState(false);
    const { addToast } = useToast();
    const { auth } = useAuth();

    const createFlashcard = async () => {
        if(manually){
            if (!question.trim() && !answer.trim()) return;
            handleCreateFlashcard({ answer, question });
        }else{
            await handleGenerateFlashcards();
        }
    }

    const handleGenerateFlashcards = async ()=>{
        try{
            let formData = new FormData();
            formData.append("file", uploadedFile);
            const response = await generateFlashcards(formData, auth.accessToken);
            if (response.status === 200){
                setGeneratedFlashcards(response.data.flashcards);
                setGenerateFlashcardModal(true);
            }else if (response.status < 500){
                addToast(response.data.message, "failure");
            }else{
                addToast("Unknow Error Generating Flashcards", "failure");
            }
        }catch(e){
            console.log(e);
            addToast("Error Generating Flashcards", "failure");
        }
    }

    const addAllFlashcards = async (flashcards)=>{
        try{
            for (const flashcard of flashcards) {
                if (flashcard.question.trim() && flashcard.answer.trim()) {
                    await handleCreateFlashcard({ answer: flashcard.answer, question: flashcard.question });
                }
            }
        }catch(e){
            console.log(e)
            addToast("Unknown Error", "failure");
        }
    }

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
                            <input value={question} onChange={(e) => setQuestion(e.target.value)} type="text" placeholder="Question" required />
                            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer" required />
                        </div>
                    ) : (
                        <FileInput onFileSelected={setUploadedFile} />
                    )}
                </div>
                <button className="create-flashcard-button" onClick={createFlashcard}>
                    <p >{manually ? "Create" : "Generate"}</p>
                </button>
            </div>
            {generateFlashcardModal && (
                < GenerateFlashcardsModal flashcards={generatedFlashcards} onClose={()=>setGenerateFlashcardModal(false)} onAddAll={addAllFlashcards} handleAddFlashcard={handleCreateFlashcard}/>
            )}
        </div>
    );
}
