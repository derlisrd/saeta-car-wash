import { Button, Grid, Stack } from '@mui/material'
import React from 'react'
import Tablas from '../../Components/Custom/Tablas'
import { useClientes } from './ClientesProvider'

const ListaClientes = () => {

    const {listas,loading,setDialogs,dialogs} = useClientes()


    const columns = [
        {
          field: "id",
          title: "ID",
        },
        {
          field: "doc",
          title: "DOC.",
        },
        {
          field: "nombre_completo",
          title: "Chofer",
        }
    ]
    

    const Acciones = ({rowProps})=>(
        <Stack direction="row" spacing={1}>
          <Button color='warning' variant='outlined' > Editar </Button>
          <Button color='error' variant='outlined' > Borrar </Button>
        </Stack>
    )

    const openNewCliente = ()=>{ setDialogs({...dialogs,create:true})}

    const search = (<Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Button size='large' onClick={openNewCliente} variant='contained'>Agregar</Button>
      </Grid>
    </Grid>)

  return (
    <>
      <Tablas
        title={'Clientes'}
        subtitle={'Lista de clientes y choferes'}
        icon={{ name:"people" }}
        columns={columns}
        datas={listas.clientes}
        Accions={Acciones}
        showOptions
        loading={loading.clientes}
        inputs={search}
      />
    </>
  )
}

export default ListaClientes
