import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import TasksPage from './pages/TasksPage';
import TaskDetailPage from './pages/TaskDetailPage';
import Navbar from './components/common/Navbar';
import ErrorBoundary from './components/common/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <TaskProvider>
        <Router>
          <div className="App bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Navigate to="/tasks" replace />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/tasks/edit/:id" element={<TasksPage />} />
                <Route path="/tasks/:id" element={<TaskDetailPage />} />
                <Route path="*" element={
                  <div className="text-center py-8">
                    <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
                    <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </Router>
      </TaskProvider>
    </ErrorBoundary>
  );
}

export default App;
