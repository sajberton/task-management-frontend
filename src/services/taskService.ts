import api from './api';
import { Task, TaskCreate, TaskUpdate } from '../models/Task';

const BASE_URL = '/tasks';

export const getTasks = async () => {
  const response = await api.get<Task[]>(BASE_URL);
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await api.get<Task>(`${BASE_URL}/${id}`);
  return response.data;
};

export const createTask = async (task: TaskCreate) => {
  const response = await api.post<Task>(BASE_URL, task);
  return response.data;
};

export const updateTask = async (id: string, task: TaskUpdate) => {
  const response = await api.put<Task>(`${BASE_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`${BASE_URL}/${id}`);
  return response.data;
};
