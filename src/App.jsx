import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Lock, GitBranch, Webhook, Activity, Cog, Building2, CheckCircle, Star, Users, Globe, Sparkles, TrendingUp, Shield, Eye, Layers, Code, Smartphone, Database, Cloud, Award } from "lucide-react";

// Verifyd — World-class, premium launch page
// Design Philosophy: Luxury meets functionality, Apple's precision with Tesla's innovation
// Tech Stack: React + Framer Motion + Tailwind CSS + Custom shaders

export default function VerifydLanding() {
  const [email, setEmail] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900 min-h-screen antialiased selection:bg-purple-500/20 selection:text-purple-900">
      {/* Dynamic background orbs */}
      <motion.div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{ y: backgroundY }}
      >
        <div 
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-3xl"
          style={{
            left: `${mousePosition.x * 0.02}%`,
            top: `${mousePosition.y * 0.02}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-500/15 blur-3xl"
          style={{
            right: `${mousePosition.x * 0.015}%`,
            bottom: `${mousePosition.y * 0.015}%`,
            transform: 'translate(50%, 50%)'
          }}
        />
      </motion.div>

      <div className="relative z-10">
        <Header />
        
        <Hero email={email} setEmail={setEmail} />

        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Divider />
          <StatsSection />
          <Divider subtle />
          <Problem />
          <Divider subtle />
          <Solution />
          <Divider subtle />
          <Architecture />
          <Divider subtle />
          <FeaturesGrid />
          <Divider subtle />
          <TestimonialsSection />
          <Divider subtle />
          <BuildersCTA />
        </div>
        
        <WaitlistCTA email={email} setEmail={setEmail} />
        <Footer />
      </div>
    </main>
  );
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass shadow-2xl border-b border-white/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-8 py-4">
        <div className="flex items-center justify-between">
          <motion.a 
            href="#" 
            className="group flex items-center gap-3 rounded-xl px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <VMark className="h-10 w-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-blue-600 transition-all duration-500">
              Verifyd
            </span>
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {[
              { name: 'Features', href: '#features' },
              { name: 'Architecture', href: '#architecture' },
              { name: 'Developers', href: '#builders' },
              { name: 'Pricing', href: '#pricing' }
            ].map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative group px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.a
            href="#waitlist"
            className="relative btn-premium text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Early Access
              <ArrowRight className="h-4 w-4" />
            </span>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}

function Hero({ email, setEmail }) {
  const [status, setStatus] = useState('idle');
  const [statusMsg, setStatusMsg] = useState('');
  const [floatingElements] = useState(() => 
    [...Array(12)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      colorIndex: i % 3
    }))
  );
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section aria-labelledby="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated mesh gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 animate-gradient" />
        
        {/* Floating elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              rotate: [0, 180, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + element.id * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: element.id * 0.2,
            }}
          >
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${
              element.colorIndex === 0 ? 'from-blue-400 to-blue-600' :
              element.colorIndex === 1 ? 'from-purple-400 to-purple-600' :
              'from-pink-400 to-pink-600'
            } opacity-20 blur-sm`} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="mx-auto max-w-6xl text-center">
          {/* Launch badge */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/30 text-sm font-medium text-slate-700 shadow-2xl">
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent font-semibold">
                Launching Winter 2025
              </span>
              <Sparkles className="h-4 w-4 text-purple-500" />
            </span>
          </div>
          <h1 id="hero" className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none mb-8">
            <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Your Digital
            </span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-[length:300%_300%]">
              Identity,
            </span>
            <span className="block bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
              Synchronized.
            </span>
          </h1>
          <p className="mt-5 text-xl md:text-2xl lg:text-3xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-light">
            The single source of truth you own. Update your verified address and contact info once.{" "}
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Verifyd syncs it—securely and instantly
            </span>
            —across the services you trust.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 mb-8 text-sm text-slate-500">
            {[
              { icon: ShieldCheck, text: "SOC 2 Compliant", color: "text-green-500" },
              { icon: Lock, text: "End-to-End Encrypted", color: "text-blue-500" },
              { icon: Zap, text: "Real-time Sync", color: "text-yellow-500" },
              { icon: Award, text: "99.9% Uptime SLA", color: "text-purple-500" }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/20"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (status === 'loading') return;
              const hp = (e.currentTarget.querySelector('[name="company"]')).value;
              if (hp) return;
              try {
                setStatus('loading');
                setStatusMsg('Saving…');
                await new Promise((r) => setTimeout(r, 400));
                setStatus('success');
                setStatusMsg("You’re on the list. We’ll reach out with your invite.");
              } catch (err) {
                setStatus('error');
                setStatusMsg('Something went wrong. Please try again.');
              }
            }}
            className="mx-auto mt-8 max-w-2xl"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-500 animate-pulse-glow" />
              <div className="relative flex items-center gap-3 p-3 glass rounded-2xl border border-white/30 shadow-2xl">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for early access"
                  className="flex-1 bg-transparent px-6 py-4 text-lg outline-none placeholder:text-slate-400 text-slate-900"
                  autoComplete="email"
                />
                <motion.button
                  type="submit"
                  className="relative btn-premium text-white px-8 py-4 rounded-xl font-semibold shadow-2xl"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {status === 'loading' ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Securing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Get Early Access
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </form>
          <div className="mt-6 text-lg font-medium">
            {status !== 'idle' && (
              <span className={
                status === 'success' ? 'text-emerald-600' : 
                status === 'error' ? 'text-rose-600' : 
                'text-slate-500'
              }>
                {statusMsg}
              </span>
            )}
          </div>
          
          {/* Social proof */}
          <div className="mt-8 flex items-center justify-center gap-2 text-slate-500">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="font-medium">
              Join <span className="text-slate-700 font-bold">15,247</span> developers on the waitlist
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Divider({ subtle = false }) {
  return (
    <div className="relative py-8">
      <div className={`mx-auto h-px ${subtle ? "bg-gradient-to-r from-transparent via-slate-200 to-transparent" : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"} max-w-6xl`} />
      {!subtle && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full" />
      )}
    </div>
  );
}

function Problem() {
  return (
    <div>
      <h2 id="problem" className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
        <span className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
          Stop Paying the
        </span>
        <br />
        <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
          Fragmentation Tax.
        </span>
      </h2>
      <p className="mt-4 text-slate-600 leading-relaxed text-lg">
        Every move, every new number, another round of corrections. Across 20–40 accounts, your old details echo: missed deliveries, failed verifications, and a background anxiety that your digital life is out of sync. This isn’t a minor nuisance—it’s a structural flaw in today’s internet.
      </p>
      <AnimatedGlass />
    </div>
  );
}

function AnimatedGlass() {
  const prefersReducedMotion = useReducedMotion();
  
  const fragmentationExamples = [
    { 
      label: "Netflix", 
      icon: "📺", 
      gradient: "from-red-500 to-red-600",
      shadowColor: "shadow-red-500/25",
      description: "Outdated billing address",
      issue: "Delivery failed"
    },
    { 
      label: "Amazon", 
      icon: "📦", 
      gradient: "from-orange-500 to-yellow-500",
      shadowColor: "shadow-orange-500/25",
      description: "Wrong shipping info",
      issue: "Package returned"
    },
    { 
      label: "Bank", 
      icon: "🏦", 
      gradient: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/25",
      description: "Old contact details",
      issue: "Security alerts failed"
    },
    { 
      label: "LinkedIn", 
      icon: "💼", 
      gradient: "from-indigo-500 to-purple-500",
      shadowColor: "shadow-indigo-500/25",
      description: "Stale profile data",
      issue: "Missed opportunities"
    },
    { 
      label: "Spotify", 
      icon: "🎵", 
      gradient: "from-green-500 to-emerald-500",
      shadowColor: "shadow-green-500/25",
      description: "Wrong location",
      issue: "Regional restrictions"
    },
    { 
      label: "Uber", 
      icon: "🚗", 
      gradient: "from-gray-600 to-gray-700",
      shadowColor: "shadow-gray-500/25",
      description: "Outdated pickup address",
      issue: "Driver confusion"
    },
    { 
      label: "Email", 
      icon: "📧", 
      gradient: "from-purple-500 to-pink-500",
      shadowColor: "shadow-purple-500/25",
      description: "Old recovery info",
      issue: "Account locked"
    },
    { 
      label: "Social", 
      icon: "👥", 
      gradient: "from-pink-500 to-rose-500",
      shadowColor: "shadow-pink-500/25",
      description: "Incorrect personal info",
      issue: "Identity verification failed"
    }
  ];

  return (
    <div className="relative mt-16">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-orange-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative text-center mb-12">
        <motion.h3 
          className="text-3xl md:text-4xl font-bold text-slate-800 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Your Data, Scattered Everywhere
          </span>
        </motion.h3>
        <motion.p 
          className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Each service holds outdated versions of your information. When you move or change your phone number,{" "}
          <span className="font-semibold text-red-600">the update nightmare begins</span> across dozens of platforms.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {fragmentationExamples.map((item, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: prefersReducedMotion ? 0 : 30,
              scale: 0.9
            }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              scale: 1
            }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.3 : 0.8, 
              delay: i * 0.1,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            whileHover={{ 
              y: -8,
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            className="relative group cursor-pointer"
          >
            {/* Glow effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`} />
            
            {/* Card */}
            <div className="relative aspect-[4/3] rounded-2xl glass border border-white/30 p-6 flex flex-col items-center justify-center shadow-2xl overflow-hidden">
              {/* Warning indicator */}
              <motion.div 
                className="absolute top-3 right-3 w-3 h-3 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Icon */}
              <motion.div 
                className="text-4xl mb-3 filter drop-shadow-lg"
                whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                {item.icon}
              </motion.div>
              
              {/* Service name */}
              <div className="text-sm font-bold text-slate-800 mb-2 text-center">
                {item.label}
              </div>
              
              {/* Issue description */}
              <div className="text-xs text-slate-500 text-center leading-tight">
                {item.description}
              </div>
              
              {/* Problem indicator */}
              <motion.div 
                className="absolute bottom-2 left-2 right-2 text-xs font-medium text-red-600 bg-red-50 rounded px-2 py-1 text-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                initial={{ y: 10 }}
                whileInView={{ y: 0 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                ⚠️ {item.issue}
              </motion.div>
              
              {/* Animated data corruption lines */}
              <svg className="absolute inset-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-500" viewBox="0 0 100 100">
                <motion.path
                  d="M10,20 Q50,10 90,30 Q50,40 10,50 Q50,60 90,80"
                  stroke="rgb(239 68 68)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="5,5"
                  animate={{
                    strokeDashoffset: [0, -20],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Impact statement */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass border border-red-200/50 bg-gradient-to-r from-red-50 to-orange-50 shadow-2xl">
          <motion.div 
            className="w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Multiply this chaos by 20-40 services
          </span>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💥
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

function Pill({ icon: Icon, title, desc }) {
  return (
    <motion.div 
      className="relative group"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
      
      {/* Card */}
      <div className="relative flex items-start gap-4 rounded-2xl glass border border-white/30 p-6 shadow-2xl">
        {/* Icon */}
        <div className="mt-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 p-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-6 w-6 text-white" />
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-slate-600 leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function Solution() {
  return (
    <div>
      <h2 id="solution" className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          A Living Profile,
        </span>
        <br />
        <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
          Connected by Code.
        </span>
      </h2>
      <p className="mt-4 text-slate-600 leading-relaxed text-lg">
        Verifyd recenters identity around the owner: you. Update once; a signed event is emitted to every <span className="font-semibold">integrated partner</span> you’ve approved—no bots, no scraping, no credential sharing.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <Pill icon={Lock} title="Your Data, Your Rules" desc="Grant, pause, or revoke access with passkey‑secured consent. Control is not a setting—it’s the default." />
        <Pill icon={Zap} title="One‑Tap Update" desc="Life changes, your profile does too. Partners receive signed webhooks instantly and idempotently." />
        <Pill icon={GitBranch} title="API‑First" desc="Modern SDKs + webhooks. Clean, direct integrations that are testable and auditable end‑to‑end." />
        <Pill icon={ShieldCheck} title="Integrity Protocol" desc="No automation, no form‑filling, no scraping. Privacy and safety by design, not by promise." />
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatCard label="Data Corrections" value="↓ 80%" note="After integration, partners report sharp drops in address/phone correction tickets*" />
        <StatCard label="Delivery Issues" value="↓ 35%" note="Lower return‑to‑sender + failed delivery incidents*" />
        <StatCard label="Integration Time" value="< 1 day" note="Drop‑in SDKs with sandbox keys get you live quickly" />
      </div>
      <p className="mt-2 text-xs text-slate-500">*Projected outcomes; validate with your own metrics post‑integration.</p>
    </div>
  );
}

function StatCard({ label, value, note }) {
  return (
    <motion.div 
      className="relative group"
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500" />
      
      {/* Card */}
      <div className="relative rounded-2xl glass border border-white/30 p-6 shadow-2xl">
        <div className="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</div>
        <div className="mt-3 text-4xl font-black tracking-tight bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="mt-2 text-xs text-slate-500 leading-relaxed">{note}</div>
      </div>
    </motion.div>
  );
}

function Architecture() {
  const items = [
    { icon: ShieldCheck, title: "Multi‑Layered Verification", desc: "From self‑attested to definitive proofs (e.g., USPS, utility bill, bank statement) with clear provenance." },
    { icon: Cog, title: "Field‑Level Permissions", desc: "Share only what’s needed: shipping address for retail, legal residence for banking—at different resolutions." },
    { icon: Activity, title: "Crystal‑Clear Audit Trail", desc: "Immutable, time‑stamped logs of reads and updates. See who accessed what, and when." },
  ];

  return (
    <div>
      <h2 id="architecture" className="text-3xl md:text-4xl font-extrabold tracking-tight">Control Isn’t a Feature. It’s the Foundation.</h2>
      <p className="mt-4 text-slate-600 leading-relaxed text-lg">
        Trust is engineered. Verifyd’s user‑owned vault sits at the center, with layered permissions, verification tiers, and an append‑only ledger for total transparency.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <Pill key={i} icon={it.icon} title={it.title} desc={it.desc} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BlueprintCard />
        <CodeSketch />
      </div>
    </div>
  );
}

function BlueprintCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-[radial-gradient(ellipse_at_top_left,_rgba(0,0,0,0.04),_transparent_60%)] p-6">
      <h3 className="text-lg font-semibold">Architecture Blueprint</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-600">
        <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="font-semibold">User‑Owned Vault</div>
          <div className="mt-1">Encrypted at rest and in transit</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="font-semibold">Field Permissions</div>
          <div className="mt-1">Per‑field + per‑partner controls</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="font-semibold">Verification Tiers</div>
          <div className="mt-1">From basic → definitive proof</div>
        </div>
        <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
          <div className="font-semibold">Audit Ledger</div>
          <div className="mt-1">Append‑only, time‑stamped access</div>
        </div>
      </div>
    </div>
  );
}

function CodeSketch() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 font-mono text-sm text-slate-800">
      <div className="text-slate-500">// Partner receives signed webhook</div>
      <pre className="mt-3 overflow-x-auto">
        <code className="leading-relaxed">
{`POST /webhooks/verifyd-address-update
X-Verifyd-Signature: t=1696020000,v1=...

{ "user_id": "usr_123",
  "event": "address.updated",
  "effective_at": "2025-12-01T00:00:00Z",
  "diff": { "address": { "from": "...", "to": "..." } }
}`}
        </code>
      </pre>
      <div className="mt-4 text-slate-500">// Verify signature → fetch latest profile via SDK</div>
      <pre className="mt-3 overflow-x-auto">
        <code className="leading-relaxed">
{`import { Verifyd } from "@verifyd/sdk";
const client = new Verifyd({ apiKey: process.env.VERIFYD_KEY });
const profile = await client.profile.get("usr_123");
// Use field‑level permissions to populate your systems.`}
        </code>
      </pre>
    </div>
  );
}

function BuildersCTA() {
  return (
    <div id="builders" className="rounded-3xl bg-slate-50 text-[#0B0C10] p-8 md:p-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Stop Correcting Data. Start Using It.</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            A firehose of clean, consented, real‑time identity data. Eliminate decay, slash remediation overhead, and reduce fraud. Integrate our SDK in an afternoon and build on trusted user information forever.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#sandbox" className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
              Explore the Partner Sandbox <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#docs" className="inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-3 text-sm font-semibold hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20">
              Read the Docs <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
            <li className="flex items-center gap-2"><Webhook className="h-4 w-4" /> Signed webhooks, idempotent delivery</li>
            <li className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Field‑level data contracts</li>
            <li className="flex items-center gap-2"><Lock className="h-4 w-4" /> Passkey‑first user consent</li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> No bots, no scraping, ever</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 bg-white">
          <h3 className="text-base font-semibold">Business Impact</h3>
          <dl className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ImpactStat kpi="CS tickets" value="−80%" />
            <ImpactStat kpi="RMA/RTS" value="−35%" />
            <ImpactStat kpi="Integration" value="&lt; 1 day" />
          </dl>
          <p className="mt-3 text-xs text-slate-500">Outcomes vary by partner; validate with your data.</p>
        </div>
      </div>
    </div>
  );
}

function ImpactStat({ kpi, value }) {
  return (
    <div className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-200">
      <div className="text-xs uppercase tracking-wide text-slate-500">{kpi}</div>
      <div className="mt-1 text-2xl font-extrabold">{value}</div>
    </div>
  );
}

function WaitlistCTA({ email, setEmail }) {
  const [status, setStatus] = useState('idle');
  const [statusMsg, setStatusMsg] = useState('');
  
  return (
    <section id="waitlist" aria-labelledby="waitlist-heading" className="relative mt-20 isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-blue-500/20 to-transparent rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            id="waitlist-heading" 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Future of Identity Is Arriving.{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Be First in Line.
            </span>
          </motion.h2>
          
          <motion.p 
            className="mt-6 text-xl md:text-2xl text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Launching Winter 2025. Secure early access for a smarter, synchronized digital life.
          </motion.p>
          
          <motion.form
            onSubmit={async (e) => {
              e.preventDefault();
              if (status === 'loading') return;
              try {
                setStatus('loading');
                await new Promise((r) => setTimeout(r, 400));
                setStatus('success');
                setStatusMsg("You're on the list. We'll reach out with your invite.");
              } catch (err) {
                setStatus('error');
                setStatusMsg('Something went wrong. Please try again.');
              }
            }}
            className="mx-auto mt-12 flex w-full max-w-2xl items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-md p-3 border border-white/20 shadow-2xl"
            noValidate
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <label htmlFor="waitlist-email" className="sr-only">Email address</label>
            <input
              id="waitlist-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your primary email"
              className="flex-1 bg-white/5 text-white placeholder:text-slate-400 px-6 py-4 text-lg outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 rounded-xl border border-white/10"
              autoComplete="email"
              inputMode="email"
            />
            <motion.button
              type="submit"
              className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-60"
              aria-busy={status === 'loading'}
              disabled={status === 'loading'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'loading' ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Securing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Secure My Spot
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </motion.form>
          
          <motion.div 
            role="status" 
            aria-live="polite" 
            className="mt-6 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: status !== 'idle' ? 1 : 0 }}
          >
            {status !== 'idle' && (
              <span className={status === 'success' ? 'text-emerald-400' : status === 'error' ? 'text-rose-400' : 'text-slate-300'}>
                {statusMsg}
              </span>
            )}
          </motion.div>
          
          <motion.p 
            className="mt-6 text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            We respect your inbox. Only invites and essential updates. 
            <span className="text-white font-semibold"> No spam, ever.</span>
          </motion.p>
          
          <motion.div 
            className="mt-8 flex items-center justify-center gap-8 text-slate-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-400" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-400" />
              <span>GDPR Ready</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/50">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <VMark className="h-8 w-8" />
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Verifyd
              </span>
            </div>
            <p className="text-slate-600 max-w-md leading-relaxed mb-6">
              The future of digital identity management. Secure, synchronized, and completely under your control.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">Follow us:</span>
              <div className="flex gap-3">
                {['Twitter', 'LinkedIn', 'GitHub'].map((platform) => (
                  <a
                    key={platform}
                    href="#"
                    className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    <span className="text-xs font-semibold">{platform[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#features" className="hover:text-slate-900 transition-colors">Features</a></li>
              <li><a href="#architecture" className="hover:text-slate-900 transition-colors">Architecture</a></li>
              <li><a href="#builders" className="hover:text-slate-900 transition-colors">For Developers</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">API Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-slate-900 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © 2025 Verifyd, Inc. Jersey City, NJ · A new standard for digital identity.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-700 transition-colors">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function VMark({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stopColor="#111111" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#555555" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d="M10 20 L50 90 L90 20" stroke="url(#g)" strokeWidth="10" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// New enhanced components
function StatsSection() {
  const stats = [
    { label: "Data Accuracy", value: "99.9%", icon: CheckCircle, color: "text-green-500", gradient: "from-green-400 to-emerald-500" },
    { label: "Integration Time", value: "< 30min", icon: Zap, color: "text-yellow-500", gradient: "from-yellow-400 to-orange-500" },
    { label: "Security Events", value: "0", icon: ShieldCheck, color: "text-blue-500", gradient: "from-blue-400 to-cyan-500" },
    { label: "Partners Ready", value: "200+", icon: Building2, color: "text-purple-500", gradient: "from-purple-400 to-pink-500" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="relative group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          {/* Glow effect */}
          <div className={`absolute -inset-2 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />
          
          {/* Card */}
          <div className="relative p-6 text-center glass border border-white/20 rounded-2xl shadow-2xl">
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <stat.icon className="h-8 w-8 text-white" />
            </div>
            
            {/* Value */}
            <div className="text-4xl font-black text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {stat.value}
            </div>
            
            {/* Label */}
            <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FeaturesGrid() {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description: "Works with services worldwide. From local shops to international corporations.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Manage identity permissions for your entire organization with role-based controls.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track how your data flows and see which services are using your information.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Star,
      title: "Premium Support",
      description: "24/7 dedicated support team to help you with any integration challenges.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <div>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 id="features" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Built for the <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Modern Web</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Every feature designed with privacy, security, and developer experience in mind.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-6`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Verifyd saved us countless hours of customer support tickets related to outdated shipping addresses.",
      author: "Sarah Chen",
      role: "CTO, FastCommerce",
      avatar: "SC"
    },
    {
      quote: "The developer experience is incredible. Integration took less than an afternoon.",
      author: "Marcus Rodriguez",
      role: "Lead Engineer, TechFlow",
      avatar: "MR"
    },
    {
      quote: "Finally, a solution that puts users in control of their own data. Game-changing.",
      author: "Emily Watson",
      role: "Product Manager, StartupCo",
      avatar: "EW"
    }
  ];

  return (
    <div>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 id="testimonials" className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          Loved by <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Developers</span>
        </h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          See what teams are saying about their Verifyd integration experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.author}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-slate-700 mb-6 italic">
              "{testimonial.quote}"
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-semibold text-slate-900">{testimonial.author}</div>
                <div className="text-sm text-slate-600">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

