import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getFlashcards } from "../../services/flashcard";
import { getNotes } from "../../services/note";
import FlashcardComponent from "../../components/FlashcardComponent";
import NoteComponent from "../../components/NoteComponent";
import CreateFlashcardModal from "../../components/CreateFlashcardModal"; // Import modal
import "../../styles/folder.css";
import NavBar from "../../components/NavBar";
import useAuth from "../../hooks/useAuth";
import aiIcon from '../../assets/ai-icon.svg';
import noteIcon from '../../assets/note-icon.svg';
import flashcardIcon from '../../assets/flashcard-icon.svg';
import addIcon from '../../assets/add-icon.svg';

export default function Folder() {
    const { folderId } = useParams();
    const [view, setView] = useState("flashcards");
    const [flashcards, setFlashcards] = useState([]);
    const [notes, setNotes] = useState([]);
    const [flashcardCount, setFlashcardCount] = useState(0);
    const [noteCount, setNoteCount] = useState(0);
    const { auth } = useAuth();
    const [searchQuery, setSearchQuery] = useState(""); 
    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const flashcardsFetched = useRef(false);
    const notesFetched = useRef(false);

    useEffect(() => {
        const fetchFlashcards = async () => {
            if (!auth.accessToken || flashcardsFetched.current) return;
            flashcardsFetched.current = true;
            const response = await getFlashcards(folderId, auth.accessToken);
            setFlashcards(response.data.flashcards);
            setFlashcardCount(response.length);
        };

        fetchFlashcards();
    }, [folderId, auth.accessToken, flashcardCount]);

    useEffect(() => {
        const fetchNotes = async () => {
            if (!auth.accessToken || notesFetched.current) return;
            notesFetched.current = true;
            const response = await getNotes(folderId, auth.accessToken);
            setNotes(response.data.notes);
            setNoteCount(response.length);
        };

        if (view === "notes") {
            fetchNotes();
        }
    }, [view, auth.accessToken, noteCount]);

    // Filtered results based on search query
    const filteredFlashcards = flashcards.filter(flashcard =>
        flashcard.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.note.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="folder-page">
            <NavBar />
            <div className="switch-container">
                <button onClick={() => setShowModal(true)}>
                    <img src={addIcon} alt="add-icon" className="add-icon"/>
                </button>
                {/* Search input */}
                <input
                    type="text"
                    placeholder="🔍   Search"
                    className="search-note-flashcard"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                    className={view === "flashcards" ? "active" : ""} 
                    onClick={() => setView("flashcards")}
                >
                    <img src={flashcardIcon} alt="flashcard-icon" className="flashcard-icon"/>
                </button>
                <button 
                    className={view === "notes" ? "active" : ""} 
                    onClick={() => {
                        notesFetched.current = false;
                        setView("notes");
                    }}
                >
                    <img src={noteIcon} alt="note-icon" className="flashcard-icon"/>
                </button>
            </div>

            <div className="content-container">
                {view === "flashcards" ? (
                    <FlashcardComponent flashcards={filteredFlashcards} />
                ) : (
                    <NoteComponent notes={filteredNotes} />
                )}
            </div>

            <button className="ai-button">
                <img src={aiIcon} alt="ai-icon" className="ai-icon"/>
            </button>

            {/* Show modal only if "Add" button is clicked */}
            {showModal && <CreateFlashcardModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
