import { Alert, Backdrop, Box, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState,useCallback,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { env } from '../../App/config';
import { useAuth } from '../../Contexts/AuthContextProvider';


const LoginForm = () => {
  const navigate = useNavigate()
  const {AttempLogIn,userData,errors,loading} = useAuth()
  const {login} = userData
  const initialForm = {email:'',password:''}
  const [form,setForm] = useState(initialForm)
  const change = e=>{ setForm({...form,[e.target.name]:e.target.value})}

  async function submit(e){
    e.preventDefault();
     AttempLogIn(form,false);
  }

  const verificar = useCallback(()=>{
    if(login) {
      navigate(env.BASE_URL+"/home")
    }
  },[login,navigate])


  useEffect(() => {
    const ca = new AbortController(); let isActive = true;
    if (isActive) {
      verificar();
    }
    return () => {isActive = false;ca.abort();};
  }, [verificar]);

  if(login){
    return <Backdrop  open={true}><CircularProgress color="inherit" /></Backdrop>
  }

  

  return (
    <form onSubmit={submit}>
      <Box sx={{ height:'100vh',justifyContent:'center',alignItems:'center',display:'flex' }}>
      <Container maxWidth="xs" sx={{ border:'1px solid silver', borderRadius:2, p:3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5' display='block' align='center'>Entrar</Typography>
          </Grid>
          <Grid item xs={12}>
            {errors.active && <Alert icon={false} severity="error" variant="outlined" > {errors.message}</Alert>}
          </Grid>
          <Grid item xs={12}>
            <TextField name="email" required disabled={loading.attempLogin} value={form.email} onChange={change} autoFocus label="Usuario o E-mail" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField name="password" required disabled={loading.attempLogin} value={form.password} onChange={change} type='password' label="Contraseña" fullWidth />
          </Grid>
          <Grid item xs={12}>
            
            <LoadingButton fullWidth variant="contained" size="large" type="submit" loading={loading.attempLogin}>Ingresar</LoadingButton> 
            
          </Grid>
        </Grid>
      </Container>
      </Box>
    </form>
  )
}

export default LoginForm
