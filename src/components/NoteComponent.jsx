import { useState } from "react";
import NoteModal from "./NoteModal";

export default function NoteComponent({ notes }) {
    const [selectedNote, setSelectedNote] = useState(null);

    return (
        <div className="note-container">
            {notes.length > 0 ? (
                notes.map((note, index) => (
                    <button key={index} className="note" onClick={() => setSelectedNote(note)}>
                        <p className="note-title">{note.title}</p>
                    </button>
                ))
            ) : (
                <p>No notes available</p>
            )}
            {selectedNote && <NoteModal note={selectedNote} onClose={() => setSelectedNote(null)} />}
        </div>
    );
}
