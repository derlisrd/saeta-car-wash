import swal from 'sweetalert'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, LinearProgress, TextField, Zoom } from '@mui/material'
import {useState} from 'react'
import { APICALLER } from '../../Services/api'
import { useClientes } from './ClientesProvider'

const ClientesCreate = () => {

    const {dialogs,setDialogs,token,getLista} = useClientes()
    const initialErrors = {
        active:false,
        message:''
    }
    const [errors,setErrors] = useState(initialErrors)
    const [loading,setLoading] = useState(false)
    const initialForm = { doc:'',nombre_completo:''}
    const [form,setForm] = useState(initialForm)
    const change = e=>{
        const {name,value} = e.target
        setForm({
            ...form, [name]:value
        })
    }

    const cerrar = ()=>{
        setDialogs({...dialogs,create:false})
        setForm(initialForm)
    }

    const submit = async(e)=>{
        e.preventDefault();

        setLoading(true)
        let res = await APICALLER.insert({table:'clientes',data:form,token:token})

        if(res.response){
            cerrar()        
            getLista()
            setErrors(initialErrors)
            swal({icon:'success',text:'Agregado correctamente',timer:3000});
        }else{
            setErrors({active:true,message:res.message})
        }
        
        setLoading(false)
    }


  return (
    <Dialog fullWidth open={dialogs.create} onClose={cerrar} TransitionComponent={Zoom}>
        <form onSubmit={submit} >
            <DialogTitle>
                Nuevo Registro
            </DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {loading && <LinearProgress />}
                    
                        {
                            errors.active && <Alert severity='error'> { errors.message}</Alert>
                        }
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required disabled={loading} autoComplete='off' autoFocus fullWidth name="doc" value={form.doc} onChange={change} label="Documento" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required disabled={loading} autoComplete='off' fullWidth name="nombre_completo" value={form.nombre_completo} onChange={change} label="Nombre completo" />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button type='submit' disabled={loading} variant='contained'>Registrar</Button> 
                <Button type='button' disabled={loading} onClick={cerrar} variant='outlined' color="warning">Cancelar</Button> 
            </DialogActions>
        </form>
    </Dialog>
  )
}

export default ClientesCreate
