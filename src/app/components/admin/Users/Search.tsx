import React, { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

interface SearchProps {
  onSearch: (query: string, role: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const [role, setRole] = useState<string>('All Roles');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(query, role);
  };

  return (
    <form onSubmit={handleSubmit}  className="flex items-center w-9/10 md:w-9/10 md:w-[1240px] mx-auto bg-white p-2 rounded gap-3 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.09)]">
        <RiSearchLine className="text-gray-400 ml-2" />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search users by name or email..."
        className="flex-1 p-3 rounded border-[#E5E7EB] border-2 outline-none w-6/10 md:w-full"
      />
      <select
        value={role}
        onChange={handleRoleChange}
        className="bg-[#E0E7FF] p-3 rounded border-[#E5E7EB] border-2 text-[10px] md:text-[20px]"
      >
        <option value="All Roles">All Roles</option>
        <option value="Applicant">Applicant</option>
        <option value="Manager">Manager</option>
        <option value="Reviewer">Reviewer</option>
        <option value="Admin">Admin</option>
      </select>
    </form>
  );
};

export default Search;
