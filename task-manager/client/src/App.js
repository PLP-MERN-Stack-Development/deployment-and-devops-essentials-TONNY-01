import React, { useState } from 'react';
import { 
  Container, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  ThemeProvider, 
  createTheme,
  Tooltip,
  IconButton,
  Fab
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddTaskClick = () => {
    setIsAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setIsAddDialogOpen(false);
  };

  const handleTaskCreated = () => {
    setIsAddDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
        <AppBar position="static" color="primary" elevation={1}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Task Manager
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md" sx={{ py: 4 }}>
          <TaskList />
          
          {/* Add Task Fab */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 32,
              right: 32,
            }}
          >
            <Tooltip title="Add Task">
              <Fab 
                color="primary" 
                aria-label="add task"
                onClick={handleAddTaskClick}
                sx={{
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          </Box>
        </Container>
      </Box>

      {/* Add Task Dialog */}
      {isAddDialogOpen && (
        <TaskForm 
          onCancel={handleAddDialogClose} 
          onSuccess={handleTaskCreated} 
        />
      )}
    </ThemeProvider>
  );
}

export default App;
