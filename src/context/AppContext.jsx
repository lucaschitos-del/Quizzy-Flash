import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

const SAMPLE_SETS = [
  {
    id: '1',
    title: 'Basic Spanish Vocabulary',
    description: 'Common Spanish words and phrases for beginners',
    createdAt: Date.now() - 86400000,
    cards: [
      { id: '1', term: 'Hola', definition: 'Hello' },
      { id: '2', term: 'Gracias', definition: 'Thank you' },
      { id: '3', term: 'Por favor', definition: 'Please' },
      { id: '4', term: 'Adiós', definition: 'Goodbye' },
      { id: '5', term: 'Sí / No', definition: 'Yes / No' },
      { id: '6', term: 'Buenos días', definition: 'Good morning' },
      { id: '7', term: 'Buenas noches', definition: 'Good night' },
      { id: '8', term: 'Lo siento', definition: 'I am sorry' },
    ],
  },
  {
    id: '2',
    title: 'JavaScript Fundamentals',
    description: 'Key concepts in JavaScript programming',
    createdAt: Date.now() - 172800000,
    cards: [
      { id: '1', term: 'Variable', definition: 'A named container for storing data values' },
      { id: '2', term: 'Function', definition: 'A reusable block of code that performs a specific task' },
      { id: '3', term: 'Array', definition: 'An ordered list of values' },
      { id: '4', term: 'Object', definition: 'A collection of key-value pairs' },
      { id: '5', term: 'Closure', definition: 'A function that retains access to its outer scope variables' },
      { id: '6', term: 'Promise', definition: 'An object representing eventual completion or failure of an async operation' },
    ],
  },
];

export function AppProvider({ children }) {
  const [sets, setSets] = useLocalStorage('quizzy-sets', SAMPLE_SETS);

  const createSet = (set) => {
    const newSet = { ...set, id: Date.now().toString(), createdAt: Date.now() };
    setSets((prev) => [newSet, ...prev]);
    return newSet;
  };

  const updateSet = (id, updates) => {
    setSets((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSet = (id) => {
    setSets((prev) => prev.filter((s) => s.id !== id));
  };

  const getSet = (id) => sets.find((s) => s.id === id);

  return (
    <AppContext.Provider value={{ sets, createSet, updateSet, deleteSet, getSet }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
