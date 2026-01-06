
import { NavItem } from './types';

export const CATEGORIES: NavItem[] = [
  {
    label: '学业导航',
    path: 'academic',
    icon: '📚',
    description: '课程表、学术讲座、培养方案与导师信息'
  },
  {
    label: '嘉庚食府',
    path: 'dining',
    icon: '🍛',
    description: '芙蓉、勤业、南光、望海——经院学子的食堂指南'
  },
  {
    label: '校园行踪',
    path: 'transport',
    icon: '🚌',
    description: '校车时刻表、共享单车、周边公交与地铁'
  },
  {
    label: '办事指南',
    path: 'admin',
    icon: '🏢',
    description: '学生证补办、用印申请、奖学金评定流程'
  },
  {
    label: '研途伴侣',
    path: 'ai-assistant',
    icon: '🤖',
    description: '由 Gemini 驱动的经院生活百科助手'
  }
];

export const ACADEMIC_INFO = [
  { title: 'WISE/SOE 官网', url: 'https://soe.xmu.edu.cn', desc: '获取最新通知公告、学术讲座的首选地。' },
  { title: '研究生系统', url: 'https://yjs.xmu.edu.cn', desc: '选课、查成绩、论文提交。' },
  { title: '图书馆资源', url: 'https://library.xmu.edu.cn', desc: '查找经济学核心期刊及数据库。' }
];

export const DINING_HIGHLIGHTS = [
  { name: '南光餐厅', dish: '南光老婆饼、油条', tags: ['早餐必备', '传统老字号'] },
  { name: '勤业餐厅', dish: '勤业沙茶面、馒头', tags: ['网红打卡', '种类最丰富'] },
  { name: '芙蓉餐厅', dish: '二楼手撕鸡、各式小吃', tags: ['经院最近', '性价比高'] },
  { name: '望海餐厅', dish: '自助餐、行政午餐', tags: ['环境优雅', '景观位'] }
];

export const TRANSPORT_TIPS = [
  { title: '校本部-翔安校区校车', content: '通常在克立楼或大南校门乘车，需提前通过智慧厦大预约。' },
  { title: '周边公交', content: '厦大西村站、厦大白城站，直达中山路、思明电影院等。' },
  { title: '校园漫步', content: '经院位于石井/南光附近，建议步行或骑行，校内共享单车需规范停放。' }
];
