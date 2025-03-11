import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PersistLogin from "./components/PersistLogin";
import Login from './pages/Login/Login';
// import ErrorPage from './pages/ErrorPage/ErrorPage';
import Register from './pages/Register/Register';
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SplashScreen from "./pages/Splash/SplashScreen";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Folder from "./pages/Folder/Folder";
function App() {
  const router = createBrowserRouter([
    {
      element: <PersistLogin />,
      children: [
        {
          path: "/",
          element: <SplashScreen/>
        },
        {
          path: "/login", 
          element: <Login/>,
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          element: <ProtectedRoutes/>,
          children: [
            {
              path:"/app",
              element:<Home/>
            },
            {
              path:"/profile",
              element:<Profile/>
            },
            {
              path:"/folder/:folderId",
              element: <Folder/>
            }
          ]
        },
      ]
    }
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router}/>      
    </AuthProvider>
  )
}

export default App
