import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User as UserIcon, Loader2, Sparkles } from 'lucide-react';
import { generateTutorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AiTutor: React.FC = () => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'أهلاً بك يا باحث العلم. أنا "أسبالتا"، مرشدك في هذه الرحلة. كيف يمكنني مساعدتك في صعود درجات المعرفة اليوم؟',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for context
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      
      const responseText = await generateTutorResponse(userMsg.text, history);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
        console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-stone-800 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl animate-fade-in">
      
      {/* Header */}
      <div className="bg-stone-900/50 p-4 border-b border-amber-900/30 flex items-center gap-3 backdrop-blur">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Bot className="text-stone-900 w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-amber-500 flex items-center gap-2">
            الحكيم أسبالتا
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
          </h3>
          <p className="text-xs text-stone-400">مدعوم بـ Gemini AI</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-stone-700' : 'bg-amber-900/40'}`}>
              {msg.role === 'user' ? <UserIcon size={16} className="text-stone-300" /> : <Bot size={16} className="text-amber-500" />}
            </div>
            
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-stone-700 text-stone-100 rounded-tr-none' 
                : 'bg-amber-900/10 border border-amber-900/20 text-stone-200 rounded-tl-none'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed text-sm">{msg.text}</p>
              <span className="text-[10px] opacity-50 block mt-2 text-left">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center">
                <Bot size={16} className="text-amber-500" />
             </div>
             <div className="bg-amber-900/10 border border-amber-900/20 rounded-2xl rounded-tl-none p-4 flex items-center gap-2 text-amber-500">
               <Loader2 size={16} className="animate-spin" />
               <span className="text-xs">يفكر الحكيم في إجابتك...</span>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-stone-900 border-t border-stone-700">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اسأل الحكيم عن درسك..."
            className="w-full bg-stone-800 text-stone-200 rounded-xl pl-12 pr-4 py-3 border border-stone-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none resize-none h-14"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute left-2 top-2 p-2 bg-amber-600 hover:bg-amber-500 text-stone-900 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-2">
            <p className="text-[10px] text-stone-500">
                قد يرتكب الذكاء الاصطناعي أخطاء. يرجى التحقق من المعلومات المهمة.
            </p>
        </div>
      </div>
    </div>
  );
};