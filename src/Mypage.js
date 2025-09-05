// src/pages/MyPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MyPage() {
  // 임시 사용자 정보
  const user = {
    username: "USER",
    address: "경남 진주시 에나로 128번길 29",
    phone: "010-1234-5678",
    email: "hong@test.com",
  };

  // 장바구니 상태
  const [cart, setCart] = useState([
    { id: 1, name: "캠핑용 두레팜 우드펠릿 A", price: 12000, quantity: 2, selected: false },
    { id: 2, name: "두레팜 우리집 고양이 화장실 (무향)", price: 15000, quantity: 3, selected: false },
  ]);

  const [orders, setOrders] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.selected ? item.price * item.quantity : 0),
    0
  );

  const toggleSelect = (id) => {
    setCart(cart.map(item => item.id === id ? {...item, selected: !item.selected} : item));
  };

  const handleRemoveSelected = () => {
    setCart(cart.filter(item => !item.selected));
  };

  // 결제 모달 열기
  const handleOrder = () => {
    if (!cart.some(item => item.selected)) return; // 선택된 상품 없으면 종료
    setShowPayment(true);
  };

  // 결제 진행
  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const newOrders = cart
        .filter(item => item.selected)
        .map((item, idx) => ({
          id: orders.length + idx + 1,
          productName: item.name,
          quantity: item.quantity,
          price: item.price * item.quantity,
          date: new Date().toISOString().split("T")[0],
          status: "배송중",
        }));
      setOrders([...orders, ...newOrders]);
      setCart(cart.filter(item => !item.selected));
      setLoading(false);
      setShowPayment(false);
    }, 2000); // 2초 결제 로딩
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* 마이페이지 정보 */}
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">마이페이지</h2>
        <div className="space-y-4">
          <p><strong>이름:</strong> {user.username}</p>
          <p><strong>주소:</strong> {user.address}</p>
          <p><strong>전화번호:</strong> {user.phone}</p>
          <p><strong>이메일:</strong> {user.email}</p>
        </div>
      </div>

      {/* 장바구니 */}
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">장바구니</h2>
        {cart.length === 0 ? (
          <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
        ) : (
          <>
            <ul className="divide-y">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelect(item.id)}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>{item.price.toLocaleString()}원 × {item.quantity}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-right">
              <p className="text-xl font-bold">
                총 합계: {totalPrice.toLocaleString()}원
              </p>
              <button
                onClick={handleOrder}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                선택상품 주문하기
              </button>
              <button
                onClick={handleRemoveSelected}
                className="mt-4 ml-2 bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition"
              >
                선택상품 삭제
              </button>
            </div>
          </>
        )}
      </div>

      {/* 주문 내역 */}
      <div className="max-w-6xl mx-auto px-6 py-12 mt-10 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">주문 내역</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600 text-center">주문 내역이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">주문번호</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">상품명</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">수량</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">가격</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">주문일</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">상태</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.productName}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.quantity}</td>
                    <td className="px-6 py-4 text-sm text-green-600 font-semibold">{order.price.toLocaleString()}원</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                    <td className={`px-6 py-4 text-sm font-medium ${
                      order.status === "배송완료" ? "text-green-600" : "text-orange-500"
                    }`}>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 결제 모달 */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 w-96 text-center relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-4">
                  <p className="text-lg font-semibold">결제 진행 중...</p>
                  <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4">결제창</h3>
                  <p className="mb-6">저장된 결제 수단으로 결제를 진행합니다.</p>
                  <button
                    onClick={handlePayment}
                    className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                  >
                    결제 진행
                  </button>
                  <button
                    onClick={() => setShowPayment(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                  >
                    ✕
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
