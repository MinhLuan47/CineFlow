import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Phần "Câu Hỏi Thường Gặp" (FAQ Accordion Section).
 * Tính năng chính:
 * - Hệ thống Accordion đóng mở mượt mà sử dụng React State.
 * - Chỉ cho phép mở tối đa 1 câu hỏi tại một thời điểm (Single open state).
 * - Sử dụng biểu tượng `Plus` và `Minus` từ Lucide React để điều hướng.
 * - Hoạt ảnh đóng mở chiều cao và độ mờ (Height and Opacity transitions) mượt mà từ Framer Motion.
 * - Phong cách thiết kế kính mờ tối giản chuẩn điện ảnh (Dark Glassmorphism).
 */
export const FAQ: React.FC = () => {
  // Trạng thái lưu trữ vị trí câu hỏi đang được mở rộng (null nghĩa là đóng toàn bộ)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Danh sách 6 câu hỏi và câu trả lời tiếng Việt chuẩn hóa
  const faqData: FAQItem[] = [
    {
      question: "Tôi có thể xem phim miễn phí trên CineFlow không?",
      answer: "CineFlow cung cấp kho tài nguyên phim miễn phí giới hạn có kèm quảng cáo. Để thưởng thức trọn vẹn mọi tác phẩm với độ phân giải siêu nét 4K UHD, không bị làm phiền bởi quảng cáo và có âm thanh Dolby Atmos, bạn có thể nâng cấp lên gói tài khoản VIP Premium bất kỳ lúc nào.",
    },
    {
      question: "CineFlow có hỗ trợ phụ đề tiếng Việt chuẩn không?",
      answer: "Hoàn toàn có. 100% nội dung phim truyền hình, phim điện ảnh và anime trên hệ thống CineFlow đều được tích hợp phụ đề tiếng Việt (Vietsub) chuẩn rạp chiếu do đội ngũ biên dịch chuyên nghiệp thực hiện. Ngoài ra, nhiều tác phẩm bom tấn cũng đi kèm tùy chọn Thuyết minh chất lượng cao.",
    },
    {
      question: "Tôi có thể xem phim trên điện thoại và máy tính bảng không?",
      answer: "Có, CineFlow hỗ trợ đa nền tảng tối đa. Giao diện trang web được tối ưu hiển thị mượt mà trên mọi thiết bị di động, máy tính bảng (iPad/Android), máy tính cá nhân và Smart TV. Bạn có thể sử dụng cùng một tài khoản và đăng nhập trên nhiều thiết bị.",
    },
    {
      question: "Tôi có thể hủy gói dịch vụ Premium bất kỳ lúc nào không?",
      answer: "Có, CineFlow không ràng buộc hợp đồng dài hạn. Bạn có toàn quyền quản lý gói VIP Premium của mình và có thể thực hiện thao tác hủy gia hạn tự động bất cứ lúc nào trực tiếp trong trang Cài đặt tài khoản mà không phải chịu bất kỳ khoản phí phát sinh hay phụ phí nào.",
    },
    {
      question: "Ứng dụng có tự động lưu tiến trình xem phim dở không?",
      answer: "Có, hệ thống đám mây thông minh của CineFlow sẽ tự động lưu lại chính xác từng giây tiến trình bạn đang theo dõi. Khi bạn chuyển đổi từ điện thoại sang máy tính bảng hoặc Smart TV, hệ thống sẽ đề xuất tiếp tục phát ngay tại mốc thời gian bạn đã dừng trước đó.",
    },
    {
      question: "Tôi có thể tải phim về máy để xem ngoại tuyến không?",
      answer: "Có, đối với người dùng đăng ký gói VIP Premium, CineFlow hỗ trợ tính năng tải phim ngoại tuyến cực kỳ nhanh chóng. Bạn có thể tải phim về điện thoại hoặc máy tính bảng khi có kết nối Wifi để xem lại mượt mà khi đi tàu xe, máy bay hoặc ở những nơi không có mạng Internet.",
    },
  ];

  // Hàm chuyển đổi đóng mở câu hỏi
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Cấu hình hoạt ảnh danh sách câu hỏi so le
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
  };

  return (
    <section className="container-custom py-16 md:py-24 relative z-20 border-t border-themeBorder/40">
      
      {/* Tiêu đề Section */}
      <div className="flex flex-col gap-2 mb-12 text-center">
        <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs uppercase tracking-widest">
          <HelpCircle className="w-4 h-4 text-primary animate-pulse" />
          <span>Giải đáp thắc mắc</span>
        </div>
        <h2 className="font-display font-black text-3xl md:text-5xl tracking-tight uppercase text-text">
          Câu Hỏi Thường Gặp
        </h2>
        <p className="text-muted text-sm md:text-base max-w-xl mx-auto">
          Mọi thắc mắc của bạn về tài khoản, gói cước dịch vụ và tính năng trải nghiệm xem phim của CineFlow đều được trả lời tại đây.
        </p>
      </div>

      {/* 
        Danh sách Accordion (FAQ List)
        Giới hạn độ rộng tối đa max-w-3xl để tạo sự tập trung trực quan tốt nhất.
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto flex flex-col gap-4"
      >
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`border transition-colors duration-300 rounded-sharp overflow-hidden ${
                isOpen 
                  ? "bg-surface/60 border-primary/30 shadow-[0_0_20px_rgba(229,9,20,0.02)]" 
                  : "bg-surface/30 border-themeBorder hover:border-themeBorder/80"
              }`}
            >
              {/* Nút tiêu đề câu hỏi (Accordion Header Trigger) */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between text-left p-5 focus:outline-none group"
              >
                <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${
                  isOpen ? "text-primary" : "text-text group-hover:text-primary"
                }`}>
                  {faq.question}
                </span>
                
                {/* Icon xoay đổi mượt mà biểu thị trạng thái mở/đóng */}
                <span className={`flex-shrink-0 ml-4 p-1 rounded-sharp border border-themeBorder bg-background/50 text-muted group-hover:text-text transition-transform duration-300 ${
                  isOpen ? "rotate-180 border-primary/20 text-primary" : ""
                }`}>
                  {isOpen ? (
                    <Minus className="w-4 h-4 text-primary" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </span>
              </button>

              {/* Nội dung câu trả lời (Accordion Content Panel) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-muted leading-relaxed border-t border-themeBorder/40 bg-surface/10">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
};
