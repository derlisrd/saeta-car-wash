import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { env } from "../App/config";
import { APICALLER } from "../Services/api";

const AuthContext = createContext(null);

function AuthContextProvider({ children }) {

  const navigate = useNavigate()
  const storage = JSON.parse(sessionStorage.getItem("userData")) || JSON.parse(localStorage.getItem("userData"));

  const initialUserData = {
    login: false,
    token: null,
    id: null,
    name: null,
    usename: null,
    email:null
  };

  const initialErrors = {
    active:false,
    message:''
  }
  const [errors,setErrors] = useState(initialErrors)
  const [userData,setUserData] = useState( storage ?? initialUserData);    
  const initialLoading = {
    attempLogin:false
  }
  const [loading,setLoading] = useState(initialLoading)

  
  const setearLogin = (datas, remember = false) => {

    let f= {
      login:true,
      token:datas.token,
      id:datas.id,
      username: datas.username,
      name:datas.name,
      email:datas.email
    }
    setUserData(f)
    sessionStorage.setItem("userData", JSON.stringify(f))
    if(remember){
      localStorage.setItem("userData", JSON.stringify(f))
    } 

  };



  const logOut = async ()=>{
    let res = await APICALLER.logout(userData.token)
    if(res.response){
      setUserData(initialUserData)
      sessionStorage.removeItem('userData')
      localStorage.removeItem('userData')
    }
  }

  const AttempLogIn = async (f, remember) => {
    setLoading({attempLogin:true})

    let res = await APICALLER.login(f);
    
    if(res.response){
      setearLogin(res.results,remember)
      setErrors(initialErrors)
    }
    else{
      setErrors({active:true,message:res.message})
    }

    setLoading({attempLogin:false})
  };



  const checkToken =  async()=>{
    let res = await APICALLER.checktoken(userData.token);
    if (res.response){
      navigate(env.BASE_URL+ '/home')
    }else {
      logOut();
    }
  }


  const verificar = useCallback(async () => {
    let local = localStorage.getItem("userData") || sessionStorage.getItem("userData");
    if (userData.login && local) {
      setInterval(async () => {
        let res = await APICALLER.checktoken(userData.token);
        //console.log(res)
        if (!res.response) {
          console.log(res);
          logOut();
        }
      }, 600000); //
    }
  }, [userData, logOut]);


  useEffect(() => {
    const ca = new AbortController();
    let isActive = true;
    if (isActive) {
      verificar();
    }
    return () => {
      isActive = false;
      ca.abort();
    };
  }, [verificar]);

  const values = {logOut,loading,errors, userData, AttempLogIn,checkToken };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const {logOut,loading,errors, userData, AttempLogIn,checkToken } = useContext(AuthContext);
  return {logOut,loading,errors, userData, AttempLogIn,checkToken };
}

export default AuthContextProvider;
