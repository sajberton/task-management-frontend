import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Task, TaskCreate, TaskUpdate } from '../models/Task';
import { TaskStatus, TaskPriority } from '../models/Enums';
import { useTaskContext } from '../context/TaskContext';
import { getTaskById } from '../services/taskService';
import { useFilter } from '../hooks/useFilter';
import TaskList from '../components/task/TaskList';
import TaskForm from '../components/task/TaskForm';
import TaskFilter from '../components/task/TaskFilter';
import Button from '../components/common/Button';

const TasksPage: React.FC = () => {
  const { tasks, loading, error, addTask, updateTaskById, removeTask } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Check if we're in edit mode from URL
  useEffect(() => {
    const loadTaskForEdit = async () => {
      if (id) {
        try {
          const taskData = await getTaskById(id);
          setSelectedTask(taskData);
          setIsFormVisible(true);
        } catch (err) {
          console.error('Failed to load task for editing:', err);
          navigate('/tasks');
        }
      }
    };
    
    loadTaskForEdit();
  }, [id, navigate]);
  
  const {
    filters,
    filteredTasks,
    setStatusFilter,
    setPriorityFilter,
    setSearchTerm,
    setSortBy,
    setSortDirection,
    clearFilters
  } = useFilter(tasks);

  // Handle task editing
  const handleEditTask = useCallback((task: Task) => {
    setSelectedTask(task);
    setIsFormVisible(true);
  }, []);

  // Handle task deletion with confirmation
  const handleDeleteTask = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      removeTask(id);
    }
  }, [removeTask]);

  // Handle status change
  const handleStatusChange = useCallback((id: string, data: TaskUpdate) => {
    updateTaskById(id, data)
  }, [updateTaskById]);

  // Handle task creation submission
  const handleCreateSubmit = useCallback((data: TaskCreate) => {
    addTask(data);
    setIsFormVisible(false);
  }, [addTask]);

  // Handle task update submission
  const handleUpdateSubmit = useCallback((data: TaskCreate) => {
    if (selectedTask) {
      updateTaskById(selectedTask.id, data as TaskUpdate);
      setSelectedTask(null);
      setIsFormVisible(false);
    }
  }, [selectedTask, updateTaskById]);

  // Handle form cancel
  const handleFormCancel = useCallback(() => {
    setSelectedTask(null);
    setIsFormVisible(false);
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Task Management</h1>
      
      {/* Error Alert */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {/* Task Form */}
      {isFormVisible ? (
        <div className="mb-6">
          <TaskForm
            onSubmit={selectedTask ? handleUpdateSubmit : handleCreateSubmit}
            initialValues={selectedTask || undefined}
            isEditMode={!!selectedTask}
          />
          <div className="mt-4 flex justify-end">
            <Button variant="secondary" onClick={handleFormCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <Button
            variant="primary"
            onClick={() => setIsFormVisible(true)}
          >
            Create New Task
          </Button>
        </div>
      )}
      
      {/* Task Filters */}
      <TaskFilter
        statusFilter={filters.status as TaskStatus | null}
        priorityFilter={filters.priority as TaskPriority | null}
        searchTerm={filters.searchTerm || ''}
        sortBy={filters.sortBy || 'dueDate'}
        sortDirection={filters.sortDirection || 'asc'}
        onStatusFilterChange={setStatusFilter}
        onPriorityFilterChange={setPriorityFilter}
        onSearchTermChange={setSearchTerm}
        onSortByChange={setSortBy}
        onSortDirectionChange={setSortDirection}
        onClearFilters={clearFilters}
      />
      
      {/* Loading State */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      ) : (
        /* Task List */
        <TaskList
          tasks={filteredTasks}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />      )}
    </div>
  );
};

export default TasksPage;
