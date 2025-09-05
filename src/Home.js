import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Section from "./components/Section";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";


// 모달 컴포넌트
function Modal({ isOpen, onClose, imgSrc }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // 배경 클릭 시 닫기
        >
          <motion.div
            className="bg-white rounded-lg p-4 relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()} // 내부 클릭 시 이벤트 전파 방지
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-black text-xl font-bold"
            >
              &times;
            </button>
            <img
              src={imgSrc}
              alt="modal-img"
              className="max-w-[500px] max-h-[80vh] rounded"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


export default function Home() {
  const images = [
    "/homeItem/15.png",
    "/homeItem/16.png",
    "/homeItem/17.png",
    "/homeItem/18.png",
    "/homeItem/5.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div >
      {/* 상단 슬라이더 섹션 */}
      <section className="relative h-[70vh] flex items-center bg-white overflow-hidden">
        {/* 왼쪽 도형 */}
        <div className="absolute left-0 top-0 h-full w-3/5 bg-[#8B5E3C] rounded-r-full z-10" />

        {/* flex 레이아웃: 왼쪽 텍스트, 오른쪽 슬라이더 */}
        <div className="relative z-20 flex w-full max-w-[1200px] mx-auto h-full items-center justify-between px-10">
          
          {/* 왼쪽 텍스트 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-white max-w-lg"
          >
            <h1 className="text-7xl font-bold leading-tight wood-pellet">WOOD<br/>PELLET</h1>
            <p className="mt-6 text-2xl wood-sub">80만 톤의 폐자원, 4,800억의 에너지</p>
            <Link
              to="/shop"
              className="mt-6 inline-block px-8 py-3 rounded-full border-2 border-white text-white bg-transparent transition-colors duration-300 hover:bg-white hover:text-black font-semibold text-lg"
            >
              구매하러가기
            </Link>
          </motion.div>

          {/* 오른쪽 슬라이더 */}
          <div className="relative w-[550px] h-full">
            <AnimatePresence>
              <motion.img
                key={images[currentIndex]}
                src={images[currentIndex]}
                alt={`slide-${currentIndex}`}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute left-0 w-full h-full object-cover rounded-2xl"
              />
            </AnimatePresence>

            {/* 좌우 화살표 */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full hover:bg-black/50"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

          </div>
        </div>
      </section>

      {/* 아래 Section 컴포넌트들 */}
      <div className="section-home">
        <Section
          title="버섯 폐배지 80만톤"
          text="국내 버섯 배지는 매년 80만톤 씩 폐기되고 있습니다. 이때의 폐기비용은 3,200억원. 농가에는 큰 부담입니다.
               두레팜은 해당 문제를 해소하고자, 버섯폐배지와 같은 농업부산물을 이용해 친환경적으로 우드펠릿을 제작하게 되었습니다."
          img="/homeItem/home1.jpg"
          reverse={false}
        />
        <Section
          title="두레팜 우드펠릿"
          text="자사의 펠릿은 슬러지 없이 고순도 버섯폐배지를 기반으로 균사체 바이오 필름 코팅과 천연 촉진제를 적용해
                연소 효율과 환경 안전성을 동시에 확보한 고기능성 연료 입니다. 산업용 중심의 배지 펠릿과 달리
                소비자에게도 유용히 사용될 수 있는 제품들을 제공 중입니다."
          img="/homeItem/home2.jpg"
          reverse={true}
        />
        <Section
          title="다양한 제품군"
          text="캠핑, 반려동물, 난방, 발전소용 까지 각각의 특색에 맞춰 다양한 제품군을 지금 경험하세요."
          img="/homeItem/all-product.png"
          reverse={false}
        />
      </div>

 <div className="p-10">
      <p
        className="mt-6 inline-block px-8 py-3 rounded-full border-2 border-white text-black bg-transparent transition-colors duration-300 hover:bg-black hover:text-white font-semibold text-lg"
        onClick={() => setIsModalOpen(true)}
      >
        펠릿 성분 자세히보기
      </p>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imgSrc="/images/pellet-info.png"
      />
    </div>


    </div>
  );
}
