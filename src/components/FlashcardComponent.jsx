import { useState } from "react";

export default function FlashcardComponent({ flashcards }) {
    const [flipped, setFlipped] = useState(Array(flashcards.length).fill(false));

    const handleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = !newFlipped[index];
        setFlipped(newFlipped);
    };

    return (
        <div className="flashcard-container">
            {flashcards.length > 0 ? (
                flashcards.map((flashcard, index) => (
                    <div 
                        key={index} 
                        className={`flashcard ${flipped[index] ? "flipped" : ""}`} 
                        onClick={() => handleFlip(index)}
                    >
                        <div className="flashcard-inner">
                            <div className="flashcard-front">
                                <p className="flashcard-text">{flashcard.question}</p>
                            </div>
                            <div className="flashcard-back">
                                <p className="flashcard-text">{flashcard.answer}</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No flashcards available</p>
            )}
        </div>
    );
}
