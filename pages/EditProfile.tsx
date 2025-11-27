import React, { useState } from 'react';
import { Page, Tab, UserProfile } from '../types';

interface EditProfileProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  user: UserProfile;
  onSave: (user: UserProfile) => void;
}

const EditProfile: React.FC<EditProfileProps> = ({ onNavigate, user, onSave }) => {
  const [formData, setFormData] = useState<UserProfile>(user);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    setShowToast(true);
    setTimeout(() => {
        setShowToast(false);
        onNavigate(Page.MAIN, Tab.MINE);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center justify-between bg-white sticky top-0 z-10 border-b border-gray-50">
        <button 
            onClick={() => onNavigate(Page.MAIN, Tab.MINE)} 
            className="text-gray-500 text-sm font-medium hover:text-gray-900"
        >
            取消
        </button>
        <span className="font-bold text-gray-800 text-lg">编辑资料</span>
        <div className="w-8"></div> {/* Placeholder */}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 pb-32">
        {/* Avatar */}
        <div className="flex flex-col items-center">
             <div className="w-24 h-24 relative">
                <img src="https://i.pravatar.cc/150?img=12" className="w-full h-full rounded-full object-cover border-4 border-white shadow-sm" />
                <div className="absolute bottom-0 right-0 bg-gray-900 text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white cursor-pointer">
                    <i className="fa-solid fa-camera text-xs"></i>
                </div>
             </div>
             <p className="text-xs text-gray-400 mt-2">点击修改头像</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">姓名</label>
                <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-base font-bold text-gray-800 border-b border-gray-100 pb-2 outline-none focus:border-red-200 transition-colors"
                />
            </div>

            <div className="flex gap-3">
                 <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">届别</label>
                    <input 
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full text-base font-bold text-gray-800 border-b border-gray-100 pb-2 outline-none focus:border-red-200 transition-colors"
                    />
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">班级</label>
                    <input 
                        name="classId"
                        value={formData.classId}
                        onChange={handleChange}
                        className="w-full text-base font-bold text-gray-800 border-b border-gray-100 pb-2 outline-none focus:border-red-200 transition-colors"
                    />
                </div>
            </div>

             <div className="bg-white rounded-2xl p-4 shadow-sm">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">公司/单位</label>
                <input 
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full text-base font-bold text-gray-800 border-b border-gray-100 pb-2 outline-none focus:border-red-200 transition-colors"
                />
            </div>

             <div className="bg-white rounded-2xl p-4 shadow-sm">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">职位头衔</label>
                <input 
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full text-base font-bold text-gray-800 border-b border-gray-100 pb-2 outline-none focus:border-red-200 transition-colors"
                />
            </div>

             <div className="bg-white rounded-2xl p-4 shadow-sm">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">所在城市</label>
                <input 
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full text-base font-bold text-gray-800 border-b border-gray-100 pb-2 outline-none focus:border-red-200 transition-colors"
                />
            </div>

             <div className="bg-white rounded-2xl p-4 shadow-sm">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">个人简介</label>
                <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full text-sm text-gray-700 border-none outline-none resize-none placeholder-gray-300"
                    placeholder="一句话介绍自己..."
                />
            </div>
        </div>
      </div>

       {/* Floating Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-20">
        <button 
            onClick={handleSave}
            className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
        >
            保存修改
        </button>
      </div>

       {/* Toast */}
      {showToast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur text-white px-6 py-4 rounded-xl shadow-lg fade-in">
              <i className="fa-solid fa-check text-2xl mb-2"></i>
              <span className="text-sm font-medium">保存成功</span>
          </div>
      )}
    </div>
  );
};

export default EditProfile;