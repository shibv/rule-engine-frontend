import React, { useState } from 'react';
import ruleService from '../services/ruleService';
import toast from 'react-hot-toast';

const CreateRulePage = () => {
    const [ruleName, setRuleName] = useState('');
    const [rules, setRules] = useState('');
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null); // For success message
    const [error, setError] = useState(null); // For error message

    const handleCreateRule = async () => {
        setLoading(true);
        setError(null); // Clear previous error

        try {
            const response = await ruleService.createRule({ rule_name: ruleName, rule: rules });

            if (response.error) {
                toast.error(response.error);
                setError('Error creating rule');
                setLoading(false);
                setRuleName('');
                setRules('');
                return;
            }
            
            setAlertMessage(`Rule "${ruleName}" created successfully! ${response.rule.rule}` );
            toast.success("Created Successfully!!");
            setLoading(false);
            setRuleName('');
            setRules('');
        } catch (error) {
            setError('Failed to create rule');
            toast.error("Failed!!");
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Create Rule</h2>
            <input 
                type="text" 
                value={ruleName} 
                onChange={(e) => setRuleName(e.target.value)} 
                placeholder="Enter Rule Name"
                className="border rounded-md p-2 w-full mb-4"
            />
            <input 
                type="text" 
                value={rules} 
                onChange={(e) => setRules(e.target.value)} 
                placeholder="Enter Rule"
                className="border rounded-md p-2 w-full mb-4"
            />
            <button 
                onClick={handleCreateRule} 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Create Rule'}
            </button>

            {alertMessage && (
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                    <p className="font-bold">{alertMessage}</p>
                </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default CreateRulePage;
