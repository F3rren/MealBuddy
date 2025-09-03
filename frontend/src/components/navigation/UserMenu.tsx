import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Chiudi il menu quando si clicca fuori
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    addToast({
      type: 'success',
      title: 'Logout effettuato',
      message: 'Arrivederci! Torna presto su MealBuddy.'
    })
  }

  const getUserInitials = () => {
    if (!user?.name) return 'U'
    return user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-white cursor-pointer transition-all duration-200 text-sm font-semibold min-w-[120px] hover:bg-white/25 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-lg"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/20 border-2 border-white/30">
          {user?.avatar ? (
            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-xs font-semibold text-white">{getUserInitials()}</span>
          )}
        </div>
        <span className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">{user?.name || user?.username || 'Utente'}</span>
        
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 min-w-[280px] animate-in slide-in-from-top-2 duration-200">
          <div className="bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-5 bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white/20 border-2 border-white/30 flex-shrink-0">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-base font-bold text-white">{getUserInitials()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold mb-1 overflow-hidden text-ellipsis whitespace-nowrap">{user?.name || user?.username || 'Utente'}</div>
                <div className="text-sm opacity-90 overflow-hidden text-ellipsis whitespace-nowrap">{user?.email || 'user@mealbuddy.com'}</div>
              </div>
            </div>
            
            <div className="h-px bg-gray-200"></div>
            
            <Link 
              to="/profile" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full p-3 border-none bg-none text-gray-700 no-underline cursor-pointer transition-all duration-200 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-gray-900 hover:translate-x-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 transition-opacity duration-200 flex-shrink-0">
                <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 00-11.215 0c-.22.578.254 1.139.872 1.139h9.47z"/>
              </svg>
              Il Mio Profilo
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 border-none bg-none text-red-600 cursor-pointer transition-all duration-200 text-sm font-semibold hover:bg-red-50 hover:text-red-700 hover:translate-x-1"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-red-600 transition-colors duration-200 flex-shrink-0">
                <path d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                <path d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu
