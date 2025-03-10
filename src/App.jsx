import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PersistLogin from "./components/PersistLogin";
import Login from './pages/Login/Login';
// import ErrorPage from './pages/ErrorPage/ErrorPage';
import Register from './pages/Register/Register';
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SplashScreen from "./pages/Splash/SplashScreen";
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
          path:"/app",
          element:<Home/>
        },
        {
          path:"/profile",
          element:<Profile/>
        }
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
