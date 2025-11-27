
import React, { useState } from 'react';
import { Page, Tab, Company, Group, Activity, Member } from '../types';

interface ManageCreationProps {
  onNavigate: (page: Page, tab?: Tab) => void;
  onBack?: () => void;
  selection: { type: 'company' | 'group' | 'activity', id: number } | null;
  companies: Company[];
  groups: Group[];
  activities: Activity[];
  onMemberAction: (type: 'company' | 'group' | 'activity', entityId: number, memberId: number, action: 'approve' | 'reject') => void;
  onUpdateEntity: (type: 'company' | 'group' | 'activity', id: number, data: any) => void;
}

const ManageCreation: React.FC<ManageCreationProps> = ({ onNavigate, onBack, selection, companies, groups, activities, onMemberAction, onUpdateEntity }) => {
  if (!selection) return null;

  let entity: any = null;
  if (selection.type === 'company') entity = companies.find(c => c.id === selection.id);
  if (selection.type === 'group') entity = groups.find(g => g.id === selection.id);
  if (selection.type === 'activity') entity = activities.find(a => a.id === selection.id);

  if (!entity) return <div>Entity not found</div>;

  const isActivity = selection.type === 'activity';
  const isInterestGroup = selection.type === 'group' && (entity as Group).type !== '地区';
  const isNoApproval = isActivity || isInterestGroup;

  const [activeTab, setActiveTab] = useState<'pending' | 'list'>(isNoApproval ? 'list' : 'pending');
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Editing State
  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({
      name: entity.name || entity.title || '',
      desc: entity.desc || entity.industry || '', // Map different fields to a generic "desc"
      announcement: '欢迎加入！请修改群名片。' // Simulated field
  });

  const members: Member[] = entity.members || [];
  const pendingMembers = members.filter(m => m.status === 'pending');
  const displayMembers = isNoApproval ? members : members.filter(m => m.status === 'approved');

  const handleAction = (memberId: number, action: 'approve' | 'reject') => {
    onMemberAction(selection.type, selection.id, memberId, action);
    setToast(action === 'approve' ? '已通过' : '已移除');
    setTimeout(() => setToast(''), 1000);
  };

  const handleCreateWeChatGroup = () => {
    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        setToast('已创建群聊并发送邀请');
        setTimeout(() => setToast(''), 2000);
    }, 1500);
  };

  const handleSaveInfo = () => {
      // Map generic form fields back to entity specific fields
      const updates: any = {};
      if (isActivity) {
          updates.title = editForm.name;
          // Activity specific updates if needed
      } else {
          updates.name = editForm.name;
          if (selection.type === 'company') updates.industry = editForm.desc;
          if (selection.type === 'group') updates.desc = editForm.desc;
      }
      
      onUpdateEntity(selection.type, selection.id, updates);
      setShowEdit(false);
      setToast('信息已更新');
      setTimeout(() => setToast(''), 1500);
  };

  return (
    <div className="h-full flex flex-col bg-[#F7F8FA] fade-in relative">
      {/* Header */}
      <div className="px-6 pt-[52px] pb-4 flex items-center bg-white sticky top-0 z-10 border-b border-gray-50">
        <button onClick={onBack ? onBack : () => onNavigate(Page.MY_CREATIONS)} className="w-10 h-10 -ml-2 rounded-full bg-white flex items-center justify-center text-gray-800 hover:bg-gray-50 transition text-lg">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1 flex justify-center pr-8">
            <span className="font-bold text-gray-800 text-lg truncate max-w-[200px]">{entity.name || entity.title}</span>
        </div>
        <button 
            onClick={() => {
                setEditForm({
                    name: entity.name || entity.title || '',
                    desc: entity.desc || entity.industry || '',
                    announcement: '欢迎加入！请修改群名片。'
                });
                setShowEdit(true);
            }}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-800 bg-gray-50 rounded-full"
        >
            <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-white mb-3 shadow-sm z-0">
        {!isNoApproval && (
            <div 
                onClick={() => setActiveTab('pending')}
                className={`flex-1 text-center py-3 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'pending' ? 'text-gray-900' : 'text-gray-400'}`}
            >
                待审核 ({pendingMembers.length})
                {activeTab === 'pending' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-900 rounded-full"></div>}
            </div>
        )}
        <div 
            onClick={() => setActiveTab('list')}
            className={`flex-1 text-center py-3 text-sm font-bold relative cursor-pointer transition-colors ${activeTab === 'list' ? 'text-gray-900' : 'text-gray-400'}`}
        >
            {isActivity ? '报名名单' : '成员列表'} ({displayMembers.length})
            {activeTab === 'list' && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gray-900 rounded-full"></div>}
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto px-4 py-2 space-y-3 ${isActivity ? 'pb-32' : 'pb-8'}`}>
        
        {/* PENDING TAB */}
        {activeTab === 'pending' && !isNoApproval && (
            <>
                {pendingMembers.length > 0 ? pendingMembers.map(m => (
                    <div key={m.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={`https://i.pravatar.cc/150?img=${m.avatar}`} className="w-10 h-10 rounded-full bg-gray-200" />
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{m.name} <span className="text-xs text-gray-400 font-normal">· {m.year}届</span></h4>
                                <p className="text-[10px] text-gray-400">申请时间：{m.date}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                             <button 
                                onClick={() => handleAction(m.id, 'reject')}
                                className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition"
                             >
                                <i className="fa-solid fa-xmark"></i>
                             </button>
                             <button 
                                onClick={() => handleAction(m.id, 'approve')}
                                className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center hover:bg-green-100 transition"
                             >
                                <i className="fa-solid fa-check"></i>
                             </button>
                        </div>
                    </div>
                )) : (
                     <div className="flex flex-col items-center justify-center pt-20 text-gray-300">
                        <i className="fa-regular fa-folder-open text-4xl mb-2"></i>
                        <span className="text-sm">暂无待审核申请</span>
                    </div>
                )}
            </>
        )}

        {/* LIST TAB */}
        {activeTab === 'list' && (
             <>
                {displayMembers.length > 0 ? displayMembers.map(m => (
                    <div key={m.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <img src={`https://i.pravatar.cc/150?img=${m.avatar}`} className="w-10 h-10 rounded-full bg-gray-200" />
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm">{m.name} <span className="text-xs text-gray-400 font-normal">· {m.year}届</span></h4>
                                <p className="text-[10px] text-gray-400">
                                    {isActivity ? '报名时间' : '加入时间'}：{m.date}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             {isNoApproval && m.status === 'pending' && (
                                 <span className="text-[10px] bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded">新加入</span>
                             )}
                             <button className="text-gray-300 hover:text-red-500">
                                <i className="fa-solid fa-ellipsis-vertical px-2"></i>
                             </button>
                        </div>
                    </div>
                )) : (
                     <div className="flex flex-col items-center justify-center pt-20 text-gray-300">
                        <i className="fa-solid fa-users text-4xl mb-2 opacity-30"></i>
                        <span className="text-sm">暂无人员</span>
                    </div>
                )}
            </>
        )}

      </div>

      {isActivity && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-50 z-20">
            <button 
                onClick={handleCreateWeChatGroup}
                disabled={loading}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
                {loading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-brands fa-weixin"></i>}
                一键建立微信群
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-2">将向所有报名人员发送入群邀请通知</p>
          </div>
      )}

      {/* Edit Modal (Bottom Sheet Style) */}
      {showEdit && (
          <div className="absolute inset-0 z-50 flex flex-col justify-end">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowEdit(false)}></div>
              <div className="bg-white rounded-t-3xl p-6 relative z-10 animate-[slideUp_0.3s_ease-out] shadow-2xl">
                  <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-6">维护信息</h3>
                  
                  <div className="space-y-4 mb-8">
                      <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2">名称 / 主题</label>
                          <input 
                            type="text" 
                            value={editForm.name}
                            onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                            className="w-full bg-gray-50 p-3 rounded-xl text-sm font-bold text-gray-800 outline-none focus:bg-white focus:ring-2 ring-red-100 transition"
                          />
                      </div>
                      
                      <div>
                          <label className="block text-xs font-bold text-gray-400 mb-2">
                              {selection.type === 'company' ? '行业' : '简介 / 描述'}
                          </label>
                          <input 
                            type="text" 
                            value={editForm.desc}
                            onChange={(e) => setEditForm({...editForm, desc: e.target.value})}
                            className="w-full bg-gray-50 p-3 rounded-xl text-sm font-bold text-gray-800 outline-none focus:bg-white focus:ring-2 ring-red-100 transition"
                          />
                      </div>

                      {selection.type === 'group' && (
                          <div>
                            <label className="block text-xs font-bold text-gray-400 mb-2">内部公告</label>
                            <textarea 
                                value={editForm.announcement}
                                onChange={(e) => setEditForm({...editForm, announcement: e.target.value})}
                                className="w-full bg-gray-50 p-3 rounded-xl text-sm text-gray-800 outline-none focus:bg-white focus:ring-2 ring-red-100 transition resize-none h-24"
                            ></textarea>
                          </div>
                      )}
                  </div>

                  <button 
                    onClick={handleSaveInfo}
                    className="w-full py-3.5 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                  >
                      保存修改
                  </button>
              </div>
          </div>
      )}

      {toast && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-black/80 text-white px-6 py-3 rounded-xl shadow-lg fade-in text-sm font-bold whitespace-nowrap">
              {toast}
          </div>
      )}

    </div>
  );
};

export default ManageCreation;
