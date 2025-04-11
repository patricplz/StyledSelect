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
          <UserIcon className="h-5 w-5 mr-2 text-blue-500"/>
          <span>Diseño UX</span>
        </div>
      ),
      style: 'bg-pink-100 text-purple-800 ',
      highlightStyle: 'bg-pink-200',
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
      highlightStyle: 'bg-purple-200',
    },
    {
      value: 'option3',
      label: (
        <div className="flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-purple-500" />
          <span>IA Engineer</span>
        </div>
      ),
      style: 'bg-green-100 text-green-800 '
    },
  ];  

  if (selectedValueSearchable) console.log(selectedValueSearchable);
  
  if (selectedValueSimple) console.log(selectedValueSimple);

  return (
    <div className=" flex flex-col max-w-sm mx-auto mt-10 space-y-8">
      {/* Select con buscador */}
      <StyledSelect
        options={options}
        value={selectedValueSearchable}
        onChange={(opt) => setSelectedValueSearchable(opt.value)}
        isSearchable={true}
        className="bg-green-500"
        placeholder='Search 1'
      />
      {/* Select sin buscador */}
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
