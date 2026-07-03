import React, { useMemo, useState } from 'react';

type TabKey = 'home' | 'contacts' | 'square' | 'hometown' | 'mine';
type SecondaryPage =
  | 'projectDetail'
  | 'notifications'
  | 'products'
  | 'projects'
  | 'donationDetail'
  | 'alumniCard'
  | 'publishSupply'
  | 'mySupply'
  | 'contactInfo'
  | 'postDetail'
  | 'settings'
  | 'donations'
  | 'alumniDetail'
  | 'completeProfile'
  | 'login'
  | 'certify'
  | 'eventDetail'
  | 'activities'
  | 'services'
  | 'newsList'
  | 'articleDetail';

type Theme = {
  accent: string;
  accentStrong: string;
  accentSoft: string;
  navFg: string;
  pageClass: string;
};

type NavHandler = (page: SecondaryPage) => void;

const asset = (name: string) => `/mockup-assets/${name}`;

const themes: Record<TabKey, Theme> = {
  home: {
    accent: '#d9342b',
    accentStrong: '#9f1f19',
    accentSoft: '#fff1ef',
    navFg: '#ffffff',
    pageClass: 'theme-home',
  },
  contacts: {
    accent: '#2f8f5b',
    accentStrong: '#17613c',
    accentSoft: '#ecf8f1',
    navFg: '#ffffff',
    pageClass: 'theme-contacts',
  },
  square: {
    accent: '#171310',
    accentStrong: '#000000',
    accentSoft: '#f2f0ed',
    navFg: '#ffffff',
    pageClass: 'theme-square',
  },
  hometown: {
    accent: '#c99a2e',
    accentStrong: '#856113',
    accentSoft: '#fff7df',
    navFg: '#7a1010',
    pageClass: 'theme-hometown',
  },
  mine: {
    accent: '#111111',
    accentStrong: '#111111',
    accentSoft: '#f3f4f5',
    navFg: '#111111',
    pageClass: 'theme-mine',
  },
};

const navItems: Array<{ key: TabKey; label: string; icon: string }> = [
  { key: 'home', label: '首页', icon: 'fa-house' },
  { key: 'contacts', label: '通讯录', icon: 'fa-address-book' },
  { key: 'square', label: '广场', icon: 'fa-store' },
  { key: 'hometown', label: '家乡', icon: 'fa-heart' },
  { key: 'mine', label: '我的', icon: 'fa-user' },
];

const alumni = [
  { name: '林承宇', year: '2015届', role: '产品总监 · 字节跳动', city: '现居北京', tone: '#e8312a' },
  { name: '陈思远', year: '2012届', role: '投资合伙人 · 红杉资本', city: '现居上海', tone: '#d6af4b' },
  { name: '王雅琴', year: '2018届', role: '主治医师 · 协和医院', city: '现居北京', tone: '#3d956a' },
  { name: '赵明轩', year: '2010届', role: '总工程师 · 中建集团', city: '现居深圳', tone: '#242424' },
  { name: '周芷晴', year: '2020届', role: '创意总监 · 自由职业', city: '现居杭州', tone: '#ff6a47' },
];

const squarePosts = [
  {
    tag: '二手',
    title: '九成新 MacBook Pro 14',
    price: '¥8,800',
    meta: '周正琪 · 2020届',
    image: asset('square-laptop.jpg'),
    likes: 23,
  },
  {
    tag: '求购',
    title: '求购二手吉他 · 学生价',
    desc: '练手用，民谣木吉他，预算 500 内',
    meta: '王雅琴',
    likes: 33,
  },
  {
    tag: '求助',
    title: '寻电子系张老师联系方式',
    desc: '毕业十年想当面谢恩师，有同学知道近况吗？',
    meta: '李文博',
    likes: 12,
  },
  {
    tag: '二手',
    title: '尼康 Z6II 相机',
    price: '¥9,200',
    meta: '赵柏舟 · 2019届',
    image: asset('square-camera.jpg'),
    likes: 17,
  },
  {
    tag: '招聘',
    title: '字节内推 · 急招前端 3 名',
    desc: '25-40K · 15薪 · base 杭州，经验 3 年优先',
    meta: '陈思远 · 2015届',
    likes: 208,
  },
  {
    tag: '求租',
    title: '求租前排单间 · 近北门',
    desc: '9 月入住，预算 1500/月，求推荐',
    meta: '周正琪',
    likes: 41,
  },
];

const products = [
  { title: '长白山椴树蜜 500g', price: '¥68', sold: '已售 1.2k', image: asset('product-honey.jpg') },
  { title: '古法手作红糖', price: '¥39', sold: '已售 860', image: asset('product-sugar.jpg') },
  { title: '山珍菌菇礼盒', price: '¥128', sold: '已售 432', image: asset('product-mushroom.jpg') },
  { title: '高山云雾绿茶', price: '¥88', sold: '已售 690', image: asset('product-tea.jpg') },
  { title: '农家手工挂面', price: '¥29', sold: '已售 1.5k', image: asset('product-noodles.jpg') },
  { title: '五常稻花香米 5kg', price: '¥75', sold: '已售 980', image: asset('product-rice.jpg') },
];

const hometownProducts = products.slice(0, 3);

const projects = [
  { title: '智慧农业产业园', tag: '农业', meta: '拟引资 500-1000万', extra: '年化 12%', image: asset('project-agri.jpg') },
  { title: '金阳文旅特色小镇', tag: '文旅', meta: '招商中', extra: '年化 10%', image: asset('project-town.jpg') },
  { title: '校友科创孵化器', tag: '科技', meta: '股权合作', extra: '3-5 年', image: asset('project-tech.jpg') },
];

