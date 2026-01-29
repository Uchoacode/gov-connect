import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

interface Post {
  id: string
  content: string
  image?: string
  isInstitutional: boolean
  createdAt: string
  user: {
    name: string
    avatar?: string
    organization?: string
  }
}

interface PostCardProps {
  post: Post
  isReelMode?: boolean
}

export default function PostCard({ post, isReelMode = false }: PostCardProps) {
  if (isReelMode) {
    return (
      <div className="w-full max-w-4xl h-full max-h-[85dvh] sm:max-h-[85vh] bg-dark-bgSecondary border border-dark-border rounded-2xl sm:rounded-3xl overflow-hidden backdrop-blur-sm flex flex-col shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 animate-border-glow">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-dark-border/50 flex-shrink-0">
          <div className="flex items-center space-x-3 sm:space-x-4">
            {post.user.avatar ? (
              <img
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-purple-500 object-cover"
              />
            ) : (
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-base sm:text-xl">
                {post.user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-base sm:text-lg truncate">{post.user.name}</p>
              {post.user.organization && (
                <p className="text-xs sm:text-sm text-gray-400 truncate">{post.user.organization}</p>
              )}
              <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">
                {format(new Date(post.createdAt), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
            {post.isInstitutional && (
              <span className="hidden sm:inline-block bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-sm font-bold px-4 py-2 rounded-full border border-purple-400/40 backdrop-blur-sm">
                Institucional
              </span>
            )}
            {post.isInstitutional && (
              <span className="sm:hidden text-purple-300 text-lg">
                 🏛️
              </span>
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          <p className="text-gray-200 text-base sm:text-lg md:text-xl whitespace-pre-line leading-relaxed mb-4 sm:mb-6">{post.content}</p>
          
          {post.image && (
            <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-lg">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-auto object-contain max-h-[40vh] bg-black/20"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="card-hover bg-dark-bgSecondary border border-dark-border rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Header */}
      <div className="p-6 border-b border-dark-border/50">
        <div className="flex items-center space-x-3">
          {post.user.avatar ? (
            <img
              src={post.user.avatar}
              alt={post.user.name}
              className="w-10 h-10 rounded-full border-2 border-purple-500"
            />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                {post.user.name.charAt(0).toUpperCase()}
              </div>
            )}
          <div>
            <p className="font-semibold text-white">{post.user.name}</p>
            {post.user.organization && (
              <p className="text-xs text-gray-400">{post.user.organization}</p>
            )}
            <p className="text-xs text-gray-500">
              {format(new Date(post.createdAt), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
            </p>
          </div>
          {post.isInstitutional && (
            <span className="ml-auto bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200 text-xs font-bold px-3 py-1.5 rounded-full border border-purple-400/40 backdrop-blur-sm">
              Institucional
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <p className="text-gray-300 whitespace-pre-line mb-4">{post.content}</p>
        
        {post.image && (
          <div className="rounded-lg overflow-hidden mb-4">
            <img
              src={post.image}
              alt="Post"
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  )
}
