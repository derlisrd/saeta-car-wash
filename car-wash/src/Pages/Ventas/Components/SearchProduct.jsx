import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React from 'react'

const SearcProduct = () => {
  return (
    <Autocomplete
      disablePortal
      options={top100Films}
      renderInput={(params) => <TextField {...params} label="Codigo producto" size="large" />}
    />
  )
}

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }]

export default SearcProduct
