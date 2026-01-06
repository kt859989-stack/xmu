
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { CATEGORIES, ACADEMIC_INFO, DINING_HIGHLIGHTS, TRANSPORT_TIPS } from './constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('academic');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '你好！我是你的经院研伴。关于厦大生活、经院学业或者办事流程，有什么我可以帮你的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `你是"厦大经院研伴"，专门服务于厦门大学经济学院（SOE）和王亚南经济研究院（WISE）的学生。
          你需要提供准确、亲切、实用的建议。
          核心知识点：
          - 地点：经院大楼（经济楼/N楼）、石井宿舍、芙蓉餐厅、南光餐厅。
          - 学业：导师制、双学位、学术周、博士生论坛。
          - 生活：智慧厦大APP、i厦大、校车预约、图书馆选座。
          - 语气：温和、专业、富有学长/学姐的关怀感。`,
        },
      });
      const botText = response.text || "抱歉，我现在思维有点混乱，请稍后再试。";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "出错了，可能网络有点问题。建议直接查看相关导航。" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <nav className="w-full md:w-80 xmu-blue text-white p-6 flex flex-col shadow-2xl">
        <div className="mb-10 text-center">
          <div className="text-3xl font-bold tracking-wider mb-2">厦大经院研伴</div>
          <div className="text-xs text-blue-200 opacity-80 uppercase tracking-widest">XMU Econ Graduate Portal</div>
        </div>
        
        <div className="space-y-2 flex-grow">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.path}
              onClick={() => setActiveTab(cat.path)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4 ${
                activeTab === cat.path 
                ? 'bg-white text-[#004080] shadow-lg scale-105 font-bold' 
                : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <div className="text-sm font-medium">{cat.label}</div>
                <div className="text-[10px] opacity-60 line-clamp-1">{cat.description}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/10 text-[10px] text-white/40 text-center">
          © 2024 厦门大学经济学院学子项目<br/>
          止于至善 · 自强不息
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-10 overflow-y-auto bg-slate-50">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                {CATEGORIES.find(c => c.path === activeTab)?.label}
              </h1>
              <p className="text-slate-500">
                {CATEGORIES.find(c => c.path === activeTab)?.description}
              </p>
            </div>
            <div className="hidden lg:block">
               <img src="https://www.xmu.edu.cn/images/logo.png" alt="XMU Logo" className="h-12 opacity-20 grayscale hover:grayscale-0 transition-all cursor-pointer" />
            </div>
          </header>

          {/* Tab Contents */}
          <div className="space-y-6">
            {activeTab === 'academic' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
                {ACADEMIC_INFO.map((item, i) => (
                  <a key={i} href={item.url} target="_blank" rel="noopener" 
                     className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all border border-slate-200 group">
                    <h3 className="text-xl font-bold mb-3 xmu-text-blue group-hover:underline">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    <div className="mt-4 text-xs font-mono text-slate-400">点击访问官网 &rarr;</div>
                  </a>
                ))}
                <div className="col-span-full bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="text-xl font-bold mb-4">📢 硕博培养近期重点</h3>
                  <ul className="list-disc list-inside space-y-2 text-slate-700">
                    <li>博士生中期考核：通常在每年10月至11月进行。</li>
                    <li>学位论文开题：需经导师同意并在研究生系统提交申请。</li>
                    <li>WISE学术讲座：每周三下午海安楼，经院学子学术交流圣地。</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'dining' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DINING_HIGHLIGHTS.map((hall, i) => (
                  <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex border border-slate-100">
                    <div className="w-1/3 xmu-blue flex items-center justify-center text-4xl text-white">
                      🍽️
                    </div>
                    <div className="w-2/3 p-6">
                      <h3 className="text-xl font-bold mb-1">{hall.name}</h3>
                      <p className="text-orange-600 font-medium text-sm mb-3">推荐：{hall.dish}</p>
                      <div className="flex flex-wrap gap-2">
                        {hall.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] rounded-full">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'transport' && (
              <div className="space-y-4">
                {TRANSPORT_TIPS.map((tip, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border-l-4 border-[#004080] shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
                    <p className="text-slate-600">{tip.content}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'admin' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                <h3 className="text-2xl font-bold mb-6">办事快捷入口</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full xmu-blue text-white flex items-center justify-center mr-4">🖨️</div>
                    <div>
                      <h4 className="font-bold">自助打印终端</h4>
                      <p className="text-xs text-slate-500">位置：经济大楼一楼大厅、图书馆入口、行政楼</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full xmu-blue text-white flex items-center justify-center mr-4">🛡️</div>
                    <div>
                      <h4 className="font-bold">户籍证件办理</h4>
                      <p className="text-xs text-slate-500">需先在智慧厦大在线提交申请</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 rounded-full xmu-blue text-white flex items-center justify-center mr-4">💰</div>
                    <div>
                      <h4 className="font-bold">奖助学金咨询</h4>
                      <p className="text-xs text-slate-500">经院研究生部（N楼三楼）</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai-assistant' && (
              <div className="flex flex-col h-[600px] bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-4 xmu-blue text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-bold">经院研伴 (Gemini AI)</span>
                  </div>
                  <span className="text-[10px] opacity-60">实时解答你的校园疑惑</span>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2 rounded-2xl shadow-sm text-sm ${
                        m.role === 'user' 
                        ? 'bg-[#004080] text-white rounded-tr-none' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100'
                      }`}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white px-4 py-2 rounded-2xl border border-slate-100 flex gap-1">
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="问问我关于南光早餐、选课建议或奖学金..."
                      className="flex-grow px-4 py-3 rounded-xl bg-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-[#004080] transition-all"
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={isLoading}
                      className="xmu-blue text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                      发送
                    </button>
                  </div>
                  <div className="mt-2 text-[10px] text-slate-400 text-center italic">
                    AI 回复仅供参考，具体以学院官方通知为准
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
