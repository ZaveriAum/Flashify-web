import { useEffect, useState } from "react";
import closeIcon from '../assets/close-button-icon.svg';
import addIcon from '../assets/add-icon.svg';
import '../styles/generatedFlashcards.css';

export default function GenerateFlashcardsModal({ flashcards, onClose, onAddAll, handleAddFlashcard }) {
    const [flipped, setFlipped] = useState(Array(flashcards.length).fill(false));
    const [genFlashcards, setGenFlashcards] = useState([]);

    useEffect(() => {
        setGenFlashcards(flashcards);
    }, [flashcards]);

    const handleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };

    const handleAddGeneratedFlashcard = async (flashcardToAdd) => {
        try {
            if(await handleAddFlashcard(flashcardToAdd)){

            const updatedFlashcards = genFlashcards.filter(flashcard => flashcard !== flashcardToAdd);
            setFlipped(Array(updatedFlashcards.length).fill(false));
            setGenFlashcards(updatedFlashcards);
            }
        } catch (e) {
            console.error("Error adding flashcard:", e);
        }
    };

    const handleAddAllFlashcards = async () => {
        try {
            await onAddAll(genFlashcards);
            setGenFlashcards([]);
        } catch (e) {
            console.error("Error adding all flashcards:", e);
        }
    };

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
                    {genFlashcards.length > 0 ? (
                        genFlashcards.map((flashcard, index) => (
                            <div key={index} className={`generated-flashcards-flashcard ${flipped[index] ? "flipped" : ""}`}>
                                <button className="add-flashcard-button" onClick={() => handleAddGeneratedFlashcard(flashcard)}>
                                    <img src={addIcon} alt="Add" className="add-flashcard-icon"/>
                                </button>
                                <div className="generated-flashcards-inner" onClick={() => handleFlip(index)}>
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
