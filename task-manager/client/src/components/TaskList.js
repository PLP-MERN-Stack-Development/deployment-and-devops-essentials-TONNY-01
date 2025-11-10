import React, { useState, useEffect } from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton, 
  Typography, 
  Paper, 
  Box,
  Chip,
  CircularProgress
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Delete as DeleteIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { getTasks, updateTask, deleteTask } from '../services/api';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleStatusToggle = async (task) => {
    try {
      const updatedTask = {
        ...task,
        status: task.status === 'completed' ? 'pending' : 'completed'
      };
      await updateTask(task._id, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleTaskUpdated = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        My Tasks
      </Typography>
      
      {editingTask && (
        <Box mb={3}>
          <TaskForm 
            task={editingTask} 
            onCancel={() => setEditingTask(null)} 
            onSuccess={handleTaskUpdated} 
          />
        </Box>
      )}

      {tasks.length === 0 ? (
        <Typography variant="body1" color="textSecondary" align="center" py={4}>
          No tasks found. Add a new task to get started!
        </Typography>
      ) : (
        <List>
          {tasks.map((task) => (
            <Paper 
              key={task._id} 
              elevation={1} 
              sx={{ 
                mb: 1, 
                bgcolor: task.status === 'completed' ? 'action.hover' : 'background.paper'
              }}
            >
              <ListItem>
                <IconButton 
                  edge="start" 
                  onClick={() => handleStatusToggle(task)}
                  color={task.status === 'completed' ? 'success' : 'default'}
                >
                  {task.status === 'completed' ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
                
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                          mr: 1
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Chip 
                        label={task.status} 
                        size="small" 
                        color={getStatusColor(task.status)}
                        variant="outlined"
                        sx={{ mr: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <>
                      {task.description && (
                        <Typography variant="body2" color="text.secondary">
                          {task.description}
                        </Typography>
                      )}
                      {task.dueDate && (
                        <Typography variant="caption" color="text.secondary">
                          Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                        </Typography>
                      )}
                    </>
                  }
                />
                
                <ListItemSecondaryAction>
                  <IconButton 
                    edge="end" 
                    onClick={() => handleEdit(task)}
                    disabled={editingTask !== null}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    edge="end" 
                    onClick={() => handleDelete(task._id)}
                    disabled={editingTask !== null}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default TaskList;
