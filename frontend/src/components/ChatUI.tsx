import { useState, useRef, useEffect } from 'react';
import { chatService } from '../api/api';
import { Send, Bot, Sparkles, Paperclip, Smile, MoreVertical } from 'lucide-react';

const ChatUI = ({ projectId }: { projectId?: string }) => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your PM-AI Assistant. I can help you analyze project risks, breakdown tasks, or give you a status update. What's on your mind?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await chatService.sendMessage(userMessage, projectId);
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again later.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-160px)] w-full max-w-4xl mx-auto bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                    <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-500/20">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900">AI Assistant</h2>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Decision Intelligence Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-primary-600">
                        <Sparkles size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-50 rounded-xl transition-all text-slate-400">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/30 custom-scrollbar">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-bold shadow-soft transition-transform hover:scale-110 ${msg.role === 'user' ? 'bg-primary-600 text-white' : 'bg-white text-primary-600 border border-slate-100'
                                }`}>
                                {msg.role === 'user' ? 'U' : <Bot size={14} />}
                            </div>
                            <div className="space-y-1">
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-soft ${msg.role === 'user'
                                    ? 'bg-primary-600 text-white rounded-tr-none'
                                    : 'bg-white border border-slate-100 text-slate-900 rounded-tl-none'
                                    }`}>
                                    {msg.content}
                                </div>
                                <div className={`text-[10px] text-slate-400 font-bold px-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex max-w-[85%] gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-white border border-slate-100 text-primary-600 flex items-center justify-center shadow-soft">
                                <Bot size={14} className="animate-bounce" />
                            </div>
                            <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none shadow-soft">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-primary-200 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-primary-200 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-primary-200 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t border-slate-50">
                <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-all hover:text-primary-600">
                            <Paperclip size={18} />
                        </button>
                    </div>
                    <input
                        type="text"
                        className="input-field pl-12 pr-24 h-12"
                        placeholder="Ask me anything about your project..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 transition-all hover:text-primary-600">
                            <Smile size={18} />
                        </button>
                        <button
                            disabled={!input.trim() || isLoading}
                            onClick={handleSend}
                            className="btn-primary py-1.5 px-4 text-xs h-9"
                        >
                            <span>Send</span>
                            <Send size={14} />
                        </button>
                    </div>
                </div>
                <p className="text-[10px] text-slate-400 text-center mt-3 font-bold uppercase tracking-[0.15em]">
                    PM-AI utilizes decision intelligence to assist in project analytics.
                </p>
            </div>
        </div>
    );
};

export default ChatUI;
