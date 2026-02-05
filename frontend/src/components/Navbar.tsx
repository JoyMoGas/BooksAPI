import { useState, useEffect } from 'react'
import Icon from './icons/Icon'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-teal-800 shadow-lg' : 'bg-transparent'
      }`}
      style={{ willChange: 'background-color, box-shadow' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <span className="text-white text-2xl font-bold">REEDO</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-teal-200 hover:text-white transition-colors duration-200 text-sm font-medium border-b-2 border-teal-200 pb-1">
              Home
            </a>
            <a href="#" className="text-white hover:text-teal-200 transition-colors duration-200 text-sm font-medium">
              Books
            </a>
            <a href="#" className="text-white hover:text-teal-200 transition-colors duration-200 text-sm font-medium">
              Audiobooks
            </a>
            <a href="#" className="text-white hover:text-teal-200 transition-colors duration-200 text-sm font-medium">
              Offers
            </a>
            <a href="#" className="text-white hover:text-teal-200 transition-colors duration-200 text-sm font-medium">
              Recommended
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-white hover:text-teal-200 transition-colors duration-200">
              <Icon name="cart" size="lg" />
            </button>
            <button className="text-white hover:text-teal-200 transition-colors duration-200">
              <Icon name="user" size="lg" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar	