import { useState, useRef } from "react";
import { useToast } from "../context/ToastContext";
import fileUploadIcon from '../assets/upload-icon.svg'

export default function FileInput({ onFileSelected }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const { addToast } = useToast();
    const fileInputRef = useRef(null);
    const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    
    const validateFile = (file) => {
        if (!file) return false;
        
        if (!allowedTypes.includes(file.type)) {
            addToast("Invalid file type! Only PDF, PPT, PPTX, DOCX, or TXT files are allowed", "failure");
            return false;
        }
        
        return true;
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        
        if (!validateFile(file)) return;

        setSelectedFile(file);
        onFileSelected(file);
    };
    
    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };
    
    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        
        const files = e.dataTransfer.files;
        if (files.length === 0) return;
        
        const file = files[0];
        if (!validateFile(file)) return;
        
        setSelectedFile(file);
        onFileSelected(file);
    };
    
    const openFileDialog = (e) => {
        // Prevent event from bubbling up to parent elements
        e.stopPropagation();
        fileInputRef.current.click();
    };

    return (
        <div 
            className={`file-upload-container ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <div className="file-upload-label" onClick={openFileDialog}>
                <div className="flex flex-col items-center justify-center p-6">
                    <img src={fileUploadIcon} alt="upload-file-icon" className="create-flashcard-modal-file-upload-icon"/>
                    <p className="text-center">
                        {selectedFile 
                            ? selectedFile.name 
                            : isDragging 
                                ? "Drop your file here" 
                                : "Drag & drop a file here, or click to browse"}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Supported formats: PDF, PPT, PPTX, DOCX, TXT</p>
                </div>
                <input 
                    ref={fileInputRef}
                    id="file-input" 
                    type="file" 
                    accept=".pdf,.ppt,.pptx,.docx,.txt" 
                    onChange={handleChange} 
                    className="hidden" 
                />
            </div>
        </div>
    );
}