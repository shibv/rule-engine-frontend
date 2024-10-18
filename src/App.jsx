import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CreateRulePage from './components/CreateRulePage';
import CombineRulesPage from './components/CombineRulesPage';
import EvaluateRulePage from './components/EvaluateRulePage';

const App = () => {
  return (
    <>
      <Router>
        <div>
          <h2 className='flex justify-center items-center'>Welcome to the Main Page!!</h2>
          <main>
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
