/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Languages, 
  ChevronLeft, 
  MoreHorizontal, 
  Mic, 
  Smile,
  Globe,
  ThumbsUp,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
    isVip?: boolean;
    isVipPlus?: boolean;
    flag?: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  authorLiked?: boolean;
  isGiftGiver?: boolean;
  languages?: { code: string; color: string; dots: number; active?: boolean }[];
  giftInfo?: { icon: string; count: number };
}

// --- Mock Data ---

const COMMENTS: Comment[] = [
  {
    id: 'gift-giver',
    user: {
      name: '提拉米苏',
      avatar: 'https://picsum.photos/seed/tiramisu/100/100',
      isVipPlus: true,
      flag: '🇬🇧',
    },
    content: '提拉米苏送给beng一个四叶草',
    timestamp: '刚刚',
    likes: 0,
    isGiftGiver: true,
    giftInfo: { icon: '🍀', count: 1 }
  },
  {
    id: '1',
    user: {
      name: 'MeMeMe',
      avatar: 'https://picsum.photos/seed/meme/100/100',
      isVip: true,
    },
    content: 'Yayyyyyyyyy~~ 🥷 🦧 🦍 💟 💗 🩶 🤍 🤎 ❤️ 🧡 💛 💚 💙 🩵 💜 🤎 🧡 💛',
    timestamp: '1个月前',
    likes: 0,
  },
  {
    id: '2',
    user: {
      name: 'xeco',
      avatar: 'https://picsum.photos/seed/xeco/100/100',
      flag: '🇮🇩',
    },
    content: '.',
    timestamp: '2个月前',
    likes: 1,
    authorLiked: true,
  },
  {
    id: '3',
    user: {
      name: 'Matthew',
      avatar: 'https://picsum.photos/seed/matthew/100/100',
      isVip: true,
      flag: '🇺🇸',
    },
    content: '🫶',
    timestamp: '2个月前',
    likes: 1,
    authorLiked: true,
  },
  {
    id: '4',
    user: {
      name: 'Deo',
      avatar: 'https://picsum.photos/seed/deo/100/100',
      flag: '🇮🇩',
    },
    content: 'HNY',
    timestamp: '2个月前',
    likes: 1,
    authorLiked: true,
  },
  {
    id: '5',
    user: {
      name: 'Ramesh',
      avatar: 'https://picsum.photos/seed/ramesh/100/100',
      flag: '🇳🇵',
    },
    content: 'Happy new year',
    timestamp: '2个月前',
    likes: 0,
  }
];

// --- Components ---

const VipBadge = ({ plus }: { plus?: boolean }) => (
  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white italic ${plus ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' : 'bg-blue-500'}`}>
    VIP{plus ? '+' : ''}
  </span>
);

const GiftAnimationOverlay = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-6 text-center"
    >
      <button 
        onClick={onClose}
        className="absolute top-10 right-6 p-2 bg-white/10 rounded-full text-white backdrop-blur-md"
      >
        <X size={24} />
      </button>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <h3 className="text-white text-xl font-medium mb-2">赠送礼物给</h3>
        <p className="text-white text-2xl font-bold mb-12 truncate max-w-[300px]">
          Beng
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        animate={{ scale: 1.2, opacity: 1, rotate: 0 }}
        transition={{ 
          delay: 0.4, 
          type: "spring", 
          stiffness: 100,
          duration: 0.8
        }}
        className="relative"
      >
        <div className="relative flex items-center justify-center">
          <span className="text-[120px]">✋</span>
          <span className="absolute -top-4 -right-4 text-4xl">💖</span>
          <span className="text-[100px] ml-[-40px] mt-10">🐾</span>
        </div>
        
        {/* Particle Effects */}
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              scale: [0, 1.5, 0],
              x: Math.cos(i * 45 * (Math.PI / 180)) * 150,
              y: Math.sin(i * 45 * (Math.PI / 180)) * 150
            }}
            transition={{ delay: 0.8, duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
            className="absolute top-1/2 left-1/2 text-2xl"
          >
            {i % 2 === 0 ? '✨' : '💖'}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-16"
      >
        <p className="text-white/60 text-sm">送出礼物！</p>
      </motion.div>
    </motion.div>
  );
};

