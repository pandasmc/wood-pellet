import React, { useEffect, useState } from "react";
import "./App.css";
import pelletsImage from "./assets/pellets.jpg"; // 상단 배경 이미지
import defaultImage from "./assets/images/camping1.png";
import ProductModal from "./components/ProductModal";
import info from "./assets/images/re-info.jpg";
import camping1 from "./assets/items/camping1.png";
import camping3 from "./assets/items/camping3.png";
import camping5 from "./assets/items/camping5.png";
import heating1 from "./assets/items/heating1.png";
import heating2 from "./assets/items/heating2.png";
import heating3 from "./assets/items/heating3.png";
import heating4 from "./assets/items/heating-total.png";
import pet1 from "./assets/items/pet1.png";
import pet2 from "./assets/items/pet2.png";
import pet3 from "./assets/items/pet3.png";
import pet4 from "./assets/items/pet4.png";

const productImages = {
  1: camping1,
  2: camping3,
  3: camping5,
  5: pet1,
  6: pet2,
  7: pet3,
  8: pet4,     // 반려동물용 id
  9: heating1,
  10: heating2,
  11: heating3,
  12: heating4 // 난방용 id
  // 산업용(id: 13)은 info 이미지 따로 쓰니까 제외
};


function Shop() {
  const [products, setProducts] = useState([
    { id: 1, name: "캠핑용 두레팜 우드펠릿 A", price: 12000, category: "캠핑용", short: "패키징 타입으로 간편하게 챙겨가세요" },
    { id: 2, name: "캠핑용 두레팜 우드펠릿 낱개", price: 2000, category: "캠핑용", short: "실속있게 필요한 만큼 챙기는 낱개 타입"},
    { id: 3, name: "캠핑용 두레팜 우드펠릿 B", price: 15000, category: "캠핑용", short: "좀 더 큰 용량으로 넉넉하게" },
    { id: 5, name: "두레팜 우리집 고양이 화장실 (무향)", price: 15000, category: "반려동물용", short: "친환경 우드펠릿으로 믿을 수 있는 화장실 펠릿" },
    { id: 6, name: "두레팜 우리집 고양이 화장실 (민트향)", price: 13000, category: "반려동물용", short: "보다 단단하게 가공하여 치우기 간편하고 깔끔" },
    { id: 7, name: "두레팜 우리집 고양이 화장실 (우드향)", price: 20000, category: "반려동물용", short: "고양이가 좋아하는 형태로 가공하여 기호성이 높은 타입" },
    { id: 8, name: "두레팜 우리집 고양이 화장실 (캣닢향)", price: 15000, category: "반려동물용", short: "복합형으로 각 타입의 장점을 최대한 챙겼습니다" },
    { id: 9, name: "우리집을 위한 두레팜 우드펠릿 A", price: 30000, category: "난방용", short: "상세설명에서 사용처를 확인하고 선택하세요" },
    { id: 10, name: "우리집을 위한 두레팜 우드펠릿 B", price: 20000, category: "난방용", short: "상세설명에서 사용처를 확인하고 선택하세요" },
    { id: 11, name: "우리집을 위한 두레팜 우드펠릿 C", price: 40000, category: "난방용", short: "상세설명에서 사용처를 확인하고 선택하세요" },
    { id: 12, name: "우리집을 위한 두레팜 우드펠릿 세트", price: 85000, category: "난방용", short: "상세설명에서 사용처를 확인하고 선택하세요" },
    { id: 13, name: "우리집을 위한 두레팜 우드펠릿 세트", price: 85000, category: "산업용", short: "상세설명에서 사용처를 확인하고 선택하세요" },
  ]);
  const [activeCategory, setActiveCategory] = useState("캠핑용"); // 기본 카테고리
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

 
  const openModal = (p) => {
    console.log("선택된 상품:", p);
    setSelectedProduct(p);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProduct(null);
  };

  // 현재 선택된 카테고리 상품만 필터링
  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );


  return (
    <div className="shop-page">
      {/* 상단 배경 */}
      <div className="shop-header">
        <img src={pelletsImage} alt="Pellets" className="header-img" />
      </div>

      {/* 카테고리 네비 */}
      <div className="category-nav">
        {["캠핑용", "반려동물용", "난방용", "산업용"].map((cat) => (
          <span
            key={cat}
            className={activeCategory === cat ? "active" : ""}
            onClick={() => setActiveCategory(cat)}
            style={{
              cursor: "pointer",
              padding: "8px 16px",
              borderBottom:
                activeCategory === cat ? "3px solid #c69b6d" : "none",
              fontWeight: activeCategory === cat ? "bold" : "normal",
              transition: "all 0.3s ease",
            }}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* 상품 목록 */}
<div className="product_List_space">
  {activeCategory === "산업용" ? (
    <div className="w-full max-w-[1000px] mx-auto text-center p-10">
      <img
        src={info} 
        alt="산업용 두레팜 우드펠릿"
        className="mx-auto rounded-xl shadow-lg"
      />
    </div>
  ) : (
    <div className="product-grid w-full max-w-[1000px] mx-auto">
      {/* 기존 그리드 형식 */}
      {filteredProducts.map((p) => (
        <div
          key={p.id}
          className="product-card"
          onClick={() => openModal(p)}
          style={{
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div className="product-section">
            <div className="product-image">
              <img
                src={productImages[p.id] || defaultImage} // 매핑 없으면 기본 이미지
                alt={p.name}
                className="product-img"
              />
            </div>
            <div className="product-text">
              <h3>{p.name}</h3>
              <p>{p.short}</p>
              <p className="price">{Number(p.price).toLocaleString()}원</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>

      {/* 모달 */}
      {modalIsOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}

export default Shop;
