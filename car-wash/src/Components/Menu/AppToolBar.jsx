import { Icon, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

const AppToolBar = () => {
  return (
    <Stack direction='row' alignItems="center" spacing={2} justifyContent="end" sx={{ width:'100%' }} >
        <Stack direction="row" spacing={2}>
            <Typography variant='button'>Car wash</Typography>
        </Stack>
        <Stack>
            <IconButton>
                <Icon>account_circle</Icon>
            </IconButton>
        </Stack>
    </Stack>
  )
}

export default AppToolBar
