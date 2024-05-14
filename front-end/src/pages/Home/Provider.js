import React, { useState } from 'react';
import MyContext from './Context';

const Provider = ({ children }) => {
  // Define the shared state
  const [Id, setId] = useState(null);

  return (
    // Provide the context value
    <MyContext.Provider value={{ Id, setId }}>
      {children}
    </MyContext.Provider>
  );
};

export default Provider;