import NavBar from "../../components/NavBar";
import '../../styles/home.css'
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { getFolders } from "../../services/folder";
import { useToast } from "../../context/ToastContext";
import folderIcon from "../../assets/folder-icon.svg"

export default function Home(){

    const { addToast } = useToast();
    const { auth } = useAuth();
    const [folders, setFolders] = useState([]);

    useEffect(()=>{
        const fetchFolders = async () =>{
            try{
                const response = await getFolders(auth.accessToken);
                if (response.status == 200){
                    setFolders(response.data.folders);
                }else if (response.status < 500){
                    addToast(response.data.message, "failure");
                }else{
                    addToast("Unknow Error Fetching Folders", "failure");
                }
            }catch(e){
                addToast("Unknow Error Fetching Folders", "failure");
            }
        }

        fetchFolders();
    }, [auth.accessToken])

    return(
        <div className="home-container">
            <NavBar/>
            <div className="folders-container">
                {folders.length > 0 ? (
                    folders.map((folder, index) => (
                        <div key={index} className="folder">
                            <img src={folderIcon} alt="Folder Icon" className="folder-icon" />
                            <span className="folder-name">{folder.name}</span>
                        </div>
                    ))
                ) : (
                    <p>No folders available</p>
                )}
            </div>
        </div>
    );
}