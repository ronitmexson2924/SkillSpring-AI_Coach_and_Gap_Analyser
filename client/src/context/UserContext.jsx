import { createContext, useContext, useMemo } from 'react';

const mockUser = {
  id: 'local-dev',
  name: 'Alex Dev',
  role: 'student',
  email: 'alex@local.dev',
  targetRole: 'Frontend Developer',
};

const UserContext = createContext({
  user: mockUser,
});

export function UserProvider({ children }) {
  const value = useMemo(() => ({ user: mockUser }), []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}

