import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import {
    ChevronRight,
    CheckCircle,
    Users,
    Building2,
    Briefcase,
    ArrowRight,
    UserPlus,
    FileText,
    Award,
    Menu,
    X,
    Twitter,
    Linkedin,
    Instagram,
    Rocket
} from 'lucide-react';
import ThemeToggle from '../components/common/ThemeToggle';

const Home = () => {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-900 dark:selection:text-blue-200">



            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full opacity-30 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium uppercase tracking-wide">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                New Placement Season 2026
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
                                The Future of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Campus Placements</span>
                            </h1>

                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                                Experience the next-generation recruitment platform. Connect seamlessly with top recruiters, manage applications smartly, and launch your career with confidence.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:ring-offset-slate-900"
                                >
                                    Get Started
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                                <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-gray-300 transition-all duration-200 bg-slate-800/50 border border-white/10 rounded-xl hover:bg-slate-800 hover:text-white hover:border-white/20 hover:-translate-y-1 focus:outline-none">
                                    View Demo
                                </button>
                            </div>

                            <div className="pt-8 border-t border-white/5 grid grid-cols-3 gap-8">
                                <div>
                                    <p className="text-3xl font-bold text-white">10k+</p>
                                    <p className="text-sm text-gray-500 mt-1">Students</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">500+</p>
                                    <p className="text-sm text-gray-500 mt-1">Recruiters</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">200+</p>
                                    <p className="text-sm text-gray-500 mt-1">Colleges</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative group perspective-1000">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-slate-900 rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform transition-transform duration-500 hover:scale-[1.02] hover:rotate-1">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-950/80 z-10 pointer-events-none"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                    alt="Dashboard Preview"
                                    className="w-full h-auto object-cover opacity-90"
                                />

                                {/* Floating Card UI Element */}
                                <div className="absolute bottom-8 left-8 right-8 z-20 bg-slate-800/80 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl animate-float">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                                            <CheckCircle className="text-green-400 w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Offer Letter Received</p>
                                            <p className="text-green-400 text-sm">Google - Software Engineer</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-32 relative">
                <div className="absolute inset-0 bg-gray-50 dark:bg-slate-900/50 skew-y-3 transform origin-bottom-right transition-colors duration-300"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-blue-600 dark:text-blue-500 font-semibold tracking-wider text-sm uppercase mb-3">Powering Your Future</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Everything you need for placements</h3>
                        <p className="text-xl text-gray-600 dark:text-gray-400 font-light">
                            A comprehensive suite of tools designed to simplify the entire placement lifecycle.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Users}
                            title="For Students"
                            desc="Build a standout profile, one-click apply to dream companies, and track your application status in real-time."
                            color="blue"
                        />
                        <FeatureCard
                            icon={Building2}
                            title="For Colleges"
                            desc="Digitize placement drives, monitor student performance with AI analytics, and automate reporting."
                            color="cyan"
                        />
                        <FeatureCard
                            icon={Briefcase}
                            title="For Recruiters"
                            desc="Access a curated talent pool, streamline interview scheduling, and hire the best talent faster."
                            color="purple"
                        />
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Three simple steps to launch your career.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 dark:from-blue-900 dark:via-blue-600 dark:to-blue-900 opacity-30"></div>

                        <StepCard
                            number="01"
                            icon={UserPlus}
                            title="Create Profile"
                            desc="Sign up and build your professional profile with skills, projects, and resume."
                        />
                        <StepCard
                            number="02"
                            icon={FileText}
                            title="Apply for Jobs"
                            desc="Browse exclusive job listings and apply to top companies with a single click."
                        />
                        <StepCard
                            number="03"
                            icon={Award}
                            title="Get Hired"
                            desc="Ace your interviews, receive offer letters, and start your professional journey."
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-gray-50 dark:bg-slate-900/30 border-y border-gray-200 dark:border-white/5 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">Success Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <TestimonialCard
                            name="Sarah Johnson"
                            role="SDE @ Google"
                            quote="The platform made it incredibly easy to showcase my projects. I landed my dream job within 2 weeks."
                            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                        />
                        <TestimonialCard
                            name="Michael Chen"
                            role="Designer @ Stripe"
                            quote="A game-changer for campus placements. The interface is stunning and the process is so smooth."
                            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                        />
                        <TestimonialCard
                            name="Emily Davis"
                            role="Recruiter @ Amazon"
                            quote="We found exceptional talent here. The filtering tools helped us save hours in our hiring process."
                            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-600/10 transition-colors duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-cyan-50/50 dark:from-blue-600/20 dark:to-cyan-500/20 backdrop-blur-3xl transition-colors duration-300"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 tracking-tight">Ready to transform your career?</h2>
                    <p className="text-xl text-gray-700 dark:text-blue-200 mb-12 max-w-2xl mx-auto">Join thousands of students and recruiters already using the most advanced placement platform.</p>
                    <Link to="/register">
                        <button className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-5 px-12 rounded-2xl shadow-xl shadow-blue-500/20 dark:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                            Get Started for Free
                        </button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-slate-900 pt-20 pb-10 border-t border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-300 text-sm transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="bg-blue-600 p-1.5 rounded-lg shadow-md shadow-blue-500/20">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">PlacementPortal</span>
                            </div>
                            <p className="leading-relaxed mb-6">
                                Empowering the next generation of professionals with world-class opportunities.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon Icon={Twitter} />
                                <SocialIcon Icon={Linkedin} />
                                <SocialIcon Icon={Instagram} />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Platform</h4>
                            <FooterLink>Browse Jobs</FooterLink>
                            <FooterLink>Companies</FooterLink>
                            <FooterLink>Pricing</FooterLink>
                            <FooterLink>For Colleges</FooterLink>
                        </div>
                        <div>
                            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Resources</h4>
                            <FooterLink>Blog</FooterLink>
                            <FooterLink>Career Guide</FooterLink>
                            <FooterLink>Success Stories</FooterLink>
                            <FooterLink>Help Center</FooterLink>
                        </div>
                        <div>
                            <h4 className="text-gray-900 dark:text-white font-semibold mb-6">Legal</h4>
                            <FooterLink>Privacy Policy</FooterLink>
                            <FooterLink>Terms of Service</FooterLink>
                            <FooterLink>Cookie Policy</FooterLink>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-white/5 pt-8 text-center text-gray-500 dark:text-slate-600">
                        &copy; {new Date().getFullYear()} PlacementPortal. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

// UI Components
const FeatureCard = ({ icon: Icon, title, desc, color }) => (
    <div className="group relative p-8 rounded-2xl bg-white dark:bg-slate-800/50 backdrop-blur-xl border border-gray-200 dark:border-white/10 hover:border-blue-500/30 dark:hover:border-blue-500/30 hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/20">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${color}-500/10 text-${color}-600 dark:text-${color}-400 group-hover:bg-${color}-500 group-hover:text-white transition-colors duration-300`}>
            <Icon size={28} />
        </div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{desc}</p>
    </div>
);

const StepCard = ({ number, icon: Icon, title, desc }) => (
    <div className="relative text-center group">
        <div className="w-20 h-20 mx-auto bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-500 mb-6 group-hover:border-blue-500/50 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 shadow-xl shadow-black/5 dark:shadow-black/50 z-10 relative">
            <Icon size={32} />
        </div>
        <div className="text-5xl font-bold text-gray-200 dark:text-slate-800 absolute -top-4 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-50">{number}</div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-4">{title}</h4>
        <p className="text-gray-600 dark:text-gray-400 px-4">{desc}</p>
    </div>
);

const TestimonialCard = ({ name, role, quote, image }) => (
    <div className="p-8 rounded-2xl bg-white dark:bg-slate-800/40 backdrop-blur-xl border border-gray-200 dark:border-white/5 hover:border-blue-200 dark:hover:border-white/10 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-300">
        <div className="flex items-center gap-4 mb-6">
            <img src={image} alt={name} className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/20" />
            <div>
                <h5 className="font-bold text-gray-900 dark:text-white">{name}</h5>
                <p className="text-sm text-blue-600 dark:text-blue-400">{role}</p>
            </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">"{quote}"</p>
    </div>
);

const FooterLink = ({ children }) => (
    <Link to="#" className="block mb-3 hover:text-blue-400 transition-colors duration-200">{children}</Link>
);

const SocialIcon = ({ Icon }) => (
    <a href="#" className="w-10 h-10 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:border-transparent transition-all duration-200">
        <Icon size={18} />
    </a>
);

export default Home;
