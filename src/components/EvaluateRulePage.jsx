import React, { useState } from 'react';
import ruleService from '../services/ruleService';
import toast from 'react-hot-toast';

const EvaluateRulePage = () => {
    const [ruleName, setRuleName] = useState('');
    const [conditions, setConditions] = useState({ age: '', salary: '', department: '' });
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null); // For alert message
    const [error, setError] = useState(null); // Error state

    const handleEvaluateRule = async () => {
        setLoading(true);
        setError(null); // Clear previous error
        try {
            const response = await ruleService.evaluateRule({ rule_name: ruleName, conditions });

            if (response.error) {
                toast.error(response.error);
                setLoading(false);
                setRuleName('');
                setConditions({ age: '', salary: '', department: '' });
                return;
            }
          
            if (response.evaluationResult) {
              setAlertMessage(`Success! The rule "${ruleName}" was evaluated, and the conditions were met.`);
          } else {
              setAlertMessage(`Failure. The rule "${ruleName}" was evaluated, but the conditions were not met.`);
          }
          
            
            toast.success('Evaluated Successfully!');
            setRuleName('');
            setConditions({ age: '', salary: '', department: '' });
        } catch (error) {
            setError('Error evaluating rule');
            toast.error('Error evaluating rule');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Evaluate Rule</h2>
            <input 
                type="text" 
                value={ruleName} 
                onChange={(e) => setRuleName(e.target.value)} 
                placeholder="Enter Rule Name"
                className="border rounded-md p-2 w-full mb-4"
            />
            <input 
                type="number" 
                value={conditions.age} 
                onChange={(e) => setConditions({ ...conditions, age: e.target.value })} 
                placeholder="Age"
                className="border rounded-md p-2 w-full mb-4"
            />
            <input 
                type="number" 
                value={conditions.salary} 
                onChange={(e) => setConditions({ ...conditions, salary: e.target.value })} 
                placeholder="Salary"
                className="border rounded-md p-2 w-full mb-4"
            />
            <input 
                type="text" 
                value={conditions.department} 
                onChange={(e) => setConditions({ ...conditions, department: e.target.value })} 
                placeholder="Department"
                className="border rounded-md p-2 w-full mb-4"
            />
            <button 
                onClick={handleEvaluateRule} 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-md"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Evaluate Rule'}
            </button>

            {alertMessage && (
    <div
        className={`mt-4 p-4 rounded-md ${
            alertMessage.includes('Success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}
    >
        <p className="font-bold">{alertMessage}</p>
    </div>
)}
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default EvaluateRulePage;
