import { useState, useRef, type ChangeEvent } from 'react'
import type { Post } from './SocialFeedData'

interface CreatePostWidgetProps {
  onPostCreated: (post: Post) => void
}

export default function CreatePostWidget({ onPostCreated }: CreatePostWidgetProps) {
  const [postContent, setPostContent] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCreatePost = () => {
    if (!postContent.trim() && !selectedImage) return

    const newPost: Post = {
      id: Date.now().toString(),
      user: 'Eu',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop',
      role: 'Gestor Público',
      content: postContent,
      image: selectedImage || undefined,
      likes: 0,
      comments: 0,
      shares: 0,
      time: 'Agora',
      type: 'post',
      isLiked: false,
      isSaved: false,
      isVerified: false
    }

    onPostCreated(newPost)
    setPostContent('')
    setSelectedImage(null)
  }

  return (
    <div className="bg-[#13131f] border border-white/5 rounded-3xl p-4 shadow-xl relative overflow-hidden group snap-start shrink-0 mb-6 animate-fade-in">
       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="flex gap-4 relative z-10 w-full">
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500/30 ring-2 ring-purple-500/10 flex-shrink-0">
           <img 
             src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop" 
             alt="My Avatar" 
             className="w-full h-full object-cover" 
           />
        </div>
        <div className="flex-1">
           <input
             type="text"
             value={postContent}
             onChange={(e) => setPostContent(e.target.value)}
             placeholder="No que você está pensando, Gestor?"
             className="w-full bg-black/20 border border-white/5 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-500 backdrop-blur-sm"
           />
           
           {selectedImage && (
             <div className="mt-3 relative rounded-xl overflow-hidden group/preview border border-white/10 max-h-60">
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-red-500/80 text-white p-1.5 rounded-full backdrop-blur-md transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
             </div>
           )}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5 relative z-10">
        <div className="flex gap-2">
          <input 
             type="file" 
             ref={fileInputRef} 
             onChange={handleFileChange} 
             className="hidden" 
             accept="image/*"
          />
          <button 
             onClick={handleImageClick}
             className="flex items-center gap-2 px-3 py-2 rounded-xl text-purple-400 hover:bg-purple-500/10 transition-colors text-xs sm:text-sm font-medium"
          >
             <span>📷</span> <span className="hidden sm:inline">Foto</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-pink-400 hover:bg-pink-500/10 transition-colors text-xs sm:text-sm font-medium">
             <span>🎥</span> <span className="hidden sm:inline">Vídeo</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-orange-400 hover:bg-orange-500/10 transition-colors text-xs sm:text-sm font-medium">
             <span>📅</span> <span className="hidden sm:inline">Evento</span>
          </button>
        </div>
        <button 
           onClick={handleCreatePost}
           disabled={!postContent.trim() && !selectedImage}
           className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-purple-500/30 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
           Publicar
        </button>
      </div>
    </div>
  )
}
