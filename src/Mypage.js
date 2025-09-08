import React, { useMemo, useState } from "react";
import { Bars3Icon, ShoppingBagIcon, ArrowPathIcon, Cog6ToothIcon, ChatBubbleBottomCenterTextIcon, CreditCardIcon, UsersIcon } from "@heroicons/react/24/outline";

// ---- Demo data -----------------------------------------------------------
const demoOrders = Array.from({ length: 5 }).map((_, i) => {
  const statuses = ["결제완료", "상품준비", "배송중", "배송완료", "구매확정"]; 
  const methods = ["카드", "계좌이체", "네이버페이", "무통장"]; 
  const rand = (n) => Math.floor(Math.random() * n);
  const date = new Date();
  date.setDate(date.getDate() - rand(30));
  return {
    id: `ORD-${String(20250000 + i)}`,
    // customer: ["김철수", "이영희", "박민수", "정다은"][rand(4)],
    product: ["캠핑용 두레팜 우드펠릿 포장형", "두레팜 우리집 고양이 화장실(무향)", "캠핑용 두레팜 우드펠릿 박스형"][rand(3)],
    qty: [1, 1, 2, 3][rand(4)],
    price: [15000, 20000, 12000][rand(3)],
    status: statuses[rand(statuses.length)],
    method: methods[rand(methods.length)],
    date: date.toISOString().slice(0, 10),
  };
});

