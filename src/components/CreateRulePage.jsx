import React, { useState } from 'react';
import ruleService from '../services/ruleService';
import toast from 'react-hot-toast';

const CreateRulePage = () => {
  const [ruleName, setRuleName] = useState('');
  const [rules, setRule] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ruleService.createRule({ rule_name: ruleName, rule : rules });
      
      // console.log(response);
      if(response.error){
        toast.error(response.error);
        return;
      }
      toast.success("Created Successfully!!")
    } catch (error) {
      toast.error("Failed!!")
    }
  
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Rule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg text-gray-600 mb-1">Rule Name</label>
          <input 
            type="text" 
            value={ruleName} 
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">Rule</label>
          <input 
            type="text" 
            value={rules} 
            onChange={(e) => setRule(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition">
          Create Rule
        </button>
      </form>
    </div>
  );
};

export default CreateRulePage;
