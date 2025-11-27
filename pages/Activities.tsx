
import React from 'react';
import { Page, Activity } from '../types';

interface ActivitiesProps {
  onNavigate: (page: Page) => void;
  activities?: Activity[];
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
}

const Activities: React.FC<ActivitiesProps> = ({ onNavigate, activities = [], isAdmin, onDelete }) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in relative">
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.MAIN)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">近期活动</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {activities.map(a => (
            <div 
              key={a.id}
              onClick={() => onNavigate(Page.ACTIVITY_DETAIL)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm active:opacity-95 transition cursor-pointer relative group"
            >
                <div className="relative h-32 bg-gray-800">
                    <img src={a.image} className="w-full h-full object-cover opacity-60" />
                    <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold border border-white/20 ${a.status === 'enrolling' ? 'bg-white/20 backdrop-blur-md text-white' : 'bg-gray-900/60 backdrop-blur-md text-white'}`}>
                        {a.status === 'enrolling' ? '报名中' : '已结束'}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-bold text-gray-800 text-lg">{a.title}</h3>
                    <div className="mt-2 space-y-1">
                        <p className="text-xs text-gray-500 flex items-center gap-2"><i className="fa-regular fa-clock w-4"></i> {a.date}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-2"><i className="fa-solid fa-location-dot w-4"></i> {a.location}</p>
                    </div>
                    <button className={`w-full mt-4 py-2 rounded-xl text-sm font-bold ${a.status === 'enrolling' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                        {a.status === 'enrolling' ? '立即报名' : '回顾精彩瞬间'}
                    </button>
                </div>
                {isAdmin && onDelete && (
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(a.id); }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 hover:bg-red-500 hover:text-white flex items-center justify-center text-white backdrop-blur transition"
                    >
                        <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                )}
            </div>
        ))}
      </div>

       {/* Floating Add Button */}
       <button 
        onClick={() => onNavigate(Page.PUBLISH_ACTIVITY)}
        className="absolute bottom-8 right-6 w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition z-20"
      >
        <i className="fa-solid fa-plus text-xl"></i>
      </button>
    </div>
  );
};

export default Activities;
