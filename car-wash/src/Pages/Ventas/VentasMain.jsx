import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, TextField } from '@mui/material'
import React from 'react'
import SearcProduct from './Components/SearchProduct'
import TableItems from './Components/TableItems'
import { useVentas } from './VentasProvider'

const VentasMain = () => {

    const {dialogs,setDialogs} = useVentas()

    const close = ()=>{
        setDialogs({...dialogs,main:false})
    }
  return (
    <Dialog fullScreen open={dialogs.main} onClose={close}> 
      <DialogTitle> <IconButton onClick={close}><Icon>close</Icon></IconButton>  Venta - Total Gs: 0 </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            Cliente
          </Grid>
          <Grid item xs={12}>
            <SearcProduct />
          </Grid>
          <Grid item xs={12}>
            <TableItems />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button size='large' variant='contained' color='success'>Finalizar</Button>
        <Button size='large' variant='outlined' color='warning'>Aguardar</Button>
        <Button size='large' variant='outlined' color='error'>Salir</Button>
      </DialogActions>
    </Dialog>
  )
}

export default VentasMain
