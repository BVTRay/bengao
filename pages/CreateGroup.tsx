
import React, { useState } from 'react';
import { Page } from '../types';

interface CreateGroupProps {
  onNavigate: (page: Page) => void;
  onAdd: (data: any) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onNavigate, onAdd }) => {
  const [formData, setFormData] = useState({
      name: '',
      type: '兴趣',
      count: 1,
      icon: 'users',
      color: 'blue',
      desc: ''
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
      onAdd(formData);
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
          onNavigate(Page.GROUPS);
      }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in relative">
      <div className="px-6 pt-[52px] pb-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.GROUPS)} className="text-gray-500 font-bold text-sm">取消</button>
        <span className="font-bold text-gray-800 text-lg">创建组织</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">组织名称</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="如：深圳校友羽毛球群"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">类型</label>
            <div className="flex gap-4 mt-2">
                <label className="flex items-center gap-2">
                    <input type="radio" name="type" checked={formData.type === '兴趣'} onChange={() => setFormData({...formData, type: '兴趣'})} />
                    <span className="text-sm font-bold text-gray-700">兴趣爱好</span>
                </label>
                <label className="flex items-center gap-2">
                    <input type="radio" name="type" checked={formData.type === '地区'} onChange={() => setFormData({...formData, type: '地区'})} />
                    <span className="text-sm font-bold text-gray-700">地区分会</span>
                </label>
            </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">简介/标签</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="如：技术分享 / 约球"
                value={formData.desc}
                onChange={e => setFormData({...formData, desc: e.target.value})}
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

export default CreateGroup;
