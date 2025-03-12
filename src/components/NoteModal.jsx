import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import closeButtonIcon from '../assets/close-button-icon.svg';

export default function NoteModal({ note, onClose }) {
    if (!note) return null;

    return (
        <div className="note-modal-overlay">
            <div className="note-modal-content">
                <button className="note-modal-close" onClick={onClose}>
                    <img src={closeButtonIcon} alt="close-button-icon" className='close-icon'/>
                </button>
                <h2 className="note-modal-title">{note.title}</h2>
                <div className="note-modal-text">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || "");
                                return match ? (
                                    <SyntaxHighlighter
                                        style={oneDark} // Dark theme
                                        language={match[1]}
                                        PreTag="div"
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {note.note}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
