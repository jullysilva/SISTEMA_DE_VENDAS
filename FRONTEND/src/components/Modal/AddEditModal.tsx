import React, { useState, useEffect } from "react";
import Modal from "./Modal";

interface AddEditModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  onSearchAddress?: (cep: string) => Promise<Partial<T>>;
  initialData: T;
  children: (
    formData: T,
    handleChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => void,
    handleSearchAddress?: () => void
  ) => React.ReactNode;
}

const AddEditModal = <T extends Record<string, any>>({
  isOpen,
  onClose,
  onSave,
  children,
  onSearchAddress,
  initialData,
}: AddEditModalProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [isOpen, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof T]: value,
    }));
  };

  const handleSearchAddress = async () => {
    if (!onSearchAddress) return;

    try {
      console.log("buscando cep", formData.cep);
      const result = await onSearchAddress(formData.cep);
      setFormData((prev) => ({
        ...prev,
        ...result,
      }));
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="min-w-[80vh] shadow">
      <form onSubmit={handleSubmit} className="pt-[8vh] px-[4vh] space-[1.2vh]">
        {children(formData, handleChange, handleSearchAddress)}
        <div className="flex flex-col mt-[1vh]">
          <div className="flex justify-end space-x-[2vh] mt-[1.5vh]">
            <button
              type="button"
              onClick={onClose}
              className="px-[2.5vh] py-2.5 text-sm border-none font-medium text-[#838383] outline-none bg-[#d9d9d93b] rounded-lg hover:bg-[#d9d9d9] hover:text-[#838383]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="text-[#FFFFFF] bg-[#32CD32] border-none px-[2.5vh] hover:bg-[#2bb32b] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center py-2.5 text-center"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModal;
