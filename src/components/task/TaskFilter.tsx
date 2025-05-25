import React from 'react';
import { TaskStatus, TaskPriority, getTaskStatusLabel, getTaskPriorityLabel  } from '../../models/Enums';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';

interface TaskFilterProps {
  statusFilter: TaskStatus | null;
  priorityFilter: TaskPriority | null;
  searchTerm: string;
  sortBy: 'dueDate' | 'priority' | 'title';
  sortDirection: 'asc' | 'desc';
  onStatusFilterChange: (status: TaskStatus | null) => void;
  onPriorityFilterChange: (priority: TaskPriority | null) => void;
  onSearchTermChange: (term: string) => void;
  onSortByChange: (sortBy: 'dueDate' | 'priority' | 'title') => void;
  onSortDirectionChange: (direction: 'asc' | 'desc') => void;
  onClearFilters: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  priorityFilter,
  searchTerm,
  sortBy,
  sortDirection,
  onStatusFilterChange,
  onPriorityFilterChange,
  onSearchTermChange,
  onSortByChange,
  onSortDirectionChange,
  onClearFilters
}) => {
   const statusOptions = [
    { value: '', label: 'All Status' },
    { value: TaskStatus.NOT_STARTED.toString(), label: getTaskStatusLabel(TaskStatus.NOT_STARTED) },
    { value: TaskStatus.IN_PROGRESS.toString(), label: getTaskStatusLabel(TaskStatus.IN_PROGRESS) },
    { value: TaskStatus.COMPLETED.toString(), label: getTaskStatusLabel(TaskStatus.COMPLETED) }
  ];

  const priorityOptions = [
    { value: '', label: 'All Priorities' },
    { value: TaskPriority.LOW.toString(), label: getTaskPriorityLabel(TaskPriority.LOW) },
    { value: TaskPriority.MEDIUM.toString(), label: getTaskPriorityLabel(TaskPriority.MEDIUM) },
    { value: TaskPriority.HIGH.toString(), label: getTaskPriorityLabel(TaskPriority.HIGH) }
  ];

  const sortByOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'title', label: 'Title' }
  ];

  const sortDirectionOptions = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

 const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onStatusFilterChange(value ? parseInt(value, 10) as TaskStatus : null);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onPriorityFilterChange(value ? parseInt(value, 10) as TaskPriority : null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortByChange(e.target.value as 'dueDate' | 'priority' | 'title');
  };

  const handleSortDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortDirectionChange(e.target.value as 'asc' | 'desc');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Filter Tasks</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Select
          id="status-filter"
          label="Status"
          value={statusFilter !== null ? statusFilter.toString() : ''}
          onChange={handleStatusChange}
          options={statusOptions}
        />
        
        <Select
          id="priority-filter"
          label="Priority"
          value={priorityFilter !== null ? priorityFilter.toString() : ''}
          onChange={handlePriorityChange}
          options={priorityOptions}
        />
        
        <Input
          id="search"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search tasks..."
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Select
          id="sort-by"
          label="Sort By"
          value={sortBy}
          onChange={handleSortByChange}
          options={sortByOptions}
        />
        
        <Select
          id="sort-direction"
          label="Sort Direction"
          value={sortDirection}
          onChange={handleSortDirectionChange}
          options={sortDirectionOptions}
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          variant="secondary"
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default React.memo(TaskFilter);
