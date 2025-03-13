import { useState } from 'react';
import closeIcon from '../assets/close-button-icon.svg';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import '../styles/generateNoteModal.css';

export default function GenerateNoteModal({ note, handleAddNote }) {
    const [title, setTitle] = useState("");
    
    return (
        <div className="generate-note-modal-overlay">
            <div className="generate-note-container">
                <div className="generate-note-header">
                    <p className="generate-note-title">Generated Note</p>
                    <button className="generate-note-close">
                        <img src={closeIcon} alt='close-button-icon' className='generate-note-modal-close-button-icon'/>
                    </button>
                </div>
                
                <input 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    type="text" 
                    placeholder="Enter Title" 
                    className="generate-note-title-input"
                    required
                />

                <div className="generate-note-content">
                    <ReactMarkdown
                        children={note}
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                return !inline ? (
                                    <SyntaxHighlighter style={dracula} language="javascript" PreTag="div" {...props}>
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    />
                </div>

                <button className="generate-note-add-button" onClick={() => handleAddNote({ title, note })}>
                    Add Note
                </button>
            </div>
        </div>
    );
}
