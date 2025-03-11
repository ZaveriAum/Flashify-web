import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import '../../styles/home.css';
import useAuth from "../../hooks/useAuth";
import { getFolders, createFolder } from "../../services/folder";
import { useToast } from "../../context/ToastContext";
import folderIcon from "../../assets/folder-icon.svg";
import addFolderIcon from "../../assets/add-folder-icon.svg";
import CreateFolderModal from "../../components/CreateFolderModal";

export default function Home() {
    const { addToast } = useToast();
    const { auth } = useAuth();
    const [searchName, setSearchName] = useState("");
    const [folders, setFolders] = useState([]);
    const [allFolders, setAllFolders] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchFolders();
    }, [auth.accessToken]);

    const fetchFolders = async () => {
        try {
            const response = await getFolders(auth.accessToken);
            if (response.status === 200) {
                setFolders(response.data.folders);
                setAllFolders(response.data.folders);
            } else {
                addToast(response.data.message, "failure");
            }
        } catch (e) {
            addToast("Unknown Error Fetching Folders", "failure");
        }
    };

    const handleCreateFolder = async (folderData) => {
        try {
            const response = await createFolder(folderData, auth.accessToken);
            if (response.status === 201) {
                addToast("Folder created successfully!", "success");
                setIsModalOpen(false);
                fetchFolders();
            } else {
                addToast(response.data.message, "failure");
            }
        } catch (e) {
            addToast("Error creating folder", "failure");
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchName(query);
        setFolders(query.trim() === "" ? allFolders : allFolders.filter(folder => folder.name.toLowerCase().includes(query)));
    };

    return (
        <div className="home-container">
            <NavBar />
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search by Names" 
                    value={searchName} 
                    className="searchName" 
                    onChange={handleSearch} 
                />
                <img 
                    src={addFolderIcon} 
                    alt="add-folder-icon" 
                    className="add-folder-icon" 
                    onClick={() => setIsModalOpen(true)}
                />
            </div>
            <div className="folders-container">
                {folders.length > 0 ? (
                    folders.map((folder, index) => (
                        <div key={index} className="folder">
                            <img 
                                src={folderIcon} 
                                alt="Folder Icon" 
                                className="folder-icon" 
                                title={folder.description || "No description available"} 
                            />
                            <span className="folder-name">{folder.name}</span>
                        </div>
                    ))
                ) : (
                    <p>No folders found</p>
                )}
            </div>
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <CreateFolderModal closeModal={() => setIsModalOpen(false)} onCreateFolder={handleCreateFolder} />
                    </div>
                </div>
            )}
        </div>
    );
}
