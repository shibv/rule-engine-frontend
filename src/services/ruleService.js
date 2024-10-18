const API_URL = 'https://rule-engine-backend.vercel.app/api/rules'; 

const createRule = async (data) => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error; 
  }
};

const combineRules = async (data) => {
  
  try {
    const response = await fetch(`${API_URL}/combine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // console.log("Response object from combineRules:", response);

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   console.error("Error response data from combineRules:", errorData); 
    //   throw new Error(`Error ${response.status}: ${errorData.error || 'Unknown error'}`);
    // }

   
    return await response.json();
  } catch (error) {
    console.error("Error during combineRules fetch:", error); 
    throw error;
  }
};


const evaluateRule = async (data) => {  
  try {
    const response = await fetch(`${API_URL}/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error("Error during evaluateRule fetch:", error); 
    throw error;
  }
};


export default { createRule, combineRules, evaluateRule };
