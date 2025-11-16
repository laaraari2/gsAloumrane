// LocalStorage utilities for tracking progress and saving data

export interface QuizResult {
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
}

export interface StudyProgress {
  sectionsVisited: string[];
  lastVisit: { [key: string]: string };
  timeSpent: { [key: string]: number }; // in minutes
  quizResults: QuizResult[];
}

export interface Note {
  id: string;
  section: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  section: string;
  title: string;
  url: string;
  createdAt: string;
}

const STORAGE_KEYS = {
  PROGRESS: 'antigone_progress',
  NOTES: 'antigone_notes',
  BOOKMARKS: 'antigone_bookmarks',
  SETTINGS: 'antigone_settings',
};

// Progress tracking
export const getProgress = (): StudyProgress => {
  const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    sectionsVisited: [],
    lastVisit: {},
    timeSpent: {},
    quizResults: [],
  };
};

export const saveProgress = (progress: StudyProgress): void => {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
};

export const addQuizResult = (result: QuizResult): void => {
  const progress = getProgress();
  progress.quizResults.push(result);
  // Keep only last 50 results
  if (progress.quizResults.length > 50) {
    progress.quizResults = progress.quizResults.slice(-50);
  }
  saveProgress(progress);
};

export const markSectionVisited = (section: string): void => {
  const progress = getProgress();
  if (!progress.sectionsVisited.includes(section)) {
    progress.sectionsVisited.push(section);
  }
  progress.lastVisit[section] = new Date().toISOString();
  saveProgress(progress);
};

export const addTimeSpent = (section: string, minutes: number): void => {
  const progress = getProgress();
  progress.timeSpent[section] = (progress.timeSpent[section] || 0) + minutes;
  saveProgress(progress);
};

// Notes management
export const getNotes = (): Note[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.NOTES);
  return stored ? JSON.parse(stored) : [];
};

export const saveNote = (note: Note): void => {
  const notes = getNotes();
  const index = notes.findIndex((n) => n.id === note.id);
  if (index >= 0) {
    notes[index] = { ...note, updatedAt: new Date().toISOString() };
  } else {
    notes.push(note);
  }
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
};

export const deleteNote = (id: string): void => {
  const notes = getNotes().filter((n) => n.id !== id);
  localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
};

export const getNotesBySection = (section: string): Note[] => {
  return getNotes().filter((n) => n.section === section);
};

// Bookmarks management
export const getBookmarks = (): Bookmark[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
  return stored ? JSON.parse(stored) : [];
};

export const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>): void => {
  const bookmarks = getBookmarks();
  // Check if already bookmarked
  if (bookmarks.some((b) => b.url === bookmark.url)) {
    return;
  }
  const newBookmark: Bookmark = {
    ...bookmark,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  bookmarks.push(newBookmark);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
};

export const removeBookmark = (id: string): void => {
  const bookmarks = getBookmarks().filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
};

export const isBookmarked = (url: string): boolean => {
  return getBookmarks().some((b) => b.url === url);
};

// Settings
export interface Settings {
  theme: 'dark' | 'light';
  language: 'ar' | 'fr';
  notifications: boolean;
}

export const getSettings = (): Settings => {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return stored
    ? JSON.parse(stored)
    : {
        theme: 'dark',
        language: 'ar',
        notifications: true,
      };
};

export const saveSettings = (settings: Settings): void => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

// Authentication
export interface Student {
  id: number;
  name: string;
  nameFr: string;
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  nameFr: string;
  loginTime: string;
}

const AUTH_KEY = 'antigone_auth';
const STUDENTS_KEY = 'antigone_students';

// Load students from JSON file or localStorage
let studentsCache: Student[] | null = null;

export const loadStudents = async (): Promise<Student[]> => {
  if (studentsCache) {
    return studentsCache;
  }

  // Try to load from localStorage first (for custom students list)
  const stored = localStorage.getItem(STUDENTS_KEY);
  if (stored) {
    try {
      studentsCache = JSON.parse(stored);
      return studentsCache!;
    } catch (e) {
      // Invalid data in localStorage, clear it
      localStorage.removeItem(STUDENTS_KEY);
    }
  }

  // Load from JSON file
  try {
    // Import JSON file directly (Vite supports this)
    const studentsModule = await import('../data/students.json');
    studentsCache = (studentsModule.default || studentsModule) as Student[];
    // Save to localStorage for faster access
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(studentsCache));
    return studentsCache;
  } catch (error) {
    console.error('Error loading students:', error);
    // Return empty array if loading fails
    return [];
  }
};

// Save students to localStorage (for admin to update)
export const saveStudents = (students: Student[]): void => {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  studentsCache = students;
};

// Get all students
export const getStudents = async (): Promise<Student[]> => {
  return await loadStudents();
};

export const isAuthenticated = (): boolean => {
  const auth = localStorage.getItem(AUTH_KEY);
  return auth !== null;
};

export const login = async (username: string, password: string): Promise<boolean> => {
  if (!username.trim() || !password.trim()) {
    return false;
  }

  const students = await loadStudents();
  const student = students.find(
    (s) => s.username.toLowerCase() === username.trim().toLowerCase() && s.password === password
  );

  if (student) {
    const user: User = {
      id: student.id,
      username: student.username,
      name: student.name,
      nameFr: student.nameFr,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return true;
  }

  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const getCurrentUser = (): User | null => {
  const auth = localStorage.getItem(AUTH_KEY);
  return auth ? JSON.parse(auth) : null;
};

// Verify if a student exists
export const verifyStudent = async (username: string, password: string): Promise<Student | null> => {
  const students = await loadStudents();
  return students.find(
    (s) => s.username.toLowerCase() === username.trim().toLowerCase() && s.password === password
  ) || null;
};

