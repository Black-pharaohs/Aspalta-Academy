import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';

const mockChats = [
  { id: 1, name: 'د. سمير النوبي', lastMsg: 'طابت أوقاتك، هل راجعت الفصل الثالث؟', time: '10:30 ص', unread: 2, avatar: 'https://picsum.photos/200?random=20' },
  { id: 2, name: 'أ. مروة كوش', lastMsg: 'الملف المرفق يحتوي على المصادر.', time: 'أمس', unread: 0, avatar: 'https://picsum.photos/200?random=21' },
  { id: 3, name: 'الدعم الفني', lastMsg: 'تم حل مشكلة الدخول.', time: 'أمس', unread: 0, avatar: 'https://ui-avatars.com/api/?name=Support&background=333&color=fff' },
];

export const Messages: React.FC = () => {
  const [activeChat, setActiveChat] = useState(mockChats[0]);
  const [msgInput, setMsgInput] = useState('');

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-stone-800 rounded-2xl overflow-hidden border border-stone-700 animate-fade-in">
      {/* Sidebar List */}
      <div className="w-1/3 border-l border-stone-700 flex flex-col">
        <div className="p-4 border-b border-stone-700">
           <h2 className="text-xl font-bold text-white mb-4">البرديات</h2>
           <div className="relative">
             <Search className="absolute right-3 top-2.5 text-stone-500 w-4 h-4" />
             <input type="text" placeholder="بحث..." className="w-full bg-stone-900 text-stone-200 pl-4 pr-10 py-2 rounded-lg border border-stone-700 focus:border-amber-500 outline-none text-sm" />
           </div>
        </div>
        <div className="flex-1 overflow-y-auto">
           {mockChats.map(chat => (
             <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-stone-700 transition-colors ${activeChat.id === chat.id ? 'bg-stone-700/50 border-r-2 border-amber-500' : ''}`}
             >
               <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
               <div className="flex-1 min-w-0">
                 <div className="flex justify-between items-start mb-1">
                   <h4 className="font-semibold text-stone-200 truncate">{chat.name}</h4>
                   <span className="text-xs text-stone-500 whitespace-nowrap">{chat.time}</span>
                 </div>
                 <p className="text-xs text-stone-400 truncate">{chat.lastMsg}</p>
               </div>
               {chat.unread > 0 && (
                 <div className="w-5 h-5 bg-amber-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                   {chat.unread}
                 </div>
               )}
             </div>
           ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-stone-900/50">
        {/* Chat Header */}
        <div className="p-4 border-b border-stone-700 flex justify-between items-center bg-stone-800">
           <div className="flex items-center gap-3">
             <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full" />
             <div>
               <h3 className="font-bold text-white">{activeChat.name}</h3>
               <span className="flex items-center gap-1 text-xs text-green-500">
                 <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                 متصل الآن
               </span>
             </div>
           </div>
           <div className="flex items-center gap-2 text-stone-400">
             <button className="p-2 hover:bg-stone-700 rounded-full"><Phone size={20} /></button>
             <button className="p-2 hover:bg-stone-700 rounded-full"><Video size={20} /></button>
             <button className="p-2 hover:bg-stone-700 rounded-full"><MoreVertical size={20} /></button>
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
           <div className="flex justify-center my-4">
              <span className="bg-stone-800 text-stone-500 text-xs px-3 py-1 rounded-full">اليوم</span>
           </div>
           <div className="flex justify-end">
             <div className="bg-amber-700/80 text-white p-3 rounded-2xl rounded-tr-none max-w-xs">
               <p className="text-sm">مرحباً دكتور، لدي سؤال بخصوص الواجب الأخير.</p>
               <span className="text-[10px] opacity-70 block text-left mt-1">10:28 ص</span>
             </div>
           </div>
           <div className="flex justify-start">
             <div className="bg-stone-800 text-stone-200 p-3 rounded-2xl rounded-tl-none max-w-xs border border-stone-700">
               <p className="text-sm">{activeChat.lastMsg}</p>
               <span className="text-[10px] opacity-50 block text-right mt-1">{activeChat.time}</span>
             </div>
           </div>
        </div>

        {/* Input */}
        <div className="p-4 bg-stone-800 border-t border-stone-700">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              placeholder="اكتب رسالتك..."
              className="flex-1 bg-stone-900 border border-stone-700 rounded-full px-6 py-3 text-stone-200 focus:border-amber-500 outline-none"
            />
            <button className="bg-amber-600 hover:bg-amber-500 text-stone-900 p-3 rounded-full transition-colors">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};