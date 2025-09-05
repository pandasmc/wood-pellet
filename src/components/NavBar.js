import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-white relative z-50 w-full max-w-[1000px] mx-auto">
        <Link to="/" className="text-xl">
          <img src="dure-logo.png" alt="logo" style={{height: "37px"}} />
        </Link>

        <div className="space-x-4 relative flex items-center">
          <Link to="/shop" className="hover:underline font-normal text-base">
            SHOP
          </Link>

          {user ? (
            <div className="relative inline-block group">
              {/* USER → Link 스타일과 동일하게 맞춤 */}
              <button className="hover:underline font-normal text-base text-black">
                AUTH : {user.nickname}
              </button>

              {/* 드롭다운 */}
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">
                <Link to="/mypage" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  마이페이지
                </Link>
                <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                  주문내역
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-sm px-4 py-2 text-sm hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:underline font-normal text-base">
              LOGIN
            </Link>
          )}
        </div>
    </nav>
  );
}
