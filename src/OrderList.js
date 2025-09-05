// src/OrderHistory.js
import React, { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // 예시 데이터: 실제로는 fetch("http://localhost:5000/api/orders") 등으로 가져옴
    const exampleOrders = [
      {
        id: 1,
        productName: "캠핑용 펠릿 10kg",
        quantity: 2,
        price: 20000,
        date: "2025-09-03",
        status: "배송중",
      },
      {
        id: 2,
        productName: "반려동물용 펠릿 5kg",
        quantity: 1,
        price: 12000,
        date: "2025-09-01",
        status: "배송완료",
      },
    ];
    setOrders(exampleOrders);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">주문 내역</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">주문 내역이 없습니다.</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow rounded-lg">
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
                    }`}>
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}