import React, { useState } from 'react';
import { Plus, Video, FileText, Award } from 'lucide-react';
import { Module, Project, Certificate } from '../types';

interface TeacherDashboardProps {
  onAddModule: (module: Omit<Module, 'id' | 'completed'>) => void;
  onVerifySubmission: (moduleId: string, projectId: string, studentId: string) => void;
  onIssueCertificate: (certificate: Omit<Certificate, 'id'>) => void;
}

export function TeacherDashboard({ onAddModule, onVerifySubmission, onIssueCertificate }: TeacherDashboardProps) {
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModule, setNewModule] = useState({
    title: '',
    description: '',
    videoUrl: '',
    instructor: '',
    duration: '',
    projects: [] as Project[]
  });

  const handleAddModule = (e: React.FormEvent) => {
    e.preventDefault();
    onAddModule(newModule);
    setNewModule({
      title: '',
      description: '',
      videoUrl: '',
      instructor: '',
      duration: '',
      projects: []
    });
    setIsAddingModule(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h2>
        <button
          onClick={() => setIsAddingModule(!isAddingModule)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add New Module
        </button>
      </div>

      {isAddingModule && (
        <form onSubmit={handleAddModule} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Module Title
            </label>
            <input
              type="text"
              value={newModule.title}
              onChange={(e) => setNewModule({ ...newModule, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={newModule.description}
              onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Video URL
            </label>
            <div className="flex items-center gap-2">
              <Video className="w-5 h-5 text-gray-400" />
              <input
                type="url"
                value={newModule.videoUrl}
                onChange={(e) => setNewModule({ ...newModule, videoUrl: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructor Name
              </label>
              <input
                type="text"
                value={newModule.instructor}
                onChange={(e) => setNewModule({ ...newModule, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={newModule.duration}
                onChange={(e) => setNewModule({ ...newModule, duration: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="e.g., 2h 30m"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddingModule(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Module
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Module management cards would go here */}
      </div>
    </div>
  );
}