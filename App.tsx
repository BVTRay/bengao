import React, { useMemo, useState } from 'react';

type TabKey = 'home' | 'contacts' | 'square' | 'hometown' | 'mine';

type Theme = {
  accent: string;
  accentStrong: string;
  accentSoft: string;
  navFg: string;
  pageClass: string;
};

const asset = (name: string) => `/mockup-assets/${name}`;

const themes: Record<TabKey, Theme> = {
  home: {
    accent: '#e52922',
    accentStrong: '#b11313',
    accentSoft: '#fff0ee',
    navFg: '#ffffff',
    pageClass: 'theme-home',
  },
  contacts: {
    accent: '#2f8e5f',
    accentStrong: '#14643f',
    accentSoft: '#eaf7f0',
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
    accent: '#d5ae46',
    accentStrong: '#a77a18',
    accentSoft: '#fff6df',
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

const hometownProducts = [
  { title: '长白山椴树蜜', price: '¥68', image: asset('product-honey.jpg') },
  { title: '古法红糖', price: '¥39', image: asset('product-sugar.jpg') },
  { title: '山珍菌菇礼盒', price: '¥128', image: asset('product-mushroom.jpg') },
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

function NavBar({ activeTab, setActiveTab }: { activeTab: TabKey; setActiveTab: (tab: TabKey) => void }) {
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
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function LeafMark() {
  return <i className="fa-solid fa-leaf leaf-mark" aria-hidden="true"></i>;
}

function HomeTab() {
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
          <button className="message-dot" type="button" aria-label="消息">
            <i className="fa-solid fa-comment-dots"></i>
          </button>
        </div>

        <section className="home-banner">
          <img src={asset('home-hero.jpg')} alt="返校季活动现场" />
          <div className="banner-shade"></div>
          <div className="banner-dots"><span></span><span></span><span></span></div>
          <div className="banner-copy">
            <span><i className="fa-solid fa-fire"></i> 返校季</span>
            <strong>金秋十月 · 回家看看</strong>
          </div>
        </section>
      </div>

      <section className="content-section service-section">
        <div className="section-title-row">
          <h2><i className="fa-solid fa-wand-magic-sparkles"></i> 校友服务</h2>
          <button type="button">带我回家 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="service-grid">
          {[
            ['fa-ticket', '活动报名', 'red'],
            ['fa-graduation-cap', '母校资讯', 'red'],
            ['fa-address-card', '校友卡', 'gold'],
            ['fa-border-all', '全部服务', 'gray'],
          ].map(([icon, label, tone]) => (
            <button className={`service-tile ${tone}`} type="button" key={label}>
              <i className={`fa-solid ${icon}`}></i>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="official-event">
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
          <button type="button">立即报名 <i className="fa-solid fa-arrow-right"></i></button>
        </div>
      </section>

      <section className="content-section news-section">
        <div className="section-title-row">
          <h2><i className="fa-solid fa-fire"></i> 校园动态</h2>
          <button type="button" className="plain-more">更多 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="news-card">
          {news.map((item) => (
            <article className="news-row" key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p><span>{item.tag}</span>{item.meta}</p>
              </div>
              <img src={item.image} alt={item.title} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ContactsTab() {
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
            <article className="alumni-row" key={person.name}>
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
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function SquareTab() {
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
          <article className={`post-card ${post.image ? 'with-image' : ''}`} key={`${post.title}-${index}`}>
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
          </article>
        ))}
      </section>

      <button className="floating-compose" type="button" aria-label="发布供需">
        <i className="fa-regular fa-pen-to-square"></i>
      </button>
    </div>
  );
}

function HometownTab() {
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
          <button type="button">全部项目 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <article className="donation-card">
          <img src={asset('hometown-campus.jpg')} alt="校园教学楼" />
          <div>
            <h3>校园教学楼修缮计划</h3>
            <p>屋面翻新 · 照明升级 · 善款全程公示</p>
          </div>
        </article>
      </section>

      <section className="hometown-section products-section">
        <div className="hometown-title">
          <h2><i className="fa-solid fa-store"></i> 家乡好物</h2>
          <button type="button">全部好物 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        <div className="product-strip">
          {hometownProducts.map((item) => (
            <article className="product-card" key={item.title}>
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
        <button className="shop-button" type="button"><i className="fa-solid fa-arrow-up-right-from-square"></i> 前往小程序选购</button>
      </section>

      <section className="hometown-section projects-section">
        <div className="hometown-title">
          <h2><i className="fa-solid fa-handshake"></i> 项目招商</h2>
          <button type="button">全部项目 <i className="fa-solid fa-chevron-right"></i></button>
        </div>
        {[
          { title: '智慧农业产业园', tag: '农业', meta: '拟引资 500-1000万', image: asset('project-agri.jpg') },
          { title: '金阳文旅特色小镇', tag: '文旅', meta: '招商中 · 年化 10%', image: asset('project-town.jpg') },
        ].map((item) => (
          <article className="project-row" key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p><span>{item.tag}</span>{item.meta}</p>
            </div>
            <i className="fa-solid fa-chevron-right"></i>
          </article>
        ))}
      </section>
    </div>
  );
}

function MineTab() {
  return (
    <div className="tab-page mine-page">
      <StatusBar />
      <div className="snow-layer" aria-hidden="true">
        <i className="fa-regular fa-snowflake"></i>
        <i className="fa-regular fa-snowflake"></i>
        <i className="fa-regular fa-snowflake"></i>
      </div>

      <section className="profile-card">
        <div className="profile-top">
          <img src={asset('avatar-linchengyu.jpg')} alt="林承宇头像" />
          <div>
            <h1>林承宇</h1>
            <p><span><i className="fa-solid fa-shield-heart"></i> 已认证校友</span> 2015届 · 计算机</p>
          </div>
          <button type="button" aria-label="设置"><i className="fa-solid fa-gear"></i></button>
        </div>
        <div className="card-number">
          <span><i className="fa-regular fa-address-card"></i> 校友电子卡 No. 2015 · 0089</span>
          <button type="button"><i className="fa-solid fa-qrcode"></i> 出示</button>
        </div>
      </section>

      <section className="quick-actions">
        {[
          ['fa-pen-to-square', '我的供需', 'red'],
          ['fa-bookmark', '我的收藏', 'gold'],
          ['fa-ticket', '我的活动', 'green'],
          ['fa-comment-dots', '消息', 'red dot'],
        ].map(([icon, label, tone]) => (
          <button className={`quick-action ${tone}`} type="button" key={label}>
            <span><i className={`fa-solid ${icon}`}></i></span>
            {label}
          </button>
        ))}
      </section>

      <section className="mine-section">
        <h2>校友服务</h2>
        <button className="settings-row verified" type="button">
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
            ['fa-shield-halved', '账号与安全', 'gray'],
            ['fa-comment-dots', '帮助与反馈', 'gray'],
            ['fa-circle-info', '关于本高校友汇', 'gray'],
            ['fa-right-from-bracket', '退出登录', 'red'],
          ].map(([icon, label, tone]) => (
            <button className={`settings-row ${tone}`} type="button" key={label}>
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

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const theme = themes[activeTab];

  const screen = useMemo(() => {
    if (activeTab === 'contacts') return <ContactsTab />;
    if (activeTab === 'square') return <SquareTab />;
    if (activeTab === 'hometown') return <HometownTab />;
    if (activeTab === 'mine') return <MineTab />;
    return <HomeTab />;
  }, [activeTab]);

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
          <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </main>
  );
}
