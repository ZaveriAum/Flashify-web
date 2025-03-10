import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import PersistLogin from "./components/PersistLogin";
import Login from './pages/Login/Login';
// import ErrorPage from './pages/ErrorPage/ErrorPage';
import Register from './pages/Register/Register';
import Home from "./pages/Home/Home";
function App() {
  const router = createBrowserRouter([
    {
      element: <PersistLogin />,
      children: [
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
