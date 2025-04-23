import React, { useState } from 'react';
import StyledSelect from '../StyledSelect';
import { UserIcon, BriefcaseIcon, AcademicCapIcon, CodeIcon, CogIcon } from '@heroicons/react/solid';
const Example1 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected1, setSelected1] = useState('');
  const [selected2, setSelected2] = useState('');
  const [selected3, setSelected3] = useState('');

  const options = [
    {
      value: 'option1',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-purple-500" />
          <span>IA Engineer</span>
        </div>
      ),
      style: 'bg-purple-100 text-purple-800 active:bg-purple-400',
      // highlightStyle: 'bg-purple-400',
      // focusStyle: 'bg-purple-300',
      // hoverStyle: 'bg-purple-500',
    },
    {
      value: 'option2',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-green-500" />
          <span>Fullstack Dev</span>
        </div>
      ),
      style: 'bg-green-100 text-green-800 active:bg-green-400',
      highlightStyle: 'bg-green-400',
      focusStyle: 'bg-green-300',
      hoverStyle: 'bg-green-500',
    },
    {
      value: 'option3',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-blue-500" />
          <span>Data Analyst</span>
        </div>
      ),
      style: 'bg-blue-100 text-blue-800 active:bg-blue-400',
      highlightStyle: 'bg-blue-400',
      focusStyle: 'bg-blue-300',
      hoverStyle: 'bg-blue-500',
    },
    {
      value: 'option4',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-red-500" />
          <span>UX Designer</span>
        </div>
      ),
      style: 'bg-red-100 text-red-800 active:bg-red-400',
      highlightStyle: 'bg-red-400',
      focusStyle: 'bg-red-300',
      hoverStyle: 'bg-red-500',
    },
    {
      value: 'option5',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-pink-500" />
          <span>Product Manager</span>
        </div>
      ),
      style: 'bg-pink-100 text-pink-800 active:bg-pink-400',
      highlightStyle: 'bg-pink-400',
      focusStyle: 'bg-pink-300',
      hoverStyle: 'bg-pink-500',
    },
    {
      value: 'option6',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-yellow-500" />
          <span>QA Tester</span>
        </div>
      ),
      style: 'bg-yellow-100 text-yellow-800 active:bg-yellow-400',
      highlightStyle: 'bg-yellow-400',
      focusStyle: 'bg-yellow-300',
      hoverStyle: 'bg-yellow-500',
    },
    {
      value: 'option7',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-indigo-500" />
          <span>DevOps</span>
        </div>
      ),
      style: 'bg-indigo-100 text-indigo-800 active:bg-indigo-400',
      highlightStyle: 'bg-indigo-400',
      focusStyle: 'bg-indigo-300',
      hoverStyle: 'bg-indigo-500',
    },
    {
      value: 'option8',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-orange-500" />
          <span>Cybersecurity</span>
        </div>
      ),
      style: 'bg-orange-100 rounded-md text-orange-800 active:bg-orange-400',
      highlightStyle: 'bg-orange-400',
      focusStyle: 'bg-orange-300',
      hoverStyle: 'bg-orange-500',
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

            <StyledSelect
              options={options}
              value={selected1}
              onChange={(opt) => setSelected1(opt.value)}
              isSearchable={true}
              className='bg-blue-100 text-pink-500'
              placeholder="Buscar 1"
              seleccionDiv={true}
              borderColor="border-red-500"
            />


            <StyledSelect
              options={options}
              value={selected2}
              onChange={(opt) => setSelected2(opt.value)}
              isSearchable={false}
              placeholder="Buscar 2"
              className='w-1/2'
              seleccionDiv={true}
              borderColor="border-purple-500"
            />

            <StyledSelect
              options={options}
              value={selected3}
              onChange={(opt) => setSelected3(opt.value)}
              isSearchable={true}
              placeholder="Buscar 3"
              className=''
              seleccionDiv={true}
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
