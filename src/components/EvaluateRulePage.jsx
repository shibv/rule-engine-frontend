import React, { useState } from 'react';
import ruleService from '../services/ruleService';
import toast from 'react-hot-toast';


const EvaluateRulePage = () => {
  const [ruleName, setRuleName] = useState('');
  const [conditions, setConditions] = useState({ age: '', salary: '', department: '' });
  const [loading, setloading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const response = await ruleService.evaluateRule({ rule_name: ruleName, conditions });
    // console.log(response);
    if(response.error){
      toast.error(response.error);
      setRuleName('');
      setConditions({ age: '', salary: '', department: '' });
      return;
    }
    toast.success("Evaluated Successfully!!")
    setloading(false);
    setRuleName('');
    setConditions({ age: '', salary: '', department: '' });
    } catch (error) {
      setloading(false);
      setRuleName('');
      setConditions({ age: '', salary: '', department: '' });
      toast.error("Error")
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Evaluate Rule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-lg text-gray-600 mb-1">Rule Name</label>
          <input 
            type="text" 
            value={ruleName} 
            onChange={(e) => setRuleName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">Age</label>
          <input 
            type="number" 
            value={conditions.age} 
            onChange={(e) => setConditions({ ...conditions, age: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">Salary</label>
          <input 
            type="number" 
            value={conditions.salary} 
            onChange={(e) => setConditions({ ...conditions, salary: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-lg text-gray-600 mb-1">Department</label>
          <input 
            type="text" 
            value={conditions.department} 
            onChange={(e) => setConditions({ ...conditions, department: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button 
        disabled= {loading}
          type="submit" 
          className="w-full py-2 px-4 bg-purple-500 text-white text-lg rounded-md hover:bg-purple-600 transition">
          {
            loading ? 'Loading...' : ' Combine Rules'
          }
        </button>
      </form>
    </div>
  );
};

export default EvaluateRulePage;
