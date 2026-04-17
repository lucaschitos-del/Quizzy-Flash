import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateSet from './pages/CreateSet';
import StudySet from './pages/StudySet';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Match from './pages/Match';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateSet />} />
            <Route path="/edit/:id" element={<CreateSet />} />
            <Route path="/set/:id" element={<StudySet />} />
            <Route path="/flashcards/:id" element={<Flashcards />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/match/:id" element={<Match />} />
          </Routes>
        </main>
      </AppProvider>
    </BrowserRouter>
  );
}
