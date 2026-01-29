import { useState, useEffect } from 'react'
import { MOCK_POSTS, type Post } from './SocialFeedData'
import CreatePostWidget from './CreatePostWidget'
import PostCard from './PostCard'

// Data moved to SocialFeedData.ts


// Internal Toaster Component (Keep it local for now or move to utils)
function Toast({ message, type, onClose }: { message: string, type: 'success' | 'info' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed bottom-4 right-4 z-50 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2 transform transition-all animate-slide-up ${
      type === 'success' ? 'bg-green-600 text-white' : type === 'error' ? 'bg-red-600 text-white' : 'bg-gray-800 text-white border border-gray-700'
    }`}>
      <span>{type === 'success' ? '✅' : 'ℹ️'}</span>
      <span className="font-medium">{message}</span>
    </div>
  )
}

export default function SocialFeed() {
  const [feedPosts, setFeedPosts] = useState<Post[]>(MOCK_POSTS)
  const [activeToast, setActiveToast] = useState<{msg: string, type: 'success' | 'info' | 'error'} | null>(null)
  const [openComments, setOpenComments] = useState<string | null>(null) // Post ID

  const showToast = (msg: string, type: 'success' | 'info' | 'error' = 'success') => {
    setActiveToast({ msg, type })
  }

  const handleLike = (id: string, current: boolean) => {
    setFeedPosts(prev => prev.map(p => 
      p.id === id ? { ...p, isLiked: !current, likes: current ? p.likes - 1 : p.likes + 1 } : p
    ))
  }

  const handleSave = (id: string, current: boolean) => {
    setFeedPosts(prev => prev.map(p => 
      p.id === id ? { ...p, isSaved: !current } : p
    ))
    showToast(current ? 'Removido dos salvos' : 'Salvo com sucesso!', "info")
  }

  const handleSendComment = (id: string, text: string) => {
     if (!text.trim()) return
     showToast("Comentário enviado!", "success")
     setOpenComments(null)
     setFeedPosts(prev => prev.map(p => {
        if (p.id === id) return { ...p, comments: p.comments + 1 }
        return p
     }))
  }

  const handleShare = () => {
     showToast("Link copiado para a área de transferência!", "info")
  }

  const handleCreatePost = (newPost: Post) => {
    setFeedPosts([newPost, ...feedPosts])
    showToast('Post publicado com sucesso!', 'success')
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto h-full pb-safe">
      {activeToast && <Toast message={activeToast.msg} type={activeToast.type} onClose={() => setActiveToast(null)} />}

      <CreatePostWidget onPostCreated={handleCreatePost} />

      {feedPosts.map((post, index) => (
         <PostCard 
            key={post.id}
            post={post}
            onLike={handleLike}
            onSave={handleSave}
            onShare={handleShare}
            onComment={(id) => setOpenComments(openComments === id ? null : id)}
            isCommentOpen={openComments === post.id}
            onSendComment={handleSendComment}
         />
      ))}
      
      {/* Load More Skeleton */}
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
      </div>
    </div>
  )
}
