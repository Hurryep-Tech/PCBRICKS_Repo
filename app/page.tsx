'use client';

import type React from 'react';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import BlogCards from "@/components/BlogCards/BlogCards";
import {
	Brain,
	Truck,
	RotateCcw,
	Shield,
	Users,
	Moon,
	Sun,
	ArrowRight,
	CheckCircle,
	Zap,
	Clock,
	Award,
	Building,
	GraduationCap,
	Home,
	Quote,
	ChevronLeft,
	ChevronRight,
	X,

  Menu,
	MessageCircle,
	Headphones,
	Recycle,
	Monitor,
	ArrowUpRight,
	Facebook as LucideFacebook,
	Twitter as LucideTwitter,
	Instagram as LucideInstagram,
	Calendar,
	Link,
} from 'lucide-react';
import Image from 'next/image';
import LaptopRentGrid from '@/components/LaptopRentGrid';
import { blogs } from './data/blogs';

// Quote Modal Component
const QuoteModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean;
	onClose: () => void;
}) => {
	const [formData, setFormData] = useState({
		companyName: '',
		email: '',
		contactNumber: '',
		serviceInterested: '',
		message: '',
	});

	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.companyName.trim()) {
			newErrors.companyName = 'Company name is required';
		}

		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Please enter a valid email';
		}

		if (!formData.contactNumber.trim()) {
			newErrors.contactNumber = 'Contact number is required';
		}

		if (!formData.serviceInterested) {
			newErrors.serviceInterested = 'Please select a service';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsSubmitting(true);

		// Replace with your Formcarry endpoint after signup
		const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/WS7il3GH4hI';

		try {
			const response = await fetch(FORMCARRY_ENDPOINT, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					companyName: formData.companyName,
					email: formData.email,
					contactNumber: formData.contactNumber,
					serviceInterested: formData.serviceInterested,
					message: formData.message,
				}),
			});

			const result = await response.json();

			if (response.ok) {
				setFormData({
					companyName: '',
					email: '',
					contactNumber: '',
					serviceInterested: '',
					message: '',
				});
				onClose();
			} else {
				alert(result.message || 'Something went wrong. Please try again.');
			}
		} catch (error) {
			alert('Network error. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: '' }));
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center'>
			{/* Backdrop */}
			<div
				className='absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300'
				onClick={onClose}
			/>

			{/* Modal */}
			<div className='relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in slide-in-from-bottom-4 zoom-in-95 duration-300'>
				<div className='p-6'>
					<div className='flex items-center justify-between mb-6'>
						<div>
							<h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
								Get Your Quote
							</h2>
							<p className='text-gray-600 dark:text-gray-300'>
								We'll respond within 24 hours
							</p>
						</div>
						<Button
							variant='ghost'
							size='sm'
							onClick={onClose}
							className='rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
							<X className='h-5 w-5' />
						</Button>
					</div>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<Label htmlFor='companyName'>Company Name *</Label>
							<Input
								id='companyName'
								value={formData.companyName}
								onChange={(e) =>
									handleInputChange('companyName', e.target.value)
								}
								className={`mt-1 ${errors.companyName ? 'border-red-500' : ''}`}
								placeholder='Your company name'
							/>
							{errors.companyName && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.companyName}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor='email'>Email *</Label>
							<Input
								id='email'
								type='email'
								value={formData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
								placeholder='your@company.com'
							/>
							{errors.email && (
								<p className='text-red-500 text-sm mt-1'>{errors.email}</p>
							)}
						</div>

						<div>
							<Label htmlFor='contactNumber'>Contact Number *</Label>
							<Input
								id='contactNumber'
								value={formData.contactNumber}
								onChange={(e) =>
									handleInputChange('contactNumber', e.target.value)
								}
								className={`mt-1 ${
									errors.contactNumber ? 'border-red-500' : ''
								}`}
								placeholder='+91 98765 43210'
							/>
							{errors.contactNumber && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.contactNumber}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor='serviceInterested'>Service Interested In *</Label>
							<Select
								value={formData.serviceInterested}
								onValueChange={(value) =>
									handleInputChange('serviceInterested', value)
								}>
								<SelectTrigger
									className={`mt-1 ${
										errors.serviceInterested ? 'border-red-500' : ''
									}`}>
									<SelectValue placeholder='Select a service' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='laptops'>Laptops</SelectItem>
									<SelectItem value='desktops'>Desktops</SelectItem>
									<SelectItem value='mobiles'>Mobiles</SelectItem>
									<SelectItem value='tablets'>Tablets</SelectItem>
									<SelectItem value='accessories'>Accessories</SelectItem>
									<SelectItem value='others'>Others</SelectItem>
								</SelectContent>
							</Select>
							{errors.serviceInterested && (
								<p className='text-red-500 text-sm mt-1'>
									{errors.serviceInterested}
								</p>
							)}
						</div>

						<div>
							<Label htmlFor='message'>Message</Label>
							<Textarea
								id='message'
								value={formData.message}
								onChange={(e) => handleInputChange('message', e.target.value)}
								className='mt-1'
								placeholder='Tell us about your requirements...'
								rows={3}
							/>
						</div>

						<Button
							type='submit'
							disabled={isSubmitting}
							className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full py-3 font-semibold transition-all duration-300 hover:scale-105'>
							{isSubmitting ? 'Submitting...' : 'Get My Quote'}
						</Button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default function PCBricksLanding() {
	  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ ADD THIS
	const [darkMode, setDarkMode] = useState(false);
	const [currentTestimonial, setCurrentTestimonial] = useState(0);
	// const [pricingToggle, setPricingToggle] = useState('laptop');
	const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [darkMode]);

	const handleWhatsAppClick = () => {
		const phoneNumber = '917975506175';
		const message =
			"Hi PCBricks, I'm interested in your device rental services.";
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message
		)}`;
		window.open(whatsappUrl, '_blank');
	};

	const testimonials = [
		{
			quote:
				"I had recently purchased HP elitebook i5 vPro from PCBRICKS IT Solutions. I just loved the quality of the laptop and the checks done by Rohith with a very reasonable price.",
			author: 'Naveen kumar',
			title: '',
			avatar: '/testimonials/img1.png',
		},
		{
			quote:
				"PCBricks transformed our startup's IT setup. We went from zero to fully equipped in 24 hours.",
			author: 'Arun Kumar',
			title: 'Managing Director, Learnersink',
			avatar: '/testimonials/img2.png',
		},
		{
			quote:
				'With PCBricks, we onboarded designers faster than ever. Affordable, dependable devices and instant support let us focus on building, not troubleshooting.',
			author: 'Hemanth Dayalu',
			title: 'Head of Engineering, Makersbee',
			avatar: '/testimonials/img3.jpeg',
		},
	];

	// const pricingPlans = {
	// 	laptop: [
	// 		{
	// 			name: 'Starter',
	// 			price: '₹2,499',
	// 			period: '/month',
	// 			description: 'Perfect for small teams',
	// 			features: [
	// 				'8GB RAM',
	// 				'256GB SSD',
	// 				'Intel i5',
	// 				'24/7 Support',
	// 				'Free Setup',
	// 			],
	// 			popular: false,
	// 		},
	// 		{
	// 			name: 'Pro',
	// 			price: '₹3,999',
	// 			period: '/month',
	// 			description: 'For growing businesses',
	// 			features: [
	// 				'16GB RAM',
	// 				'512GB SSD',
	// 				'Intel i7',
	// 				'Priority Support',
	// 				'Free Upgrades',
	// 			],
	// 			popular: true,
	// 		},
	// 		{
	// 			name: 'Enterprise',
	// 			price: 'Custom',
	// 			period: '',
	// 			description: 'Tailored solutions',
	// 			features: [
	// 				'Custom Specs',
	// 				'Bulk Pricing',
	// 				'Dedicated Manager',
	// 				'SLA Guarantee',
	// 				'White Glove Service',
	// 			],
	// 			popular: false,
	// 		},
	// 	],
	// 	desktop: [
	// 		{
	// 			name: 'Starter',
	// 			price: '₹1,999',
	// 			period: '/month',
	// 				'High-performance workstations',
	// 			features: [
	// 				'32GB RAM',
	// 				'1TB SSD',
	// 				'Intel i7',
	// 				'Priority Support',
	// 				'Free Upgrades',
	// 			],
	// 			popular: true,
	// 		},
	// 		{
	// 			name: 'Enterprise',
	// 			price: 'Custom',
	// 			period: '',
	// 			description: 'Custom configurations',
	// 			features: [
	// 				'Custom Specs',
	// 				'Bulk Pricing',
	// 				'Dedicated Manager',
	// 				'SLA Guarantee',
	// 				'White Glove Service',
	// 			],
	// 			popular: false,
	// 		},
	// 	],
	// };

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${
				darkMode ? 'dark' : ''
			}`}>
			<div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
				{/* Navbar */}
				<nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20">
  <div className="container mx-auto px-4 py-4">
    <div className="flex items-center justify-between">

      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image src="/logo.png" width={50} height={50} alt="PCBricks Logo" className="w-10 h-10" />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <a href="#solutions" className="nav-link">Solutions</a>
        <a href="#why-us" className="nav-link">Why Us</a>
        <a href="#blog" className="nav-link">Blog</a>
        <a href="#contact" className="nav-link">Contact</a>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2">
          <Sun className="h-4 w-4" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon className="h-4 w-4" />
        </div>

        <Button
          onClick={() => setIsQuoteModalOpen(true)}
          className="hidden md:inline-flex bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-6"
        >
          Get a Quote
        </Button>

        {/* Burger */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden mt-4 flex flex-col bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 space-y-4">
        <a href="#solutions" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Solutions</a>
        <a href="#why-us" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Why Us</a>
        <a href="#blog" className="mobile-link">Blog</a>
        <a href="#contact" className="mobile-link" onClick={() => setIsMenuOpen(false)}>Contact</a>

        <div className="flex items-center gap-3">
          <Sun className="h-4 w-4" />
          <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          <Moon className="h-4 w-4" />
        </div>

        <Button
          onClick={() => {
            setIsQuoteModalOpen(true);
            setIsMenuOpen(false);
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full"
        >
          Get a Quote
        </Button>
      </div>
    )}
  </div>
</nav>

				{/* Hero Section */}
				<section className='pt-24 pb-20 relative overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20' />
					<div className='absolute inset-0'>
						<div className='absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse' />
						<div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000' />
					</div>
					<div className='container mx-auto px-4 relative'>
						<div className='grid lg:grid-cols-2 gap-12 items-center'>
							<div className='space-y-8'>
								<div className='space-y-6'>
									<Badge className='bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 text-blue-700 dark:text-blue-300 border-0 rounded-full px-4 py-2'>
										✨ Scale Faster with Smart Devices
									</Badge>
									<h1 className='text-5xl lg:text-7xl font-bold leading-tight'>
										Empower Teams With{' '}
										<span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
											Fast, Reliable
										</span>{' '}
										IT Rentals
									</h1>
									<p className='text-xl text-gray-600 dark:text-gray-300 leading-relaxed'>
										Desktops and laptops on-demand. Delivered, supported, and
										scaled with you. Transform your IT infrastructure in no
										time.
									</p>
								</div>
								<div className='flex flex-col sm:flex-row gap-4'>
									<Button
										size='lg'
										onClick={() => setIsQuoteModalOpen(true)}
										className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-4 text-lg transition-all duration-300 hover:scale-105'>
										Explore Plans
										<ArrowRight className='ml-2 h-5 w-5' />
									</Button>
									<Button
										size='lg'
										variant='ghost'
										className='rounded-full px-8 py-4 text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'>
										See Use Cases
									</Button>
								</div>
								<div className='flex items-center space-x-8 pt-4'>
									<div className='flex items-center space-x-2'>
										<CheckCircle className='h-5 w-5 text-green-500' />
										<span className='text-sm text-gray-600 dark:text-gray-300'>
											Quick Delivery
										</span>
									</div>
									<div className='flex items-center space-x-2'>
										<CheckCircle className='h-5 w-5 text-green-500' />
										<span className='text-sm text-gray-600 dark:text-gray-300'>
											No Setup Fees
										</span>
									</div>
									<div className='flex items-center space-x-2'>
										<CheckCircle className='h-5 w-5 text-green-500' />
										<span className='text-sm text-gray-600 dark:text-gray-300'>
											9–6 Support
										</span>
									</div>
								</div>
							</div>
							<div className='relative'>
								<div className='relative z-1'>
									<div className='bg-white/10 dark:bg-gray-800/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl'>
										<Image
											src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop'
											alt='Modern laptop and desktop setup'
											width={600}
											height={400}
											className='rounded-2xl'
										/>
									</div>
								</div>
								<div className='z-2 absolute -top-4 -right-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-4 shadow-lg animate-bounce'>
									<div className='text-white text-center'>
										<Clock className='h-6 w-6 mx-auto mb-1' />
										<div className='text-sm font-semibold'>
											Quick & Reliable
										</div>
									</div>
								</div>
								<div className='z-2 absolute -bottom-8 -left-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl p-4 shadow-lg animate-bounce delay-500'>
									<div className='text-white text-center'>
										<Shield className='h-6 w-6 mx-auto mb-1' />
										<div className='text-sm font-semibold'>Secure Setup</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Trusted By Section */}
				{/* <section className='py-16 bg-gray-50/50 dark:bg-gray-800/50'>
					<div className='container mx-auto px-4'>
						<div className='text-center mb-12'>
							<p className='text-gray-600 dark:text-gray-400 mb-8'>
								Trusted by innovative teams worldwide
							</p>
							<div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60'>
								<div className='text-center'>
									<div className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
										NovaTech
									</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
										Loop AI
									</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
										FoundryOS
									</div>
								</div>
								<div className='text-center'>
									<div className='text-2xl font-bold text-gray-800 dark:text-gray-200'>
										Spindle
									</div>
								</div>
							</div>
						</div>
					</div>
				</section> */}

				{/* Why PCBricks */}
				<section id='why-us' className='py-20'>
					<div className='container mx-auto px-4'>
						<div className='text-center mb-16'>
							<h2 className='text-4xl lg:text-5xl font-bold mb-6'>
								Why Choose PCBricks?
							</h2>
							<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
								We've reimagined IT rentals with cutting-edge technology and
								unmatched service
							</p>
						</div>
						<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{[
								{
									icon: Award,
									title: 'Certified Professional',
									description:
										'Trained and certified technicians with years of experience',
									gradient: 'from-blue-500 to-cyan-500',
								},
								{
									icon: Zap,
									title: 'Quick & Reliable',
									description:
										'Get your device delivered and set up quickly right after E-KYC submission',
									gradient: 'from-purple-500 to-pink-500',
								},
								{
									icon: Headphones,
									title: 'Free Remote Support',
									description:
										'Get instant help from our dedicated IT experts, wherever you are.',
									gradient: 'from-indigo-500 to-blue-500',
								},
								{
									icon: RotateCcw,
									title: 'Flexible Subscriptions',
									description:
										'Scale up or down anytime. No long-term contracts or hidden fees',
									gradient: 'from-fuchsia-500 to-rose-500',
								},
								{
									icon: CheckCircle,
									title: 'Customer Satisfaction',
									description:
										'100% commitment to customer satisfaction and quality service',
									gradient: 'from-green-500 to-emerald-500',
								},
								{
									icon: Users,
									title: 'Long-term Relationships',
									description:
										'Building lasting partnerships with our valued clients',
									gradient: 'from-orange-500 to-red-500',
								},
								{
									icon: ArrowUpRight,
									title: 'Flexible Upgrades',
									description:
										'Upgrade or swap devices as your needs change, with no hassle.',
									gradient: 'from-cyan-600 to-blue-600',
								},
								{
									icon: Recycle,
									title: 'Refurbished Computers',
									description:
										'Quality refurbished equipment at affordable prices',
									gradient: 'from-lime-500 to-green-400',
								},
								{
									icon: Monitor,
									title: 'Hardware Sales',
									description: 'New hardware sales with competitive pricing',
									gradient: 'from-yellow-500 to-amber-600',
								},
							].map((feature, index) => (
								<Card
									key={index}
									className='group hover:scale-105 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden'>
									<CardContent className='p-8'>
										<div
											className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
											<feature.icon className='h-8 w-8 text-white' />
										</div>
										<h3 className='text-xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
											{feature.title}
										</h3>
										<p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
											{feature.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>

				<LaptopRentGrid onContact={() => setIsQuoteModalOpen(true)} />

				{/* Use Case Tiles */}
				<section
					id='solutions'
					className='py-20 bg-gray-50/50 dark:bg-gray-800/50'>
					<div className='container mx-auto px-4'>
						<div className='text-center mb-16'>
							<h2 className='text-4xl lg:text-5xl font-bold mb-6'>
								Perfect for Every Team
							</h2>
							<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
								From startups to enterprises, we power teams across industries
							</p>
						</div>
						<div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
							{[
								{
									icon: Zap,
									title: 'Startups',
									description:
										'Quick setup for new teams without upfront investment',
									color: 'from-blue-500 to-purple-600',
								},
								{
									icon: Home,
									title: 'Remote Teams',
									description: 'Managed devices for distributed workforce',
									color: 'from-green-500 to-teal-600',
								},
								{
									icon: Building,
									title: 'Enterprises',
									description:
										'Scale IT operations without infrastructure overhead',
									color: 'from-purple-500 to-pink-600',
								},
								{
									icon: GraduationCap,
									title: 'Education',
									description:
										'Flexible solutions for training centers and schools',
									color: 'from-orange-500 to-red-600',
								},
							].map((useCase, index) => (
								<Card
									key={index}
									className='group hover:scale-105 transition-all duration-300 cursor-pointer bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden'>
									<CardContent className='p-8 text-center'>
										<div
											className={`w-16 h-16 bg-gradient-to-r ${useCase.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
											<useCase.icon className='h-8 w-8 text-white' />
										</div>
										<h3 className='text-xl font-bold mb-4'>{useCase.title}</h3>
										<p className='text-gray-600 dark:text-gray-300'>
											{useCase.description}
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					</div>
				</section>
				<section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4">

    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">Our Latest Blogs</h2>
      <p className="text-xl text-gray-600 dark:text-gray-300">
        Discover insightful articles on technology, development, and innovation
      </p>
    </div>

    <BlogCards />

  </div>
</section>


				{/* Pricing Preview */}
				{/* <section id="pricing" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Choose the perfect plan for your team. Upgrade or downgrade anytime.
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span
                  className={`text-lg ${pricingToggle === "laptop" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-400"}`}
                >
                  Laptops
                </span>
                <Switch
                  checked={pricingToggle === "desktop"}
                  onCheckedChange={(checked) => setPricingToggle(checked ? "desktop" : "laptop")}
                />
                <span
                  className={`text-lg ${pricingToggle === "desktop" ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-gray-600 dark:text-gray-400"}`}
                >
                  Desktops
                </span>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricingPlans[pricingToggle as keyof typeof pricingPlans].map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 scale-105"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <CardContent className={`p-8 ${plan.popular ? "pt-12" : ""}`}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-gray-600 dark:text-gray-300 ml-1">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={plan.name === "Enterprise" ? handleWhatsAppClick : () => setIsQuoteModalOpen(true)}
                      className={`w-full rounded-full py-3 transition-all duration-300 hover:scale-105 ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                      }`}
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

				{/* Testimonials Slider */}
				<section className='py-20 bg-gray-50/50 dark:bg-gray-800/50'>
					<div className='container mx-auto px-4'>
						<div className='text-center mb-16'>
							<h2 className='text-4xl lg:text-5xl font-bold mb-6'>
								What Our Clients Say
							</h2>
							<p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
								Join thousands of satisfied customers who trust PCBricks
							</p>
						</div>
						<div className='max-w-4xl mx-auto'>
							<Card className='bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden'>
								<CardContent className='p-12'>
									<div className='text-center'>
										<Quote className='h-12 w-12 text-blue-500 mx-auto mb-6' />
										<blockquote className='text-2xl font-medium mb-8 leading-relaxed'>
											"{testimonials[currentTestimonial].quote}"
										</blockquote>
										<div className='flex items-center justify-center space-x-4'>
											<Image
												src={
													testimonials[currentTestimonial].avatar ||
													'/placeholder.svg'
												}
												alt={testimonials[currentTestimonial].author}
												width={60}
												height={60}
												className='rounded-full'
												onError={(e) => {
													const target = e.target as HTMLImageElement;
													target.src = '/placeholder.svg?height=60&width=60';
												}}
											/>
											<div className='text-left'>
												<div className='font-semibold text-lg'>
													{testimonials[currentTestimonial].author}
												</div>
												<div className='text-gray-600 dark:text-gray-300'>
													{testimonials[currentTestimonial].title}
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
							<div className='flex items-center justify-center space-x-4 mt-8'>
								<Button
									variant='ghost'
									size='sm'
									onClick={() =>
										setCurrentTestimonial(
											(prev) =>
												(prev - 1 + testimonials.length) % testimonials.length
										)
									}
									className='rounded-full hover:scale-110 transition-transform duration-300'>
									<ChevronLeft className='h-5 w-5' />
								</Button>
								<div className='flex space-x-2'>
									{testimonials.map((_, index) => (
										<button
											key={index}
											onClick={() => setCurrentTestimonial(index)}
											className={`w-3 h-3 rounded-full transition-all duration-300 ${
												index === currentTestimonial
													? 'bg-blue-600 scale-125'
													: 'bg-gray-300 dark:bg-gray-600'
											}`}
										/>
									))}
								</div>
								<Button
									variant='ghost'
									size='sm'
									onClick={() =>
										setCurrentTestimonial(
											(prev) => (prev + 1) % testimonials.length
										)
									}
									className='rounded-full hover:scale-110 transition-transform duration-300'>
									<ChevronRight className='h-5 w-5' />
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Banner */}
				<section className='py-20 relative overflow-hidden'>
					<div className='absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600' />
					<div className='absolute inset-0'>
						<div className='absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse' />
						<div className='absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000' />
					</div>
					<div className='container mx-auto px-4 relative'>
						<div className='text-center text-white'>
							<h2 className='text-4xl lg:text-6xl font-bold mb-6'>
								Ready to Power Up Your Team?
							</h2>
							<p className='text-xl mb-8 opacity-90 max-w-3xl mx-auto'>
								Join thousands of companies who've transformed their IT
								infrastructure with PCBricks
							</p>
							<div className='flex flex-col sm:flex-row gap-4 justify-center'>
								<Button
									size='lg'
									onClick={() => setIsQuoteModalOpen(true)}
									className='bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105'>
									Get Devices in 24 Hours
									<ArrowRight className='ml-2 h-5 w-5' />
								</Button>
								<Button
									size='lg'
									onClick={handleWhatsAppClick}
									variant='ghost'
									className='rounded-full px-8 py-4 text-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300'>
									<MessageCircle className='mr-2 h-5 w-5' />
									Talk to Sales
								</Button>
							</div>
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className='bg-gray-900 text-white py-16'>
					<div className='container mx-auto px-4'>
						<div className='flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between items-start'>
                            <div className='max-w-md flex-col lg:flex-row  md:items-center   flex !items-center'>
                                <div className='flex flex-col lg:flex-row md:items-center !items-center lg:items-start   gap-4'>
									<Image
										src='/logo.png'
										width={100}
										height={100}
										alt='PCBricks Logo'
										className='w-28 h-28'
									/>
									<div>
										<p className='mb-2 text-gray-400 leading-relaxed'>
											Empowering teams with intelligent device subscriptions.
											Transform your business with cutting-edge technology.
										</p>
										<a
											href='mailto:pcbricksinfo@gmail.com'
											className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/60 hover:bg-blue-800/70 transition-colors duration-200 w-fit mt-2 group'
											title='Email us'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M16 12l-4-4-4 4m8 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v6'
												/>
											</svg>
											<span className='text-gray-200 group-hover:text-white font-medium select-all'>
												pcbricksinfo@gmail.com
											</span>
										</a>
									</div>
								</div>
							</div>
							{/* Responsive Services Section */}
							<div className='w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0'>
								<h3 className='text-lg font-semibold mb-4 text-center lg:text-left'>
									Services
								</h3>
								<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3'>
									{[
										{
											label: 'Laptop Rentals',
											icon: <Monitor className='w-5 h-5 text-blue-400' />,
										},
										{
											label: 'Desktop Rentals',
											icon: <Monitor className='w-5 h-5 text-purple-400' />,
										},
										{
											label: 'Enterprise Solutions',
											icon: <Building className='w-5 h-5 text-green-400' />,
										},
										{
											label: 'Support',
											icon: <Headphones className='w-5 h-5 text-pink-400' />,
										},
									].map((service, idx) => (
										<a
											key={service.label}
											href='#'
											className={`group flex flex-col items-center justify-center rounded-xl bg-gray-800/60 hover:bg-blue-700/70 transition-all duration-300 p-4 shadow-sm hover:shadow-lg opacity-0 animate-fadein min-h-[90px]`}
											style={{
												animationDelay: `${idx * 80}ms`,
												animationFillMode: 'forwards',
											}}>
											<span className='mb-2'>{service.icon}</span>
											<span className='text-sm text-gray-200 group-hover:text-white font-medium text-center'>
												{service.label}
											</span>
										</a>
									))}
								</div>
							</div>
							{/* Company/Legal sections remain commented out */}
						</div>
						<div className='flex flex-col md:flex-row justify-between items-center border-t border-gray-800 mt-12 pt-8 text-gray-400'>
							<p className='mb-4 md:mb-0'>
								&copy; {new Date().getFullYear()} PCBricks.&nbsp;
								<span>All rights reserved.</span>
							</p>
							<div className='flex space-x-4 mt-2 md:mt-0'>
								<a
									href='https://facebook.com'
									aria-label='Facebook'
									target='_blank'
									rel='noopener noreferrer'
									className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition-colors cursor-pointer'>
									<LucideFacebook className='w-5 h-5 text-white' />
								</a>
								<a
									href='https://x.com'
									aria-label='X'
									target='_blank'
									rel='noopener noreferrer'
									className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-400 transition-colors cursor-pointer'>
									<LucideTwitter className='w-5 h-5 text-white' />
								</a>
								<a
									href='https://instagram.com'
									aria-label='Instagram'
									target='_blank'
									rel='noopener noreferrer'
									className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-500 transition-colors cursor-pointer'>
									<LucideInstagram className='w-5 h-5 text-white' />
								</a>
							</div>
						</div>
						<style jsx global>{`
							@keyframes fadein {
								from {
									opacity: 0;
									transform: translateY(16px);
								}
								to {
									opacity: 1;
									transform: none;
								}
							}
							.animate-fadein {
								animation: fadein 0.7s cubic-bezier(0.4, 0, 0.2, 1) both;
							}
						`}</style>
					</div>
				</footer>

				{/* Quote Modal */}
				<QuoteModal
					isOpen={isQuoteModalOpen}
					onClose={() => setIsQuoteModalOpen(false)}
				/>
			</div>
		</div>
	);
}
