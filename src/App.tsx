import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, UserCog, Clock } from 'lucide-react';
import { modules } from './data';
import { ModuleCard } from './components/ModuleCard';
import { ProjectCard } from './components/ProjectCard';
import { VideoPlayer } from './components/VideoPlayer';
import { TeacherDashboard } from './components/TeacherDashboard';
import { Module, User, CourseProgress, Certificate } from './types';

function App() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Student',
    points: 0,
    role: 'student',
    completedModules: [],
    completedProjects: [],
    certificates: []
  });
  const [courseProgress, setCourseProgress] = useState<Record<string, CourseProgress>>({});
  const [availableModules, setAvailableModules] = useState(modules);

  const handleProjectComplete = (projectId: string, imageUrl?: string) => {
    const project = selectedModule?.projects.find(p => p.id === projectId);
    if (!project) return;

    setUser(prev => ({
      ...prev,
      points: prev.points + project.points,
      completedProjects: [...prev.completedProjects, projectId]
    }));

    // Update project with handwritten submission
    if (imageUrl && selectedModule) {
      setAvailableModules(prev => 
        prev.map(m => m.id === selectedModule.id ? {
          ...m,
          projects: m.projects.map(p => p.id === projectId ? {
            ...p,
            handwrittenSubmission: {
              imageUrl,
              verified: false
            }
          } : p)
        } : m)
      );
    }

    // Check if all projects in the module are completed
    const allProjectsCompleted = selectedModule.projects.every(
      p => user.completedProjects.includes(p.id) || p.id === projectId
    );

    if (allProjectsCompleted) {
      setUser(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, selectedModule.id]
      }));

      // Generate certificate
      const newCertificate: Certificate = {
        id: `cert-${Date.now()}`,
        moduleId: selectedModule.id,
        studentId: user.id,
        issueDate: new Date().toISOString(),
        grade: 'A' // You could calculate this based on performance
      };

      setUser(prev => ({
        ...prev,
        certificates: [...prev.certificates, newCertificate]
      }));
    }
  };

  const handleVideoProgress = (moduleId: string, playedSeconds: number) => {
    setCourseProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        moduleId,
        watchedSeconds: playedSeconds,
        isCompleted: false
      }
    }));
  };

  const handleVideoComplete = (moduleId: string) => {
    setCourseProgress(prev => ({
      ...prev,
      [moduleId]: {
        ...prev[moduleId],
        isCompleted: true
      }
    }));
  };

  const handleAddModule = (newModule: Omit<Module, 'id' | 'completed'>) => {
    const moduleWithId: Module = {
      ...newModule,
      id: `module-${Date.now()}`,
      completed: false,
      projects: newModule.projects.map((p, index) => ({
        ...p,
        id: `project-${Date.now()}-${index}`,
        completed: false
      }))
    };
    setAvailableModules(prev => [...prev, moduleWithId]);
  };

  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'student' ? 'teacher' : 'student'
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduLearn</h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-yellow-500" />
                <span className="font-medium">{user.points} Points</span>
              </div>
              <button
                onClick={toggleRole}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                <UserCog className="w-5 h-5" />
                <span className="capitalize">{user.role} Mode</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user.role === 'teacher' ? (
          <TeacherDashboard
            onAddModule={handleAddModule}
            onVerifySubmission={(moduleId, projectId, studentId) => {
              // Handle submission verification
            }}
            onIssueCertificate={(certificate) => {
              // Handle certificate issuance
            }}
          />
        ) : selectedModule ? (
          <div>
            <button
              onClick={() => setSelectedModule(null)}
              className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              ← Back to Modules
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {selectedModule.title}
                </h2>
                <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedModule.instructor}`}
                      alt={selectedModule.instructor}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{selectedModule.instructor}</h3>
                      <p className="text-sm text-gray-500">Course Instructor</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{selectedModule.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{selectedModule.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {selectedModule.projects.length} Projects
                      </span>
                    </div>
                  </div>
                </div>
                <VideoPlayer
                  url={selectedModule.videoUrl}
                  onProgress={({ playedSeconds }) => 
                    handleVideoProgress(selectedModule.id, playedSeconds)
                  }
                  onComplete={() => handleVideoComplete(selectedModule.id)}
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Projects</h3>
                <div className="space-y-6">
                  {selectedModule.projects.map(project => (
                    <ProjectCard
                      key={project.id}
                      project={{
                        ...project,
                        completed: user.completedProjects.includes(project.id)
                      }}
                      onComplete={handleProjectComplete}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Learning Modules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableModules.map(module => (
                <ModuleCard
                  key={module.id}
                  module={{
                    ...module,
                    completed: user.completedModules.includes(module.id),
                    projects: module.projects.map(p => ({
                      ...p,
                      completed: user.completedProjects.includes(p.id)
                    }))
                  }}
                  onSelect={() => setSelectedModule(module)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;