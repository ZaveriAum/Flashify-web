import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getFlashcards } from "../../services/flashcard";
import { getNotes } from "../../services/note";
import FlashcardComponent from "../../components/FlashcardComponent";
import NoteComponent from "../../components/NoteComponent";
import "../../styles/folder.css";
import NavBar from "../../components/NavBar";
import useAuth from "../../hooks/useAuth";

export default function Folder() {
    const { folderId } = useParams();
    const [view, setView] = useState("flashcards");
    const [flashcards, setFlashcards] = useState([]);
    const [notes, setNotes] = useState([]);
    const [flashcardCount, setFlashcardCount] = useState(0);
    const [noteCount, setNoteCount] = useState(0);
    const { auth } = useAuth();
    
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
            console.log("Fetching Notes:", response);
            setNotes(response.data.notes);
            setNoteCount(response.length);
        };

        if (view === "notes") {
            fetchNotes();
        }
    }, [view, auth.accessToken, noteCount]);

    return (
        <div className="folder-page">
            <NavBar />
            <div className="switch-container">
                <button 
                    className={view === "flashcards" ? "active" : ""} 
                    onClick={() => setView("flashcards")}
                >
                    Flashcards
                </button>
                <button 
                    className={view === "notes" ? "active" : ""} 
                    onClick={() => {
                        notesFetched.current = false;
                        setView("notes");
                    }}
                >
                    Notes
                </button>
            </div>

            <div className="content-container">
                {view === "flashcards" ? (
                    <FlashcardComponent flashcards={flashcards} />
                ) : (
                    <NoteComponent notes={notes} />
                )}
            </div>
        </div>
    );
}
