import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Tv, Smartphone, Laptop, Gamepad2, Tablet } from "lucide-react";

export const DevicesPage: React.FC = () => {
  const devices = [
    { icon: <Tv className="w-7 h-7" />, title: "Smart TV", spec: "Hỗ trợ WebOS, Tizen, Android TV qua trình duyệt web.", quality: "Độ phân giải lên tới 4K UHD" },
    { icon: <Smartphone className="w-7 h-7" />, title: "Điện thoại thông minh", spec: "Tương thích cao trên iOS và Android.", quality: "Chất lượng Full HD di động" },
    { icon: <Laptop className="w-7 h-7" />, title: "Máy tính xách tay / Desktop", spec: "Xem trực tiếp qua Chrome, Safari, Firefox.", quality: "Hỗ trợ HDR10 mượt mà" },
    { icon: <Gamepad2 className="w-7 h-7" />, title: "Máy chơi game console", spec: "Trải nghiệm trên Xbox Series X/S và PS5.", quality: "Âm thanh vòm Dolby Audio" },
    { icon: <Tablet className="w-7 h-7" />, title: "Máy tính bảng", spec: "Đồng bộ tối đa cho iPad và Galaxy Tab.", quality: "Tối ưu hóa màn hình cảm ứng" }
  ];

  return (
    <div className="container-custom py-10 text-left">
      <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted hover:text-gold mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
      </Link>

      <div className="border-b border-themeBorder/40 pb-6 mb-8">
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-text uppercase">
          Thiết Bị <span className="text-gold">Hỗ Trợ</span>
        </h1>
        <p className="text-muted text-sm mt-2">Danh sách các thiết bị tương thích để thưởng thức CineFlow.</p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {devices.map((dev, idx) => (
          <div key={idx} className="p-6 bg-surface/20 border border-themeBorder/40 hover:border-gold/30 rounded-sharp transition-all flex flex-col gap-4">
            <div className="w-12 h-12 bg-surface/50 border border-themeBorder/60 rounded-sharp flex items-center justify-center text-gold">
              {dev.icon}
            </div>
            <div>
              <h3 className="font-display font-bold text-sm text-text">{dev.title}</h3>
              <p className="text-xs text-muted mt-2 leading-relaxed">{dev.spec}</p>
              <span className="inline-block mt-3 text-[10px] font-bold text-gold uppercase tracking-wider">{dev.quality}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
