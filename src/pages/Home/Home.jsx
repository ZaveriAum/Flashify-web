import NavBar from "../../components/NavBar";
import '../../styles/home.css';
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getFolders } from "../../services/folder";
import { useToast } from "../../context/ToastContext";
import folderIcon from "../../assets/folder-icon.svg";
import addFolderIcon from "../../assets/add-folder-icon.svg";

export default function Home() {
    const { addToast } = useToast();
    const { auth } = useAuth();
    const [searchName, setSearchName] = useState("");
    const [folders, setFolders] = useState([]);
    const [allFolders, setAllFolders] = useState([]);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await getFolders(auth.accessToken);
                if (response.status === 200) {
                    setFolders(response.data.folders);
                    setAllFolders(response.data.folders);
                } else if (response.status < 500) {
                    addToast(response.data.message, "failure");
                } else {
                    addToast("Unknown Error Fetching Folders", "failure");
                }
            } catch (e) {
                addToast("Unknown Error Fetching Folders", "failure");
            }
        };

        fetchFolders();
    }, [auth.accessToken]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchName(query);

        if (query.trim() === "") {
            setFolders(allFolders);
        } else {
            setFolders(allFolders.filter(folder => folder.name.toLowerCase().includes(query)));
        }
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
                <img src={addFolderIcon} alt="add-folder-icon" className="add-folder-icon" />
            </div>
            <div className="folders-container">
                {folders.length > 0 ? (
                    folders.map((folder, index) => (
                        <div key={index} className="folder">
                            <img src={folderIcon} alt="Folder Icon" className="folder-icon" />
                            <span className="folder-name">{folder.name}</span>
                        </div>
                    ))
                ) : (
                    <p>No folders found</p>
                )}
            </div>
        </div>
    );
}
