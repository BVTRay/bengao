
import React, { useState } from 'react';
import { Page, Company } from '../types';

interface CompanyListProps {
  onNavigate: (page: Page) => void;
  companies?: Company[];
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({ onNavigate, companies = [], isAdmin, onDelete }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in relative">
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.MAIN)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">校友企业</span>
        </div>
      </div>

      <div className="px-4 py-3 bg-white">
        <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center text-gray-400">
            <i className="fa-solid fa-magnifying-glass mr-2 text-xs"></i>
            <input type="text" placeholder="搜索企业名称、行业..." className="bg-transparent text-sm w-full outline-none text-gray-700"/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
         {companies.map(c => (
            <div 
              key={c.id}
              className="bg-white p-4 rounded-2xl shadow-sm flex items-start gap-4 active:bg-gray-50 transition cursor-pointer relative"
              onClick={() => onNavigate(Page.COMPANY_DETAIL)}
            >
                <div className={`w-12 h-12 bg-${c.color || 'blue'}-50 text-${c.color || 'blue'}-500 rounded-xl flex items-center justify-center text-xl font-bold`}>
                    <i className={`fa-solid fa-${c.logo || 'building'}`}></i>
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{c.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">{c.industry} · {c.location}</p>
                    <div className="mt-3 flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                        <img src={`https://i.pravatar.cc/150?img=${c.id + 5}`} className="w-6 h-6 rounded-full" />
                        <span className="text-xs text-gray-600">创始人：{c.founder} ({c.founderYear}届)</span>
                    </div>
                </div>
                {isAdmin && onDelete && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(c.id); }}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500"
                    >
                        <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                )}
            </div>
         ))}
      </div>

      {/* Floating Add Button - Navigates to ADD_COMPANY Form */}
      <button 
        onClick={() => onNavigate(Page.ADD_COMPANY)}
        className="absolute bottom-8 right-6 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition z-20"
      >
        <i className="fa-solid fa-plus text-xl"></i>
      </button>
    </div>
  );
};

export default CompanyList;
