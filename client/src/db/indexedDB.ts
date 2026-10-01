import Dexie, { Table } from 'dexie';

export interface CourseRecord {
  id: string;
  title: string;
  category: string;
  level: string;
  description: string;
  totalLessons: number;
  downloadSizeMB: number;
  isDownloaded: boolean;
  downloadedAt?: string;
}

export interface LessonRecord {
  id: string;
  courseId: string;
  order: number;
  title: string;
  shortDescription: string;
  contentMarkdown: string;
  codeSnippets: Array<{ title: string; code: string; output?: string }>;
  keyPoints: string[];
  topicTags: string[];
  availableOffline: boolean;
}

export interface QuizQuestionRecord {
  id: string;
  courseId: string;
  lessonId: string;
  topicTag: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
}

export interface UserProgressRecord {
  id?: number;
  courseId: string;
  lessonId: string;
  completed: boolean;
  lastAccessed: string;
}

export interface QuizAttemptRecord {
  id?: number;
  courseId: string;
  lessonId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  weakTopics: string[];
  strongTopics: string[];
  completedAt: string;
  synced: boolean;
}

export interface TopicScoreRecord {
  topicTag: string; // e.g. 'nested-loops', 'variables', 'loops'
  topicName: string;
  attempts: number;
  totalQuestions: number;
  totalCorrect: number;
  scorePercentage: number;
  needsPractice: boolean;
  lastUpdated: string;
}

export interface SyncQueueRecord {
  id?: number;
  operationId: string;
  type: 'AI_DOUBT' | 'QUIZ_SUBMIT' | 'LESSON_PROGRESS' | 'PROFILE_UPDATE';
  payload: any;
  createdAt: string;
  status: 'pending' | 'syncing' | 'completed' | 'failed';
  retryCount: number;
  error?: string;
}

export interface AIHistoryRecord {
  id?: number;
  queryId: string;
  question: string;
  courseId: string;
  lessonId?: string;
  answer?: string;
  hindiAnswer?: string;
  keyTakeaway?: string;
  codeExample?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  synced: boolean;
}

export interface UserProfileRecord {
  id: string; // 'current'
  name: string;
  course: string;
  semester: number;
  language: 'en' | 'hi';
  interests: string[];
  streakDays: number;
  lastActiveDate: string;
}

class GyaanSaathiDB extends Dexie {
  courses!: Table<CourseRecord, string>;
  lessons!: Table<LessonRecord, string>;
  quizzes!: Table<QuizQuestionRecord, string>;
  userProgress!: Table<UserProgressRecord, number>;
  quizAttempts!: Table<QuizAttemptRecord, number>;
  topicScores!: Table<TopicScoreRecord, string>;
  syncQueue!: Table<SyncQueueRecord, number>;
  aiHistory!: Table<AIHistoryRecord, number>;
  userProfile!: Table<UserProfileRecord, string>;

  constructor() {
    super('GyaanSaathiOfflineDB');
    this.version(1).stores({
      courses: 'id, isDownloaded',
      lessons: 'id, courseId, topicTags',
      quizzes: 'id, courseId, lessonId, topicTag',
      userProgress: '++id, [courseId+lessonId], completed',
      quizAttempts: '++id, courseId, synced',
      topicScores: 'topicTag, needsPractice',
      syncQueue: '++id, operationId, status, type',
      aiHistory: '++id, queryId, status, synced',
      userProfile: 'id'
    });
  }
}

export const db = new GyaanSaathiDB();
