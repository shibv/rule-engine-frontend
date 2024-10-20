import React, { useState } from 'react';
import ruleService from '../services/ruleService';
import toast from 'react-hot-toast';

const CombineRulesPage = () => {
    const [ruleName, setRuleName] = useState('');
    const [rules, setRules] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null); // For success message
    const [error, setError] = useState(null); // For error message

    const handleAddRule = () => {
        setRules([...rules, '']);
    };

    const handleRuleChange = (index, value) => {
        const updatedRules = rules.map((rule, i) => (i === index ? value : rule));
        setRules(updatedRules);
    };

    const handleCombineRules = async () => {
        setLoading(true);
        setError(null); // Clear previous error

        try {
            const response = await ruleService.combineRules({ rule_name: ruleName, rules });
            
            if (response.error) {
                toast.error(response.error);
                setError('Error combining rules');
                setLoading(false);
                setRuleName('');
                setRules(['']);
                return;
            }

            setAlertMessage(`Rules combined successfully for "${ruleName}" & ${response.rule.rule}`);
            toast.success("Combined Rules Successfully!!");
            setLoading(false);
            setRuleName('');
            setRules(['']);
        } catch (error) {
            setError('Failed to combine rules');
            toast.error("Error");
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Combine Rules</h2>
            <input 
                type="text" 
                value={ruleName} 
                onChange={(e) => setRuleName(e.target.value)} 
                placeholder="Enter Rule Name"
                className="border rounded-md p-2 w-full mb-4"
            />
            {rules.map((rule, index) => (
                <div key={index}>
                    <input 
                        type="text" 
                        value={rule} 
                        onChange={(e) => handleRuleChange(index, e.target.value)} 
                        placeholder={`Enter Rule ${index + 1}`}
                        className="border rounded-md p-2 w-full mb-4"
                    />
                </div>
            ))}
            <button 
                onClick={handleAddRule} 
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-semibold py-2 rounded-md mb-4"
            >
                Add Another Rule
            </button>
            <button 
                onClick={handleCombineRules} 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Combine Rules'}
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

export default CombineRulesPage;
