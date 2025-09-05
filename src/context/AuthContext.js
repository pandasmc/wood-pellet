import React, { createContext, useContext, useState, useEffect } from "react";

// Context 생성
const AuthContext = createContext();

// Provider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 초기 로딩 시 localStorage 확인
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 로그인 함수
  const login = (nickname) => {
    const userObj = { nickname };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = () => useContext(AuthContext);
