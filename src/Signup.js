import React from "react";
import { motion } from "framer-motion";

export default function Signup() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex items-center justify-center bg-[#dfc4aa]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6">회원가입</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              placeholder="홍길동"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dfc4aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이메일
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dfc4aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dfc4aa]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              비밀번호 확인
            </label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#dfc4aa]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#dfc4aa] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#cfa275] transition"
          >
            회원가입
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-[#dfc4aa] font-semibold hover:underline">
            로그인
          </a>
        </p>
      </motion.div>
    </motion.section>
  );
}
