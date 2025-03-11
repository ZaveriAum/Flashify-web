export default function NoteComponent({ notes }) {
    return (
        <div className="note-container">
            {notes.length > 0 ? (
                notes.map((note, index) => (
                    <div key={index} className="note">
                        <p>{note.content}</p>
                    </div>
                ))
            ) : (
                <p>No notes available</p>
            )}
        </div>
    );
}
