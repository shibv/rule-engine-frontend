import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateRulePage from './components/CreateRulePage';
import CombineRulesPage from './components/CombineRulesPage';
import EvaluateRulePage from './components/EvaluateRulePage';
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div>
        <Toaster position="top-center" />
      </div>
      <Router>
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Rule Management System</h1>
            {/* Navigation Links */}
            <nav className="flex flex-col md:flex-row md:space-x-4 mt-2">
              <Link
                to="/create"
                className="text-lg text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 mb-2 md:mb-0"
              >
                Create Rule
              </Link>
              <Link
                to="/combine"
                className="text-lg text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 mb-2 md:mb-0"
              >
                Combine Rules
              </Link>
              <Link
                to="/evaluate"
                className="text-lg text-white bg-purple-500 px-4 py-2 rounded-md hover:bg-purple-600 mb-2 md:mb-0"
              >
                Evaluate Rule
              </Link>
            </nav>
          </header>

          <main className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
            <Routes>
              <Route path="/create" element={<CreateRulePage />} />
              <Route path="/combine" element={<CombineRulesPage />} />
              <Route path="/evaluate" element={<EvaluateRulePage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  );
};

export default App;
