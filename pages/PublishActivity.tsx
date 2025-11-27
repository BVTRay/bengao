
import React, { useState } from 'react';
import { Page } from '../types';

interface PublishActivityProps {
  onNavigate: (page: Page) => void;
  onAdd: (data: any) => void;
}

const PublishActivity: React.FC<PublishActivityProps> = ({ onNavigate, onAdd }) => {
  const [formData, setFormData] = useState({
      title: '',
      date: '',
      location: '',
      status: 'enrolling',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80' // default
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
      onAdd(formData);
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
          onNavigate(Page.ACTIVITIES);
      }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in relative">
      <div className="px-6 pt-[52px] pb-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.ACTIVITIES)} className="text-gray-500 font-bold text-sm">取消</button>
        <span className="font-bold text-gray-800 text-lg">发布活动</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">活动主题</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="如：周末校友聚餐"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
            />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">时间</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="如：11月11日 18:00"
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
            />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">地点</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="如：北京朝阳大悦城"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
            />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-20">
        <button 
            onClick={handleSubmit}
            className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
            提交申请
        </button>
      </div>

      {showToast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-6 py-4 rounded-xl shadow-lg fade-in">
              <i className="fa-solid fa-check text-2xl mb-2 block text-center"></i>
              <span className="text-sm font-medium">已提交，请等待审核</span>
          </div>
      )}
    </div>
  );
};

export default PublishActivity;
