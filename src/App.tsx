/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  User, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  Upload, 
  Copy, 
  Check,
  Building2,
  Wallet,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

// Types for form data
interface FormData {
  firstName: string;
  lastName: string;
  amount: string;
  gender: string;
  accountDetails: string;
  bankName: string;
  creditOption: string;
  flexId: string;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    amount: '',
    gender: '',
    accountDetails: '',
    bankName: '',
    creditOption: 'Instant credit alert',
    flexId: '',
  });

  const [idError, setIdError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const CORRECT_FLEX_ID = 'FLEX10999';
  const ACCOUNT_NUMBER = '0435119272';
  const TELEGRAM_LINK = 'https://t.me/chix9jaservice';

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyId = () => {
    setIsVerifying(true);
    setTimeout(() => {
      if (formData.flexId.toUpperCase() === CORRECT_FLEX_ID) {
        setStep(5);
        setIdError('');
      } else {
        setIdError('Invalid FlexID. Please use your original FlexID.');
      }
      setIsVerifying(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ACCOUNT_NUMBER);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const containerVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30 p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] -bottom-20 -right-20 pointer-events-none" />

      <div className="w-full max-w-5xl h-auto min-h-[650px] bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden relative z-10">
        
        {/* Top Navigation Bar */}
        <header className="w-full bg-black/20 border-b border-white/5 p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 select-none">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">F</div>
              <h1 className="text-white font-bold text-xl tracking-tight">Flex9ja<span className="text-blue-400">Credit</span></h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <p className="text-[10px] text-blue-300 uppercase tracking-widest font-bold">Service Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-white font-mono text-[10px]">Gateway Active</p>
                </div>
              </div>
              {step >= 5 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
                >
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold">Verified:</p>
                  <p className="text-white font-mono text-xs uppercase tracking-widest leading-none">{formData.flexId}</p>
                </motion.div>
              )}
            </div>
          </div>
          
          <nav className="flex items-center justify-between gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {[
              { label: 'Welcome', s: 0 },
              { label: 'Personal', s: 1 },
              { label: 'Speed', s: 2 },
              { label: 'Receipt', s: 3 },
              { label: 'Verify', s: 4 },
              { label: 'Payment', s: 5 },
              { label: 'Proof', s: 6 },
              { label: 'Finish', s: 7 },
            ].map((item, index) => {
              const isCompleted = step > item.s;
              const isActive = step === item.s;
              return (
                <div 
                  key={item.label} 
                  className={`flex flex-col items-center gap-2 transition-all duration-300 min-w-[60px] md:min-w-[80px] ${
                    isCompleted ? 'text-emerald-400 opacity-100' : isActive ? 'text-white' : 'text-white/20'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                      : isActive 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/30' 
                        : 'border-white/10 bg-white/5'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-tighter md:tracking-widest ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full text-center md:text-left"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8 mx-auto md:mx-0 border border-blue-500/30">
                  <CheckCircle2 className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Welcome to Validation</h2>
                <p className="text-slate-400 mb-12 leading-relaxed text-lg max-w-md">
                  To proceed with your credit validation, please ensure all information provided in the following forms is correct and accurate.
                </p>
                <div className="mt-auto">
                  <button
                    onClick={nextStep}
                    className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group text-lg"
                  >
                    Validate Now
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full"
              >
                <header className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-400" />
                    Personal Information
                  </h2>
                  <p className="text-slate-400">Please provide your details as they appear on your documents.</p>
                </header>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="e.g. John"
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white placeholder:text-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="e.g. Doe"
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white placeholder:text-white/20"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Amount Withdrawn</label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter amount"
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white font-mono placeholder:text-white/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-slate-900">Select gender</option>
                        <option value="Male" className="bg-slate-900">Male</option>
                        <option value="Female" className="bg-slate-900">Female</option>
                        <option value="Other" className="bg-slate-900">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Account Details</label>
                    <input
                      type="text"
                      name="accountDetails"
                      value={formData.accountDetails}
                      onChange={handleInputChange}
                      placeholder="Account Number / Recipient"
                      className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white placeholder:text-white/20"
                    />
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    onClick={nextStep}
                    disabled={!formData.firstName || !formData.lastName || !formData.amount}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 disabled:opacity-20 disabled:shadow-none"
                  >
                    Continue to Processing
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full"
              >
                <header className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <Clock className="w-8 h-8 text-blue-400" />
                    Credit Processing
                  </h2>
                  <p className="text-slate-400">Choose your preferred payout timeline and provide bank details.</p>
                </header>

                <div className="space-y-8 flex-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Select Payout Speed</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['Instant credit alert', '3 working days'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-4 p-5 border rounded-2xl cursor-pointer transition-all ${
                            formData.creditOption === option
                              ? 'border-blue-500 bg-blue-500/10 ring-4 ring-blue-500/5'
                              : 'border-white/10 bg-white/5 hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="radio"
                            name="creditOption"
                            value={option}
                            checked={formData.creditOption === option}
                            onChange={handleInputChange}
                            className="w-5 h-5 text-blue-500 border-white/20 bg-transparent focus:ring-blue-500"
                          />
                          <div className="flex flex-col">
                            <span className={`font-bold ${formData.creditOption === option ? 'text-white' : 'text-white/60'}`}>
                              {option}
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                              {option === 'Instant credit alert' ? 'Priority Processing' : 'Standard Queue'}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Bank Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleInputChange}
                        placeholder="e.g. Access Bank"
                        className="w-full pl-14 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white placeholder:text-white/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8 flex gap-4">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!formData.bankName}
                    className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20 disabled:opacity-20 disabled:shadow-none"
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full text-center"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8 mx-auto border border-blue-500/30">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Flex9ja Receipt</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Please upload the payment receipt of the payment you previously made in <strong>flex9ja</strong> to verify your account history.
                </p>
                
                <div className="border-2 border-dashed border-white/10 bg-white/5 rounded-[2rem] p-12 hover:border-blue-500/50 hover:bg-white/[0.08] transition-all cursor-pointer group mb-12">
                  <input type="file" className="hidden" id="receipt-upload" />
                  <label htmlFor="receipt-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-blue-600/10 group-hover:bg-blue-600/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                        <Upload className="w-7 h-7 text-blue-400" />
                      </div>
                      <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">Upload original receipt</span>
                      <span className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-bold">PDF, JPG, or PNG • Max 5MB</span>
                    </div>
                  </label>
                </div>

                <div className="mt-auto flex gap-4">
                  <button
                    onClick={prevStep}
                    className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
                  >
                    Back
                  </button>
                  <button
                    onClick={nextStep}
                    className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/20"
                  >
                    Next Step
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full"
              >
                <header className="mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-blue-400" />
                    Identity Verification
                  </h2>
                  <p className="text-slate-400">Please provide your original FlexID to verify account eligibility.</p>
                </header>

                <div className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-3xl mb-8">
                  <p className="text-sm text-blue-300/80 leading-relaxed font-medium">
                    Security Tip: Your original FlexID consists of a prefix followed by 5 digits. Ensure it is entered exactly as seen in your user dashboard.
                  </p>
                </div>

                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">FlexID Code</label>
                  <input
                    type="text"
                    name="flexId"
                    value={formData.flexId}
                    onChange={handleInputChange}
                    placeholder="e.g. FLEX00000"
                    className={`w-full px-6 py-5 bg-white/5 border rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-mono tracking-[0.3em] text-2xl uppercase ${
                      idError ? 'border-red-500 text-red-400' : 'border-white/10 text-white focus:border-blue-500'
                    }`}
                  />
                  {idError && (
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-400 text-sm mt-3 flex items-center gap-2 font-bold"
                    >
                      <AlertCircle className="w-5 h-5" />
                      {idError}
                    </motion.p>
                  )}
                </div>

                <div className="mt-auto pt-8">
                  <button
                    onClick={handleVerifyId}
                    disabled={!formData.flexId || isVerifying}
                    className="w-full py-5 bg-white text-slate-950 hover:bg-blue-50 font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-4 disabled:opacity-10"
                  >
                    {isVerifying ? (
                      <>
                        <div className="w-6 h-6 border-4 border-slate-950/20 border-t-slate-950 rounded-full animate-spin" />
                        Performing Verification...
                      </>
                    ) : (
                      'Secure Verify'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-10 bg-emerald-500/10 p-5 rounded-3xl border border-emerald-500/30">
                  <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-emerald-400 font-black uppercase text-xs tracking-widest mb-0.5">Access Granted</div>
                    <div className="text-white font-bold opacity-80 text-sm">FlexID Successfully Verified</div>
                  </div>
                </div>

                <header className="mb-8">
                  <h2 className="text-4xl font-bold text-white mb-3">Final validation payment</h2>
                  <p className="text-slate-400 text-lg">
                    To complete your credit request, please make a final security deposit of <strong className="text-white">₦15,900.00</strong>.
                  </p>
                </header>

                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 mb-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Building2 className="w-24 h-24 text-white" />
                  </div>
                  
                  <div className="space-y-8 relative z-10">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Settlement Account</span>
                        <p className="text-4xl font-mono font-bold text-white tracking-widest break-all">
                          {ACCOUNT_NUMBER}
                        </p>
                      </div>
                      <button
                        onClick={copyToClipboard}
                        className="p-4 bg-white/10 border border-white/10 rounded-2xl hover:bg-blue-600 hover:border-blue-500 transition-all active:scale-90 group/btn"
                      >
                        {copyFeedback ? (
                          <Check className="w-6 h-6 text-emerald-400" />
                        ) : (
                          <Copy className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
                      <div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Receiving Bank</span>
                        <p className="text-xl font-bold text-white">Paga</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 block">Account Name</span>
                        <p className="text-xl font-bold text-white leading-tight">Marvelous Michael o</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                   <button
                    onClick={nextStep}
                    className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-2xl shadow-blue-600/30 text-lg uppercase tracking-widest"
                  >
                    I have made deployment payment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div
                key="step6"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full text-center"
              >
                <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mb-8 mx-auto border border-blue-500/30">
                  <Wallet className="w-8 h-8 text-blue-400" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Transaction Proof</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                  Thank you for your payment. Final step: please upload the transaction proof for immediate validation.
                </p>
                
                <div className="border-2 border-dashed border-white/10 bg-white/5 rounded-[2rem] p-12 hover:border-blue-500/50 hover:bg-white/[0.08] transition-all cursor-pointer group mb-12">
                  <input type="file" className="hidden" id="proof-upload" />
                  <label htmlFor="proof-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 bg-indigo-600/10 group-hover:bg-indigo-600/20 rounded-full flex items-center justify-center mb-4 transition-colors">
                        <Upload className="w-7 h-7 text-indigo-400" />
                      </div>
                      <span className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">Upload payment proof</span>
                      <span className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-bold">Screenshot or PDF</span>
                    </div>
                  </label>
                </div>

                <div className="mt-auto">
                  <button
                    onClick={nextStep}
                    className="w-full py-5 bg-white text-slate-950 hover:bg-blue-50 font-black rounded-2xl transition-all shadow-xl uppercase tracking-widest"
                  >
                    Complete Submission
                  </button>
                </div>
              </motion.div>
            )}

            {step === 7 && (
              <motion.div
                key="step7"
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col h-full text-center py-10"
              >
                <div className="relative mx-auto mb-12">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/30 animate-pulse">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="absolute -inset-4 border border-emerald-500/10 rounded-full animate-[ping_3s_linear_infinite]" />
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-6 uppercase tracking-tight">Process Initiated!</h2>
                <p className="text-slate-400 mb-12 leading-relaxed text-lg max-w-md mx-auto">
                  Your request is being processed. <strong>Priority status</strong> has been assigned to your ticket. Please finalize via our secure channel.
                </p>

                <div className="mt-auto space-y-6">
                  <a
                    href={TELEGRAM_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-6 bg-[#24A1DE] hover:bg-[#2090C8] text-white font-black rounded-3xl transition-all shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-4 text-xl group active:scale-95"
                  >
                    <ExternalLink className="w-6 h-6" />
                    Open Secure Support
                  </a>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-[0.4em]">Official Handle: @chix9jaservice</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Floating Elements / Footer */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
          Encrypted Connection • AES-256
        </p>
      </div>
    </div>
  );
}
