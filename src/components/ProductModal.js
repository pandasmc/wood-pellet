// ProductModal.js
import React, { useState } from 'react';
import '../App.css';
function ProductModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = () => {
    alert(`${product.name} ${quantity}개를 장바구니에 넣었습니다!\n마이페이지에서 장바구니를 확인할 수 있습니다.`);
    onClose();
  };

  let categoryImage;
  switch (product.id) {
    case 1:
    case 2:
      categoryImage = require("../assets/images/camping1-detail.jpg");
      break;
    case 3:
      categoryImage = require("../assets/images/camping2-detail.jpg");
      break;
    case 5:
    case 6:
    case 7:
    case 8:
      categoryImage = require("../assets/images/pet_detail.jpg");
      break;
    case 9:
    case 10:
    case 11:
    case 12:
      categoryImage = require("../assets/images/heating_detail.jpg");
      break;
  }

  let itemImage;
  switch (product.id) {
    case 1:
      itemImage = require("../assets/items/camping1.png");
      break;
    case 2:
      itemImage = require("../assets/items/camping3.png");
      break;
    case 3:
      itemImage = require("../assets/items/camping5.png");
      break;
    case 5:
      itemImage = require("../assets/items/pet1.png");
      break;
    case 6:
      itemImage = require("../assets/items/pet2.png");
      break;
    case 7:
      itemImage = require("../assets/items/pet3.png");
      break;
    case 8:
      itemImage = require("../assets/items/pet4.png");
      break;
    case 9:
      itemImage = require("../assets/items/heating1.png");
      break;
    case 10:
      itemImage = require("../assets/items/heating2.png");
      break;
    case 11:
      itemImage = require("../assets/items/heating3.png");
      break;
    case 12:
      itemImage = require("../assets/items/heating-total.png");
      break;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <br />
        <div className="modal-body">
          <div className="product-detail-section">
            <div className="scroll-content"> 
              <img src={categoryImage} alt="상세 이미지 1" />
            </div>
          </div>
          <div className="purchase-section">
            <img src={itemImage} alt={`${product.name} 상세`} className="detail-image" />
            <br />
            <h3>{product.name}</h3>
            <p className="product-price">{product.price.toLocaleString()}원</p>
            <div className="quantity-selector">
              <label htmlFor="quantity">수량: </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <button className="purchase-button" onClick={handlePurchase}>
              장바구니
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;