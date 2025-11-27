
import React from 'react';
import { Page, Group } from '../types';

interface GroupsProps {
  onNavigate: (page: Page) => void;
  groups?: Group[];
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

const Groups: React.FC<GroupsProps> = ({ onNavigate, groups = [], isAdmin, onDelete }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in relative">
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.MAIN)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">找组织</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Region Groups */}
        <h3 className="text-sm font-bold text-gray-400 px-1">地区分会</h3>
        <div className="grid grid-cols-2 gap-3">
            {groups.filter(g => g.type === '地区').map(g => (
                <div 
                  key={g.id}
                  className="bg-white p-4 rounded-2xl shadow-sm text-center active:scale-[0.98] transition cursor-pointer relative group"
                  onClick={() => onNavigate(Page.GROUP_DETAIL)}
                >
                    <div className={`w-12 h-12 bg-${g.color || 'blue'}-50 text-${g.color || 'blue'}-500 rounded-full flex items-center justify-center mx-auto mb-2 text-xl`}>
                        <i className={`fa-solid fa-${g.icon || 'users'}`}></i>
                    </div>
                    <h4 className="font-bold text-gray-800">{g.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">{g.count}人活跃</p>
                    <button className="mt-3 text-xs bg-gray-900 text-white px-4 py-1.5 rounded-full pointer-events-none">申请加入</button>
                    {isAdmin && onDelete && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onDelete(g.id); }}
                            className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                        >
                            <i className="fa-solid fa-times text-xs"></i>
                        </button>
                    )}
                </div>
            ))}
        </div>

        {/* Interest Groups */}
        <h3 className="text-sm font-bold text-gray-400 px-1 mt-6">行业兴趣</h3>
         {groups.filter(g => g.type !== '地区').map(g => (
            <div 
               key={g.id}
               className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between active:bg-gray-50 transition cursor-pointer relative"
               onClick={() => onNavigate(Page.GROUP_DETAIL)}
            >
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 bg-${g.color || 'purple'}-100 text-${g.color || 'purple'}-600 rounded-lg flex items-center justify-center`}>
                        <i className={`fa-solid fa-${g.icon || 'users'}`}></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-sm">{g.name}</h4>
                        <p className="text-xs text-gray-400">{g.desc || '校友交流'}</p>
                    </div>
                </div>
                <button className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg font-bold">加入</button>
                {isAdmin && onDelete && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(g.id); }}
                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-red-500"
                    >
                        <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                )}
            </div>
         ))}
      </div>

       {/* Floating Add Button */}
       <button 
        onClick={() => onNavigate(Page.CREATE_GROUP)}
        className="absolute bottom-8 right-6 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition z-20"
      >
        <i className="fa-solid fa-plus text-xl"></i>
      </button>
    </div>
  );
};

export default Groups;
