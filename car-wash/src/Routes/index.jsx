import {  useEffect } from "react";
import { Route, Routes,Navigate,useNavigate } from "react-router-dom";
import { env } from "../App/config";
import LoginForm from "../Pages/Auth/LoginForm";
import MainPage from "../Pages/MainPage";
import { useAuth } from "../Contexts/AuthContextProvider";
import Clientes from "../Pages/Clientes";
import Home from "../Pages/Home";
import NotFound from "../Pages/404";

function RoutesMain() {
  

  const navigate = useNavigate();

  const R = env.BASE_URL + "/";

  const {userData} = useAuth()

  const {login} = userData

  const PrivateRoute = ({children})=>{
    return login ? <MainPage>  {children}</MainPage> : <Navigate to={env.BASE_URL+"/"} />
  }


  
  

  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {}
    return () => {isActive = false; ca.abort();}
  }, []);


  return (
    <Routes>
      <Route path={R+"home"} element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path={R+"clientes"} element={<PrivateRoute><Clientes /></PrivateRoute>} />
      <Route path={R} element={<LoginForm />} />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}

export default RoutesMain;
