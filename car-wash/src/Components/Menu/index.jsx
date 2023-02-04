import { Divider, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import { listamenu } from '../../Utils/listamenu'
import { Link,useLocation } from "react-router-dom";

const Menu = () => {
  return (
<div>
      <Toolbar />
      <Divider />
      <List>
        { listamenu.map((m, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton component={Link} to={m.url}>
              <ListItemIcon>
                <Icon>{m.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={m.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default Menu
