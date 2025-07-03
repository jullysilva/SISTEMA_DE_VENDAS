import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import type { TableDataItem } from "../../_mocks_/Default";
import { v4 as uuidv4 } from "uuid";
import SeachCEP from "../../services/Address";

interface AddEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TableDataItem) => void;
}

const AddEditModal: React.FC<AddEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<TableDataItem>({});

  useEffect(() => {
    setFormData({
      id_shop: uuidv4(),
      name: "",
      cnpj: "",
      cep: "",
      address: "",
      neighborhood: "",
      city: "",
      state: "",
    });
  }, [isOpen]); // Reinicia o formulário quando o modal abre ou initialData muda

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchAddress = async () => {
    const { rua, endereco, cidade, uf } = await SeachCEP(formData.cep);
    setFormData((prev) => ({
      ...prev,
      address: endereco,
      neighborhood: rua,
      city: cidade,
      state: uf,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="min-w-[80vh] shadow">
      <form onSubmit={handleSubmit} className="pt-[8vh] px-[4vh] space-[0.8vh]">
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="block mb-[0.6vh] text-sm font-medium text-[#1e2939]"
          >
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-[#1e2939] text-sm rounded-[1vh] focus:ring-[#2b7fff] focus:border-[#2b7fff] block p-[1.5vh]"
            placeholder="John"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="cnpj"
            className="block text-sm font-medium text-gray-700 mb-[0.6vh]"
          >
            CNPJ
          </label>
          <input
            type="text"
            id="cnpj"
            name="cnpj"
            maxLength={14}
            value={formData.cnpj}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-[#1e2939] text-sm rounded-[1vh] focus:ring-[#2b7fff] focus:border-[#2b7fff] block p-[1.5vh]"
            placeholder="xx.xxx.xxx/xxxx-xx"
            required
          />
        </div>
        <div className="flex items-center space-x-[5vh]">
          <div className="flex flex-col">
            <label
              htmlFor="cep"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CEP
            </label>
            <input
              type="text"
              id="cep"
              name="cep"
              max={8}
              value={formData.cep}
              onChange={handleChange}
              onBlur={handleSearchAddress}
              className="bg-gray-50 border border-gray-300 text-[#1e2939] text-sm rounded-[1vh] focus:ring-[#2b7fff] focus:border-[#2b7fff] block w-full p-[1.5vh]"
              required
            />
          </div>
        </div>
        <div className="flex items-center space-x-[5vh]">
          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-[0.6vh]"
            >
              Endereço
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-[#1e2939] text-sm rounded-[1vh] focus:ring-[#2b7fff] focus:border-[#2b7fff] w-full block p-[1.5vh]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="neighborhood"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Logradouro
            </label>
            <input
              type="text"
              id="neighborhood"
              name="neighborhood"
              value={formData.neighborhood}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-[#1e2939] text-sm rounded-[1vh] focus:ring-[#2b7fff] focus:border-[#2b7fff] block w-full p-[1.5vh]"
              required
            />
          </div>
        </div>
        <div className="flex items-center space-x-[5vh]">
          <div className="flex flex-col">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-[0.6vh]"
            >
              Cidade
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-[#1e2939] text-sm rounded-[1vh] focus:ring-[#2b7fff] focus:border-[#2b7fff] w-full block p-[1.5vh]"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Estado
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-[#1e2939] text-sm rounded-[1vh] focus:ring-[#2b7fff] focus:border-[#2b7fff] block w-full p-[1.5vh]"
              required
            />
          </div>
        </div>
        <div className="flex flex-col mt-[1vh]">
          <div className="flex justify-end space-x-[2vh]">
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
