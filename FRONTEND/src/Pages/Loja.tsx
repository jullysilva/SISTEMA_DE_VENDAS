import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../components/Table/Table";
import ConfirmModal from "../components/Modal/ConfirmModal";
import type { DataShopItem } from "../_mocks_/Default";
import AddEditModal from "../components/Modal/AddEditModal";
import {
  createShop,
  deleteShop,
  getAllShops,
  updateShop,
} from "../services/Shops";
import App from "../App";
import SeachCEP from "../services/Address";

const Lojas: React.FC = () => {
  const [data, setData] = useState<DataShopItem[]>([]);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<DataShopItem | null>(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Você pode ajustar quantos itens por página deseja

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await getAllShops();
        setData(reponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setData]);

  // Colunas da tabela
  const tableColumns = [
    { key: "name" as const, header: "Nome" },
    { key: "cnpj" as const, header: "CNPJ" },
    { key: "cep" as const, header: "CEP" },
    { key: "address" as const, header: "Endereco" },
    { key: "neighborhood" as const, header: "Rua" },
    { key: "city" as const, header: "Cidade" },
    { key: "state" as const, header: "Estado" },
  ];

  // Funções de CRUD
  const handleAddEditSave = async (newItem: DataShopItem) => {
    if (itemToEdit) {
      try {
        await updateShop(Number(newItem.id), newItem);
        setData(data.map((item) => (item.id === newItem.id ? newItem : item)));
      } catch (error) {
        console.error("Erro ao atualizar o item:", error);
        // Opcional: mostrar uma notificação de erro para o usuário
      }
      setItemToEdit(null); // Limpa o item em edição
    } else {
      // Adição
      await createShop(newItem);
      setData([...data, { ...newItem }]); // Garante um novo ID para cada adição
    }
    setIsAddEditModalOpen(false); // Fecha o modal
    // Opcional: Voltar para a última página se um item for adicionado e a página atual estiver cheia
    if (data.length % itemsPerPage === 0 && !itemToEdit) {
      setCurrentPage(totalPages + 1);
    }
  };

  const handleDeleteConfirm = async () => {
    if (itemToDeleteId) {
      setData(data.filter((item) => item.id !== itemToDeleteId));
      await deleteShop(itemToDeleteId);

      setItemToDeleteId(null); // Limpa o ID para exclusão
      // Ajusta a página atual se o último item da página for excluído
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    setIsConfirmModalOpen(false);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDeleteId(id);
    setIsConfirmModalOpen(true);
  };

  const handleEditClick = (item: DataShopItem) => {
    handleAddEditSave(item);
  };

  const handleAddClick = () => {
    setItemToEdit(null);
    setIsAddEditModalOpen(true);
  };

  const handleSearchAddressCEP = async (cep: string) => {
    console.log("buscando cep", cep);
    const { rua, endereco, cidade, uf } = await SeachCEP(cep);
    return {
      address: endereco,
      neighborhood: rua,
      city: cidade,
      state: uf,
    };
  };

  return (
    <App>
      <main className="flex-grow p-6 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto p-[6vh] sm:p-[4vh] lg:p-[10vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Lista de Informações
            </h2>
            <button
              type="button"
              onClick={handleAddClick}
              className="text-blue-700 border border-blue-700 hover:bg-[#488C82] hover:text-[#FFFFFF] hover:border-none focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <PlusIcon className="size-6" width={24} />
              <span className="sr-only">Adicionar novos dados da loja</span>
            </button>
          </div>

          {/* Tabela */}
          <>
            <Table<DataShopItem>
              data={currentItems}
              columns={tableColumns}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />

            {/* Paginação */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-[2vh] mt-8">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`
                  px-4 py-2 rounded-md border
                  ${
                    currentPage === 1
                      ? "border-[#D3D3D3] text-[#D3D3D3] cursor-not-allowed hover:bg-transparent hover:text-[#D3D3D3]"
                      : "text-[#21c6db] border-[#21c6db] hover:bg-[#21c6db] hover:text-[#FFFFFF]"
                  }
                `}
                >
                  Anterior
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => paginate(page)}
                      className={`
                    px-[2.5vh] text-[#21c6db] border border-[#21c6db] rounded-md
                    ${
                      currentPage === page
                        ? "bg-[#21c6db] text-[#FFFFFF] shadow-md"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }
                  `}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`
                  px-4 py-2 border rounded-md
                  ${
                    currentPage === totalPages
                      ? "border-[#D3D3D3] text-[#D3D3D3] cursor-not-allowed hover:bg-transparent hover:text-[#D3D3D3]"
                      : "text-[#21c6db] border-[#21c6db] hover:bg-[#21c6db] hover:text-[#FFFFFF]"
                  }
                `}
                >
                  Próximo
                </button>
              </div>
            )}
          </>
        </div>
      </main>

      {/* Modais */}
      {(isAddEditModalOpen || isConfirmModalOpen) && (
        <>
          <div className="fixed bg-[#374151] opacity-[50%] w-full h-full backdrop-blur-sm z-40" />

          <AddEditModal
            isOpen={isAddEditModalOpen}
            onClose={() => setIsAddEditModalOpen(false)}
            onSave={handleAddEditSave}
            onSearchAddress={handleSearchAddressCEP}
            initialData={{
              id: "",
              name: "",
              cnpj: "",
              cep: "",
              address: "",
              neighborhood: "",
              city: "",
              state: "",
            }}
          >
            {(formData, handleChange, handleSearchAddress) => (
              <>
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
              </>
            )}
          </AddEditModal>

          <ConfirmModal
            isOpen={isConfirmModalOpen}
            onClose={() => setIsConfirmModalOpen(false)}
            onConfirm={handleDeleteConfirm}
            message={`Tem certeza que deseja excluir "${
              data.find((item) => item.id === itemToDeleteId)?.name
            }"? Esta ação é irreversível.`}
          />
        </>
      )}
    </App>
  );
};

export default Lojas;
