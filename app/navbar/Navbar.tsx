'useclient';
import { useState,useEffect } from 'react';
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from "lucide-react";
export default function Navbar(){
    const [darkMode, setDarkMode] = useState(false);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    useEffect(() => {
            if (darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }, [darkMode]);
    return(
        <div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
				{/* Navbar */}
				<nav className='fixed top-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20'>
					<div className='container mx-auto px-4 py-4'>
						<div className='flex items-center justify-between'>
							<div className='flex items-center space-x-3'>
								<Image
									src='/logo.png'
									width={50}
									height={50}
									alt='PCBricks Logo'
									className='w-10 h-10'
								/>
							</div>
							<div className='hidden md:flex items-center space-x-8'>
								<a
									href='#solutions'
									className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
									Solutions
								</a>
								{/* <a
                  href="#pricing"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Pricing
                </a> */}
								<a
									href='#why-us'
									className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
									Why Us
								</a>
								<a
									href='#contact'
									className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
									Contact
								</a>
								<a
									href='/blog'
									className='text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
									Blog
								</a>
							</div>
							<div className='flex items-center space-x-4'>
								<div className='flex items-center space-x-2'>
									<Sun className='h-4 w-4' />
									<Switch checked={darkMode} onCheckedChange={setDarkMode} />
									<Moon className='h-4 w-4' />
								</div>
								<Button
									onClick={() => setIsQuoteModalOpen(true)}
									className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 transition-all duration-300 hover:scale-105'>
									Get a Quote
								</Button>
							</div>
						</div>
					</div>
				</nav>
        </div>
    );
}