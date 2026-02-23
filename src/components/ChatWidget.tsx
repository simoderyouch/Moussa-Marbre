import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Loader2 } from 'lucide-react';

type Language = 'fr' | 'ar' | 'en' | null;

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [language, setLanguage] = useState<Language>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleLanguageSelect = (lang: Language) => {
        setLanguage(lang);
        let greeting = "";
        if (lang === 'fr') greeting = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
        else if (lang === 'ar') greeting = "مرحباً! كيف يمكنني مساعدتك اليوم؟";
        else greeting = "Hello! How can I help you today?";

        // Add initial greeting from assistant
        setMessages([
            { id: Date.now().toString(), role: 'assistant', content: greeting }
        ]);
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !language) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue.trim(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    language,
                    messages: [...messages, userMessage].map(m => ({
                        role: m.role,
                        content: m.content
                    }))
                })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.reply
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Failed to send message:', error);

            let errorText = "Sorry, an error occurred. Please try again later.";
            if (language === 'fr') errorText = "Désolé, une erreur s'est produite. Veuillez réessayer plus tard.";
            else if (language === 'ar') errorText = "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً.";

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: errorText
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChat = () => setIsOpen(!isOpen);

    const getPlaceholderText = () => {
        if (language === 'fr') return 'Écrivez votre message...';
        if (language === 'ar') return 'اكتب رسالتك...';
        return 'Type your message...';
    };

    const getTypingText = () => {
        if (language === 'fr') return 'Rédaction...';
        if (language === 'ar') return 'يكتب...';
        return 'Typing...';
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] bg-background  shadow-2xl rounded-2xl flex flex-col z-50 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-foreground text-background p-5 flex justify-between items-center shrink-0 shadow-md z-10">
                            <div>
                                <h3 className="font-sans font-semibold text-lg tracking-tight">Moussa Marbre</h3>
                                <p className="text-[10px] text-background/80 uppercase tracking-widest mt-1">Expert Conseil</p>
                            </div>
                            <button
                                onClick={toggleChat}
                                className="p-2 hover:bg-background/20 rounded-full transition-colors"
                                aria-label="Fermer le chat"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Language Selection / Chat Area */}
                        <div className="flex-1 overflow-hidden relative bg-secondary/10">
                            {!language ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-background to-secondary/20">
                                    <h4 className="font-serif text-3xl text-foreground mb-3 leading-tight">Bienvenue<br />مرحباً<br />Welcome</h4>
                                    <p className="text-muted-foreground text-sm mb-10 uppercase tracking-widest font-medium">Choisissez votre langue<br />اختر لغتك<br />Choose language</p>

                                    <div className="flex flex-col gap-4 w-full max-w-[280px]">
                                        <button
                                            onClick={() => handleLanguageSelect('fr')}
                                            className="w-full py-4 px-6 bg-background border border-border/60 rounded-xl text-foreground font-medium hover:bg-muted hover:border-foreground/30 transition-all shadow-sm flex items-center gap-4 group"
                                        >
                                            <span className="text-2xl group-hover:scale-110 transition-transform">🇫🇷</span>
                                            Français
                                        </button>
                                        <button
                                            onClick={() => handleLanguageSelect('ar')}
                                            className="w-full py-4 px-6 bg-background border border-border/60 rounded-xl text-foreground font-medium hover:bg-muted hover:border-foreground/30 transition-all shadow-sm flex items-center gap-4 group"
                                        >
                                            <span className="text-2xl group-hover:scale-110 transition-transform">🇲🇦</span>
                                            العربية
                                        </button>
                                        <button
                                            onClick={() => handleLanguageSelect('en')}
                                            className="w-full py-4 px-6 bg-background border border-border/60 rounded-xl text-foreground font-medium hover:bg-muted hover:border-foreground/30 transition-all shadow-sm flex items-center gap-4 group"
                                        >
                                            <span className="text-2xl group-hover:scale-110 transition-transform">🇬🇧</span>
                                            English
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col">
                                    {/* Messages Area */}
                                    <div className="flex-1 overflow-y-auto p-5 space-y-5">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
                                            >
                                                {msg.role === 'assistant' && (
                                                    <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                                        <Bot className="w-5 h-5 text-background" />
                                                    </div>
                                                )}
                                                <div
                                                    className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-[15px] leading-relaxed break-words shadow-sm ${msg.role === 'user'
                                                        ? 'bg-foreground text-background rounded-tr-sm'
                                                        : 'bg-background border border-border/40 text-foreground rounded-tl-sm [&_a]:text-[#25D366] [&_a]:underline font-medium'
                                                        } ${language === 'ar' ? 'text-right' : 'text-left'}`}
                                                    dir={msg.role === 'assistant' && language === 'ar' ? 'rtl' : (language === 'ar' && msg.role === 'user' ? 'rtl' : 'ltr')}
                                                    dangerouslySetInnerHTML={{ __html: msg.content }}
                                                />
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div className="flex justify-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0 mt-1 shadow-sm">
                                                    <Bot className="w-5 h-5 text-background" />
                                                </div>
                                                <div className="max-w-[80%] bg-background border border-border/40 text-foreground rounded-2xl px-5 py-3.5 rounded-tl-sm shadow-sm flex items-center gap-3">
                                                    <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
                                                    <span className="text-sm text-muted-foreground font-medium">
                                                        {getTypingText()}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 bg-background border-t border-border/50 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
                                        <form
                                            onSubmit={handleSendMessage}
                                            className="flex gap-3 relative"
                                            dir={language === 'ar' ? 'rtl' : 'ltr'}
                                        >
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder={getPlaceholderText()}
                                                className="flex-1 bg-muted/50 rounded-full px-5 py-3 text-[15px] focus:outline-none focus:ring-1 focus:ring-foreground/20 border border-border/50 transition-all focus:bg-background shadow-inner"
                                                disabled={isLoading}
                                            />
                                            <button
                                                type="submit"
                                                disabled={!inputValue.trim() || isLoading}
                                                className="w-12 h-12 shrink-0 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-md"
                                                aria-label="Envoyer"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleChat}
                className="fixed bottom-24 right-6 z-40 flex items-center justify-center w-[60px] h-[60px] bg-foreground text-background rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 group hover:shadow-xl"
                aria-label="Ouvrir le chat avec Moussa Marbre"
            >
                <MessageCircle className="w-7 h-7 group-hover:-rotate-12 transition-transform duration-300" />
            </button>
        </>
    );
};

export default ChatWidget;
