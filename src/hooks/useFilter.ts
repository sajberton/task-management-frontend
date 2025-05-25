import { useState, useMemo } from 'react';
import { Task } from '../models/Task';
import { TaskStatus, TaskPriority } from '../models/Enums';

interface FilterOptions {
  status?: TaskStatus | null;
  priority?: TaskPriority | null;
  searchTerm?: string;
  sortBy?: 'dueDate' | 'priority' | 'title';
  sortDirection?: 'asc' | 'desc';
}

export const useFilter = (tasks: Task[]) => {
  const [filters, setFilters] = useState<FilterOptions>({
    status: null,
    priority: null,
    searchTerm: '',
    sortBy: 'dueDate',
    sortDirection: 'asc'
  });

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        // Filter by status
        if (filters.status !== null && task.status !== filters.status) {
          return false;
        }
        
        // Filter by priority
        if (filters.priority !== null && task.priority !== filters.priority) {
          return false;
        }
        
        // Filter by search term
        if (filters.searchTerm && !task.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) && 
            !task.description.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by selected field
        if (filters.sortBy === 'dueDate') {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return filters.sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (filters.sortBy === 'priority') {
          const priorityOrder = { [TaskPriority.LOW]: 1, [TaskPriority.MEDIUM]: 2, [TaskPriority.HIGH]: 3 };
          const priorityA = priorityOrder[a.priority as TaskPriority];
          const priorityB = priorityOrder[b.priority as TaskPriority];
          return filters.sortDirection === 'asc' ? priorityA - priorityB : priorityB - priorityA;
        } else if (filters.sortBy === 'title') {
          return filters.sortDirection === 'asc' 
            ? a.title.localeCompare(b.title) 
            : b.title.localeCompare(a.title);
        }
        return 0;
      });
  }, [tasks, filters]);

  const setStatusFilter = (status: TaskStatus | null) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const setPriorityFilter = (priority: TaskPriority | null) => {
    setFilters(prev => ({ ...prev, priority }));
  };

  const setSearchTerm = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }));
  };

  const setSortBy = (sortBy: 'dueDate' | 'priority' | 'title') => {
    setFilters(prev => ({ ...prev, sortBy }));
  };

  const setSortDirection = (sortDirection: 'asc' | 'desc') => {
    setFilters(prev => ({ ...prev, sortDirection }));
  };

  const clearFilters = () => {
    setFilters({
      status: null,
      priority: null,
      searchTerm: '',
      sortBy: 'dueDate',
      sortDirection: 'asc'
    });
  };

  return {
    filters,
    filteredTasks,
    setStatusFilter,
    setPriorityFilter,
    setSearchTerm,
    setSortBy,
    setSortDirection,
    clearFilters
  };
};
