import React, { useState } from 'react';
import { Award, Clock, Star, CheckCircle, FileCode, FileText, Presentation, Upload, X } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onComplete: (projectId: string, imageUrl?: string) => void;
}

export function ProjectCard({ project, onComplete }: ProjectCardProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const difficultyColor = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  const submissionIcon = {
    code: <FileCode className="w-5 h-5" />,
    document: <FileText className="w-5 h-5" />,
    presentation: <Presentation className="w-5 h-5" />
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = () => {
    if (selectedImage) {
      // In a real app, you would upload the image to a server here
      // For now, we'll just use the preview URL
      onComplete(project.id, previewUrl);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-800">{project.title}</h4>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColor[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>
      <p className="text-gray-600 mb-4">{project.description}</p>
      
      <div className="mb-4">
        <h5 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h5>
        <ul className="list-disc list-inside space-y-1">
          {project.requirements.map((req, index) => (
            <li key={index} className="text-sm text-gray-600">{req}</li>
          ))}
        </ul>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium">{project.points} Points</span>
        </div>
        <div className="flex items-center gap-2">
          {submissionIcon[project.submissionType]}
          <span className="text-sm text-gray-600 capitalize">{project.submissionType}</span>
        </div>
      </div>

      {!project.completed && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Handwritten Solution
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            {previewUrl ? (
              <div className="relative">
                <img src={previewUrl} alt="Preview" className="max-h-48 rounded" />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageSelect}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            )}
          </div>
        </div>
      )}

      {project.handwrittenSubmission && (
        <div className="mb-4">
          <img
            src={project.handwrittenSubmission.imageUrl}
            alt="Submitted solution"
            className="max-h-48 rounded"
          />
          {project.handwrittenSubmission.verified && (
            <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              Verified by instructor
            </p>
          )}
        </div>
      )}

      <button
        onClick={() => selectedImage ? handleSubmit() : null}
        disabled={project.completed || !selectedImage}
        className={`w-full px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
          project.completed
            ? 'bg-green-100 text-green-800 cursor-not-allowed'
            : !selectedImage
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {project.completed ? (
          <>
            <CheckCircle className="w-5 h-5" />
            Completed
          </>
        ) : (
          'Submit Project'
        )}
      </button>
    </div>
  );
}