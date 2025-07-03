import React from "react";
import Modal from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[64vh]">
      <div className="p-4 md:p-5 text-center">
        <svg
          className="mx-auto mb-4 text-[#EE4B2B] w-[16vh] dark:text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <h3 className="mb-5 text-lg text-wrap font-normal text-gray-500 dark:text-gray-400">
          {message}
        </h3>
        <div className="flex flex-row justify-evenly items-center gap-3">
          <button
            data-modal-hide="popup-modal"
            type="button"
            className="text-[#FFFFFF] bg-[#32CD32] border-none px-[2.5vh] hover:bg-[#2bb32b] focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center py-2.5 text-center"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Sim
          </button>
          <button
            data-modal-hide="popup-modal"
            type="button"
            onClick={onClose}
            className="px-[2.5vh] py-2.5 text-sm border-none font-medium text-[#838383] outline-none bg-[#d9d9d93b] rounded-lg hover:bg-[#d9d9d9] hover:text-[#838383]"
          >
            Não
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
