import SimpleBar from "simplebar-react";
import {AppBar, Box, Button, Drawer, Icon, IconButton, Toolbar, Typography} from '@mui/material'
import { useState } from "react";
import Menu from "../Components/Menu";
import { env } from "../App/config";
import { useAuth } from "../Contexts/AuthContextProvider";
//import Menu from "../Components/Menu";

function MainPage({ children,window }) {
    const {logOut} = useAuth()
    const [mobileOpen, setMobileOpen] = useState(false);
    const drawerWidth = 270
    const container = window !== undefined ? () => window().document.body : undefined;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
      };

  return (
    <SimpleBar style={{ maxHeight: "100vh" }} >
      <Box sx={{ display: 'flex' }}>
      <AppBar color="inherit" 
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Icon>menu</Icon>
          </IconButton>
          
          <Typography variant="h6" noWrap component="div">
            {env.APP_NAME}
          </Typography>
            <Button variant="contained" onClick={logOut}>
              log out
            </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Menu />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Menu />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
    </SimpleBar>
  );
}

export default MainPage;
