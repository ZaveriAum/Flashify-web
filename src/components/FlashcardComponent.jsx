export default function FlashcardComponent({ flashcards }) {
    return (
        <div className="flashcard-container">
            {flashcards.length > 0 ? (
                flashcards.map((flashcard, index) => (
                    <div key={index} className="flashcard">
                        <p className="question">{flashcard.question}</p>
                        <p className="answer">{flashcard.answer}</p>
                    </div>
                ))
            ) : (
                <p>No flashcards available</p>
            )}
        </div>
    );
}
