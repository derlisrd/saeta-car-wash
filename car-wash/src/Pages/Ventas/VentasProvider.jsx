import React, { createContext, useContext, useState } from 'react'

const Contexto = createContext()

const VentasProvider = ({children}) => {

    const initialDialogs = {
        main:true
    }
    const [dialogs,setDialogs] = useState(initialDialogs)

    const values = {dialogs,setDialogs}
  return <Contexto.Provider value={values}>{children}</Contexto.Provider>
}

export const useVentas = ()=>{
    const {dialogs,setDialogs} = useContext(Contexto)
    return {dialogs,setDialogs}
}

export default VentasProvider
