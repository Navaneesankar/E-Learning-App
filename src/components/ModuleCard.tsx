import React from 'react';
import { Trophy, BookOpen, CheckCircle, Clock, User } from 'lucide-react';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
  onSelect: (moduleId: string) => void;
}

export function ModuleCard({ module, onSelect }: ModuleCardProps) {
  const completedProjects = module.projects.filter(p => p.completed).length;
  const totalProjects = module.projects.length;
  
  return (
    <div 
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onSelect(module.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{module.title}</h3>
        {module.completed ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <BookOpen className="w-6 h-6 text-blue-500" />
        )}
      </div>
      <p className="text-gray-600 mb-4">{module.description}</p>
      
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{module.instructor}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{module.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm text-gray-600">
            {completedProjects}/{totalProjects} Projects
          </span>
        </div>
        <div className="text-sm font-medium text-blue-600">
          Start Learning →
        </div>
      </div>
    </div>
  );
}