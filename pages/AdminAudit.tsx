
import React, { useState } from 'react';
import { Page, AuditItem } from '../types';

interface AdminAuditProps {
  onNavigate: (page: Page) => void;
  onBack?: () => void;
  auditQueue?: AuditItem[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

const AdminAudit: React.FC<AdminAuditProps> = ({ onNavigate, onBack, auditQueue = [], onApprove, onReject }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'companies' | 'groups' | 'activities'>('users');
  const [toast, setToast] = useState('');

  const handleAction = (id: number, action: 'approve' | 'reject') => {
      if (action === 'approve' && onApprove) onApprove(id);
      if (action === 'reject' && onReject) onReject(id);
      
      setToast(action === 'approve' ? '已通过审核' : '已驳回申请');
      setTimeout(() => setToast(''), 1500);
  };

  const filteredQueue = auditQueue.filter(item => {
      if (activeTab === 'users') return item.type === 'user';
      if (activeTab === 'companies') return item.type === 'company';
      if (activeTab === 'groups') return item.type === 'group';
      if (activeTab === 'activities') return item.type === 'activity';
      return false;
  });

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-100">
        <button onClick={onBack ? onBack : () => onNavigate(Page.ADMIN_DASHBOARD)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg">审批中心</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mb-4 shadow-sm overflow-x-auto no-scrollbar">
         {['users', 'companies', 'groups', 'activities'].map((tab) => (
             <div 
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 text-center py-3 px-4 text-sm font-bold capitalize cursor-pointer whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400'}`}
             >
                 {tab === 'users' ? '校友申请' : tab === 'companies' ? '企业申请' : tab === 'groups' ? '组织申请' : '活动申请'}
             </div>
         ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 space-y-3 pb-8">
        
        {filteredQueue.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-3 relative overflow-hidden">
                {/* Action Type Badge */}
                <div className={`absolute top-0 right-0 px-2 py-1 text-[10px] font-bold rounded-bl-lg ${item.actionType === 'update' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {item.actionType === 'update' ? '信息变更' : '新申请'}
                </div>

                <div className="flex items-start gap-3 mt-2">
                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                        <i className={`fa-solid ${item.type === 'company' ? 'fa-building' : item.type === 'group' ? 'fa-users' : item.type === 'activity' ? 'fa-calendar' : 'fa-user'}`}></i>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-sm">
                            {item.data.name || item.data.title}
                        </h4>
                        <div className="text-xs text-gray-500 mt-1">
                            申请人: {item.applicant} · {item.date}
                        </div>
                        {/* Display some details based on type */}
                        <div className="mt-2 text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            {item.actionType === 'update' ? (
                                <div className="text-orange-600">
                                    <span className="font-bold">变更内容:</span>
                                    {Object.entries(item.data).map(([k, v]) => (
                                        <span key={k} className="block pl-1">• {k}: {v as string}</span>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    {item.type === 'company' && `行业: ${item.data.industry} | 地点: ${item.data.location}`}
                                    {item.type === 'group' && `类型: ${item.data.type} | 描述: ${item.data.desc}`}
                                    {item.type === 'activity' && `时间: ${item.data.date} | 地点: ${item.data.location}`}
                                    {item.type === 'user' && `届别: ${item.data.year} | 班级: ${item.data.class}`}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-gray-50">
                    <button onClick={() => handleAction(item.id, 'reject')} className="flex-1 py-2 text-xs font-bold text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition">驳回</button>
                    <button onClick={() => handleAction(item.id, 'approve')} className="flex-1 py-2 text-xs font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition">
                        {item.actionType === 'update' ? '确认变更' : '通过审核'}
                    </button>
                </div>
            </div>
        ))}

        {filteredQueue.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-20 text-gray-300">
                <i className="fa-solid fa-clipboard-check text-4xl mb-2 opacity-30"></i>
                <span className="text-sm">暂无待审核项</span>
            </div>
        )}

      </div>

      {/* Toast */}
      {toast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-6 py-3 rounded-xl shadow-lg fade-in text-sm font-bold">
              {toast}
          </div>
      )}
    </div>
  );
};

export default AdminAudit;
