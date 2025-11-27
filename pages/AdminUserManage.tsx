
import React, { useState } from 'react';
import { Page } from '../types';

interface AdminUserManageProps {
  onNavigate: (page: Page) => void;
}

const AdminUserManage: React.FC<AdminUserManageProps> = ({ onNavigate }) => {
  const [users, setUsers] = useState([
      { id: 1, name: '刘一鸣', year: '2010', phone: '138****0001', status: 'normal' },
      { id: 2, name: '陈若兰', year: '2008', phone: '139****0002', status: 'normal' },
      { id: 3, name: '张伟', year: '2012', phone: '156****0003', status: 'banned' },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState('');

  const handleDelete = (id: number) => {
      setUsers(users.filter(u => u.id !== id));
      setToast('已移除用户');
      setTimeout(() => setToast(''), 1500);
  };

  const handleToggleStatus = (id: number) => {
      setUsers(users.map(u => {
          if (u.id === id) return { ...u, status: u.status === 'normal' ? 'banned' : 'normal' };
          return u;
      }));
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in relative">
       {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={() => onNavigate(Page.ADMIN_DASHBOARD)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">校友管理</span>
        </div>
      </div>

       {/* Search */}
      <div className="px-4 py-3 bg-white">
        <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center text-gray-400">
            <i className="fa-solid fa-magnifying-glass mr-2 text-xs"></i>
            <input type="text" placeholder="搜索校友姓名、手机号..." className="bg-transparent text-sm w-full outline-none text-gray-700"/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
          {users.map(u => (
              <div key={u.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                  <div>
                      <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                          {u.name} 
                          {u.status === 'banned' && <span className="bg-red-100 text-red-500 text-[10px] px-1.5 rounded">已封禁</span>}
                      </h4>
                      <p className="text-xs text-gray-500">{u.year}届 · {u.phone}</p>
                  </div>
                  <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleStatus(u.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${u.status === 'normal' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}
                      >
                          <i className={`fa-solid ${u.status === 'normal' ? 'fa-ban' : 'fa-unlock'}`}></i>
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center text-xs"
                      >
                          <i className="fa-solid fa-trash"></i>
                      </button>
                  </div>
              </div>
          ))}
      </div>

      {/* FAB Add */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-8 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition z-20"
      >
        <i className="fa-solid fa-user-plus text-xl"></i>
      </button>

      {/* Add User Modal */}
      {showAddModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
              <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl animate-[scaleIn_0.2s_ease-out]">
                  <h3 className="font-bold text-lg mb-4">手动添加校友</h3>
                  <div className="space-y-3 mb-6">
                      <input type="text" placeholder="姓名" className="w-full bg-gray-50 p-3 rounded-lg text-sm outline-none" />
                      <input type="text" placeholder="手机号" className="w-full bg-gray-50 p-3 rounded-lg text-sm outline-none" />
                      <input type="text" placeholder="届别 (如2012)" className="w-full bg-gray-50 p-3 rounded-lg text-sm outline-none" />
                  </div>
                  <div className="flex gap-3">
                      <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm">取消</button>
                      <button 
                        onClick={() => { setShowAddModal(false); setToast('添加成功'); setTimeout(() => setToast(''), 1500); }} 
                        className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm"
                      >
                          确定添加
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Toast */}
      {toast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-6 py-3 rounded-xl shadow-lg fade-in text-sm font-bold">
              {toast}
          </div>
      )}
    </div>
  );
};

export default AdminUserManage;
