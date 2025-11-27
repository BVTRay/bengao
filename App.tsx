
import React, { useState, useEffect } from 'react';
import { Page, Tab, UserProfile, Company, Group, Activity, AuditItem, Member } from './types';
import Login from './pages/Login';
import Certify from './pages/Certify';
import Pending from './pages/Pending';
import RegisterInfo from './pages/RegisterInfo';
import Main from './pages/Main';
// New Pages
import MyPosts from './pages/MyPosts';
import NewsList from './pages/NewsList';
import CompanyList from './pages/CompanyList';
import Groups from './pages/Groups';
import Activities from './pages/Activities';
import AlumniDetail from './pages/AlumniDetail';
import PostDetail from './pages/PostDetail';
import AlumniList from './pages/AlumniList';
import PublishPost from './pages/PublishPost';
import AlumniCard from './pages/AlumniCard';
import Notifications from './pages/Notifications';
import MyFavorites from './pages/MyFavorites';
import Settings from './pages/Settings';
import Visitors from './pages/Visitors';
import MyAlumni from './pages/MyAlumni';
import EditProfile from './pages/EditProfile';
import Search from './pages/Search';
import ArticleDetail from './pages/ArticleDetail';
import ActivityDetail from './pages/ActivityDetail';
import CompanyDetail from './pages/CompanyDetail';
import GroupDetail from './pages/GroupDetail';
// User Creations
import MyCreations from './pages/MyCreations';
import ManageCreation from './pages/ManageCreation';
// Forms
import AddCompany from './pages/AddCompany';
import CreateGroup from './pages/CreateGroup';
import PublishActivity from './pages/PublishActivity';
// Admin Pages
import AdminDashboard from './pages/AdminDashboard';
import AdminAudit from './pages/AdminAudit';
import AdminUserManage from './pages/AdminUserManage';
import AdminPublishNews from './pages/AdminPublishNews';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>(Page.LOGIN);
  const [currentMainTab, setCurrentMainTab] = useState<Tab>(Tab.HOME);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Navigation History Stack
  const [history, setHistory] = useState<{page: Page, tab?: Tab}[]>([]);

  // State for ManageCreation page
  const [selectedCreation, setSelectedCreation] = useState<{type: 'company' | 'group' | 'activity', id: number} | null>(null);

  // Global User State
  const [user, setUser] = useState<UserProfile>({
    name: '张同学', 
    year: '2012',
    classId: '15班',
    jobTitle: '产品经理',
    company: '某互联网大厂',
    location: '北京',
    bio: '在这里遇见更好的自己',
    avatar: '12'
  });

  const CURRENT_USER_NAME = user.name; 

  // --- Dynamic Data State ---
  const [companies, setCompanies] = useState<Company[]>([
    { 
      id: 1, 
      name: '未来科技(北京)有限公司', 
      industry: '互联网 / AI', 
      location: '北京海淀', 
      founder: '刘一鸣', 
      founderYear: '2010', 
      logo: 'microsoft', 
      color: 'blue',
      creator: '刘一鸣', 
      members: [
        { id: 101, name: '李明', year: '2009', avatar: '8', status: 'approved', date: '2023-10-01' },
      ]
    },
    // Created by Current User
    { 
      id: 2, 
      name: '张氏文化传媒', 
      industry: '文化创意', 
      location: '北京朝阳', 
      founder: '张同学', 
      founderYear: '2012', 
      logo: 'camera', 
      color: 'orange', 
      creator: CURRENT_USER_NAME,
      members: [
         { id: 103, name: '赵小花', year: '2015', avatar: '12', status: 'pending', date: '2023-10-28' },
         { id: 104, name: '王强', year: '2005', avatar: '68', status: 'approved', date: '2023-10-15' }
      ]
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    { 
      id: 1, 
      name: '北京校友会', 
      type: '地区', 
      count: 520, 
      icon: 'landmark', 
      color: 'red',
      creator: '刘一鸣',
      members: []
    },
    // Created by Current User (Interest Groups)
    { 
      id: 10, 
      name: '互联网大厂内推群', 
      type: '行业', 
      count: 156, 
      icon: 'code', 
      color: 'blue', 
      desc: '字节/阿里/腾讯内推资源共享', 
      creator: CURRENT_USER_NAME,
      members: [
        { id: 201, name: '李明', year: '2009', avatar: '8', status: 'approved', date: '2023-10-01' },
        { id: 202, name: '陈若兰', year: '2008', avatar: '5', status: 'approved', date: '2023-10-02' }
      ]
    },
    { 
      id: 11, 
      name: '本溪美食探店小分队', 
      type: '兴趣', 
      count: 42, 
      icon: 'utensils', 
      color: 'orange', 
      desc: '寻找家乡味道，周末约饭', 
      creator: CURRENT_USER_NAME,
      members: [
         { id: 203, name: '赵小花', year: '2015', avatar: '12', status: 'approved', date: '2023-10-25' }
      ]
    }
  ]);

  const [activities, setActivities] = useState<Activity[]>([
    { 
      id: 1, 
      title: '2023北京校友秋季徒步活动', 
      date: '10月28日 (周六) 09:00', 
      location: '北京 · 香山公园', 
      status: 'enrolling', 
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      creator: '刘一鸣',
      members: []
    },
    // Created by Current User
    { 
      id: 2, 
      title: '剧本杀局：周五晚见', 
      date: '11月3日 19:00', 
      location: '北京 · 三里屯', 
      status: 'enrolling', 
      image: 'https://images.unsplash.com/photo-1546552356-3fae876a61ca?auto=format&fit=crop&w=800&q=80', 
      creator: CURRENT_USER_NAME,
      members: [
        { id: 301, name: '李明', year: '2009', avatar: '8', status: 'approved', date: '2023-10-29' }
      ]
    }
  ]);

  const [auditQueue, setAuditQueue] = useState<AuditItem[]>([
    { id: 101, type: 'user', actionType: 'create', applicant: '李四', date: '2023-10-25', data: { name: '李四', year: '2011', class: '8班', img: '11' } }
  ]);

  // --- Actions ---

  const handleAddToAudit = (type: 'company' | 'group' | 'activity', data: any, actionType: 'create' | 'update' = 'create', targetId?: number) => {
      const newItem: AuditItem = {
          id: Date.now(),
          type,
          actionType,
          targetId,
          applicant: user.name,
          date: new Date().toISOString().split('T')[0],
          data
      };
      setAuditQueue([newItem, ...auditQueue]);
  };

  const handleApproveAudit = (id: number) => {
      const item = auditQueue.find(i => i.id === id);
      if (!item) return;

      if (item.actionType === 'update' && item.targetId) {
          // Update existing item
          if (item.type === 'company') {
              setCompanies(companies.map(c => c.id === item.targetId ? { ...c, ...item.data } : c));
          } else if (item.type === 'group') {
              setGroups(groups.map(g => g.id === item.targetId ? { ...g, ...item.data } : g));
          } else if (item.type === 'activity') {
              setActivities(activities.map(a => a.id === item.targetId ? { ...a, ...item.data } : a));
          }
      } else {
          // Create new item
          const newId = Date.now();
          const baseData = { ...item.data, id: newId, creator: item.applicant, members: [] };

          if (item.type === 'company') {
              setCompanies([...companies, baseData]);
          } else if (item.type === 'group') {
              setGroups([...groups, baseData]);
          } else if (item.type === 'activity') {
              setActivities([...activities, baseData]);
          }
      }
      
      setAuditQueue(auditQueue.filter(i => i.id !== id));
  };

  const handleRejectAudit = (id: number) => {
      setAuditQueue(auditQueue.filter(i => i.id !== id));
  };

  const handleDeleteItem = (id: number, type: 'company' | 'group' | 'activity') => {
      if (type === 'company') setCompanies(companies.filter(c => c.id !== id));
      if (type === 'group') setGroups(groups.filter(g => g.id !== id));
      if (type === 'activity') setActivities(activities.filter(a => a.id !== id));
  };

  const handleSelectCreation = (type: 'company' | 'group' | 'activity', id: number) => {
    setSelectedCreation({ type, id });
    handleNavigate(Page.MANAGE_CREATION);
  };

  const handleUpdateEntity = (type: 'company' | 'group' | 'activity', id: number, data: any) => {
      if (type === 'company') {
          setCompanies(companies.map(c => c.id === id ? { ...c, ...data } : c));
      }
      if (type === 'group') {
          setGroups(groups.map(g => g.id === id ? { ...g, ...data } : g));
      }
      if (type === 'activity') {
          setActivities(activities.map(a => a.id === id ? { ...a, ...data } : a));
      }
  };

  const handleMemberAction = (
    entityType: 'company' | 'group' | 'activity', 
    entityId: number, 
    memberId: number, 
    action: 'approve' | 'reject'
  ) => {
    const updateMembers = (list: any[]) => {
      return list.map(entity => {
        if (entity.id !== entityId) return entity;
        if (!entity.members) return entity;
        
        if (action === 'reject') {
           return { ...entity, members: entity.members.filter((m: Member) => m.id !== memberId) };
        } else {
           return { 
             ...entity, 
             members: entity.members.map((m: Member) => m.id === memberId ? { ...m, status: 'approved' } : m) 
           };
        }
      });
    };

    if (entityType === 'company') setCompanies(updateMembers(companies));
    if (entityType === 'group') setGroups(updateMembers(groups));
    if (entityType === 'activity') setActivities(updateMembers(activities));
  };

  const handleUpdateAvatar = (newAvatar: string) => {
    setUser(prev => ({ ...prev, avatar: newAvatar }));
  };

  // Sync internal state with URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');

      // Reset scroll
      const appContainer = document.getElementById('app-container');
      if (appContainer && appContainer.children.length > 0) {
          appContainer.children[0].scrollTo(0,0); 
      }

      if (hash === 'HOME') { setCurrentPage(Page.MAIN); setCurrentMainTab(Tab.HOME); return; }
      if (hash === 'SQUARE') { setCurrentPage(Page.MAIN); setCurrentMainTab(Tab.SQUARE); return; }
      if (hash === 'MINE') { setCurrentPage(Page.MAIN); setCurrentMainTab(Tab.MINE); return; }

      if (Object.values(Page).includes(hash as Page)) {
        setCurrentPage(hash as Page);
        return;
      }

      if (!hash) setCurrentPage(Page.LOGIN);
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: Page, tab?: Tab) => {
    // Push to history
    setHistory(prev => [...prev, { page: currentPage, tab: currentMainTab }]);

    if (page === Page.MAIN) {
      const targetTab = tab || Tab.HOME;
      window.location.hash = targetTab;
    } else {
      window.location.hash = page;
      if (tab) setCurrentMainTab(tab);
    }
  };

  const handleBack = () => {
    if (history.length === 0) {
        // Fallback Logic if no history (e.g. refresh) - Robust Fallbacks
        if (currentPage === Page.ALUMNI_DETAIL || currentPage === Page.ARTICLE_DETAIL || currentPage === Page.COMPANY_LIST || currentPage === Page.GROUPS || currentPage === Page.ACTIVITIES || currentPage === Page.NOTIFICATIONS || currentPage === Page.SEARCH) {
             handleNavigate(Page.MAIN, Tab.HOME);
        } else if (currentPage === Page.POST_DETAIL || currentPage === Page.PUBLISH_POST) {
             handleNavigate(Page.MAIN, Tab.SQUARE);
        } else if (currentPage === Page.MY_CREATIONS || currentPage === Page.ALUMNI_CARD || currentPage === Page.SETTINGS || currentPage === Page.MY_FAVORITES || currentPage === Page.VISITORS || currentPage === Page.MY_ALUMNI || currentPage === Page.EDIT_PROFILE) {
             handleNavigate(Page.MAIN, Tab.MINE);
        } else if (currentPage === Page.MANAGE_CREATION) {
             handleNavigate(Page.MY_CREATIONS);
        } else if (currentPage === Page.ADD_COMPANY) {
             handleNavigate(Page.COMPANY_LIST);
        } else if (currentPage === Page.CREATE_GROUP) {
             handleNavigate(Page.GROUPS);
        } else if (currentPage === Page.PUBLISH_ACTIVITY) {
             handleNavigate(Page.ACTIVITIES);
        } else if (currentPage === Page.ADMIN_AUDIT || currentPage === Page.ADMIN_USER_MANAGE || currentPage === Page.ADMIN_PUBLISH_NEWS) {
             handleNavigate(Page.ADMIN_DASHBOARD);
        } else if (currentPage === Page.ACTIVITY_DETAIL) {
             handleNavigate(Page.ACTIVITIES);
        } else if (currentPage === Page.COMPANY_DETAIL) {
             handleNavigate(Page.COMPANY_LIST);
        } else if (currentPage === Page.GROUP_DETAIL) {
             handleNavigate(Page.GROUPS);
        } else {
             handleNavigate(Page.MAIN);
        }
        return;
    }

    const lastState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1)); // Pop

    if (lastState.page === Page.MAIN) {
        window.location.hash = lastState.tab || Tab.HOME;
    } else {
        window.location.hash = lastState.page;
    }
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
  };

  const handleToggleRole = () => {
    const newRole = !isAdmin;
    setIsAdmin(newRole);
    if (newRole) {
      handleNavigate(Page.ADMIN_DASHBOARD);
    } else {
      handleNavigate(Page.MAIN, Tab.MINE);
    }
  };

  const renderPage = () => {
    const commonProps = { onNavigate: (p: Page, t?: Tab) => handleNavigate(p, t), onBack: handleBack };

    switch (currentPage) {
      case Page.LOGIN: return <Login {...commonProps} />;
      case Page.CERTIFY: return <Certify {...commonProps} />;
      case Page.PENDING: return <Pending {...commonProps} />;
      case Page.REGISTER_INFO: return <RegisterInfo {...commonProps} />;
      case Page.MAIN: return <Main {...commonProps} initialTab={currentMainTab} user={user} isAdmin={isAdmin} onToggleRole={handleToggleRole} onUpdateAvatar={handleUpdateAvatar} />;
      
      case Page.MY_CREATIONS: 
        return <MyCreations {...commonProps} user={user} companies={companies} groups={groups} activities={activities} onSelectCreation={handleSelectCreation} onAddAudit={handleAddToAudit} />;
      
      case Page.MANAGE_CREATION: 
        return <ManageCreation {...commonProps} selection={selectedCreation} companies={companies} groups={groups} activities={activities} onMemberAction={handleMemberAction} onUpdateEntity={handleUpdateEntity} />;
      
      case Page.MY_POSTS: return <MyPosts {...commonProps} />;
      case Page.NEWS_LIST: return <NewsList {...commonProps} />;
      
      case Page.COMPANY_LIST: 
        return <CompanyList {...commonProps} companies={companies} isAdmin={isAdmin} onDelete={(id) => handleDeleteItem(id, 'company')} />;
      
      case Page.GROUPS: 
        return <Groups {...commonProps} groups={groups} isAdmin={isAdmin} onDelete={(id) => handleDeleteItem(id, 'group')} />;
      
      case Page.ACTIVITIES: 
        return <Activities {...commonProps} activities={activities} isAdmin={isAdmin} onDelete={(id) => handleDeleteItem(id, 'activity')} />;
      
      case Page.ALUMNI_DETAIL: return <AlumniDetail {...commonProps} />;
      case Page.POST_DETAIL: return <PostDetail {...commonProps} />;
      
      case Page.ALUMNI_LIST: return <AlumniList {...commonProps} user={user} />;
      case Page.PUBLISH_POST: return <PublishPost {...commonProps} />;
      case Page.ALUMNI_CARD: return <AlumniCard {...commonProps} user={user} />;
      case Page.NOTIFICATIONS: return <Notifications {...commonProps} />;
      case Page.MY_FAVORITES: return <MyFavorites {...commonProps} />;
      case Page.SETTINGS: return <Settings {...commonProps} />;
      case Page.VISITORS: return <Visitors {...commonProps} />;
      case Page.MY_ALUMNI: return <MyAlumni {...commonProps} />;
      case Page.EDIT_PROFILE: return <EditProfile {...commonProps} user={user} onSave={handleUpdateUser} />;
      case Page.SEARCH: return <Search {...commonProps} />;
      case Page.ARTICLE_DETAIL: return <ArticleDetail {...commonProps} />;
      case Page.ACTIVITY_DETAIL: return <ActivityDetail {...commonProps} />;
      case Page.COMPANY_DETAIL: return <CompanyDetail {...commonProps} />;
      case Page.GROUP_DETAIL: return <GroupDetail {...commonProps} />;
      
      case Page.ADD_COMPANY: return <AddCompany {...commonProps} onAdd={(data) => handleAddToAudit('company', data)} />;
      case Page.CREATE_GROUP: return <CreateGroup {...commonProps} onAdd={(data) => handleAddToAudit('group', data)} />;
      case Page.PUBLISH_ACTIVITY: return <PublishActivity {...commonProps} onAdd={(data) => handleAddToAudit('activity', data)} />;
      
      case Page.ADMIN_DASHBOARD: return <AdminDashboard {...commonProps} onToggleRole={handleToggleRole} />;
      case Page.ADMIN_AUDIT: return <AdminAudit {...commonProps} auditQueue={auditQueue} onApprove={handleApproveAudit} onReject={handleRejectAudit} />;
      case Page.ADMIN_USER_MANAGE: return <AdminUserManage {...commonProps} />;
      case Page.ADMIN_PUBLISH_NEWS: return <AdminPublishNews {...commonProps} />;
      default: return <Login {...commonProps} />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[#eef2f6] font-sans">
      <div id="app-container" className="w-full h-[100vh] sm:h-[844px] sm:w-[390px] bg-white sm:rounded-[40px] relative overflow-hidden shadow-none sm:shadow-[0_20px_40px_rgba(0,0,0,0.08)] sm:border-[8px] sm:border-gray-900">
        <div className="absolute top-0 left-0 right-0 h-[44px] z-[60] flex justify-between items-end px-6 pb-2 text-xs font-semibold text-gray-900 pointer-events-none mix-blend-darken">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center"><i className="fa-solid fa-signal text-[10px]"></i><i className="fa-solid fa-wifi text-[10px]"></i><i className="fa-solid fa-battery-full text-lg"></i></div>
        </div>
        <div className="absolute top-[48px] right-[16px] w-[87px] h-[32px] bg-white/60 backdrop-blur-md border border-gray-200/50 rounded-full z-[60] flex items-center justify-evenly shadow-sm pointer-events-auto">
          <div className="flex-1 flex justify-center items-center cursor-pointer hover:bg-black/5 rounded-l-full h-full"><i className="fa-solid fa-ellipsis text-gray-900 text-xs"></i></div>
          <div className="w-[1px] h-[18px] bg-gray-300/50"></div>
          <div className="flex-1 flex justify-center items-center cursor-pointer hover:bg-black/5 rounded-r-full h-full"><div className="w-4 h-4 border-2 border-gray-900 rounded-full flex items-center justify-center relative"><div className="w-1 h-1 bg-gray-900 rounded-full"></div></div></div>
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[30%] h-1 bg-gray-900/20 rounded-full z-[60] pointer-events-none"></div>
        <div className="h-full w-full pt-[0px] relative overflow-hidden">{renderPage()}</div>
      </div>
    </div>
  );
}