const news = [
  { title: '新图书馆落成，校友捐赠墙揭幕', tag: '校园建设', meta: '基建处 · 3天前', image: asset('news-library.jpg') },
  { title: '我校3项成果获国家科技进步奖', tag: '喜报', meta: '校友总会 · 2小时前', image: asset('news-award.jpg') },
  { title: '2024本科招生简章正式发布', tag: '招生', meta: '招生办 · 昨天', image: asset('news-campus.jpg') },
];

function StatusBar({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`status-bar ${inverse ? 'inverse' : ''}`}>
      <span>9:41</span>
      <div className="status-icons" aria-hidden="true">
        <i className="fa-solid fa-signal"></i>
        <i className="fa-solid fa-wifi"></i>
        <i className="fa-solid fa-battery-full"></i>
      </div>
    </div>
  );
}

function NavBar({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}) {
  return (
    <nav className="bottom-nav" aria-label="主导航">
      {navItems.map((item) => (
        <button
          key={item.key}
          type="button"
          aria-label={item.label}
          className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
          onClick={() => setActiveTab(item.key)}
          aria-current={activeTab === item.key ? 'page' : undefined}
        >
          <span className="nav-icon">
            <i className={`fa-solid ${item.icon}`}></i>
          </span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function LeafMark() {
  return <i className="fa-solid fa-leaf leaf-mark" aria-hidden="true"></i>;
}

function BackHeader({
  title,
  onBack,
  inverse = false,
}: {
  title: string;
  onBack: () => void;
  inverse?: boolean;
}) {
  return (
    <>
      <StatusBar inverse={inverse} />
      <div className={`detail-header ${inverse ? 'inverse' : ''}`}>
        <button type="button" aria-label="返回" onClick={onBack}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h1>{title}</h1>
      </div>
    </>
  );
}

function HomeTab({ onNavigate }: { onNavigate: NavHandler }) {
  return (
    <div className="tab-page home-page">
      <div className="home-red-zone">
        <StatusBar inverse />
        <div className="home-greeting">
          <div className="home-avatar"></div>
          <div>
            <p>下午好，欢迎回家</p>
            <h1>林承宇 · 2015届 <LeafMark /></h1>
          </div>
          <button className="message-dot" type="button" aria-label="消息" onClick={() => onNavigate('notifications')}>
            <i className="fa-solid fa-comment-dots"></i>
          </button>
        </div>

        <button className="home-banner" type="button" onClick={() => onNavigate('eventDetail')}>
          <img src={asset('home-hero.jpg')} alt="返校季活动现场" />
          <div className="banner-shade"></div>
          <div className="banner-dots"><span></span><span></span><span></span></div>
          <div className="banner-copy">
            <span><i className="fa-solid fa-fire"></i> 返校季</span>
            <strong>金秋十月 · 回家看看</strong>
          </div>
        </button>
      </div>

      <section className="content-section service-section">
        <div className="section-title-row">
          <h2><i className="fa-solid fa-wand-magic-sparkles"></i> 校友服务</h2>
          <button type="button" onClick={() => onNavigate('services')}>带我回家 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="service-grid">
          {[
            ['fa-ticket', '活动报名', 'red', 'activities'],
            ['fa-graduation-cap', '母校资讯', 'red', 'newsList'],
            ['fa-address-card', '校友卡', 'gold', 'alumniCard'],
            ['fa-border-all', '全部服务', 'gray', 'services'],
          ].map(([icon, label, tone, page]) => (
            <button className={`service-tile ${tone}`} type="button" key={label} onClick={() => onNavigate(page as SecondaryPage)}>
              <i className={`fa-solid ${icon}`}></i>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <button className="official-event" type="button" onClick={() => onNavigate('eventDetail')}>
        <div className="event-top">
          <span><i className="fa-solid fa-star"></i> 官方活动</span>
          <span><i className="fa-solid fa-clock"></i> 仅剩 6 天</span>
        </div>
        <h2>2024 世界校友返校日</h2>
        <p>万人回归 · 共话母校情 · 寻找当年的TA</p>
        <div className="event-meta">
          <span><i className="fa-solid fa-calendar-day"></i> 10/18 09:00</span>
          <span><i className="fa-solid fa-location-dot"></i> 本部 · 中心广场</span>
        </div>
        <div className="event-footer">
          <div className="avatar-stack"><b></b><b></b><b></b><b></b></div>
          <strong>328 人已报名</strong>
          <span className="event-cta">立即报名 <i className="fa-solid fa-arrow-right"></i></span>
        </div>
      </button>

      <section className="content-section news-section">
        <div className="section-title-row">
          <h2><i className="fa-solid fa-fire"></i> 校园动态</h2>
          <button type="button" className="plain-more" onClick={() => onNavigate('newsList')}>更多 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="news-card">
          {news.map((item) => (
            <button className="news-row" key={item.title} type="button" onClick={() => onNavigate('articleDetail')}>
              <div>
                <h3>{item.title}</h3>
                <p><span>{item.tag}</span>{item.meta}</p>
              </div>
              <img src={item.image} alt={item.title} />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactsTab({ onNavigate }: { onNavigate: NavHandler }) {
  return (
    <div className="tab-page contacts-page">
      <header className="contacts-hero">
        <StatusBar inverse />
        <div className="hero-leaf"><i className="fa-solid fa-leaf"></i></div>
        <h1>校友通讯录 <LeafMark /></h1>
        <p><i className="fa-solid fa-shield-heart"></i> 12,860 位已认证 · 仅认证校友可见</p>
        <label className="big-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input value="" readOnly placeholder="搜索姓名 / 届别 / 行业 / 公司" />
        </label>
        <div className="chip-row">
          {['全部', '同届', '同城', '同行业'].map((chip, index) => (
            <button className={index === 0 ? 'active' : ''} type="button" key={chip}>{chip}</button>
          ))}
        </div>
      </header>

      <section className="directory-section">
        <h2><i className="fa-solid fa-users"></i> 全部校友</h2>
        <div className="alumni-list-card">
          {alumni.map((person) => (
            <button className="alumni-row" key={person.name} type="button" onClick={() => onNavigate('alumniDetail')}>
              <div className="alumni-avatar" style={{ backgroundColor: person.tone }}>
                <i className="fa-solid fa-user"></i>
                <span><i className="fa-solid fa-check"></i></span>
              </div>
              <div>
                <h3>{person.name} <em>{person.year}</em></h3>
                <p>{person.role}</p>
                <small><i className="fa-solid fa-location-dot"></i> {person.city}</small>
              </div>
              <i className="fa-solid fa-chevron-right row-arrow"></i>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function SquareTab({ onNavigate }: { onNavigate: NavHandler }) {
  return (
    <div className="tab-page square-page">
      <header className="square-hero">
        <StatusBar inverse />
        <h1>广场 <LeafMark /></h1>
        <p>校友互助 · 有求必应 · 资源对接</p>
        <label className="square-search">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input value="" readOnly placeholder="搜索供需信息" />
        </label>
        <div className="square-chip-row">
          {['全部', '求助', '招聘', '二手', '商务'].map((chip, index) => (
            <button className={index === 0 ? 'active' : ''} type="button" key={chip}>{chip}</button>
          ))}
        </div>
      </header>

      <section className="masonry-feed">
        {squarePosts.map((post, index) => (
          <button className={`post-card ${post.image ? 'with-image' : ''}`} key={`${post.title}-${index}`} type="button" onClick={() => onNavigate('postDetail')}>
            {post.image && <img src={post.image} alt={post.title} />}
            <div className="post-body">
              {!post.image && <span className={`post-tag tag-${post.tag}`}>{post.tag}</span>}
              <h2>{post.title}</h2>
              {post.price && <strong className="post-price">{post.price}</strong>}
              {post.desc && <p>{post.desc}</p>}
              <div className="post-meta">
                <span className="mini-avatar"></span>
                <span>{post.meta}</span>
                <span><i className="fa-solid fa-eye"></i> {post.likes}</span>
              </div>
            </div>
          </button>
        ))}
      </section>

      <button className="floating-compose" type="button" aria-label="发布供需" onClick={() => onNavigate('publishSupply')}>
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
  );
}

function HometownTab({ onNavigate }: { onNavigate: NavHandler }) {
  return (
    <div className="tab-page hometown-page">
      <header className="hometown-hero">
        <StatusBar />
        <h1>助力家乡 <LeafMark /></h1>
        <p>为母校 · 为家乡 · 尽一份赤子之心</p>
        <div className="gold-lines"><span></span><span></span></div>
      </header>

      <section className="hometown-section donation-section">
        <div className="hometown-title">
          <h2><i className="fa-solid fa-hand-holding-heart"></i> 为学校捐款</h2>
          <button type="button" onClick={() => onNavigate('donations')}>全部项目 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <button className="donation-card" type="button" onClick={() => onNavigate('donationDetail')}>
          <img src={asset('hometown-campus.jpg')} alt="校园教学楼" />
          <div>
            <h3>校园教学楼修缮计划</h3>
            <p>屋面翻新 · 照明升级 · 善款全程公示</p>
          </div>
        </button>
      </section>

      <section className="hometown-section products-section">
        <div className="hometown-title">
          <h2><i className="fa-solid fa-store"></i> 家乡好物</h2>
          <button type="button" onClick={() => onNavigate('products')}>全部好物 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="product-strip">
          {hometownProducts.map((item) => (
            <button className="product-card" type="button" key={item.title} onClick={() => onNavigate('products')}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <strong>{item.price}</strong>
            </button>
          ))}
        </div>
        <button className="shop-button" type="button" onClick={() => onNavigate('products')}><i className="fa-solid fa-arrow-up-right-from-square"></i> 前往小程序选购</button>
      </section>

      <section className="hometown-section projects-section">
        <div className="hometown-title">
          <h2><i className="fa-solid fa-handshake"></i> 项目招商</h2>
          <button type="button" onClick={() => onNavigate('projects')}>全部项目 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        {projects.slice(0, 2).map((item) => (
          <button className="project-row" type="button" key={item.title} onClick={() => onNavigate('projectDetail')}>
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p><span>{item.tag}</span>{item.meta}</p>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        ))}
      </section>
    </div>
  );
}

function MineTab({ onNavigate }: { onNavigate: NavHandler }) {
  return (
    <div className="tab-page mine-page">
      <StatusBar />
      <div className="snow-layer" aria-hidden="true">
        <i className="fa-regular fa-snowflake"></i>
        <i className="fa-regular fa-snowflake"></i>
        <i className="fa-regular fa-snowflake"></i>
      </div>

      <button className="profile-card" type="button" onClick={() => onNavigate('alumniCard')}>
        <div className="profile-top">
          <img src={asset('avatar-linchengyu.jpg')} alt="林承宇头像" />
          <div>
            <h1>林承宇</h1>
            <p><span><i className="fa-solid fa-shield-heart"></i> 已认证校友</span> 2015届 · 计算机</p>
          </div>
          <span className="gear-dot"><i className="fa-solid fa-gear"></i></span>
        </div>
        <div className="card-number">
          <span><i className="fa-regular fa-address-card"></i> 校友电子卡 No. 2015 · 0089</span>
          <em><i className="fa-solid fa-qrcode"></i> 出示</em>
        </div>
      </button>

      <section className="quick-actions">
        {[
          ['fa-pen-to-square', '我的供需', 'red', 'mySupply'],
          ['fa-bookmark', '我的收藏', 'gold', 'products'],
          ['fa-ticket', '我的活动', 'green', 'activities'],
          ['fa-comment-dots', '消息', 'red dot', 'notifications'],
        ].map(([icon, label, tone, page]) => (
          <button className={`quick-action ${tone}`} type="button" key={label} onClick={() => onNavigate(page as SecondaryPage)}>
            <span><i className={`fa-solid ${icon}`}></i></span>
            {label}
          </button>
        ))}
      </section>

      <section className="mine-section">
        <h2>校友服务</h2>
        <button className="settings-row verified" type="button" onClick={() => onNavigate('certify')}>
          <span><i className="fa-solid fa-shield-heart"></i></span>
          <strong>实名认证</strong>
          <em>已认证</em>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </section>

      <section className="mine-section">
        <h2>设置与其他</h2>
        <div className="settings-card">
          {[
            ['fa-shield-halved', '账号与安全', 'gray', 'settings'],
            ['fa-comment-dots', '帮助与反馈', 'gray', 'services'],
            ['fa-circle-info', '关于本高校友汇', 'gray', 'services'],
            ['fa-right-from-bracket', '退出登录', 'red', 'login'],
          ].map(([icon, label, tone, page]) => (
            <button className={`settings-row ${tone}`} type="button" key={label} onClick={() => onNavigate(page as SecondaryPage)}>
              <span><i className={`fa-solid ${icon}`}></i></span>
              <strong>{label}</strong>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProjectDetailPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  return (
    <div className="detail-page gold-detail">
      <StatusBar />
      <div className="image-hero">
        <img src={asset('project-greenhouse.jpg')} alt="智慧农业产业园" />
        <button type="button" onClick={onBack} aria-label="返回"><i className="fa-solid fa-chevron-left"></i></button>
      </div>
      <section className="detail-content">
        <span className="pill gold">招商引资</span>
        <h1>智慧农业产业园</h1>
        <p className="subline">家乡返乡创业 · 订单农业基地</p>
        <div className="stat-grid">
          <div><strong>500-1000万</strong><span>拟引资额</span></div>
          <div><strong>年化 12%</strong><span>预期回报</span></div>
          <div><strong>3-5 年</strong><span>合作周期</span></div>
        </div>
        <div className="tag-row"><span>政策扶持</span><span>成熟团队</span><span>订单农业</span></div>
        <h2>项目介绍</h2>
        <p>项目位于家乡国家级农业示范区，规划智慧大棚与冷链仓储，已签订商超订单。诚邀校友以资金或资源入股，共建返乡兴农平台，亦欢迎来电深入洽谈合作细节。</p>
      </section>
      <button className="bottom-action gold-action" type="button" onClick={() => onNavigate('contactInfo')}>查看联系方式</button>
    </div>
  );
}

function NotificationsPage({ onBack }: { onBack: () => void }) {
  const items = [
    ['「世界校友返校日」报名成功', '已为你保留席位，凭电子票入场，记得准时到场。', '2 分钟前', 'red'],
    ['赵柏舟 查看了你的联系方式', '来自「校友通讯录」，2019 届 · 摄影发烧友。', '1 小时前', 'green'],
    ['校友身份认证已通过', '你已成为认证校友，可查看通讯录并发布供需。', '昨天', 'gold'],
    ['你的帖子收到 3 条新回复', '「字节内推 · 急招前端」有新留言，点击查看。', '昨天', 'green'],
    ['捐款项目有新进展', '「教学楼修缮计划」已募集 72%，感谢你的支持。', '3 天前', 'gold'],
  ];
  return (
    <div className="detail-page gray-detail">
      <BackHeader title="消息通知" onBack={onBack} />
      <section className="notice-list">
        {items.map(([title, desc, time, tone]) => (
          <article className="notice-row" key={title}>
            <span className={`notice-icon ${tone}`}><i className="fa-solid fa-bell"></i></span>
            <div><h2>{title}</h2><p>{desc}</p></div>
            <time>{time}</time>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProductsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page shop-detail">
      <BackHeader title="家乡好物" onBack={onBack} />
      <p className="page-subtitle">校友家乡农特产 · 下单跳转小程序</p>
      <div className="outline-tabs">{['全部', '蜂蜜', '茶饮', '食品', '手作'].map((item, i) => <button className={i === 0 ? 'active' : ''} type="button" key={item}>{item}</button>)}</div>
      <section className="product-grid-page">
        {products.map((item) => (
          <article className="shop-product" key={item.title}>
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <div><strong>{item.price}</strong><span>{item.sold}</span></div>
          </article>
        ))}
      </section>
    </div>
  );
}

function ProjectsPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  return (
    <div className="detail-page shop-detail">
      <BackHeader title="项目招商" onBack={onBack} />
      <div className="outline-tabs project-tabs">{['全部', '农业', '文旅', '科技', '制造'].map((item, i) => <button className={i === 0 ? 'active' : ''} type="button" key={item}>{item}</button>)}</div>
      <section className="project-list-page">
        {projects.map((item) => (
          <button className="project-large-card" type="button" key={item.title} onClick={() => onNavigate('projectDetail')}>
            <img src={item.image} alt={item.title} />
            <div><span>{item.tag}</span></div>
            <h2>{item.title}</h2>
            <p><i className="fa-solid fa-coins"></i> {item.meta} <i className="fa-solid fa-clock-rotate-left"></i> {item.extra}</p>
            <em>洽谈 <i className="fa-solid fa-chevron-right"></i></em>
          </button>
        ))}
      </section>
    </div>
  );
}

function DonationDetailPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  return (
    <div className="detail-page gold-detail">
      <div className="image-hero">
        <img src={asset('donation-hero.jpg')} alt="校园教学楼修缮计划" />
        <button type="button" onClick={onBack} aria-label="返回"><i className="fa-solid fa-chevron-left"></i></button>
      </div>
      <section className="detail-content">
        <h1>校园教学楼修缮计划</h1>
        <p className="subline">为母校第三教学楼焕新出力</p>
        <h2>项目介绍</h2>
        <p>第三教学楼建成已逾三十年，屋面与电路亟待整修。本次募捐用于修缮屋面、更新照明与多媒体设备，让学弟学妹拥有更好的课堂。每一笔善款都将公示去向。</p>
        <div className="info-table">
          <div><span>发起方</span><strong>校友总会 · 教育基金</strong></div>
          <div><span>截止</span><strong>2026/12/31</strong></div>
          <div><span>善款用途</span><strong>屋面/照明/多媒体</strong></div>
        </div>
      </section>
      <button className="bottom-action gold-action" type="button" onClick={() => onNavigate('contactInfo')}>查看联系方式</button>
    </div>
  );
}

function AlumniCardPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page card-page">
      <BackHeader title="校友卡" onBack={onBack} />
      <section className="gold-member-card">
        <p>电子校友卡 <span>已认证</span></p>
        <div className="card-avatar"></div>
        <h1>林承宇</h1>
        <p>2015 届 · 计算机科学与技术</p>
        <strong>持卡校友 · 终身有效</strong>
        <em>No. 2015 · 0089</em>
      </section>
      <p className="card-note">凭此卡享受校友专属权益 · 可截图保存分享</p>
      <div className="two-actions"><button type="button">分享校友卡</button><button type="button">保存图片</button></div>
    </div>
  );
}

function PublishSupplyPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page form-page">
      <BackHeader title="发布供需" onBack={onBack} />
      <section className="form-section">
        <h2>选择分类</h2>
        <div className="outline-tabs red-tabs">{['求助', '招聘', '二手', '求购', '求租'].map((item, i) => <button className={i === 0 ? 'active' : ''} type="button" key={item}>{item}</button>)}</div>
        <input readOnly value="" placeholder="填写标题，简明扼要（20 字内）" />
        <textarea readOnly placeholder="详细描述你的供需内容，越具体越容易得到回应..." />
        <button className="image-add" type="button"><i className="fa-regular fa-image"></i> 添加图片</button>
        <h2>联系方式 <span>仅认证校友可查看</span></h2>
        <label><span>微信号</span><input readOnly placeholder="选填" /></label>
        <label><span>手机</span><input readOnly placeholder="必填" /></label>
      </section>
      <button className="bottom-action red-action" type="button">发布</button>
    </div>
  );
}

function MySupplyPage({ onBack }: { onBack: () => void }) {
  const list = [
    ['二手', '九成新 MacBook Pro · 自用转手', '10-12 发布', '326', '已发布'],
    ['求助', '寻 2008 级机械系班级合影电子版', '10-15 发布', '48', '审核中'],
    ['招聘', '内推 · 蚂蚁金服后端社招若干', '09-28 发布', '512', '已发布'],
    ['求租', '求租北门附近单间 · 已解决', '09-10 发布', '203', '已下架'],
  ];
  return (
    <div className="detail-page gray-detail">
      <BackHeader title="我的供需" onBack={onBack} />
      <div className="segmented"><button className="active" type="button">我发布的</button><button type="button">我收藏的</button></div>
      <section className="supply-list">
        {list.map(([tag, title, date, count, status]) => (
          <article className="supply-row" key={title}>
            <span>{tag}</span>
            <h2>{title}</h2>
            <p>{date} <i className="fa-solid fa-eye"></i> {count}</p>
            <em>{status}</em>
            <button type="button">编辑</button>
          </article>
        ))}
      </section>
    </div>
  );
}

function ContactInfoPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page contact-detail">
      <StatusBar inverse />
      <div className="contact-sheet">
        <button type="button" className="sheet-close" onClick={onBack}><i className="fa-solid fa-chevron-left"></i></button>
        <h1>联系方式</h1>
        <p>林承宇 已公开联系方式，请文明联系</p>
        {[
          ['微信号', 'lcy_2015'],
          ['手机', '138 8888 8899'],
          ['邮箱', 'chengyu.lin@bytedance.com'],
        ].map(([label, value]) => (
          <div className="contact-row" key={label}>
            <span><i className="fa-solid fa-circle-info"></i> {label}</span>
            <button type="button">复制</button>
            <strong>{value}</strong>
          </div>
        ))}
        <button className="copy-all" type="button">复制全部并添加微信</button>
      </div>
    </div>
  );
}

function PostDetailPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  return (
    <div className="detail-page post-detail-page">
      <BackHeader title="帖子详情" onBack={onBack} />
      <section className="post-detail-content">
        <div className="author-line"><span></span><div><strong>陈思远</strong><p>2015 届 · 计算机 · 2 小时前</p></div><em>二手</em></div>
        <h1>九成新 MacBook Pro 转让</h1>
        <strong className="big-price">¥8,800</strong>
        <p>2021 款 M Pro，16G+512G，电池循环 80 次，无磕碰划痕，原装充电器配件齐全。校内可当面验机交易，非诚勿扰。</p>
        <div className="thumb-strip"><img src={asset('square-laptop.jpg')} alt="电脑" /><img src={asset('square-camera.jpg')} alt="相机" /><img src={asset('product-sugar.jpg')} alt="配图" /></div>
        <div className="tag-row"><span>95 新</span><span>16G+512G</span><span>可当面验机</span></div>
        <p className="view-count"><i className="fa-solid fa-eye"></i> 208 浏览 <i className="fa-solid fa-heart"></i> 24</p>
      </section>
      <button className="bottom-action red-action" type="button" onClick={() => onNavigate('contactInfo')}>查看联系方式</button>
    </div>
  );
}

function SettingsPage({ onBack }: { onBack: () => void }) {
  const sections = [
    ['账号', ['账号与安全', '实名认证 已认证', '校友身份认证 已通过']],
    ['隐私', ['联系方式可见范围 仅认证校友', '谁能看到我的资料 所有校友']],
    ['通知', ['接收消息通知', '活动报名提醒']],
    ['通用', ['清除缓存 2.3 MB', '深色模式']],
    ['关于', ['关于本高校友汇 v1.0', '用户协议与隐私', '帮助与反馈']],
  ];
  return (
    <div className="detail-page gray-detail">
      <BackHeader title="设置" onBack={onBack} />
      <section className="settings-page-list">
        {sections.map(([title, rows]) => (
          <div key={title as string}>
            <h2>{title as string}</h2>
            {(rows as string[]).map((row) => <button type="button" key={row}>{row}<i className="fa-solid fa-chevron-right"></i></button>)}
          </div>
        ))}
        <button className="logout-line" type="button">退出登录</button>
      </section>
    </div>
  );
}

function DonationsPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  const rows = [
    ['校园教学楼修缮计划', '校园教学楼修缮 · 屋面与照明升级', asset('hometown-campus.jpg')],
    ['寒门学子助学金', '资助家境困难的在校学子完成学业', asset('news-award.jpg')],
    ['校史馆数字化工程', '校史馆数字化与珍贵档案保护', asset('news-library.jpg')],
  ];
  return (
    <div className="detail-page shop-detail">
      <BackHeader title="捐款项目" onBack={onBack} />
      <div className="outline-tabs">{['全部', '进行中', '已结束'].map((item, i) => <button className={i === 0 ? 'active' : ''} type="button" key={item}>{item}</button>)}</div>
      <section className="donation-list-page">
        {rows.map(([title, desc, image]) => (
          <button className="donation-list-row" type="button" key={title} onClick={() => onNavigate('donationDetail')}>
            <img src={image} alt={title} />
            <div><h2>{title}</h2><p>{desc}</p></div>
          </button>
        ))}
      </section>
    </div>
  );
}

function AlumniDetailPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  return (
    <div className="detail-page alumni-detail-page">
      <BackHeader title="校友详情" onBack={onBack} />
      <section className="alumni-profile">
        <div className="profile-photo"></div>
        <h1>林承宇 <span>已认证校友</span></h1>
        <p>2015 届 · 计算机科学与技术学院</p>
      </section>
      <section className="info-table green-table">
        {[
          ['入学届别', '2015 级'],
          ['学院专业', '计算机 · 软件工程'],
          ['现居城市', '浙江 · 杭州'],
          ['所在行业', '互联网 · 技术'],
          ['公司职务', '字节跳动 · 高级工程师'],
        ].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
      </section>
      <section className="message-block"><h2>校友寄语</h2><p>做了七年前端，乐意和学弟学妹聊聊大厂面试与职业选择，欢迎随时联系。</p></section>
      <button className="bottom-action green-action" type="button" onClick={() => onNavigate('contactInfo')}>查看联系方式</button>
    </div>
  );
}

function CompleteProfilePage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  return (
    <div className="detail-page form-page">
      <BackHeader title="完善资料" onBack={onBack} />
      <section className="complete-card">
        <div className="upload-avatar">更换头像</div>
        <label><span>真实姓名</span><input readOnly placeholder="请输入真实姓名" /></label>
        <label><span>手机号</span><button type="button">微信一键获取</button></label>
        <p>完成后即可浏览校园动态与活动；认证校友身份后，可解锁通讯录、发布供需等更多功能。</p>
      </section>
      <button className="bottom-action gold-action" type="button" onClick={() => onNavigate('certify')}>完成，进入校友汇</button>
    </div>
  );
}

function LoginPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  return (
    <div className="detail-page auth-page">
      <StatusBar inverse />
      <button className="auth-back" type="button" onClick={onBack} aria-label="返回"><i className="fa-solid fa-chevron-left"></i></button>
      <section className="auth-panel">
        <h1>本高校友汇</h1>
        <p>母校连接你我 · 校友一路同行</p>
      </section>
      <section className="auth-bottom">
        <button className="skip-link" type="button" onClick={onBack}>跳过</button>
        <h2>欢迎加入本高校友汇</h2>
        <p>登录后查看通讯录 · 报名活动 · 发布供需</p>
        <button className="bottom-action red-action inline-action" type="button" onClick={() => onNavigate('completeProfile')}>快速登录</button>
        <small>已阅读并同意《用户协议》《隐私政策》</small>
      </section>
    </div>
  );
}

function CertifyPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page form-page">
      <BackHeader title="校友身份认证" onBack={onBack} />
      <p className="page-subtitle">认证后可查看校友通讯录、报名官方活动并发布供需。</p>
      <section className="certify-form">
        <h2>校友信息</h2>
        {['真实姓名 请输入', '入学届别 如 2015 级', '学院专业 请选择', '学号 在校时学号'].map((row) => <label key={row}>{row}</label>)}
        <h2>职位信息</h2>
        {['公司 / 单位 请输入', '职位 / 头衔 请输入', '所在行业 请选择'].map((row) => <label key={row}>{row}</label>)}
        <h2>上传证明</h2>
        <div className="proof-grid"><button type="button">证件正面</button><button type="button">本人手持</button></div>
        <p>信息仅用于身份核验，审核结果将通过站内消息通知。</p>
      </section>
      <button className="bottom-action green-action" type="button">提交审核</button>
    </div>
  );
}

function EventDetailPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page event-detail-page">
      <div className="image-hero red-hero">
        <img src={asset('event-return-day.jpg')} alt="2024 世界校友返校日" />
        <button type="button" onClick={onBack} aria-label="返回"><i className="fa-solid fa-chevron-left"></i></button>
      </div>
      <section className="detail-content">
        <span className="pill red">官方活动</span>
        <h1>2024 世界校友返校日</h1>
        <p className="subline">万人回归 · 共话母校情</p>
        <div className="info-table">
          <div><span>时间</span><strong>10/18 周五 09:00</strong></div>
          <div><span>地点</span><strong>本部 · 中心广场</strong></div>
          <div><span>对象</span><strong>全体校友及家属</strong></div>
          <div><span>主办</span><strong>校友总会</strong></div>
        </div>
        <h2>活动介绍</h2>
        <p>十年再聚首，返校日邀你重回母校。开放日游园、院系座谈、恩师重逢、晚间草坪音乐会，与同窗共度难忘一天。</p>
        <p className="view-count">328 人已报名 <span>限额 500</span></p>
      </section>
      <button className="bottom-action red-action" type="button">立即报名</button>
    </div>
  );
}

function ActivitiesPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  const rows = [
    ['报名中', '2024 世界校友返校日', '10/18 09:00', '中心广场', '328 人已报名', asset('activity-return.jpg')],
    ['即将开始', '校友企业春季招聘会', '10/25 14:00', '大学生活动中心', '86 人已报名', asset('activity-jobfair.jpg')],
    ['已结束', '计算机学院校友学术沙龙', '09/12 19:00', '逸夫科技楼', '152 人参与', asset('activity-salon.jpg')],
  ];
  return (
    <div className="detail-page gray-detail">
      <BackHeader title="校友活动" onBack={onBack} />
      <div className="outline-tabs red-tabs">{['全部', '报名中', '即将开始', '已结束'].map((item, i) => <button className={i === 0 ? 'active' : ''} type="button" key={item}>{item}</button>)}</div>
      <section className="activity-list-page">
        {rows.map(([status, title, time, place, count, image]) => (
          <button className="activity-card" type="button" key={title} onClick={() => onNavigate('eventDetail')}>
            <img src={image} alt={title} />
            <span>{status}</span>
            <h2>{title}</h2>
            <p><i className="fa-regular fa-clock"></i> {time} <i className="fa-solid fa-location-dot"></i> {place}</p>
            <em>{count}</em>
            <strong>{status === '已结束' ? '看回顾' : '立即报名'}</strong>
          </button>
        ))}
      </section>
    </div>
  );
}

function ServicesPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  const groups: Array<[string, Array<[string, string, SecondaryPage]>]> = [
    ['我的身份', [['实名认证', 'fa-shield-heart', 'certify'], ['电子校友卡', 'fa-address-card', 'alumniCard'], ['编辑资料', 'fa-pen-to-square', 'completeProfile'], ['身份认证', 'fa-id-badge', 'certify']]],
    ['互助交流', [['校友通讯录', 'fa-address-book', 'alumniDetail'], ['供需广场', 'fa-store', 'postDetail'], ['我的供需', 'fa-list', 'mySupply'], ['消息通知', 'fa-comment-dots', 'notifications']]],
    ['母校情缘', [['返校活动', 'fa-ticket', 'activities'], ['为校捐款', 'fa-hand-holding-heart', 'donations'], ['项目招商', 'fa-handshake', 'projects'], ['母校资讯', 'fa-newspaper', 'newsList']]],
    ['更多', [['设置', 'fa-gear', 'settings'], ['好物选购', 'fa-basket-shopping', 'products'], ['欢迎登录', 'fa-right-to-bracket', 'login'], ['意见反馈', 'fa-pen', 'publishSupply']]],
  ];
  return (
    <div className="detail-page gray-detail">
      <BackHeader title="校友服务" onBack={onBack} />
      <section className="service-hub">
        {groups.map(([title, items]) => (
          <div key={title}>
            <h2>{title}</h2>
            <div>
              {items.map(([label, icon, page]) => (
                <button type="button" key={label} onClick={() => onNavigate(page)}>
                  <i className={`fa-solid ${icon}`}></i>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

function NewsListPage({ onBack, onNavigate }: { onBack: () => void; onNavigate: NavHandler }) {
  const rows = [
    ['新图书馆落成，校友捐赠墙正式揭幕', '校园建设', '基建处 · 2 小时前', asset('news-library.jpg')],
    ['我校学子斩获国际大学生数学竞赛金奖', '喜报', '校务公开 · 昨天', asset('news-award.jpg')],
    ['2024 年秋季研究生招生简章正式发布', '招生', '研究生院 · 3 天前', asset('news-campus.jpg')],
    ['返校日圆满举办，逾万名校友重回母校', '校园速递', '校友总会 · 1 周前', asset('news-return.jpg')],
    ['校史馆改造升级，新增校友风云录展区', '校园建设', '基建处 · 1 周前', asset('news-museum.jpg')],
  ];
  return (
    <div className="detail-page news-list-page">
      <BackHeader title="校园动态" onBack={onBack} />
      <div className="plain-tabs">{['全部', '校园速递', '喜报', '招生', '校园建设'].map((item, i) => <button className={i === 0 ? 'active' : ''} type="button" key={item}>{item}</button>)}</div>
      <section className="campus-news-list">
        {rows.map(([title, tag, meta, image]) => (
          <button className="campus-news-row" type="button" key={title} onClick={() => onNavigate('articleDetail')}>
            <div><h2>{title}</h2><p><span>{tag}</span>{meta}</p></div>
            <img src={image} alt={title} />
          </button>
        ))}
      </section>
    </div>
  );
}

function ArticleDetailPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="detail-page article-detail-page">
      <BackHeader title="校园动态" onBack={onBack} />
      <article className="article-body">
        <span className="pill green">校园建设</span>
        <h1>新图书馆落成，校友捐赠墙正式揭幕</h1>
        <p className="article-meta">校园速递 · 2 小时前 · 阅读 3,218</p>
        <img src={asset('article-library.jpg')} alt="新图书馆" />
        <p>历时两年建设的新图书馆于今日正式启用。建筑面积逾三万平方米，馆藏扩容至两百万册，配备智能检索与全天候自习空间，成为校园又一地标。</p>
        <h2>一面墙，记录每一份心意</h2>
        <p>一层大厅的校友捐赠墙同步揭幕，镌刻了近年来一千二百余位校友的姓名与寄语。从毕业十年的青年才俊，到耄耋之年的老学长，每一个名字背后都是一段与母校的情缘。</p>
        <img src={asset('article-donor-wall.jpg')} alt="校友捐赠墙揭幕仪式现场" />
        <small>△ 校友捐赠墙揭幕仪式现场</small>
        <p>图书馆还专设校友书屋与研讨间，未来将定期举办校友讲座与读书沙龙，让母校的灯火，继续照亮每一位远行的人。</p>
      </article>
      <div className="article-actions"><span><i className="fa-solid fa-heart"></i> 128</span><span><i className="fa-solid fa-bookmark"></i> 45</span><span><i className="fa-solid fa-arrow-up-right-from-square"></i></span></div>
    </div>
  );
}

function SecondaryScreen({
  page,
  onBack,
  onNavigate,
}: {
  page: SecondaryPage;
  onBack: () => void;
  onNavigate: NavHandler;
}) {
  switch (page) {
    case 'projectDetail': return <ProjectDetailPage onBack={onBack} onNavigate={onNavigate} />;
    case 'notifications': return <NotificationsPage onBack={onBack} />;
    case 'products': return <ProductsPage onBack={onBack} />;
    case 'projects': return <ProjectsPage onBack={onBack} onNavigate={onNavigate} />;
    case 'donationDetail': return <DonationDetailPage onBack={onBack} onNavigate={onNavigate} />;
    case 'alumniCard': return <AlumniCardPage onBack={onBack} />;
    case 'publishSupply': return <PublishSupplyPage onBack={onBack} />;
    case 'mySupply': return <MySupplyPage onBack={onBack} />;
    case 'contactInfo': return <ContactInfoPage onBack={onBack} />;
    case 'postDetail': return <PostDetailPage onBack={onBack} onNavigate={onNavigate} />;
    case 'settings': return <SettingsPage onBack={onBack} />;
    case 'donations': return <DonationsPage onBack={onBack} onNavigate={onNavigate} />;
    case 'alumniDetail': return <AlumniDetailPage onBack={onBack} onNavigate={onNavigate} />;
    case 'completeProfile': return <CompleteProfilePage onBack={onBack} onNavigate={onNavigate} />;
    case 'login': return <LoginPage onBack={onBack} onNavigate={onNavigate} />;
    case 'certify': return <CertifyPage onBack={onBack} />;
    case 'eventDetail': return <EventDetailPage onBack={onBack} />;
    case 'activities': return <ActivitiesPage onBack={onBack} onNavigate={onNavigate} />;
    case 'services': return <ServicesPage onBack={onBack} onNavigate={onNavigate} />;
    case 'newsList': return <NewsListPage onBack={onBack} onNavigate={onNavigate} />;
    case 'articleDetail': return <ArticleDetailPage onBack={onBack} />;
    default: return <ServicesPage onBack={onBack} onNavigate={onNavigate} />;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [activePage, setActivePage] = useState<SecondaryPage | null>(null);
  const theme = themes[activeTab];

  const go = (page: SecondaryPage) => setActivePage(page);
  const back = () => setActivePage(null);
  const changeTab = (tab: TabKey) => {
    setActiveTab(tab);
    setActivePage(null);
  };

  const screen = useMemo(() => {
    if (activePage) return <SecondaryScreen page={activePage} onBack={back} onNavigate={go} />;
    if (activeTab === 'contacts') return <ContactsTab onNavigate={go} />;
    if (activeTab === 'square') return <SquareTab onNavigate={go} />;
    if (activeTab === 'hometown') return <HometownTab onNavigate={go} />;
    if (activeTab === 'mine') return <MineTab onNavigate={go} />;
    return <HomeTab onNavigate={go} />;
  }, [activePage, activeTab]);

  const style = {
    '--accent': theme.accent,
    '--accent-strong': theme.accentStrong,
    '--accent-soft': theme.accentSoft,
    '--nav-active-fg': theme.navFg,
  } as React.CSSProperties;

  return (
    <main className={`app-stage ${theme.pageClass}`} style={style}>
      <div className="phone-shell">
        <div className="phone-screen">
          {screen}
          {!activePage && <NavBar activeTab={activeTab} setActiveTab={changeTab} />}
        </div>
      </div>
    </main>
  );
}
