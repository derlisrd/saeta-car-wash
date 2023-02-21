import { Button, Stack } from '@mui/material'
import React from 'react'
import { useVentas } from './VentasProvider'

const VentasUnder = () => {

    const { dialogs,setDialogs} = useVentas()

    const open = ()=>{ setDialogs({...dialogs,main:true})}

  return (
    <>
      <h1>Ventas</h1>
      <Stack direction={"row"} spacing={2}>
        <Button variant='outlined' size='large' onClick={open}>Hacer venta</Button>
        <Button variant='outlined' size='large' onClick={open}>Lista de ventas</Button>
      </Stack>
    </>
  )
}

export default VentasUnder
