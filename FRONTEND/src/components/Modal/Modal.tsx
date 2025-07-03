import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { type ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="popup-modal"
      className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] inset-0 z-50 flex items-center justify-center bg-[#FFFFFF] rounded-[1.5vh] p-[2vh] bg-opacity-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className={`relative p-4 w-full max-w-md h-full bg-white rounded-lg shadow dark:bg-gray-700 ${
          className || ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute border-none top-3 right-2.5 text-[#374151] bg-transparent hover:bg-[#e5e7eb] hover:text-[#FFFFFF] rounded-lg text-sm w-24 h-24 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
        >
          <XMarkIcon width={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
