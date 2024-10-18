import React, { useState } from 'react';
import ruleService from '../services/ruleService';
import toast from 'react-hot-toast';

const CombineRulesPage = () => {
  const [ruleName, setRuleName] = useState('');
  const [rules, setRules] = useState(['']);

  const handleAddRule = () => {
    setRules([...rules, '']);
  };

  const handleRuleChange = (index, value) => {
    const updatedRules = rules.map((rule, i) => (i === index ? value : rule));
    setRules(updatedRules);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ruleService.combineRules({ rule_name: ruleName, rules });
      if(response.error){
        toast.error(response.error);
        return;
      }
      toast.success("Combined Rules SuccessFully!!")
      console.log(response);
    } catch (error) {
      toast.error("Error")
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Combine Rules</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg text-gray-600 mb-1">Rule Name</label>
          <input 
            type="text" 
            value={ruleName} 
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
        {rules.map((rule, index) => (
          <div key={index}>
            <label className="block text-lg text-gray-600 mb-1">Rule {index + 1}</label>
            <input 
              type="text" 
              value={rule} 
              onChange={(e) => handleRuleChange(index, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        ))}
        <button 
          type="button" 
          onClick={handleAddRule}
          className="w-full py-2 px-4 bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300">
          Add Another Rule
        </button>
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-green-500 text-white text-lg rounded-md hover:bg-green-600 transition">
          Combine Rules
        </button>
      </form>
    </div>
  );
};

export default CombineRulesPage;