// ---- Utilities -----------------------------------------------------------
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// ---- Sidebar -------------------------------------------------------------
const MenuButton = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl transition shadow-sm/0 hover:shadow-sm hover:bg-white/60 border border-transparent hover:border-black/5 text-left ${active ? "bg-white border-black/10" : "bg-white/40"}`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

// ---- Top Filters for Orders ---------------------------------------------
function OrdersFilters({ keyword, setKeyword, status, setStatus, dateFrom, setDateFrom, dateTo, setDateTo }) {
  const statuses = ["전체", "결제완료", "상품준비", "배송중", "배송완료", "구매확정"]; 
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
      <input
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="주문번호, 상품명 검색"
        className="md:col-span-5 px-3 py-2 rounded-xl border border-black/10 focus:outline-none focus:ring-2 focus:ring-black/10"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="md:col-span-2 px-3 py-2 rounded-xl border border-black/10"
      >
        {statuses.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
        className="md:col-span-2 px-3 py-2 rounded-xl border border-black/10"
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
        className="md:col-span-2 px-3 py-2 rounded-xl border border-black/10"
      />
    </div>
  );
}

// ---- Orders Table --------------------------------------------------------
function OrdersTable({ rows }) {
  return (
    <div className="overflow-auto rounded-2xl border border-black/10 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-neutral-50">
          <tr className="text-neutral-500">
            <th className="px-4 py-3 text-left">주문번호</th>
            <th className="px-4 py-3 text-left">주문일</th>
            <th className="px-4 py-3 text-left">상품</th>
            <th className="px-4 py-3 text-right">수량</th>
            <th className="px-4 py-3 text-right">금액</th>
            <th className="px-4 py-3 text-left">상태</th>
            <th className="px-4 py-3 text-left">결제</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-black/5 hover:bg-neutral-50">
              <td className="px-4 py-3 font-medium">{r.id}</td>
              <td className="px-4 py-3">{r.date}</td>
              <td className="px-4 py-3">{r.product}</td>
              <td className="px-4 py-3 text-right">{r.qty}</td>
              <td className="px-4 py-3 text-right">{numberWithCommas(r.price)}원</td>
              <td className="px-4 py-3">
                <span className={`px-2 py-1 text-xs rounded-lg border ${
                  r.status === "결제완료" ? "bg-emerald-50 border-emerald-200 text-emerald-700" :
                  r.status === "상품준비" ? "bg-amber-50 border-amber-200 text-amber-700" :
                  r.status === "배송중" ? "bg-sky-50 border-sky-200 text-sky-700" :
                  r.status === "배송완료" ? "bg-indigo-50 border-indigo-200 text-indigo-700" :
                  "bg-neutral-50 border-neutral-200 text-neutral-700"
                }`}>{r.status}</span>
              </td>
              <td className="px-4 py-3">{r.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---- Content Panels ------------------------------------------------------
function OrdersPanel() {
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("전체");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    return demoOrders.filter((o) => {
      const kw = keyword.trim();
      const hitKw = kw ? [o.id, o.customer, o.product].some((t) => t.includes(kw)) : true;
      const hitSt = status === "전체" ? true : o.status === status;
      const hitFrom = dateFrom ? o.date >= dateFrom : true;
      const hitTo = dateTo ? o.date <= dateTo : true;
      return hitKw && hitSt && hitFrom && hitTo;
    });
  }, [keyword, status, dateFrom, dateTo]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">주문/배송</h2>
          <p className="text-sm text-neutral-500">총 {total}건</p>
        </div>
        <button
          onClick={() => {
            setKeyword("");
            setStatus("전체");
            setDateFrom("");
            setDateTo("");
          }}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-black/10 bg-white hover:bg-neutral-50"
        >
          <ArrowPathIcon className="w-4 h-4" /> 필터 초기화
        </button>
      </div>

      <OrdersFilters
        keyword={keyword}
        setKeyword={setKeyword}
        status={status}
        setStatus={setStatus}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
      />

      <OrdersTable rows={pageRows} />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-lg border border-black/10 bg-white disabled:opacity-40"
        >
          이전
        </button>
        <span className="text-sm text-neutral-600">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-lg border border-black/10 bg-white disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </div>
  );
}

const Placeholder = ({ title, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center h-[420px] rounded-2xl border border-dashed border-black/10 bg-white/60 text-center">
    <Icon className="w-10 h-10 mb-3" />
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-neutral-500">아직 확인할 내역이 없습니다.</p>
  </div>
);

// ---- Main Layout ---------------------------------------------------------
export default function SmartStoreOrdersLayout() {
  const menus = [
    { key: "orders", label: "주문/배송", icon: ShoppingBagIcon },
    { key: "cs", label: "리뷰", icon: ChatBubbleBottomCenterTextIcon },
    { key: "products", label: "문의", icon: Bars3Icon },
    { key: "customers", label: "개인정보수정", icon: UsersIcon },
  ];
  const [openSide, setOpenSide] = useState(true);
  const [active, setActive] = useState("orders");

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100">
      {/* App Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-black/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-xl border border-black/10 bg-white"
              onClick={() => setOpenSide((v) => !v)}
            >
              <Bars3Icon className="w-5 h-5" />
            </button>
            <div className="font-bold tracking-tight text-lg">마이페이지</div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Sidebar */}
        <aside className={`md:col-span-3 lg:col-span-2 ${openSide ? "block" : "hidden md:block"}`}>
          <div className="sticky top-[72px] space-y-2">
            {menus.map((m) => (
              <MenuButton
                key={m.key}
                icon={m.icon}
                label={m.label}
                active={active === m.key}
                onClick={() => setActive(m.key)}
              />
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="md:col-span-9 lg:col-span-10">
          {active === "orders" && <OrdersPanel />}
          {active === "cs" && <Placeholder title="문의/리뷰" icon={ChatBubbleBottomCenterTextIcon} />}
          {active === "products" && <Placeholder title="상품관리" icon={Bars3Icon} />}
          {active === "customers" && <Placeholder title="고객관리" icon={UsersIcon} />}
          {active === "settlement" && <Placeholder title="정산/매출" icon={CreditCardIcon} />}
          {active === "settings" && <Placeholder title="설정" icon={Cog6ToothIcon} />}
        </main>
      </div>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-4 pb-8 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Dure-Farm. All rights reserved.
      </footer>
    </div>
  );
}
