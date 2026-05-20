import React from "react";
import { X } from "lucide-react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoKey: string | undefined;
  title: string;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  isOpen,
  onClose,
  videoKey,
  title,
}) => {
  if (!isOpen || !videoKey) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-4xl aspect-video bg-black border border-white/10 rounded-sharp overflow-hidden shadow-2xl">
        {/* Nút đóng modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-primary hover:text-text rounded-sharp text-muted transition-colors duration-300"
          aria-label="Đóng trailer"
        >
          <X className="w-5 h-5" />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title={`${title} Trailer`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
