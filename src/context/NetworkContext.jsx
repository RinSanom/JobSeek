
import { createContext, useContext } from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const isOnline = useNetworkStatus();
  
  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => useContext(NetworkContext);