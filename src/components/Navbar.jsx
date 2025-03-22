import { Link } from 'react-scroll';
import { useState } from 'react';
import { FiHome, FiX, FiMenu, FiUser, FiServer, FiCalendar } from "react-icons/fi";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="fixed w-full z-50 transition-all duration-500">
            <div className="bg-white backdrop-blur-2xl shadow-md">
                <nav className="border-b border-pink-400/20">
                    <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between relative">
                        {/* Logo */}
                        <div className="flex items-center">
                            <span className="cursor-pointer text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent font-[Poppins] tracking-tighter">
                                BeautySalon
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-6 lg:space-x-10">
                            <Link to="home" spy={true} smooth={true} className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[Poppins] font-medium text-base lg:text-lg">
                                <FiHome className="mr-1 lg:mr-2" /> Home
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                            </Link>

                            <Link to="about" spy={true} smooth={true} className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[Poppins] font-medium text-base lg:text-lg">
                                <FiUser className="mr-1 lg:mr-2" /> About
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                            </Link>

                            <Link to="services" spy={true} smooth={true} className="flex items-center cursor-pointer text-gray-800 hover:text-pink-700 transition-all duration-300 relative group font-[Poppins] font-medium text-base lg:text-lg">
                                <FiServer className="mr-1 lg:mr-2" /> Services
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-pink-700 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>

                        {/* Book Now Button */}
                        <Link to='contact' spy={true} smooth={true}>
                            <div className="flex items-center space-x-4">
                                <div className="hidden md:block">
                                    <a className="flex items-center bg-pink-400 hover:bg-pink-600 text-white px-4 py-2 lg:px-6 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer font-[Poppins] font-semibold border border-pink-300 text-sm lg:text-base">
                                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="mr-1 lg:mr-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                            <line x1="16" y1="2" x2="16" y2="6"></line>
                                            <line x1="8" y1="2" x2="8" y2="6"></line>
                                            <line x1="3" y1="10" x2="21" y2="10"></line>
                                        </svg>
                                        Book Now
                                    </a>
                                </div>


                                {/* Mobile Menu Toggle */}
                                <button className="md:hidden text-gray-800 hover:text-pink-700 transition-colors duration-300 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                    {isMenuOpen ? "" : <FiMenu size={28} />}
                                </button>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="fixed inset-0 z-40 flex items-center justify-center bg-pink-200/95 backdrop-blur-lg h-screen">
                            <button
                                className="absolute top-4 right-4 text-gray-800 hover:text-pink-700 transition-colors duration-300 p-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <FiX size={28} />
                            </button>
                            <div className="bg-pink-100/90 border border-pink-300/20 rounded-xl shadow-2xl p-8 space-y-8 w-11/12 max-w-sm mt-12">
                                <Link to="home" spy={true} smooth={true} className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl" onClick={() => setIsMenuOpen(false)}>
                                    <FiHome className="mb-2 text-2xl" />
                                    Home
                                </Link>

                                <Link to="about" spy={true} smooth={true} className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl" onClick={() => setIsMenuOpen(false)}>
                                    <FiUser className="mb-2 text-2xl" />
                                    About
                                </Link>

                                <Link to="services" spy={true} smooth={true} className="flex flex-col items-center text-gray-800 hover:text-pink-700 transition-all duration-300 font-[Poppins] text-xl" onClick={() => setIsMenuOpen(false)}>
                                    <FiServer className="mb-2 text-2xl" />
                                    Services
                                </Link>

                                <Link className='flex flex-col items-center bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 rounded-xl transition-all duration-300 font-[Poppins] font-semibold text-lg'
                                    onClick={() => setIsMenuOpen(false)}
                                    to="contact" spy={true} smooth={true}>
                                    <FiCalendar className="mb-2 text-2xl" />
                                    Book Appointment
                                </Link>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
