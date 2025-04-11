import React, { useState } from 'react';
import StyledSelect from '../StyledSelect';
import { UserIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/solid';
const Example1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados para cada select
  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');
  const [selected3, setSelected3] = useState('');

  // Opciones personalizadas
    const options = [
    {
      value: 'option1',
      label: (
        <div className="flex items-center">
          <UserIcon className="h-5 w-5 mr-2 text-blue-500"/>
          <span>Diseño UX</span>
        </div>
      ),
      style: 'bg-pink-100 text-purple-800',
      highlightStyle: 'bg-pink-300',
    },
    {
      value: 'option2',
      label: (
        <div className="flex w-full items-center ">
          <BriefcaseIcon className="h-5 w-5 mr-2 text-blue-500 " />
          <span>Backend Dev</span>
        </div>
      ),
      style: 'bg-blue-100 text-blue-800 ',
      highlightStyle: 'bg-green-500',
    },
    {
      value: 'option3',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-purple-500" />
          <span>IA Engineer</span>
        </div>
      ),
      style: 'bg-green-100 text-green-800 ',
    },
  ]; 

  return (
    <div className="flex flex-col items-center mt-10 space-y-6">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        Abrir Modal
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg space-y-6">
            <h2 className="text-lg font-semibold text-center">Selecciona tus preferencias</h2>

            {/* Select con búsqueda */}
            <StyledSelect
              options={options}
              value={selected1}
              onChange={(opt) => setSelected1(opt.value)}
              isSearchable={true}
              className='bg-blue-100'
              placeholder="Buscar 1"
              
            />

            {/* Select sin búsqueda */}
            <StyledSelect
              options={options}
              value={selected2}
              onChange={(opt) => setSelected2(opt.value)}
              isSearchable={false}
              placeholder="Buscar 2"
              className=''
            />

            {/* Otro Select con búsqueda */}
            <StyledSelect
              options={options}
              value={selected3}
              onChange={(opt) => setSelected3(opt.value)}
              isSearchable={true}
              placeholder="Buscar 3"
              className=''
            />

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Example1;
