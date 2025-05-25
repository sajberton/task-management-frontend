import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TaskCreate } from '../../models/Task';
import { TaskStatus, TaskPriority, getTaskStatusLabel, getTaskPriorityLabel  } from '../../models/Enums';
import Input from '../common/InputForward';
import Select from '../common/SelectForward';
import Button from '../common/Button';

interface TaskFormProps {
  onSubmit: (data: TaskCreate) => void;
  initialValues?: Partial<TaskCreate>;
  isEditMode?: boolean;
}

const TaskForm: React.FC<TaskFormProps> = ({ 
  onSubmit, 
  initialValues = {}, 
  isEditMode = false 
}) => {
  const { 
    register, 
    handleSubmit, 
    control,
    formState: { errors } 
  } = useForm<TaskCreate>({
    defaultValues: {
      title: initialValues.title || '',
      description: initialValues.description || '',
      status: initialValues.status || TaskStatus.NOT_STARTED,
      priority: initialValues.priority || TaskPriority.MEDIUM,
      dueDate: initialValues.dueDate ? new Date(initialValues.dueDate) : new Date(),
    }
  });

  const statusOptions = [
    { value: TaskStatus.NOT_STARTED.toString(), label: getTaskStatusLabel(TaskStatus.NOT_STARTED) },
    { value: TaskStatus.IN_PROGRESS.toString(), label: getTaskStatusLabel(TaskStatus.IN_PROGRESS) },
    { value: TaskStatus.COMPLETED.toString(), label: getTaskStatusLabel(TaskStatus.COMPLETED) }
  ];

  const priorityOptions = [
    { value: TaskPriority.LOW.toString(), label: getTaskPriorityLabel(TaskPriority.LOW) },
    { value: TaskPriority.MEDIUM.toString(), label: getTaskPriorityLabel(TaskPriority.MEDIUM) },
    { value: TaskPriority.HIGH.toString(), label: getTaskPriorityLabel(TaskPriority.HIGH) }
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Task' : 'Create New Task'}</h2>
        <Input
        id="title"
        label="Title"
        {...register('title', { required: 'Title is required',
          maxLength: {
            value: 100,
            message: 'Title cannot exceed 100 characters'
          },
          minLength: {
            value: 3,
            message: 'Title must be at least 3 characters long'
          }
         })}
        error={errors.title?.message}
        required
      />
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register('description', {
            maxLength: {
              value: 500,
              message: 'Description cannot exceed 500 characters'
            }
          })}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>      <Controller
        control={control}
        name="status"
        render={({ field: { onChange, value, ref } }) => (
          <Select
            id="status"
            label="Status"
            value={value.toString()}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            ref={ref}
            options={statusOptions}
            required
          />
        )}
      />
      
      <Controller
        control={control}
        name="priority"
        render={({ field: { onChange, value, ref } }) => (
          <Select
            id="priority"
            label="Priority"
            value={value.toString()}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            ref={ref}
            options={priorityOptions}
            required
          />
        )}
      />        <Controller
        control={control}
        name="dueDate"
        rules={{ required: 'Due date is required',
          validate: {
            isFuture: (value) => {
              // Skip validation for edit mode if needed
              if (isEditMode && initialValues.status === TaskStatus.COMPLETED) {
                return true;
              }
              
              const today = new Date();
              today.setHours(0, 0, 0, 0); // Reset time to start of day
              
              const selectedDate = new Date(value);
              selectedDate.setHours(0, 0, 0, 0); // Reset time to start of day
              
              return selectedDate >= today || 'Due date must be today or in the future';
            }
          }
         }}
        render={({ field: { onChange, value, ref } }) => {
          // Format date for display in the input
          const formattedDate = value instanceof Date 
            ? value.toISOString().split('T')[0] 
            : typeof value === 'string' 
              ? new Date(value).toISOString().split('T')[0]
              : '';
              
          return (
            <Input
              id="dueDate"
              label="Due Date"
              type="date"
              value={formattedDate}
              onChange={(e) => {
                // Parse the string date from the input into a Date object
                onChange(e.target.value ? new Date(e.target.value) : null);
              }}
              ref={ref}
              error={errors.dueDate?.message}
              required
            />
          );
        }}
      />
      
      <div className="flex justify-end space-x-2 mt-6">
        <Button type="submit" variant="primary">
          {isEditMode ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
