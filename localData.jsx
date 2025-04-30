export const getSavedLocals = () => {
    const data = localStorage.getItem('localData');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveLocalEntry = (entry) => {
    const existingData = getSavedLocals();
    existingData.push(entry);
    localStorage.setItem('localData', JSON.stringify(existingData));
  };

  export const getSavedAffiliate = () => {
    const data = localStorage.getItem('localData');
    return data ? JSON.parse(data) : [];
  };
  
  export const saveAffiliateEntry = (entry) => {
    const existingData = getSavedLocals();
    existingData.push(entry);
    localStorage.setItem('localData', JSON.stringify(existingData));
  };