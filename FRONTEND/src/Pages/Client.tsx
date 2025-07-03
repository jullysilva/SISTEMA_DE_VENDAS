import React, { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Table from "../components/Table/Table";
import ConfirmModal from "../components/Modal/ConfirmModal";
import type { DataClientItem } from "../_mocks_/Default";
import AddEditModal from "../components/Modal/AddEditModal";
import {
  createClient,
  deleteClient,
  getAllClients,
  updateClient,
} from "../services/Client";
import App from "../App";

const Client: React.FC = () => {
  const [data, setData] = useState<DataClientItem[]>([]);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState<string | null>(null);
  const [itemToEdit, setItemToEdit] = useState<DataClientItem | null>(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Você pode ajustar quantos itens por página deseja

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reponse = await getAllClients();
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
    { key: "email" as const, header: "Email" },
    { key: "cpf" as const, header: "CPF" },
    { key: "gender" as const, header: "Sexo" },
  ];

  // Funções de CRUD
  const handleAddEditSave = async (newItem: DataClientItem) => {
    if (itemToEdit) {
      try {
        await updateClient(Number(newItem.id), newItem);
        setData(data.map((item) => (item.id === newItem.id ? newItem : item)));
      } catch (error) {
        console.error("Erro ao atualizar o item:", error);
        // Opcional: mostrar uma notificação de erro para o usuário
      }
      setItemToEdit(null); // Limpa o item em edição
    } else {
      // Adição
      await createClient(newItem);
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
      await deleteClient(itemToDeleteId);

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

  const handleEditClick = (item: DataClientItem) => {
    setItemToEdit(item);
    handleAddEditSave(item);
  };

  const handleAddClick = () => {
    setItemToEdit(null);
    setIsAddEditModalOpen(true);
  };

  return (
    <App>
      <main className="flex-grow p-6 sm:p-8 lg:p-10">
        <div className="max-w-7xl mx-auto p-[6vh] sm:p-[4vh] lg:p-[10vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Lista de Clientes
            </h2>
            <button
              type="button"
              onClick={handleAddClick}
              className="text-blue-700 border border-blue-700 hover:bg-[#488C82] hover:text-[#FFFFFF] hover:border-none focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
            >
              <PlusIcon className="size-6" width={24} />
              <span className="sr-only">Adicionar novo cliente</span>
            </button>
          </div>

          {/* Tabela */}
          <>
            <Table
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
          />

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

export default Client;
