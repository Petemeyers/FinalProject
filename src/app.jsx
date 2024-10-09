import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm/LoginForm';
import Chat from './components/Chat';
import CharacterCreator from './components/CharacterCreator';
import PartyBuilder from './components/PartyBuilder';
import CharacterList from './components/CharacterList';
import ProtectedRoute from '../backend/routes/ProtectedRoute'; // Assuming you have this component
import useAuth from './hooks/useAuth'; // Import the authentication hook/context

const App = () => {
  const { isAuthenticated, characters } = useAuth(); // Assuming your hook provides isAuthenticated and characters

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/character-creation"
          element={
            <ProtectedRoute>
              <CharacterCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/party-builder"
          element={
            <ProtectedRoute>
              <PartyBuilder characters={characters} /> {/* Pass characters */}
            </ProtectedRoute>
          }
        />
        <Route
          path="/character-list"
          element={
            <ProtectedRoute>
              <CharacterList characters={characters} /> {/* Pass characters */}
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
