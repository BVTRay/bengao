
import React, { useState } from 'react';
import { Page } from '../types';

interface AddCompanyProps {
  onNavigate: (page: Page) => void;
  onAdd: (data: any) => void;
}

const AddCompany: React.FC<AddCompanyProps> = ({ onNavigate, onAdd }) => {
  const [formData, setFormData] = useState({
      name: '',
      industry: '',
      location: '',
      founder: '刘一鸣', // Default to current user
      founderYear: '2010',
      logo: 'building', // Default icon
      color: 'blue'
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = () => {
      onAdd(formData);
      setShowToast(true);
      setTimeout(() => {
          setShowToast(false);
          onNavigate(Page.COMPANY_LIST);
      }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 fade-in relative">
      <div className="px-6 pt-[52px] pb-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.COMPANY_LIST)} className="text-gray-500 font-bold text-sm">取消</button>
        <span className="font-bold text-gray-800 text-lg">入驻企业</span>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">企业名称</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="请输入企业全称"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
            />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">所属行业</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="如：互联网 / 制造业"
                value={formData.industry}
                onChange={e => setFormData({...formData, industry: e.target.value})}
            />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">总部地点</label>
            <input 
                type="text" 
                className="w-full font-bold text-gray-800 outline-none" 
                placeholder="如：北京海淀"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
            />
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm">
            <label className="block text-xs font-bold text-gray-400 mb-2">Logo图标 (FontAwesome)</label>
            <select 
                className="w-full font-bold text-gray-800 outline-none bg-white"
                value={formData.logo}
                onChange={e => setFormData({...formData, logo: e.target.value})}
            >
                <option value="building">Building (默认)</option>
                <option value="leaf">Leaf (农业/食品)</option>
                <option value="laptop-code">Laptop (IT/互联网)</option>
                <option value="stethoscope">Stethoscope (医疗)</option>
            </select>
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

export default AddCompany;
