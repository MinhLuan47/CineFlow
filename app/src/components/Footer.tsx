import React from 'react';
import { Film } from 'lucide-react';

/**
 * Thành phần Footer của CineFlow.
 * Tính năng:
 * - Logo rạp chiếu phim và mô tả tiếng Việt.
 * - Phân chia 3 cột danh sách liên kết tiện ích (Thể loại, Dịch vụ, Hỗ trợ).
 * - Biểu tượng mạng xã hội.
 * - Dòng bản quyền tiếng Việt.
 */
export const Footer: React.FC = () => {
    const footerSections = [
        {
            title: 'Thể loại phim',
            links: [
                { name: 'Phim Hành Động', href: '#' },
                { name: 'Khoa Học Viễn Tưởng', href: '#' },
                { name: 'Kinh Dị & Giật Gân', href: '#' },
                { name: 'Hài Hước & Tâm Lý', href: '#' },
                { name: 'Hoạt Hình Anime', href: '#' },
            ],
        },
        {
            title: 'Hỗ trợ khách hàng',
            links: [
                { name: 'Trung tâm trợ giúp', href: '#' },
                { name: 'Câu hỏi thường gặp (FAQ)', href: '#' },
                { name: 'Điều khoản sử dụng', href: '#' },
                { name: 'Chính sách bảo mật', href: '#' },
                { name: 'Liên hệ quảng cáo', href: '#' },
            ],
        },
        {
            title: 'Dịch vụ của chúng tôi',
            links: [
                { name: 'Thiết bị tương thích', href: '#' },
                { name: 'Blog Điện Ảnh', href: '#' },
            ],
        },
    ];

    return (
        <footer className="relative z-30 border-t border-themeBorder bg-surface pt-16 pb-12 mt-auto">
            {/* 
        Container chính chia grid 4 cột cho các danh mục trên desktop.
        Tự động responsive xuống 1 hoặc 2 cột trên màn hình nhỏ.
      */}
            <div className="container-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                {/* Cột 1: Logo & Giới thiệu tóm tắt */}
                <div className="flex flex-col gap-5">
                    <a href="/" className="flex items-center gap-2 group w-fit">
                        <Film className="w-7 h-7 text-primary group-hover:text-gold transition-colors duration-300" />
                        <span className="font-display font-extrabold text-xl tracking-tighter uppercase text-text">
                            CINE
                            <span className="text-primary group-hover:text-gold transition-colors duration-300">
                                FLOW
                            </span>
                        </span>
                    </a>
                    <p className="text-sm text-muted leading-relaxed">
                        CineFlow mang rạp chiếu phim chất lượng tối cao về ngôi nhà của bạn. Trải nghiệm âm thanh vòm
                        đỉnh cao và hình ảnh 4K HDR tuyệt mỹ không giới hạn.
                    </p>
                    {/* Biểu tượng mạng xã hội dùng inline SVG để tránh lỗi thiếu icon của thư viện */}
                    <div className="flex items-center gap-4 text-muted">
                        <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h2V1H13a5 5 0 00-5 5v2z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7L10.8 15.6 4.8 22.3H1.4l7.7-8.8L1 2.4h6.9l4.8 6.3L18.2 2.4zm-1.2 17.9h1.8L7.1 4.2H5.1l11.9 16.1z" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                            <svg
                                className="w-5 h-5 fill-none stroke-current stroke-2"
                                viewBox="0 0 24 24"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a href="#" className="hover:text-primary transition-colors" aria-label="Youtube">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M23.5 6.9a2.9 2.9 0 00-2-2C19.7 4.4 12 4.4 12 4.4s-7.7 0-9.5.5a2.9 2.9 0 00-2 2C0 8.7 0 12.5 0 12.5s0 3.8.5 5.6a2.9 2.9 0 002 2c1.8.5 9.5.5 9.5.5s7.7 0 9.5-.5a2.9 2.9 0 002-2c.5-1.8.5-5.6.5-5.6s0-3.8-.5-5.6zM9.5 16V9l6.5 3.5L9.5 16z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Cột 2, 3, 4: Cột liên kết điều hướng */}
                {footerSections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-5">
                        <h3 className="font-display font-bold text-text text-sm uppercase tracking-wider">
                            {section.title}
                        </h3>
                        <ul className="flex flex-col gap-3 text-sm">
                            {section.links.map((link) => (
                                <li key={link.name}>
                                    <a href={link.href} className="text-muted hover:text-primary transition-colors">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Đường phân chia mảnh nét cạnh (Sharp Line) */}
            <div className="container-custom border-t border-themeBorder/60 pt-8 flex items-center justify-center sm:justify-between gap-6">
                {/* Dòng chữ bản quyền */}
                <p className="text-xs text-muted/80 text-center sm:text-left">
                    &copy; {new Date().getFullYear()} CineFlow Inc. Bảo lưu mọi quyền hành. Dự án xây dựng trên nền tảng
                    React + Tailwind CSS.
                </p>
            </div>
        </footer>
    );
};
