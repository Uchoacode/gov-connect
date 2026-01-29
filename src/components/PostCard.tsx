import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Post } from './SocialFeedData'

interface PostCardProps {
  post: Post
  onLike: (id: string, current: boolean) => void
  onSave: (id: string, current: boolean) => void
  onShare: () => void
  onComment: (id: string) => void // Just toggles comment section for now or opens detail
  isCommentOpen: boolean
  onSendComment: (id: string, text: string) => void
}

export default function PostCard({ post, onLike, onSave, onShare, onComment, isCommentOpen, onSendComment }: PostCardProps) {
  const [commentText, setCommentText] = useState('')
  const [reportMenu, setReportMenu] = useState(false)

  const handleSend = () => {
    onSendComment(post.id, commentText)
    setCommentText('')
  }

  return (
    <div className="bg-[#13131f] border border-white/5 rounded-3xl p-5 sm:p-6 shadow-lg transition-all relative animate-slide-up group w-full">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <Link to={`/perfil/${post.id}`} className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center p-[2px]">
              <img src={post.userAvatar} alt="User Avatar" className="w-full h-full rounded-full object-cover border-2 border-[#13131f]" />
            </div>
          </Link>
          <div>
              <Link to={`/perfil/${post.id}`} className="font-bold text-white hover:text-purple-400 transition-colors text-base">
                {post.user}
              </Link>
              {post.isVerified && (
                <span className="text-blue-400 ml-1 inline-flex align-middle" title="Verificado">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                  </svg>
                </span>
              )}
              <p className="text-xs text-gray-400 mt-0.5">{post.role} • {post.time} atrás</p>
          </div>
        </div>
        
        <div className="relative">
           <button 
              onClick={() => setReportMenu(!reportMenu)} 
              className={`text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 ${reportMenu ? 'bg-white/10 text-white' : ''}`}
           >
             <span className="text-xl">⋮</span>
           </button>
           {reportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1b23] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden ring-1 ring-black/50 backdrop-blur-xl">
                 <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <span>⚠️</span> Denunciar
                 </button>
                 <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 flex items-center gap-3 transition-colors">
                    <span>🔇</span> Silenciar
                 </button>
              </div>
           )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-200 text-sm sm:text-base whitespace-pre-line leading-relaxed mb-4">
          {post.content}
        </p>
        {post.image && (
          <div className="rounded-2xl overflow-hidden shadow-lg border border-white/5 relative group/img">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
            <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between text-gray-400 border-t border-white/5 pt-4">
        <div className="flex gap-4 sm:gap-6">
          <button 
            onClick={() => onLike(post.id, post.isLiked || false)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all group ${post.isLiked ? 'text-pink-500 bg-pink-500/10' : 'hover:bg-white/5 hover:text-pink-400'}`}
          >
            <span className={`text-lg transition-transform group-active:scale-75 ${post.isLiked ? '' : 'grayscale group-hover:grayscale-0'}`}>
                {post.isLiked ? '❤️' : '🤍'}
            </span>
            <span className="font-medium">{post.likes}</span>
          </button>
          
          <button 
            onClick={() => onComment(post.id)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all group ${isCommentOpen ? 'text-blue-400 bg-blue-500/10' : 'hover:bg-white/5 hover:text-blue-400'}`}
          >
            <span className="text-lg">💬</span>
            <span className="font-medium">{post.comments}</span>
          </button>

          <button 
              onClick={onShare}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm hover:bg-white/5 hover:text-green-400 transition-all group"
           >
            <span className="text-lg group-hover:-rotate-12 transition-transform">🚀</span>
            <span className="font-medium">{post.shares}</span>
          </button>
        </div>

        <button 
          onClick={() => onSave(post.id, post.isSaved || false)}
          className={`p-2 rounded-full transition-all hover:bg-white/5 ${post.isSaved ? 'text-orange-400' : 'hover:text-orange-400'}`}
        >
          <svg className={`w-5 h-5 ${post.isSaved ? 'fill-current' : 'fill-none stroke-current'}`} viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>

     {/* Comment Section */}
     {isCommentOpen && (
        <div className="mt-4 pt-4 border-t border-white/5 animate-fade-in pl-2">
           <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hidden sm:block"></div>
              <div className="flex-1 relative">
                 <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Escreva um comentário..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500 focus:bg-black/50 transition-colors pr-20"
                 />
                 <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                 >
                    Enviar
                 </button>
              </div>
           </div>
        </div>
     )}
    </div>
  )
}