const CommentItem = ({ comment, onGiftClick }: { comment: Comment, onGiftClick?: () => void }) => {
  if (comment.isGiftGiver) {
    return (
      <div className="flex items-start gap-3 py-4 border-b border-gray-50">
        <div className="relative">
          <img 
            src={comment.user.avatar} 
            alt={comment.user.name} 
            className="w-14 h-14 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
          {comment.user.flag && (
            <span className="absolute -bottom-1 -left-1 text-lg">{comment.user.flag}</span>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium text-gray-900">{comment.user.name}</span>
            <VipBadge plus />
          </div>
          
          <p className="text-[15px] text-gray-900 mt-1">
            {comment.content}
          </p>
          
          <div className="mt-1 text-xs text-gray-400 font-mono">
            {comment.timestamp}
          </div>
        </div>

        <button 
          onClick={onGiftClick}
          className="flex flex-col items-end gap-1 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-1 mb-1">
            <div className="relative flex items-center">
              <span className="text-3xl">🍀</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[9px] font-bold text-orange-400 px-1 border border-orange-400 rounded leading-none py-0.5">HT</span>
            <span className="text-sm font-medium text-gray-400">{comment.giftInfo?.count}</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 py-4">
      <div className="relative flex-shrink-0">
        <img 
          src={comment.user.avatar} 
          alt={comment.user.name} 
          className="w-10 h-10 rounded-full object-cover"
          referrerPolicy="no-referrer"
        />
        {comment.user.flag && (
          <span className="absolute -bottom-1 -left-1 text-xs">{comment.user.flag}</span>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium text-gray-500">{comment.user.name}</span>
          {comment.user.isVip && <VipBadge />}
        </div>
        
        <p className="text-[15px] text-gray-900 mt-0.5 break-words leading-relaxed">
          {comment.content}
        </p>
        
        <div className="flex items-center gap-3 mt-2">
          <span className="text-xs text-gray-400">{comment.timestamp}</span>
          {comment.authorLiked && (
            <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">作者赞过</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 pt-1">
        <div className="flex flex-col items-center gap-4">
           <button className="text-indigo-500">
             <div className="relative">
               <Languages size={18} />
               <span className="absolute -top-1 -right-1 text-[8px] bg-indigo-500 text-white rounded-full w-2.5 h-2.5 flex items-center justify-center">+</span>
             </div>
           </button>
           <button className="flex flex-col items-center gap-0.5 text-gray-300">
             <ThumbsUp size={18} className={comment.likes > 0 ? 'text-indigo-500 fill-indigo-500' : ''} />
             {comment.likes > 0 && <span className="text-[10px] text-indigo-500 font-medium">{comment.likes}</span>}
           </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [showGiftAnimation, setShowGiftAnimation] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 max-w-md mx-auto shadow-xl flex flex-col relative">
      <AnimatePresence>
        {showGiftAnimation && (
          <GiftAnimationOverlay onClose={() => setShowGiftAnimation(false)} />
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <button className="p-1 -ml-1">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <img 
            src="https://picsum.photos/seed/beng/100/100" 
            alt="Beng" 
            className="w-8 h-8 rounded-full border border-gray-100"
            referrerPolicy="no-referrer"
          />
          <span className="font-bold text-lg">Beng</span>
        </div>
        <button className="p-1 -mr-1">
          <MoreHorizontal size={24} />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Post Content Area (Simplified) */}
        <div className="px-4 py-2">
          <div className="flex items-center gap-1 text-gray-400 text-sm mb-4">
            <Globe size={14} />
            <span>所有人可见</span>
          </div>
          
          <div className="flex gap-2 mb-6">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-500 rounded-full text-xs font-medium">新年祝福</span>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-1.5 text-gray-400">
                <ThumbsUp size={22} />
                <span className="text-sm font-medium">915</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-400">
                <MessageCircle size={22} />
                <span className="text-sm font-medium">46</span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-gray-400">
                <Languages size={22} />
              </button>
              <button className="text-gray-400">
                <Share2 size={22} />
              </button>
            </div>
          </div>

          {/* Likers */}
          <div className="flex items-center justify-between py-3 border-t border-gray-50">
            <div className="flex -space-x-2 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <img
                  key={i}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src={`https://picsum.photos/seed/liker${i}/100/100`}
                  alt=""
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <button className="text-sm text-gray-400 font-medium">
              916 Likes <span className="ml-1">›</span>
            </button>
          </div>
        </div>

        {/* Comment Section Header */}
        <div className="bg-gray-50/50 h-2 w-full" />
        <div className="px-4 py-4">
          <h2 className="text-xl font-bold mb-2">评论(46)</h2>
          
          {/* Comments List */}
          <div className="divide-y divide-gray-50">
            {COMMENTS.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CommentItem 
                  comment={comment} 
                  onGiftClick={comment.isGiftGiver ? () => setShowGiftAnimation(true) : undefined} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Input Bar */}
      <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 px-4 py-2 flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-gray-400 text-sm">@AI Handy试试呀~</span>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <button><Smile size={24} /></button>
          <button><Languages size={24} /></button>
          <button><Mic size={24} /></button>
        </div>
      </footer>
    </div>
  );
}
