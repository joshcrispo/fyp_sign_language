import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

export default function PinnedSubheaderList({ models, selectedModel, onModelSelect }) {
  return (
    <List
    sx={{
      bgcolor: 'rgba(0, 0, 0, 0.2)',
      color: '#f3f3d6',
      position: 'relative',
      overflow: 'auto',
      maxHeight: 450,
      marginBottom: 2,
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
          {models.map((model, index) => (
            <ListItem key={`item-model-${index}`} disablePadding>
              <ListItemButton
                onClick={() => onModelSelect(model)}
                sx={{
                  bgcolor: model === selectedModel ? 'rgba(255, 255, 255, 0.12)' : 'inherit',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <ListItemText primary={model} />
              </ListItemButton>
            </ListItem>
          ))}
        </ul>
      </li>
    </List>
  );
}