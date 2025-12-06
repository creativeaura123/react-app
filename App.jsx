import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence } from 'framer-motion';
import { Dumbbell, Calendar, Utensils, Users, ChevronRight, Play, User, LogOut, LayoutDashboard, Settings, Activity, Plus, Edit, Save, Trash2, X, Quote, ChevronDown, CheckCircle, Menu, TrendingUp, Calculator, RefreshCw, MessageCircle, MapPin, Phone, Mail, Clock, Send, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

// --- 3D Card Component (Visuals) ---
const TiltCard = ({ title, icon: Icon, desc }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]); 
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);

  return (
    <motion.div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
        style={{ rotateX, rotateY }}
        className="h-full bg-zinc-900 border border-zinc-800 p-8 rounded-2xl relative overflow-hidden group hover:border-neon-green transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col items-center text-center h-full">
          <div className="bg-zinc-800 p-4 rounded-full mb-6 group-hover:bg-neon-green group-hover:text-black transition-colors duration-300">
            <Icon size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 uppercase tracking-wider">{title}</h3>
          <p className="text-zinc-400 leading-relaxed">{desc}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Hero Section Component ---
const HeroSection = ({ onCtaClick }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section ref={targetRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.9),rgba(0,0,0,1)),url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.1)_0%,transparent_70%)]" />
      
      <motion.div style={{ opacity, scale, y }} className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h2 className="text-neon-green font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">Welcome to the Future of Fitness</h2>
          <h1 className="text-5xl md:text-9xl font-black italic tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 drop-shadow-2xl">
            BUILD YOUR<br />LEGACY
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg mb-10">
            Experience the ultimate transformation at Elite Fitness. High-end equipment, professional coaching, and a community driven by results.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={onCtaClick} className="bg-neon-green text-black px-8 py-4 rounded-none font-black uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Member Login <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// --- About Us Component ---
