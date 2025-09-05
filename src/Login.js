import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // 로그인 처리: 닉네임 "user"로 고정
    login("user");

    // 홈으로 이동
    navigate("/");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#dfc4aa]">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">로그인</h2>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dfc4aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">비밀번호</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dfc4aa]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#dfc4aa] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#cfa275] transition"
          >
            로그인
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          계정이 없으신가요?{" "}
          <a href="/signup" className="text-[#dfc4aa] font-semibold hover:underline">
            회원가입
          </a>
        </p>
      </div>
    </section>
  );
}
