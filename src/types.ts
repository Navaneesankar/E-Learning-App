export interface Module {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  videoUrl: string;
  instructor: string;
  duration: string;
  projects: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  requirements: string[];
  submissionType: 'code' | 'document' | 'presentation';
  handwrittenSubmission?: {
    imageUrl: string;
    verified: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  points: number;
  role: 'student' | 'teacher';
  completedModules: string[];
  completedProjects: string[];
  certificates: Certificate[];
}

export interface CourseProgress {
  moduleId: string;
  watchedSeconds: number;
  isCompleted: boolean;
}

export interface Certificate {
  id: string;
  moduleId: string;
  studentId: string;
  issueDate: string;
  grade: string;
}