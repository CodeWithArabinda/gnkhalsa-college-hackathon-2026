import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ShieldAlert, Sparkles, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const { signIn, signUp, loginAsGuest } = useAuth();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState(''); // Only used for Sign Up options
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    if (isSignUp && !fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up with optional metadata options
        const { error } = await signUp(cleanEmail, cleanPassword, {
          data: { full_name: fullName.trim() }
        });
        if (error) throw error;
        
        // Notify user about confirmation email if applicable, or redirect
        alert('Registration successful! Please check your email inbox for confirmation, then log in.');
        setIsSignUp(false);
      } else {
        // Sign In
        const { error } = await signIn(cleanEmail, cleanPassword);
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Authentication error:', err);
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FFFDF8] flex flex-col items-center justify-center p-6 border-t-8 border-black">
      
      {/* Auth Card */}
      <div className="max-w-md w-full bg-white border-3 border-black p-8 rounded-2xl shadow-[6px_6px_0px_0px_#000] space-y-6">
        
        {/* Title & Badge */}
        <div className="text-center space-y-3">
          <div className="inline-block bg-[#FF70A6] text-black font-extrabold px-3 py-1 border-2 border-black rounded-full text-xs uppercase rotate-[-2deg] shadow-[2px_2px_0px_0px_#000]">
            ★ Instant Portfolio Creator
          </div>
          <h2 className="text-3xl font-heading font-black text-[#0F172A] tracking-tight">
            Join StackFolio ⚡
          </h2>
          <p className="text-xs font-semibold text-slate-500">
            Convert your static resume into a web portfolio in minutes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-2 border-black rounded-xl p-1 bg-slate-50">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-black rounded-lg border-2 transition-all ${
              !isSignUp
                ? 'bg-[#FFE600] border-black text-black shadow-[2px_2px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-transparent border-transparent text-slate-500 hover:text-black'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(''); }}
            className={`flex-1 py-2 text-xs font-black rounded-lg border-2 transition-all ${
              isSignUp
                ? 'bg-[#FFE600] border-black text-black shadow-[2px_2px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-transparent border-transparent text-slate-500 hover:text-black'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Banner */}
        {errorMsg && (
          <div className="bg-[#FF70A6] border-2 border-black p-3.5 rounded-xl flex gap-2.5 items-start text-xs font-bold text-black shadow-[2px_2px_0px_0px_#000] animate-fadeIn">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-black" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Aarya Shah"
                className="w-full px-3.5 py-2.5 text-sm bg-white border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                disabled={loading}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-white border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-[#0F172A] block">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-sm bg-white border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-black focus:outline-none transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center space-x-2 bg-[#FFE600] text-black font-heading font-black text-sm px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all disabled:opacity-50 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>{isSignUp ? 'Sign Up' : 'Log In'}</span>}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-4 font-mono text-[10px] uppercase font-bold text-slate-400">
          <div className="flex-1 h-0.5 bg-slate-200" />
          <span className="px-3">or</span>
          <div className="flex-1 h-0.5 bg-slate-200" />
        </div>

        {/* Guest Demo Button (Brutalist style) */}
        <button
          type="button"
          onClick={handleGuestMode}
          disabled={loading}
          className="w-full inline-flex items-center justify-center space-x-2 bg-[#A8FF78] text-black font-heading font-black text-sm px-6 py-3 border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
        >
          <Sparkles className="w-4 h-4 text-slate-800" />
          <span>⚡ Try Guest / Demo Mode</span>
        </button>

      </div>
    </div>
  );
}
