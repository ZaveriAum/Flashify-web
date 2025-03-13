import { useState } from "react";
import closeIcon from '../assets/close-button-icon.svg';
import '../styles/generatedFlashcards.css';

export default function GenerateFlashcardsModal({ flashcards, onClose, onAddAll, handleAddFlashcard }) {
    const [flipped, setFlipped] = useState(Array(flashcards.length).fill(false));
    
    const handleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };

    const handleAddAllFlashcards = async()=>{
        try{
            await onAddAll(flashcards);
        }catch(e){
            
        }
    }

    return (
        <div className="generated-flashcards-container">
            <div className="generated-flashcards-content">
                <div className="generated-flashcards-header-container">
                    <p className="generated-flashcards-header">Generated Flashcards</p>
                    <button className="generate-flashcards-close-button" onClick={onClose}>
                        <img src={closeIcon} alt="close-button-icon" className="generated-flashcard-modal-close-button-icon"/>
                    </button>
                </div>

                <div className="generated-flashcards-grid">
                    {flashcards.length > 0 ? (
                        flashcards.map((flashcard, index) => (
                            <div
                                key={index}
                                className={`generated-flashcards-flashcard ${flipped[index] ? "flipped" : ""}`} 
                                onClick={() => handleFlip(index)}
                            >
                                <div className="generated-flashcards-inner">
                                    <div className="generated-flashcards-front">
                                        <p className="generated-flashcards-text">{flashcard.question}</p>
                                    </div>
                                    <div className="generated-flashcards-back">
                                        <p className="generated-flashcards-text">{flashcard.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Flashcards Generated</p>
                    )}
                </div>

                <button className="add-all-button" onClick={handleAddAllFlashcards}>Add All</button>
            </div>
        </div>
    );
}
