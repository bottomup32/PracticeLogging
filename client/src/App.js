// client/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import Dashboard from './components/Dashboard';
import PracticeLogging from './components/PracticeLogging';
import Settings from './components/Settings';
import './tailwind.css'; // Add this line

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-navy">
        <button
          onClick={handleLogin}
          className="bg-yellow text-navy font-bold py-2 px-4 rounded"
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return (
    <Router>
      <div className="bg-navy text-yellow min-h-screen">
        <nav className="p-4">
          {/* Add navigation menu items */}
        </nav>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/practice" component={PracticeLogging} />
          <Route path="/settings" component={Settings} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
