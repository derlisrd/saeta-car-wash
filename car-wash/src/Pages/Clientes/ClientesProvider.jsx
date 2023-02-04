import { createContext,useCallback,useContext, useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContextProvider";
import { APICALLER } from "../../Services/api";

const ClientesContext = createContext();

function ClientesProvider({children}) {

    const {userData} = useAuth()
    const {token} = userData
    const initialLista = {
        clientes:  []
    }
    const initialLoading = {
        clientes: true,
    }
    const initialDialogs = {
      create:false
    }
    const [dialogs,setDialogs] = useState(initialDialogs)
    const [listas,setListas] = useState(initialLista)
    const [loading,setLoading] = useState(initialLoading)
    const getLista = useCallback(async () => {
        setLoading({clientes:true});

        let res = await APICALLER.get({table:'clientes',token:userData.token});
        if (res.response) {
          setListas({clientes:res.results});
        } else {
          console.log(res);
        } 
        setLoading({clientes:false});
      }, [userData]);
    
      useEffect(() => {
        const ca = new AbortController();
        let isActive = true; 
        if (isActive) {getLista(); }
        return () => { isActive = false; ca.abort();};
      }, [getLista]);

    const values = {token,dialogs,setDialogs,listas,loading,getLista}
    return <ClientesContext.Provider value={values}>{children}</ClientesContext.Provider>;
}

export function useClientes(){
    const {token,dialogs,setDialogs,listas,loading,getLista} = useContext(ClientesContext)
    return {token,dialogs,setDialogs,listas,loading,getLista}
}

export default ClientesProvider;