import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PinnedSubheaderList() {
  return (
    <List
    sx={{
      bgcolor: 'rgba(0, 0, 0, 0.2)',
      color: '#f3f3d6',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 450,
      borderRadius: '16px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      '& ul': { padding: 0 },
      '& .MuiListSubheader-root': {
        bgcolor: '#f3f3d6',
        color: 'rgba(0, 0, 0, 0.87)',
        borderRadius: '16px 16px 0 0',
      },
      '& .MuiListItem-root': {
        '&:hover': {
          bgcolor: 'rgba(255, 255, 255, 0.2)',
        }
      }
    }}
      subheader={<li />}
    >
      <li key="section-models">
        <ul>
          <ListSubheader>{`Models`}</ListSubheader>
          {[...Array(10).keys()].map((item) => (
            <ListItem key={`item-model-${item + 1}`}>
              <ListItemText primary={`Model ${item + 1}`} />
            </ListItem>
          ))}
        </ul>
      </li>
    </List>
  );
}
