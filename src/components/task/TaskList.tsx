import React, { useCallback } from 'react';
import { Task, TaskUpdate } from '../../models/Task';
import { TaskStatus } from '../../models/Enums';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, data: TaskUpdate) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  // Memoize callback functions to prevent unnecessary re-renders
  const handleEdit = useCallback((task: Task) => {
    onEdit(task);
  }, [onEdit]);

  const handleDelete = useCallback((id: string) => {
    onDelete(id);
  }, [onDelete]);

  const handleStatusChange = useCallback((id: string, status: TaskStatus) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    task.status = status; 
    onStatusChange(id, task as TaskUpdate);
  }, [onStatusChange]);

  // Display a message if no tasks are available
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No tasks found. Create a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default React.memo(TaskList);
