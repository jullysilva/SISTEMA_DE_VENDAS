/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Column<T> {
  key: keyof T;
  header: string;
}

interface TableProps<T extends { id: string }> {
  data: T[];
  columns: Column<T>[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
}

const Table = <T extends { id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
}: TableProps<T>) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<T | null>(null);

  const handleEditClick = (item: any) => {
    if (!item.id) {
      console.warn("Item sem ID! Edição ignorada.", item);
      return;
    }

    setEditingId(item.id);
    setEditedData({ ...item });
  };

  const handleSaveEdit = () => {
    if (editedData?.id) {
      onEdit(editedData);
      setEditingId(null);
      setEditedData(null);
    } else {
      console.error("ID ausente ao tentar salvar a edição:", editedData);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedData(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof T
  ) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [key]: e.target.value as T[keyof T],
      });
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg p-[1vh]">
      <table className="min-w-full divide-y divide-gray-200 bg-[#FFFFFF]">
        <thead className="bg-[#488C82] text-[#FFFFFF]">
          {" "}
          {/* Cor do cabeçalho da tabela */}
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                scope="col"
                className="px-6 py-3 text-white text-center text-xs font-medium uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-6 py-4 whitespace-normal text-sm text-gray-500 text-center"
              >
                Nenhum dado disponível.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#EBF7F5]"}
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="text-left px-[1.5vh] py-[4vh] whitespace-normal break-words text-[2.5vh] text-gray-900"
                  >
                    {editingId === item.id ? (
                      <input
                        type="text"
                        value={
                          editedData?.[col.key] !== undefined
                            ? String(editedData[col.key])
                            : String(item[col.key])
                        }
                        onChange={(e) => handleChange(e, col.key)}
                        className="border-none bg-none text-gray-900 text-sm focus:bg-[#fff] focus:border-none block w-full py-[2.5vh]"
                      />
                    ) : (
                      String(item[col.key])
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-evenly items-center space-x-3 p-[0.5vh]">
                    {editingId === item.id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="text-[#10b47b] bg-transparent border border-[#10b47b] hover:border-[#10b47b] hover:text-[#FFFFFF] hover:bg-[#10b47b]"
                          title="Salvar"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-[#D3D3D3] bg-transparent border border-[#D3D3D3] hover:border-[#D3D3D3] hover:text-[#FFFFFF] hover:bg-[#D3D3D3]"
                          title="Cancelar"
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-[#2196f3] bg-transparent border border-[#2196f3] hover:border-[#2196f3] hover:text-[#FFFFFF] hover:bg-[#2196f3]"
                          title="Editar"
                        >
                          <PencilIcon className="h-5 w-5" width={18} />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          className="text-[#EE4B2B] bg-transparent border border-[#EE4B2B] hover:border-[#EE4B2B] hover:text-[#FFFFFF] hover:bg-[#EE4B2B] "
                          title="Excluir"
                        >
                          <TrashIcon className="h-5 w-5" width={18} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
