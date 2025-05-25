import React from 'react';
import { Task } from '../../models/Task';
import { TaskStatus, TaskPriority, getTaskStatusLabel, getTaskPriorityLabel  } from '../../models/Enums';
import Button from '../common/Button';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
  task, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const { id, title, description, status, priority, dueDate } = task;
  
  // Format date for display
  const formattedDate = new Date(dueDate).toLocaleDateString();
  
  // Get priority badge style
  const getPriorityBadgeClass = (priority: TaskPriority) => {
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

  // Get status badge style
  const getStatusBadgeClass = (status: TaskStatus) => {
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

  // Get next status
  const getNextStatus = (currentStatus: TaskStatus): TaskStatus => {
    switch(currentStatus) {
      case TaskStatus.NOT_STARTED:
        return TaskStatus.IN_PROGRESS;
      case TaskStatus.IN_PROGRESS:
        return TaskStatus.COMPLETED;
      case TaskStatus.COMPLETED:
        return TaskStatus.NOT_STARTED;
      default:
        return TaskStatus.NOT_STARTED;
    }
  };

  // Handle status change
  const handleStatusChange = () => {
    const nextStatus = getNextStatus(status);
    onStatusChange(id, nextStatus);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          <span className={`text-xs px-2 py-1 rounded ${getPriorityBadgeClass(priority)}`}>
            {getTaskPriorityLabel(priority)}
          </span>
          <span className={`text-xs px-2 py-1 rounded ${getStatusBadgeClass(status)}`}>
            {getTaskStatusLabel(status)}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-3 text-sm line-clamp-2">{description}</p>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Due: {formattedDate}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="secondary" 
            onClick={handleStatusChange}
            className="text-xs"
          >
            Change Status
          </Button>
          <Button 
            variant="primary" 
            onClick={() => onEdit(task)}
            className="text-xs"
          >
            Edit
          </Button>
          <Button 
            variant="danger" 
            onClick={() => onDelete(id)}
            className="text-xs"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskItem);
