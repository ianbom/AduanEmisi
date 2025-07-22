// @ts-nocheck

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { MessageCircle, Send, X, Bot, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Definisikan tipe untuk pesan
interface Message {
  id: string
  content: string
  role: "user" | "assistant" | "error"
  timestamp: Date
}

// Kunci untuk menyimpan data di localStorage
const CHAT_STORAGE_KEY = "sobatbumi-chat-history";
const FAB_POSITION_KEY = "sobatbumi-fab-position";

// Konstanta untuk pesan awal agar bisa digunakan kembali
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Halo! Saya Asisten SobatBumi. Ada yang bisa saya bantu terkait isu lingkungan?",
    role: "assistant",
    timestamp: new Date(),
  },
];

// Helper function untuk mendapatkan CSRF token dari meta tag
const getCsrfToken = (): string => {
  const tokenMeta = document.querySelector('meta[name="csrf-token"]')
  return tokenMeta ? tokenMeta.getAttribute('content') || '' : ''
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // State & Ref untuk Drag Jendela Chat
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const chatDragStartRef = useRef<{ x: number, y: number } | null>(null);
  const chatInitialPositionRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });

  // State & Ref untuk Drag Tombol (FAB)
  const [isFabDragging, setIsFabDragging] = useState(false);
  const fabDragStartRef = useRef<{ x: number, y: number } | null>(null);
  const fabInitialPositionRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const fabWasDragged = useRef(false);

  // Inisialisasi posisi FAB dari localStorage
  const [fabPosition, setFabPosition] = useState(() => {
    try {
      const storedPosition = localStorage.getItem(FAB_POSITION_KEY);
      return storedPosition ? JSON.parse(storedPosition) : { x: 0, y: 0 };
    } catch (error) {
      return { x: 0, y: 0 };
    }
  });

  // Inisialisasi riwayat pesan dari localStorage
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const storedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages) as Omit<Message, 'timestamp'> & { timestamp: string }[];
        return parsedMessages.map(msg => ({ ...msg, timestamp: new Date(msg.timestamp) }));
      }
    } catch (error) {
      console.error("Gagal memuat pesan dari localStorage:", error);
      localStorage.removeItem(CHAT_STORAGE_KEY);
    }
    return initialMessages;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }

  // Simpan riwayat chat ke localStorage
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
      } else {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Gagal menyimpan pesan ke localStorage:", error);
    }
    scrollToBottom()
  }, [messages])

  // Simpan posisi FAB ke localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAB_POSITION_KEY, JSON.stringify(fabPosition));
    } catch (error) {
      console.error("Gagal menyimpan posisi FAB:", error);
    }
  }, [fabPosition]);

  const toggleChat = () => {
    if (fabWasDragged.current) {
      fabWasDragged.current = false;
      return;
    }
    const newIsOpenState = !isOpen;
    setIsOpen(newIsOpenState);
    if (newIsOpenState) {
      setPosition(fabPosition);
    } else {
      setPosition({ x: 0, y: 0 });
    }
  }

  const handleClearHistory = () => {
    if (window.confirm("Apakah Anda yakin ingin menghapus semua riwayat percakapan?")) {
      localStorage.removeItem(CHAT_STORAGE_KEY);
      setMessages(initialMessages);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return
    const userMessage: Message = { id: Date.now().toString(), content: input, role: "user", timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    try {
      const response = await fetch("/api/chatbot/send", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-CSRF-TOKEN': getCsrfToken() },
        body: JSON.stringify({ prompt: userMessage.content }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) { throw new Error(data.error || "Gagal mendapatkan respons dari server."); }
      const aiResponse: Message = { id: (Date.now() + 1).toString(), content: data.response, role: "assistant", timestamp: new Date() }
      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Chatbot API Error:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), content: "Oops! Sepertinya terjadi gangguan. Mohon coba lagi beberapa saat.", role: "error", timestamp: new Date() }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === "Enter") { handleSendMessage() } }

  // Handlers untuk Drag Jendela Chat
  const handleChatDragStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault(); setIsDragging(true);
    chatInitialPositionRef.current = position;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    chatDragStartRef.current = { x: clientX, y: clientY };
  }, [position]);

  const handleChatDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !chatDragStartRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const dx = clientX - chatDragStartRef.current.x;
    const dy = clientY - chatDragStartRef.current.y;
    setPosition({ x: chatInitialPositionRef.current.x + dx, y: chatInitialPositionRef.current.y + dy });
  }, [isDragging]);

  const handleChatDragEnd = useCallback(() => { setIsDragging(false); chatDragStartRef.current = null; }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleChatDragMove);
      window.addEventListener('mouseup', handleChatDragEnd);
      window.addEventListener('touchmove', handleChatDragMove);
      window.addEventListener('touchend', handleChatDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleChatDragMove);
      window.removeEventListener('mouseup', handleChatDragEnd);
      window.removeEventListener('touchmove', handleChatDragMove);
      window.removeEventListener('touchend', handleChatDragEnd);
    };
  }, [isDragging, handleChatDragMove, handleChatDragEnd]);

  // Handlers untuk Drag Tombol (FAB)
  const handleFabDragStart = useCallback((e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    if (isOpen) return;
    e.preventDefault(); setIsFabDragging(true); fabWasDragged.current = false;
    fabInitialPositionRef.current = fabPosition;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    fabDragStartRef.current = { x: clientX, y: clientY };
  }, [isOpen, fabPosition]);

  const handleFabDragMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isFabDragging || !fabDragStartRef.current) return;
    fabWasDragged.current = true;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const dx = clientX - fabDragStartRef.current.x;
    const dy = clientY - fabDragStartRef.current.y;
    setFabPosition({ x: fabInitialPositionRef.current.x + dx, y: fabInitialPositionRef.current.y + dy });
  }, [isFabDragging]);

  const handleFabDragEnd = useCallback(() => { setIsFabDragging(false); fabDragStartRef.current = null; }, []);

  useEffect(() => {
    if (isFabDragging) {
      window.addEventListener('mousemove', handleFabDragMove);
      window.addEventListener('mouseup', handleFabDragEnd);
      window.addEventListener('touchmove', handleFabDragMove);
      window.addEventListener('touchend', handleFabDragEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleFabDragMove);
      window.removeEventListener('mouseup', handleFabDragEnd);
      window.removeEventListener('touchmove', handleFabDragMove);
      window.removeEventListener('touchend', handleFabDragEnd);
    };
  }, [isFabDragging, handleFabDragMove, handleFabDragEnd]);


  return (
    <>
      {/* Jendela Chat */}
      <div
        className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col z-40 ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        } ${isDragging ? "transition-none" : "transition-all duration-300 ease-in-out"}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <div
          onMouseDown={handleChatDragStart}
          onTouchStart={handleChatDragStart}
          className={`bg-emerald-600 text-white p-4 rounded-t-xl flex items-center justify-between ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          <h3 className="font-semibold text-lg select-none">SobatBumi Assistant</h3>
          <div className="flex items-center">
            <Button
              variant="ghost" size="sm" onClick={handleClearHistory}
              onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}
              className="text-white hover:bg-emerald-700 p-1 h-auto mr-1" title="Hapus riwayat"
            >
              <Trash2 size={18} />
            </Button>
            <Button
              variant="ghost" size="sm" onClick={toggleChat}
              onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}
              className="text-white hover:bg-emerald-700 p-1 h-auto" title="Tutup chat"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
        <div className="flex-1 p-4 h-full overflow-y-auto space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start gap-2.5 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              {message.role !== 'user' && <Bot className="w-6 h-6 text-emerald-600 flex-shrink-0" />}
              <div
                className={`max-w-[85%] p-3 rounded-lg text-sm ${
                  message.role === "user" ? "bg-emerald-600 text-white rounded-br-none"
                  : message.role === "assistant" ? "bg-gray-100 text-gray-800 rounded-bl-none"
                  : "bg-red-100 text-red-800 rounded-bl-none"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-2.5 justify-start">
               <Bot className="w-6 h-6 text-emerald-600 flex-shrink-0" />
               <div className="bg-gray-100 p-3 rounded-lg flex items-center space-x-1.5">
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-gray-200 rounded-b-xl">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tanyakan sesuatu..."
              className="flex-1 border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 h-9 w-9"
              disabled={!input.trim() || isLoading}
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Tombol Aksi Floating */}
      <Button
        onClick={toggleChat}
        onMouseDown={handleFabDragStart}
        onTouchStart={handleFabDragStart}
        style={{ transform: `translate(${fabPosition.x}px, ${fabPosition.y}px)` }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg flex items-center justify-center z-50 transform ${
          isOpen ? "rotate-[360deg] scale-90" : "rotate-0"
        } ${isFabDragging ? "transition-none cursor-grabbing" : "transition-all duration-300 ease-in-out cursor-grab"}`}
        size="icon"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>
    </>
  )
}
