import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { createFlashcard, getFlashcards } from "../../services/flashcard";
import { createNote, getNotes } from "../../services/note";
import FlashcardComponent from "../../components/FlashcardComponent";
import NoteComponent from "../../components/NoteComponent";
import CreateFlashcardModal from "../../components/CreateFlashcardModal";
import "../../styles/folder.css";
import NavBar from "../../components/NavBar";
import useAuth from "../../hooks/useAuth";
import aiIcon from '../../assets/ai-icon.svg';
import noteIcon from '../../assets/note-icon.svg';
import flashcardIcon from '../../assets/flashcard-icon.svg';
import addIcon from '../../assets/add-icon.svg';
import { useToast } from "../../context/ToastContext";
import CreateNoteModal from "../../components/CreateNoteModal";
import InteractWithAIModal from "../../components/InteractWithAIModal";
import { interactWithFlashcards, interactWithNotes } from "../../services/ai";

export default function Folder() {
    const { folderId } = useParams();
    const [view, setView] = useState("flashcards");
    const [flashcards, setFlashcards] = useState([]);
    const [notes, setNotes] = useState([]);
    const [flashcardCount, setFlashcardCount] = useState(0);
    const [noteCount, setNoteCount] = useState(0);
    const { auth } = useAuth();
    const [searchQuery, setSearchQuery] = useState(""); 
    const [showModal, setShowModal] = useState(false);
    const [showChatModal, setShowChatModal] = useState(false);
    const flashcardsFetched = useRef(false);
    const notesFetched = useRef(false);
    const { addToast } = useToast();
    const [chatsFlashcards, setChatsFlashcards] = useState([]);
    const [chatsNotes, setChatsNotes] = useState([]);

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

    const handleChatSubmit = async (prompt) => {
        try {
            if (view === "flashcards") {
                const response = await interactWithFlashcards({prompt}, folderId, auth.accessToken);
                const chatEntry = { prompt, chatifyBot: response.data.response};
                setChatsFlashcards([...chatsFlashcards, chatEntry]);
            } else {
                const response = await interactWithFlashcards({prompt}, folderId, auth.accessToken);
                const chatEntry = { prompt, chatifyBot: response.data.response};
                setChatsNotes([...chatsNotes, chatEntry]);
            }
        } catch (error) {
            addToast("Error processing AI response", "failure");
        }
    };

    return (
        <div className="folder-page">
            <NavBar />
            <div className="switch-container">
                <button onClick={() => setShowModal(true)}>
                    <img src={addIcon} alt="add-icon" className="add-icon"/>
                </button>
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
                    <FlashcardComponent flashcards={flashcards} />
                ) : (
                    <NoteComponent notes={notes} />
                )}
            </div>

            <button className="ai-button" onClick={() => setShowChatModal(true)}>
                <img src={aiIcon} alt="ai-icon" className="ai-icon"/>
            </button>

            {showModal && (
                view === "flashcards" ? (
                    <CreateFlashcardModal 
                        onClose={() => setShowModal(false)} 
                    />
                ) : (
                    <CreateNoteModal 
                        onClose={() => setShowModal(false)}
                    />
                )
            )}

            {showChatModal && (
                <InteractWithAIModal 
                    onClose={() => setShowChatModal(false)}
                    interactions={view === "flashcards" ? chatsFlashcards : chatsNotes}
                    handleChatSubmit={handleChatSubmit}
                />
            )}
        </div>
    );
}
