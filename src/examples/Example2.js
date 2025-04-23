import React, { useState } from 'react';
import StyledSelect from '../StyledSelect';
import { UserIcon, BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/solid';

const App = () => {
  const [selectedValueSearchable, setSelectedValueSearchable] = useState('');
  const [selectedValueSimple, setSelectedValueSimple] = useState('');

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
      highlightStyle: 'bg-purple-400',
      focusStyle: 'bg-purple-300',
      hoverStyle: 'bg-purple-500',
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
      style: 'bg-orange-100 text-orange-800 active:bg-orange-400',
      highlightStyle: 'bg-orange-400',
      focusStyle: 'bg-orange-300',
      hoverStyle: 'bg-orange-500',
    },
  ];
  

  return (
    <div className=" flex flex-col max-w-sm mx-auto mt-10 space-y-8">
      <StyledSelect
        options={options}
        value={selectedValueSearchable}
        onChange={(opt) => setSelectedValueSearchable(opt.value)}
        isSearchable={true}
        className="bg-green-200"
        placeholder='Search 1'
      />
      <StyledSelect
        options={options}
        value={selectedValueSimple}
        onChange={(opt) => setSelectedValueSimple(opt.value)}
        isSearchable={false}
        className="bg-blue-500"
        placeholder='Search 2'
      />
    </div>
  );
};

export default App;