const AboutUs = () => {
  return (
    <div className="pt-24 pb-12 animate-fade-in">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white mb-6">Our <span className="text-neon-green">Story</span></h1>
        <p className="text-zinc-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Established in 2015, Elite Fitness wasn't just built to be a gym. It was built to be a sanctuary for those who refuse to be average. We believe that strength is not just physical—it's mental.
        </p>
      </div>

      {/* Stats Row */}
      <div className="bg-zinc-900 border-y border-zinc-800 py-12 mb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
           {[
             { label: "Active Members", val: "1,500+" },
             { label: "Years of Excellence", val: "9+" },
             { label: "Certified Trainers", val: "12" },
             { label: "Success Stories", val: "500+" }
           ].map((stat, i) => (
             <div key={i}>
               <h3 className="text-4xl font-black text-white mb-1">{stat.val}</h3>
               <p className="text-neon-green uppercase text-xs tracking-widest font-bold">{stat.label}</p>
             </div>
           ))}
        </div>
      </div>

      {/* The Coach Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
         <div className="bg-black border border-zinc-800 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-zinc-900/50 to-transparent pointer-events-none" />
            
            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
               <div className="w-full md:w-1/3">
                  <div className="aspect-square rounded-2xl overflow-hidden border-2 border-zinc-700 shadow-2xl">
                     <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800" alt="Sampath Silva" className="w-full h-full object-cover" />
                  </div>
               </div>
               <div className="w-full md:w-2/3">
                  <h4 className="text-neon-green font-bold uppercase tracking-widest mb-2">The Founder</h4>
                  <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white mb-6">Sampath Silva</h2>
                  <p className="text-zinc-300 leading-relaxed mb-6">
                    "I started Elite Fitness with a single dumbbell and a dream. Today, we stand as a testament to what consistency and discipline can achieve. My coaching philosophy is simple: **Don't wish for it, work for it.** I personally oversee the training programs to ensure every member gets the elite treatment they deserve."
                  </p>
                  <div className="flex gap-4">
                     <div className="px-4 py-2 bg-zinc-800 rounded text-xs uppercase font-bold text-zinc-400">Cert. Personal Trainer</div>
                     <div className="px-4 py-2 bg-zinc-800 rounded text-xs uppercase font-bold text-zinc-400">Nutrition Specialist</div>
                     <div className="px-4 py-2 bg-zinc-800 rounded text-xs uppercase font-bold text-zinc-400">Bodybuilding Pro</div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

// --- Contact Us Component ---
const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', type: 'Membership', message: '' });

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const phoneNumber = "94771234567"; // Replace with actual gym number
    const text = `Hi Elite Fitness,%0A%0AMy Name: ${formData.name}%0AInquiry Type: ${formData.type}%0AMessage: ${formData.message}`;
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-24 pb-12 animate-fade-in min-h-screen">
       <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black italic uppercase text-white mb-4">Get In <span className="text-neon-green">Touch</span></h1>
            <p className="text-zinc-400">We are here to help you start your journey.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Info Cards */}
             <div className="space-y-6">
                <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex items-start gap-6 hover:border-neon-green transition-colors">
                   <div className="bg-black p-4 rounded-full text-neon-green"><MapPin size={24}/></div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2 uppercase">Visit Us</h3>
                      <p className="text-zinc-400">123, Fitness Avenue,<br/>Colombo 07, Sri Lanka.</p>
                   </div>
                </div>

                <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex items-start gap-6 hover:border-neon-green transition-colors">
                   <div className="bg-black p-4 rounded-full text-neon-green"><Clock size={24}/></div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2 uppercase">Opening Hours</h3>
                      <p className="text-zinc-400">Mon - Fri: 5:00 AM - 10:00 PM</p>
                      <p className="text-zinc-400">Sat - Sun: 6:00 AM - 08:00 PM</p>
                   </div>
                </div>

                <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 flex items-start gap-6 hover:border-neon-green transition-colors">
                   <div className="bg-black p-4 rounded-full text-neon-green"><Phone size={24}/></div>
                   <div>
                      <h3 className="text-xl font-bold text-white mb-2 uppercase">Call Us</h3>
                      <p className="text-zinc-400">+94 11 234 5678</p>
                      <p className="text-zinc-400">+94 77 123 4567</p>
                   </div>
                </div>
             </div>

             {/* WhatsApp Form */}
             <div className="bg-black border border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/10 rounded-full blur-3xl pointer-events-none"/>
                
                <h3 className="text-2xl font-bold text-white mb-6 uppercase flex items-center gap-2">
                   <MessageCircle className="text-green-500"/> Chat on WhatsApp
                </h3>
                
                <form onSubmit={handleWhatsAppSend} className="space-y-6">
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-4 text-white focus:border-green-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                      />
                   </div>
                   
                   <div>
                      <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Inquiry Type</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-4 text-white focus:border-green-500 focus:outline-none transition-colors"
                      >
                         <option>Membership Inquiry</option>
                         <option>Personal Training</option>
                         <option>Nutrition Plans</option>
                         <option>Other</option>
                      </select>
                   </div>

                   <div>
                      <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Message</label>
                      <textarea 
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full h-32 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-4 text-white focus:border-green-500 focus:outline-none transition-colors resize-none"
                        placeholder="Hi, I would like to know about..."
                      />
                   </div>

                   <button type="submit" className="w-full bg-[#25D366] text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                      <Send size={20}/> Send via WhatsApp
                   </button>
                   <p className="text-xs text-zinc-600 text-center">This will open WhatsApp on your device.</p>
                </form>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- Success Stories Component ---
const SuccessStories = () => {
  const stories = [
    { name: "Ruwan Fernado", lost: "25kg", time: "8 Months", img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600" },
    { name: "Dilhani Perera", lost: "15kg", time: "6 Months", img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=600" },
    { name: "Aruna Silva", lost: "Muscle Gain", time: "1 Year", img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=600" },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-4">Real <span className="text-neon-green">Results</span></h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Real people, real stories. See how our members transformed their lives.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-zinc-800 hover:border-neon-green transition-all duration-500">
              <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-black italic uppercase text-white mb-2">{story.name}</h3>
                
                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="bg-neon-green/20 border border-neon-green/50 p-3 rounded-lg flex-1 text-center backdrop-blur-sm">
                    <span className="block text-xs uppercase text-neon-green font-bold">Result</span>
                    <span className="text-white font-bold">{story.lost}</span>
                  </div>
                  <div className="bg-zinc-800/80 border border-zinc-700 p-3 rounded-lg flex-1 text-center backdrop-blur-sm">
                    <span className="block text-xs uppercase text-zinc-400 font-bold">Time</span>
                    <span className="text-white font-bold">{story.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- BMI Calculator Component ---
const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  const calculateBMI = () => {
    if (height && weight) {
      const h = height / 100;
      const bmiValue = (weight / (h * h)).toFixed(1);
      setBmi(bmiValue);
      
      if (bmiValue < 18.5) setStatus({ text: 'Underweight', color: 'text-blue-400', width: '20%' });
      else if (bmiValue < 25) setStatus({ text: 'Normal', color: 'text-neon-green', width: '50%' });
      else if (bmiValue < 30) setStatus({ text: 'Overweight', color: 'text-yellow-400', width: '75%' });
      else setStatus({ text: 'Obese', color: 'text-red-500', width: '100%' });
    }
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setStatus('');
  };

  return (
    <section className="py-24 bg-black border-t border-zinc-900 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
          
          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="text-neon-green" size={32} />
              <h2 className="text-3xl md:text-4xl font-black italic uppercase text-white">BMI <span className="text-neon-green">Check</span></h2>
            </div>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Find out if you are in the healthy range. Input your height and weight to get an instant analysis of your body mass index.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-4 text-white text-lg focus:border-neon-green focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-zinc-500 font-bold mb-2">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-4 text-white text-lg focus:border-neon-green focus:outline-none transition-colors"
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button onClick={calculateBMI} className="flex-1 bg-neon-green text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Calculate
                </button>
                <button onClick={reset} className="w-16 bg-zinc-800 text-white rounded-lg flex items-center justify-center hover:bg-zinc-700 transition-colors">
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-black rounded-2xl p-8 border border-zinc-800 h-full flex flex-col justify-center items-center text-center relative overflow-hidden">
            {bmi ? (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full">
                <p className="text-zinc-500 uppercase text-sm tracking-widest font-bold mb-2">Your BMI Score</p>
                <h3 className="text-7xl font-black text-white mb-2">{bmi}</h3>
                <p className={`text-2xl font-bold uppercase italic mb-8 ${status.color}`}>{status.text}</p>
                
                <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden mb-4 relative">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: status.width }} 
                    transition={{ duration: 1, type: 'spring' }}
                    className={`h-full ${status.text === 'Normal' ? 'bg-neon-green' : status.text === 'Underweight' ? 'bg-blue-400' : 'bg-red-500'}`} 
                  />
                </div>
                <div className="flex justify-between text-xs text-zinc-600 font-mono uppercase">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                </div>
              </motion.div>
            ) : (
              <div className="opacity-30">
                <Activity size={100} className="text-zinc-700 mx-auto mb-4" />
                <p className="text-zinc-500 uppercase tracking-widest font-bold">Enter details to calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Auth Components (Existing) ---
const InputField = ({ label, type, placeholder, value, onChange, name, required = false }) => (
  <div className="mb-4">
    <label className="block text-neon-green text-xs uppercase tracking-widest mb-2 font-bold">{label}</label>
    <input 
      type={type} 
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green transition-all placeholder:text-zinc-600"
    />
  </div>
);

const AuthForm = ({ onLogin, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (username === 'admin' && password === 'admin123') {
      onLogin({ id: 'admin', name: 'Administrator', role: 'admin' });
      return;
    }

    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      onLogin(foundUser);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black border border-zinc-800 p-8 md:p-12 rounded-3xl w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent" />
        <h2 className="text-3xl font-black italic text-white mb-2 uppercase">Welcome Back</h2>
        <p className="text-zinc-400 mb-8 text-sm">Enter your credentials to access your dashboard.</p>
        
        {error && <div className="bg-red-500/10 text-red-500 p-3 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <InputField label="Username" type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-neon-green text-black font-black uppercase tracking-widest py-4 rounded-lg hover:bg-white transition-colors mt-4">
            Sign In
          </button>
        </form>

        <div className="mt-8 p-3 bg-zinc-900/50 rounded text-xs text-zinc-600 text-center">
          <p>Admin Login: admin / admin123</p>
          <p>Demo User: kamal / 1234</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- Admin Components (Existing) ---
const MemberModal = ({ isOpen, onClose, onSave, editingUser }) => {
  const [formData, setFormData] = useState({
    username: '', password: '', fullName: '', email: '', address: '', age: '', mobile: '', weight: '', height: ''
  });

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({ username: '', password: '', fullName: '', email: '', address: '', age: '', mobile: '', weight: '', height: '' });
    }
  }, [editingUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center sticky top-0 bg-zinc-900 z-10">
          <h3 className="text-xl font-bold text-white">{editingUser ? 'Edit Member' : 'Add New Member'}</h3>
          <button onClick={onClose}><X className="text-zinc-400 hover:text-white" /></button>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Username" name="username" type="text" value={formData.username} onChange={handleChange} required />
          <InputField label="Password" name="password" type="text" value={formData.password} onChange={handleChange} required />
          <div className="md:col-span-2"><InputField label="Full Name" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required /></div>
          <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <InputField label="Mobile" name="mobile" type="text" value={formData.mobile} onChange={handleChange} />
          <div className="md:col-span-2"><InputField label="Address" name="address" type="text" value={formData.address} onChange={handleChange} /></div>
          <div className="grid grid-cols-3 gap-2 md:col-span-2">
             <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} />
             <InputField label="Weight (kg)" name="weight" type="number" value={formData.weight} onChange={handleChange} />
             <InputField label="Height (cm)" name="height" type="number" value={formData.height} onChange={handleChange} />
          </div>
        </div>
        <div className="p-6 border-t border-zinc-800 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-zinc-400 hover:text-white">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 bg-neon-green text-black font-bold rounded hover:bg-white">Save Member</button>
        </div>
      </div>
    </div>
  );
};

// --- Plan Editor (Admin - Existing) ---
const PlanEditor = ({ user, onUpdatePlan, onBack }) => {
  const [activeTab, setActiveTab] = useState('workout');
  const [schedule, setSchedule] = useState(() => {
    const defaultDays = { Mon: {}, Tue: {}, Wed: {}, Thu: {}, Fri: {}, Sat: {}, Sun: {} };
    const current = user.schedule || {};
    const merged = {};
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(day => {
      if (typeof current[day] === 'string') {
        merged[day] = { focus: current[day], exercises: '' };
      } else {
        merged[day] = current[day] || { focus: '', exercises: '' };
      }
    });
    return merged;
  });

  const [mealPlan, setMealPlan] = useState(() => {
    if (typeof user.mealPlan === 'string') {
       return { Mon: user.mealPlan, Tue: user.mealPlan, Wed: user.mealPlan, Thu: user.mealPlan, Fri: user.mealPlan, Sat: user.mealPlan, Sun: user.mealPlan };
    }
    return user.mealPlan || { Mon: '', Tue: '', Wed: '', Thu: '', Fri: '', Sat: '', Sun: '' };
  });

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleSave = () => {
    onUpdatePlan(user.id, { schedule, mealPlan });
  };

  const updateSchedule = (day, field, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  return (
    <div className="animate-fade-in pb-12">
       <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
         <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-zinc-400 hover:text-white flex items-center gap-1 text-sm uppercase tracking-wider"><ChevronRight className="rotate-180" size={16}/> Back</button>
            <h2 className="text-2xl font-bold text-white">Plan For: <span className="text-neon-green">{user.fullName}</span></h2>
         </div>
         <button onClick={handleSave} className="bg-neon-green text-black px-6 py-3 rounded-full font-black uppercase tracking-widest hover:bg-white flex items-center gap-2 w-full md:w-auto justify-center">
            <Save size={20}/> Save All
         </button>
       </div>

       <div className="flex flex-col md:flex-row gap-4 mb-8">
         <button onClick={() => setActiveTab('workout')} className={`px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider transition-all ${activeTab === 'workout' ? 'bg-zinc-800 text-neon-green border border-neon-green' : 'bg-zinc-900 text-zinc-500 border border-transparent'}`}>
            Workout Schedule
         </button>
         <button onClick={() => setActiveTab('nutrition')} className={`px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider transition-all ${activeTab === 'nutrition' ? 'bg-zinc-800 text-neon-green border border-neon-green' : 'bg-zinc-900 text-zinc-500 border border-transparent'}`}>
            Meal Plans (7 Days)
         </button>
       </div>

       {activeTab === 'workout' ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {days.map(day => (
             <div key={day} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-neon-green font-black uppercase text-xl">{day}</span>
                 <Dumbbell size={16} className="text-zinc-600" />
               </div>
               
               <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Focus Area</label>
               <input 
                 type="text" 
                 value={schedule[day]?.focus || ''} 
                 onChange={(e) => updateSchedule(day, 'focus', e.target.value)}
                 placeholder="e.g. Chest & Triceps"
                 className="w-full bg-black border border-zinc-700 rounded px-3 py-2 text-white text-sm mb-4 focus:border-neon-green focus:outline-none"
               />

               <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Detailed Exercises</label>
               <textarea 
                 value={schedule[day]?.exercises || ''}
                 onChange={(e) => updateSchedule(day, 'exercises', e.target.value)}
                 placeholder="e.g. Bench Press 3x10..."
                 className="w-full h-32 bg-black border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:border-neon-green focus:outline-none resize-none"
               />
             </div>
           ))}
         </div>
       ) : (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {days.map(day => (
             <div key={day} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-neon-green font-black uppercase text-xl">{day}</span>
                 <Utensils size={16} className="text-zinc-600" />
               </div>
               
               <label className="text-xs text-zinc-500 font-bold uppercase mb-1 block">Daily Meal Plan</label>
               <textarea 
                 value={mealPlan[day] || ''}
                 onChange={(e) => setMealPlan({...mealPlan, [day]: e.target.value})}
                 placeholder={`Breakfast: ... \nLunch: ...`}
                 className="w-full h-48 bg-black border border-zinc-700 rounded px-3 py-2 text-white text-sm focus:border-neon-green focus:outline-none resize-none"
               />
             </div>
           ))}
         </div>
       )}
    </div>
  );
};

// --- Admin Dashboard (Existing) ---
const AdminDashboard = ({ users, setUsers }) => {
  const [activeView, setActiveView] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleSaveMember = (formData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
    } else {
      const newUser = { 
        ...formData, 
        id: Date.now(), 
        role: 'user', 
        schedule: { Mon: { focus: 'Rest', exercises: '' }, Tue: { focus: 'Rest', exercises: '' }, Wed: { focus: 'Rest', exercises: '' }, Thu: { focus: 'Rest', exercises: '' }, Fri: { focus: 'Rest', exercises: '' }, Sat: { focus: 'Rest', exercises: '' }, Sun: { focus: 'Rest', exercises: '' } },
        mealPlan: { Mon: 'Balanced Diet', Tue: 'Balanced Diet', Wed: 'Balanced Diet', Thu: 'Balanced Diet', Fri: 'Balanced Diet', Sat: 'Balanced Diet', Sun: 'Balanced Diet' }
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this member?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleUpdatePlan = (userId, newPlanData) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...newPlanData } : u));
    alert('Plan updated successfully!');
  };

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
      <MemberModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingUser(null); }} 
        onSave={handleSaveMember} 
        editingUser={editingUser}
      />

      {activeView === 'list' ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h1 className="text-4xl font-black italic uppercase text-white">Admin <span className="text-neon-green">Control</span></h1>
              <p className="text-zinc-400">Manage members and assign custom plans.</p>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-neon-green text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white flex items-center gap-2">
              <Plus size={20}/> Add Member
            </button>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-zinc-400 min-w-[800px] md:min-w-0">
                <thead className="text-xs uppercase tracking-widest border-b border-zinc-800 bg-zinc-950">
                  <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Username</th>
                    <th className="p-4">Mobile</th>
                    <th className="p-4">Stats</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.length === 0 ? (
                    <tr><td colSpan="5" className="p-8 text-center">No members found. Add one to get started.</td></tr>
                  ) : (
                    users.map((member) => (
                      <tr key={member.id} className="border-b border-zinc-800/50 last:border-0 hover:bg-zinc-800/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-white">{member.fullName}</div>
                          <div className="text-xs">{member.email}</div>
                        </td>
                        <td className="p-4 text-neon-green font-mono">{member.username}</td>
                        <td className="p-4">{member.mobile}</td>
                        <td className="p-4 text-xs">
                          <span className="block">H: {member.height}cm</span>
                          <span className="block">W: {member.weight}kg</span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => { setSelectedUser(member); setActiveView('editPlan'); }} className="bg-zinc-800 hover:bg-neon-green hover:text-black p-2 rounded text-xs uppercase font-bold tracking-wider transition-colors">
                              Plan
                            </button>
                            <button onClick={() => { setEditingUser(member); setIsModalOpen(true); }} className="p-2 text-zinc-400 hover:text-white"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(member.id)} className="p-2 text-zinc-400 hover:text-red-500"><Trash2 size={16}/></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <PlanEditor 
          user={selectedUser} 
          onUpdatePlan={handleUpdatePlan} 
          onBack={() => { setActiveView('list'); setSelectedUser(null); }}
        />
      )}
    </div>
  );
};

// --- User Dashboard (Existing) ---
const AccordionItem = ({ title, subTitle, children, isOpen, onClick }) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-3">
            <button 
                onClick={onClick}
                className={`w-full p-4 flex items-center justify-between text-left transition-all ${isOpen ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'}`}
            >
                <div className="flex items-center gap-4">
                    <span className={`font-black uppercase text-lg w-12 ${isOpen ? 'text-neon-green' : 'text-zinc-500'}`}>{title}</span>
                    <span className="text-white font-bold">{subTitle}</span>
                </div>
                <ChevronDown className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-black/50 border-t border-zinc-800 text-zinc-300 whitespace-pre-line text-sm leading-relaxed">
                            {children || "No details available."}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const UserDashboard = ({ user }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date().toString().split(' ')[0];
  const [activeTab, setActiveTab] = useState('workout'); // workout, nutrition
  const [expandedDay, setExpandedDay] = useState(today);

  const getSchedule = (day) => {
    const s = user.schedule?.[day];
    if (!s) return { focus: 'Rest', exercises: '' };
    if (typeof s === 'string') return { focus: s, exercises: '' };
    return s;
  };

  const getMeal = (day) => {
    const m = user.mealPlan?.[day];
    if (typeof user.mealPlan === 'string') return user.mealPlan;
    return m || "No meal plan.";
  };

  const todayData = getSchedule(today);

  return (
    <div className="pt-24 pb-12 max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/3">
          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center sticky top-24">
            <div className="w-32 h-32 bg-zinc-800 rounded-full mx-auto mb-6 flex items-center justify-center border-2 border-neon-green text-neon-green">
              <User size={64} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1 uppercase">{user.fullName}</h2>
            <p className="text-zinc-500 text-sm mb-6">{user.email}</p>
            
            <div className="bg-black p-4 rounded-xl border border-zinc-800 mb-6 text-left space-y-3">
              <div className="flex justify-between text-sm"><span className="text-zinc-400">Age</span> <span className="text-white font-bold">{user.age}</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-400">Weight</span> <span className="text-white font-bold">{user.weight}kg</span></div>
              <div className="flex justify-between text-sm"><span className="text-zinc-400">Height</span> <span className="text-white font-bold">{user.height}cm</span></div>
            </div>
            
            <div className="p-4 bg-neon-green/10 rounded-xl border border-neon-green/20">
              <p className="text-neon-green text-xs font-bold uppercase tracking-widest mb-1">Status</p>
              <p className="text-white font-bold">Active Member</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-2/3 space-y-8">
          <div className="bg-gradient-to-r from-neon-green to-green-600 p-8 rounded-2xl relative overflow-hidden text-black">
             <div className="relative z-10">
               <div className="flex justify-between items-start">
                   <div>
                       <p className="font-bold text-black/60 uppercase text-xs tracking-widest mb-2">Today is {today}</p>
                       <h3 className="font-black text-4xl italic uppercase mb-2">{todayData.focus}</h3>
                   </div>
                   <div className="bg-black/20 p-2 rounded-full"><Activity size={24} className="text-black"/></div>
               </div>
               
               <div className="mt-4 bg-white/20 backdrop-blur-sm p-4 rounded-xl border border-black/5">
                    <p className="font-bold text-sm mb-1 uppercase opacity-70">Quick Look:</p>
                    <p className="text-sm font-medium line-clamp-2">{todayData.exercises || "No specific exercises listed. Consult your coach."}</p>
               </div>
               
               <button className="mt-6 bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-xs tracking-wider hover:scale-105 transition-transform flex items-center gap-2">
                   Start Workout <Play size={14} fill="white" />
               </button>
             </div>
             <Dumbbell className="absolute right-[-40px] bottom-[-40px] text-black opacity-10 transform -rotate-12" size={300} />
          </div>

          <div className="flex gap-4 border-b border-zinc-800 pb-4 overflow-x-auto">
             <button onClick={() => setActiveTab('workout')} className={`text-lg font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'workout' ? 'text-neon-green' : 'text-zinc-600 hover:text-white'}`}>Workout Schedule</button>
             <button onClick={() => setActiveTab('nutrition')} className={`text-lg font-bold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === 'nutrition' ? 'text-neon-green' : 'text-zinc-600 hover:text-white'}`}>Meal Plan</button>
          </div>

          <div className="space-y-2">
            {activeTab === 'workout' ? (
                days.map(day => {
                    const data = getSchedule(day);
                    return (
                        <AccordionItem 
                            key={day} 
                            title={day} 
                            subTitle={data.focus} 
                            isOpen={expandedDay === day} 
                            onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                        >
                            <div className="flex flex-col gap-2">
                                <span className="text-neon-green text-xs font-bold uppercase tracking-widest">Instructions</span>
                                <p>{data.exercises || "Rest day or no exercises assigned."}</p>
                            </div>
                        </AccordionItem>
                    );
                })
            ) : (
                days.map(day => (
                    <AccordionItem 
                        key={day} 
                        title={day} 
                        subTitle="Nutrition Plan" 
                        isOpen={expandedDay === day} 
                        onClick={() => setExpandedDay(expandedDay === day ? null : day)}
                    >
                         <div className="flex flex-col gap-2">
                            <span className="text-neon-green text-xs font-bold uppercase tracking-widest">Meals</span>
                            <p>{getMeal(day)}</p>
                        </div>
                    </AccordionItem>
                ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('home');
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [users, setUsers] = useState([
    { 
      id: 1, 
      username: 'kamal', 
      password: '123', 
      fullName: 'Kamal Perera', 
      email: 'kamal@gmail.com',
      address: '123, Main St, Colombo',
      age: 24,
      mobile: '0771234567',
      weight: 75,
      height: 175,
      role: 'user', 
      schedule: { 
          Mon: { focus: 'Chest & Triceps', exercises: 'Bench Press: 4 sets x 10 reps\nIncline DB Press: 3 sets x 12 reps\nCable Flys: 3 sets x 15 reps\nTricep Pushdowns: 4 sets x 12 reps' }, 
          Tue: { focus: 'Back & Biceps', exercises: 'Lat Pulldowns: 4 sets x 10 reps\nBent Over Rows: 3 sets x 10 reps\nBarbell Curls: 3 sets x 12 reps' }, 
          Wed: { focus: 'Rest', exercises: 'Active recovery. Light walk.' }, 
          Thu: { focus: 'Legs', exercises: 'Squats: 5 sets x 8 reps\nLeg Press: 4 sets x 12 reps\nCalf Raises: 4 sets x 20 reps' }, 
          Fri: { focus: 'Shoulders', exercises: 'Overhead Press: 4 sets x 8 reps\nLateral Raises: 4 sets x 15 reps' }, 
          Sat: { focus: 'Cardio & Abs', exercises: 'Treadmill: 20 mins\nPlanks: 3 sets x 1 min' }, 
          Sun: { focus: 'Rest', exercises: 'Full rest.' } 
      },
      mealPlan: {
          Mon: 'Breakfast: Oatmeal with banana\nLunch: Grilled Chicken & Rice\nDinner: Fish & Salad',
          Tue: 'Breakfast: Scrambled Eggs\nLunch: Tuna Sandwich\nDinner: Chicken Soup',
          Wed: 'Breakfast: Smoothie\nLunch: Rice & Curry\nDinner: Lean Beef & Veggies',
          Thu: 'Breakfast: Oatmeal\nLunch: Grilled Chicken\nDinner: Salad',
          Fri: 'Breakfast: Eggs & Toast\nLunch: Pasta with Chicken\nDinner: Fish',
          Sat: 'Breakfast: Pancakes (Healthy)\nLunch: Rice & Chicken\nDinner: Soup',
          Sun: 'Cheat Meal (Moderate)'
      }
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('home');
  };

  const renderContent = () => {
    if (view === 'login') return <AuthForm onLogin={handleLogin} users={users} />;
    if (view === 'about') return <AboutUs />;
    if (view === 'contact') return <ContactUs />;
    
    if (view === 'dashboard' && currentUser) {
      return currentUser.role === 'admin' 
        ? <AdminDashboard users={users} setUsers={setUsers} /> 
        : <UserDashboard user={currentUser} />;
    }

    // Default Home View
    return (
      <>
        <HeroSection onCtaClick={() => setView('login')} />

        {/* Features Section */}
        <section id="features" className="py-24 bg-black relative">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-4">Why Choose <span className="text-neon-green">Elite?</span></h2>
              <div className="w-24 h-1 bg-neon-green mx-auto" />
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-auto md:h-96">
              {[
                { title: "Advanced Equipment", icon: Dumbbell, desc: "Latest biomechanics technology for maximum muscle isolation and safety." },
                { title: "Expert Coaching", icon: Users, desc: "Certified trainers dedicated to pushing your limits and perfecting your form." },
                { title: "Nutrition Plans", icon: Utensils, desc: "Customized meal prep guides to fuel your body and accelerate recovery." },
              ].map((feature, idx) => (
                <TiltCard key={idx} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* COACH SECTION */}
        <section id="coaches" className="py-24 bg-zinc-900 border-t border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-neon-green/5 skew-x-12 transform origin-top-right pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-neon-green shadow-[0_0_50px_rgba(204,255,0,0.3)] z-10 relative">
                     <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=800" alt="Sampath Silva" className="w-full h-full object-cover transition-all duration-500" />
                  </div>
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-20px] border border-dashed border-zinc-600 rounded-full z-0 opacity-50"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 text-left">
                <div className="mb-8">
                  <h2 className="text-4xl md:text-7xl font-black italic uppercase text-white mb-2">Sampath <span className="text-neon-green">Silva</span></h2>
                  <h3 className="text-xl text-zinc-400 font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                    <div className="w-8 h-1 bg-neon-green"/> Head Coach & Founder
                  </h3>
                  
                  <div className="relative">
                    <Quote className="absolute -top-4 -left-6 text-zinc-800 transform -scale-x-100" size={64} />
                    <p className="text-zinc-300 text-lg leading-relaxed relative z-10 font-medium">
                      "Fitness is not just about building a body; it's about building a mindset. My mission is to push you beyond your limits and help you discover the strength you never knew you had. Join me, and let's sculpt a masterpiece together."
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl relative group bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                  
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-64 md:h-80 object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  >
                    <source src="https://static.videezy.com/system/resources/previews/000/005/030/original/P1030248.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  <div className="absolute bottom-6 left-6 z-20">
                    <div className="flex items-center gap-2 mb-1">
                       <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                       <span className="text-red-500 font-bold uppercase text-xs tracking-widest">Live Action</span>
                    </div>
                    <h4 className="text-white font-bold uppercase text-xl italic">Training in Progress</h4>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- BMI CALCULATOR SECTION --- */}
        <BMICalculator />

        {/* --- REAL RESULTS (Moved to End) --- */}
        <SuccessStories />

      </>
    );
  };

  return (
    // UPDATED: selection:bg-zinc-800 selection:text-neon-green for matrix style highlight
    <div className="bg-black min-h-screen text-white font-sans overflow-x-hidden selection:bg-zinc-800 selection:text-neon-green">
      <style>{`
        .text-neon-green { color: #ccff00; }
        .bg-neon-green { background-color: #ccff00; }
        .border-neon-green { border-color: #ccff00; }
        .hover\\:bg-neon-green:hover { background-color: #ccff00; }
        .hover\\:text-neon-green:hover { color: #ccff00; }
        .shadow-neon { box-shadow: 0 0 20px rgba(204, 255, 0, 0.3); }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
              <Dumbbell className="text-neon-green transform -rotate-45" size={32} />
              <span className="text-2xl font-black tracking-tighter italic">ELITE<span className="text-neon-green">FITNESS</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <div className="flex gap-8 font-medium text-sm tracking-widest uppercase">
                <button onClick={() => setView('home')} className={`hover:text-neon-green transition-colors ${view === 'home' ? 'text-neon-green' : ''}`}>Home</button>
                <button onClick={() => setView('about')} className={`hover:text-neon-green transition-colors ${view === 'about' ? 'text-neon-green' : ''}`}>About</button>
                <button onClick={() => setView('contact')} className={`hover:text-neon-green transition-colors ${view === 'contact' ? 'text-neon-green' : ''}`}>Contact</button>
                {currentUser && <button onClick={() => setView('dashboard')} className={`hover:text-neon-green transition-colors ${view === 'dashboard' ? 'text-neon-green' : ''}`}>Dashboard</button>}
              </div>
              
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <span className="text-xs uppercase font-bold text-zinc-400">Hi, {currentUser.fullName || currentUser.name}</span>
                  <button onClick={handleLogout} className="bg-zinc-800 p-2 rounded-full hover:bg-red-500 hover:text-white transition-colors" title="Logout">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button onClick={() => setView('login')} className="bg-neon-green text-black px-6 py-2 rounded-full font-bold uppercase text-sm tracking-wider hover:bg-white hover:shadow-neon transition-all duration-300">
                  Member Area
                </button>
              )}
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden pt-4 pb-2 border-t border-zinc-800 mt-4 overflow-hidden"
              >
                <div className="flex flex-col gap-4 font-medium text-sm tracking-widest uppercase text-center">
                  <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">Home</button>
                  <button onClick={() => { setView('about'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">About</button>
                  <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">Contact</button>
                  {currentUser && <button onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }} className="py-2 hover:text-neon-green transition-colors">Dashboard</button>}
                  
                  {currentUser ? (
                    <div className="flex flex-col items-center gap-4 pt-4 border-t border-zinc-800">
                      <span className="text-xs uppercase font-bold text-zinc-400">Hi, {currentUser.fullName || currentUser.name}</span>
                      <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-red-500">
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => { setView('login'); setIsMobileMenuOpen(false); }} className="bg-neon-green text-black px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider mt-2">
                      Member Area
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <main className="pt-20">
        {renderContent()}
      </main>

      <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-900 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Section 1: Brand */}
            <div className="col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="text-neon-green transform -rotate-45" size={24} />
                <span className="text-2xl font-black tracking-tighter italic text-white">ELITE<span className="text-neon-green">FITNESS</span></span>
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                More than just a gym. We are a community dedicated to physical excellence and mental toughness. Join the movement.
              </p>
            </div>

            {/* Section 2: Links */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><button onClick={() => setView('home')} className="hover:text-neon-green transition-colors">Home</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-neon-green transition-colors">About Us</button></li>
                <li><button onClick={() => setView('contact')} className="hover:text-neon-green transition-colors">Contact</button></li>
                <li><button onClick={() => setView('login')} className="hover:text-neon-green transition-colors">Member Area</button></li>
              </ul>
            </div>

            {/* Section 3: Social */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Connect</h4>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-400 hover:bg-neon-green hover:text-black transition-all">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <div className="mt-8">
                <p className="text-zinc-500 text-xs mb-2">Subscribe to our newsletter</p>
                <div className="flex">
                  <input type="email" placeholder="Email" className="bg-zinc-900 border border-zinc-800 text-white px-4 py-2 text-sm rounded-l-lg focus:outline-none focus:border-neon-green w-full" />
                  <button className="bg-neon-green text-black px-4 py-2 rounded-r-lg font-bold uppercase text-xs hover:bg-white transition-colors"><ChevronRight size={16}/></button>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 pt-8 text-center">
            <p className="text-zinc-600 text-xs uppercase tracking-widest">
              © 2024 Elite Fitness Gym. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}