import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, TaskCreate, TaskUpdate } from '../models/Task';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: TaskCreate) => Promise<void>;
  updateTaskById: (id: string, task: TaskUpdate) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks();
      setTasks(response);
      setError(null);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (task: TaskCreate) => {
    setLoading(true);
    try {
      const newTask = await createTask(task);
      setTasks(prevTasks => [...prevTasks, newTask]);
      setError(null);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskById = async (id: string, task: TaskUpdate) => {
    setLoading(true);
    try {
      await updateTask(id, task);
      fetchTasks();
      setError(null);
    } catch (err) {
      setError('Failed to update task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (id: string) => {
    setLoading(true);
    try {
      await deleteTask(id);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{
      tasks,
      loading,
      error,
      fetchTasks,
      addTask,
      updateTaskById,
      removeTask
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
