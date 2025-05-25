import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTaskById } from '../services/taskService';
import { Task } from '../models/Task';
import { TaskStatus, TaskPriority, getTaskStatusLabel, getTaskPriorityLabel  } from '../models/Enums';
import Button from '../components/common/Button';
import { useTaskContext } from '../context/TaskContext';

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateTaskById } = useTaskContext();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (id) {
          const taskData = await getTaskById(id);
          setTask(taskData);
        }
      } catch (err) {
        setError('Failed to load task details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);


  const handleStatusChange = async (status: TaskStatus) => {
    if (task && id) {
      try {
        await updateTaskById(id, { status });
        setTask(prev => prev ? { ...prev, status } : null);
      } catch (err) {
        setError('Failed to update task status');
        console.error(err);
      }
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get priority class for styling
  const getPriorityClass = (priority: TaskPriority) => {
    switch(priority) {
      case TaskPriority.HIGH:
        return 'bg-red-100 text-red-800';
      case TaskPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800';
      case TaskPriority.LOW:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status class for styling
  const getStatusClass = (status: TaskStatus) => {
    switch(status) {
      case TaskStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case TaskStatus.NOT_STARTED:
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading task details...</p>
      </div>
    );
  }

  if (error || !task) {
    return (
      <div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error || 'Task not found'}</p>
        </div>
        <Button variant="secondary" onClick={() => navigate('/tasks')}>
          Back to Tasks
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6 flex justify-between items-center">
        <Button variant="secondary" onClick={() => navigate('/tasks')}>
          Back to Tasks
        </Button>
        <Button variant="primary" onClick={() => navigate(`/tasks/edit/${task.id}`)}>
          Edit Task
        </Button>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
        <div className="flex space-x-2 mb-4">
         <span className={`px-3 py-1 rounded-full text-sm ${getPriorityClass(task.priority)}`}>
            {getTaskPriorityLabel(task.priority)}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(task.status)}`}>
            {getTaskStatusLabel(task.status)}
          </span>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{task.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Due Date</h2>
          <p className="text-gray-700">{formatDate(task.dueDate)}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Created At</h2>
          <p className="text-gray-700">{formatDate(task.createdAt)}</p>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">Update Status</h2>
        <div className="flex space-x-2">
          <Button 
            variant={task.status === TaskStatus.NOT_STARTED ? 'primary' : 'secondary'}
            onClick={() => handleStatusChange(TaskStatus.NOT_STARTED)}
          >
           {getTaskStatusLabel(TaskStatus.NOT_STARTED)}
          </Button>
          <Button 
            variant={task.status === TaskStatus.IN_PROGRESS ? 'primary' : 'secondary'}
            onClick={() => handleStatusChange(TaskStatus.IN_PROGRESS)}
          >
            {getTaskStatusLabel(TaskStatus.IN_PROGRESS)}
          </Button>
          <Button 
            variant={task.status === TaskStatus.COMPLETED ? 'primary' : 'secondary'}
            onClick={() => handleStatusChange(TaskStatus.COMPLETED)}
          >
           {getTaskStatusLabel(TaskStatus.COMPLETED)}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;
