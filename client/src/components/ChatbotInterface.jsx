import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPaperPlane, FaRobot, FaUser, FaMicrophone, FaStop } from 'react-icons/fa';
import Confetti from 'react-confetti';
import toast from 'react-hot-toast';
import { setChatOpen, setShowConfetti } from '../redux/slices/uiSlice';
import { addMessage, setTyping, setStage, setSessionId } from '../redux/slices/chatSlice';
import { setLoanAmount, setTenure, setPurpose, calculateEMI, setSalary, setCreditScore, setEligibilityTier, setStatus } from '../redux/slices/loanSlice';
import ProgressBar from './ProgressBar';
import LoanInputs from './LoanInputs';
import KYCVerification from './KYCVerification';
import CreditScoreGauge from './CreditScoreGauge';
import SalarySlipUpload from './SalarySlipUpload';
import SanctionLetterModal from './SanctionLetterModal';
import DocumentUpload from './DocumentUpload';
import { sessionAPI, crmAPI, creditAPI, offerAPI } from '../utils/api';

const ChatbotInterface = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { messages, isTyping, currentStage } = useSelector((state) => state.chat);
  const { loanAmount, tenure, purpose, emi, interestRate, salary, creditScore, eligibilityTier } = useSelector((state) => state.loan);
  const { showConfetti } = useSelector((state) => state.ui);
  
  const [input, setInput] = useState('');
  const [sessionId, setSession] = useState(null);
  const [showLoanInputs, setShowLoanInputs] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [showCreditScore, setShowCreditScore] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showSanction, setShowSanction] = useState(false);
  const [crmData, setCrmData] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [awaitingName, setAwaitingName] = useState(false);
  const [awaitingInterest, setAwaitingInterest] = useState(false);
  const [documentsUploaded, setDocumentsUploaded] = useState({
    pan: false,
    aadhaar: false,
    salarySlip: false,
    bankStatement: false
  });
  const [kycVerified, setKycVerified] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize chat session
    console.log('ChatbotInterface mounted, user:', user);
    initializeChat();
  }, []);

  const initializeChat = async () => {
    try {
      // Send welcome message (only for authenticated users)
      setTimeout(() => {
        const greeting = {
          sender: 'bot',
          message: `Hi ${user?.name}! 👋 Welcome to Tata Capital! I'm your personal loan assistant.`,
          type: 'text'
        };
        dispatch(addMessage(greeting));

        setTimeout(() => {
          const guideMsg = {
            sender: 'bot',
            message: `I'm here to help you get the best personal loan with zero fees and instant approval! 💰\n\nYou can ask me about:\n📊 Loan advantages & benefits\n💵 Interest rates & EMI\n⚡ Processing time\n📄 Required documents\n✅ Eligibility criteria\n\nOr simply say "I'm interested" to start your application!`,
            type: 'text'
          };
          dispatch(addMessage(guideMsg));
        }, 800);
      }, 500);

      // SAFE MODE: Avoid backend calls to prevent unintended logout on 401.
      // We use mock CRM/session data so the chat works fully offline.
      setSession('mock-session');
      setCrmData({ preApproved: true, preApprovedAmount: 250000 });

      setTimeout(() => {
        const preApprovedMsg = {
          sender: 'bot',
          message: `🎉 Great news! You're pre-approved for a loan of ₹${(250000).toLocaleString('en-IN')} at just ${interestRate}% p.a.! This is an exclusive offer just for you!`,
          type: 'text'
        };
        dispatch(addMessage(preApprovedMsg));
      }, 1500);
    } catch (error) {
      console.error('Error initializing chat:', error);
      // Chatbot should still work even if initialization fails
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      message: input,
      type: 'text'
    };
    dispatch(addMessage(userMessage));
    setInput('');

    // Process message with AI controller
    await processUserMessage(input);
  };

  const processUserMessage = async (message) => {
    dispatch(setTyping(true));
    
    const lowerMsg = message.toLowerCase();

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Handle name collection
    if (awaitingName) {
      setApplicantName(message);
      setAwaitingName(false);
      const response = {
        sender: 'bot',
        message: `Thank you, ${message}! 😊\n\nNow, let's proceed with your loan application. I'll need to collect some documents from you.\n\nPlease upload the following documents:\n📄 PAN Card\n🆔 Aadhaar Card\n💰 Salary Slips (last 3 months)\n🏦 Bank Statements (last 6 months)\n\nClick the buttons below to upload:`,
        type: 'text'
      };
      dispatch(addMessage(response));
      
      setTimeout(() => {
        const uploadMsg = {
          sender: 'bot',
          message: 'Upload Documents',
          type: 'component',
          component: 'documentUpload'
        };
        dispatch(addMessage(uploadMsg));
      }, 1000);
      dispatch(setTyping(false));
      return;
    }

    // Handle interest confirmation
    if (awaitingInterest) {
      if (lowerMsg.includes('yes') || lowerMsg.includes('interested') || lowerMsg.includes('proceed') || lowerMsg.includes('apply')) {
        setAwaitingInterest(false);
        const response = {
          sender: 'bot',
          message: `Excellent! Let's get started with your loan application! 🎉\n\nFirst, may I know your full name please?`,
          type: 'text'
        };
        dispatch(addMessage(response));
        setAwaitingName(true);
      } else {
        const response = {
          sender: 'bot',
          message: `No problem! Feel free to ask me anything else about our loans. I'm here to help! 😊`,
          type: 'text'
        };
        dispatch(addMessage(response));
        setAwaitingInterest(false);
      }
      dispatch(setTyping(false));
      return;
    }

    // AI Objection Handling & Q&A
    if (lowerMsg.includes('advantage') || lowerMsg.includes('benefit') || lowerMsg.includes('why')) {
      const response = {
        sender: 'bot',
        message: `Great question! Here are the key advantages of our personal loan: 🌟\n\n✅ **Lowest Interest Rates**: Starting from just 12% p.a.\n✅ **Zero Processing Fees**: Save thousands!\n✅ **Instant Approval**: Get approved in 30 minutes\n✅ **Quick Disbursal**: Money in your account within 24-48 hours\n✅ **Flexible Tenure**: Choose 12-60 months\n✅ **Minimal Documentation**: 100% digital process\n✅ **Trusted Brand**: Backed by Tata Group's 150+ years legacy\n✅ **No Hidden Charges**: Complete transparency\n\nWould you like to proceed with the application?`,
        type: 'text'
      };
      dispatch(addMessage(response));
      setAwaitingInterest(true);
    } else if (lowerMsg.includes('interest') || lowerMsg.includes('rate')) {
      const response = {
        sender: 'bot',
        message: `Our interest rates start from just 12% p.a. - that's among the lowest in the market! 📉\n\n💰 **Interest Rate Benefits:**\n• Personal Loan: 12-16% p.a.\n• Home Renovation: 11.5% p.a.\n• Education: 12.5% p.a.\n• Medical Emergency: 13% p.a.\n• Wedding: 13.5% p.a.\n\nFor comparison, the market average is 16% p.a. You'll save ₹${Math.floor((16 - 12) * 1000)} per lakh per year with us!\n\nPlus, **ZERO processing fees** means even more savings! 💰\n\nInterested in applying?`,
        type: 'text'
      };
      dispatch(addMessage(response));
      setAwaitingInterest(true);
    } else if (lowerMsg.includes('tata') || lowerMsg.includes('trust') || lowerMsg.includes('good')) {
      const response = {
        sender: 'bot',
        message: `Absolutely! Tata Capital is backed by the Tata Group - 150+ years of trust and excellence! 🏆\n\nWe've served 10 lakh+ happy customers with:\n✅ Zero hidden charges\n✅ 30-minute approval\n✅ 24-hour disbursal\n✅ Award-winning service\n\nYou're in safe hands! 🤝`,
        type: 'text'
      };
      dispatch(addMessage(response));
    } else if (lowerMsg.includes('interested') || lowerMsg.includes('yes') || lowerMsg.includes('proceed')) {
      const response = {
        sender: 'bot',
        message: `Wonderful! I'm excited to help you get your loan! 🎉\n\nTo get started, may I know your full name please?`,
        type: 'text'
      };
      dispatch(addMessage(response));
      setAwaitingName(true);
    } else if (lowerMsg.includes('apply') || lowerMsg.includes('start') || lowerMsg.includes('loan')) {
      dispatch(setStage('conversation'));
      const response = {
        sender: 'bot',
        message: `Perfect! Let's start your loan application! 🚀\n\nI'll need a few details to find the best loan for you. This will only take 2 minutes!`,
        type: 'text'
      };
      dispatch(addMessage(response));
      
      setTimeout(() => {
        setShowLoanInputs(true);
        const inputMsg = {
          sender: 'bot',
          message: 'Please select your loan details below:',
          type: 'component',
          component: 'loanInputs'
        };
        dispatch(addMessage(inputMsg));
      }, 800);
    } else if (lowerMsg.includes('fee') || lowerMsg.includes('charge')) {
      const response = {
        sender: 'bot',
        message: `Zero fees! That's right - ₹0! 🎉\n\nNo processing fees, no hidden charges. What you see is what you get. We believe in transparency and trust!`,
        type: 'text'
      };
      dispatch(addMessage(response));
    } else if (lowerMsg.includes('time') || lowerMsg.includes('fast') || lowerMsg.includes('quick')) {
      const response = {
        sender: 'bot',
        message: `Super fast! ⚡\n\n✓ Approval: 30 minutes\n✓ Disbursal: 24-48 hours\n✓ 100% digital process\n\nNo waiting, no hassle - just instant approval!`,
        type: 'text'
      };
      dispatch(addMessage(response));
    } else if (lowerMsg.includes('document') || lowerMsg.includes('paper')) {
      const response = {
        sender: 'bot',
        message: `Minimal documentation! 📄\n\nJust need:\n✓ PAN Card\n✓ Aadhaar Card\n✓ Salary Slips (last 3 months)\n✓ Bank Statements (last 6 months)\n\nEverything is digital - no physical paperwork needed!`,
        type: 'text'
      };
      dispatch(addMessage(response));
    } else if (lowerMsg.includes('eligib') || lowerMsg.includes('qualify')) {
      const response = {
        sender: 'bot',
        message: `Simple eligibility! ✅\n\n✓ Age: 21-60 years\n✓ Salary: Minimum ₹25,000/month\n✓ Credit Score: 650+\n✓ Employment: Salaried or Self-employed\n\nMost of our customers get approved instantly!`,
        type: 'text'
      };
      dispatch(addMessage(response));
    } else if (lowerMsg.includes('help') || lowerMsg.includes('info')) {
      const response = {
        sender: 'bot',
        message: `I'm here to help! 😊 You can ask me about:\n\n💰 Loan amounts & rates\n⚡ Approval process\n📊 EMI calculations\n🎯 Eligibility criteria\n📄 Documentation\n🏆 Why choose Tata\n\nOr simply say "apply" to start your application!`,
        type: 'text'
      };
      dispatch(addMessage(response));
    } else {
      const response = {
        sender: 'bot',
        message: `I understand you're asking about "${message}". Let me help! 😊\n\nWould you like to:\n1️⃣ Start your loan application\n2️⃣ Learn about our interest rates\n3️⃣ Check eligibility criteria\n4️⃣ Calculate your EMI\n\nJust type what you'd like to know!`,
        type: 'text'
      };
      dispatch(addMessage(response));
    }

    dispatch(setTyping(false));
  };

  const handleLoanSubmit = async (data) => {
    dispatch(setLoanAmount(data.amount));
    dispatch(setTenure(data.tenure));
    dispatch(setPurpose(data.purpose));
    dispatch(setSalary(data.salary));
    dispatch(calculateEMI());

    setShowLoanInputs(false);

    // Sales Agent Response
    const salesMsg = {
      sender: 'bot',
      message: `Excellent choice! 🎯\n\nLoan Amount: ₹${data.amount.toLocaleString('en-IN')}\nTenure: ${data.tenure} months\nPurpose: ${data.purpose}\nInterest Rate: ${interestRate}% p.a.\n\nYour Monthly EMI will be approximately ₹${emi.toLocaleString('en-IN')} 💰\n\nThis is a great deal! You'll save thousands compared to other lenders! Let me verify your details...`,
      type: 'text'
    };
    dispatch(addMessage(salesMsg));

    // Move to verification stage
    setTimeout(() => {
      dispatch(setStage('verification'));
      startVerification();
    }, 2000);
  };

  const startVerification = async () => {
    const verifyMsg = {
      sender: 'bot',
      message: `Now let's verify your KYC details... 🔍`,
      type: 'text'
    };
    dispatch(addMessage(verifyMsg));

    setTimeout(() => {
      setShowKYC(true);
      const kycMsg = {
        sender: 'bot',
        message: 'Here are your verified details:',
        type: 'component',
        component: 'kyc'
      };
      dispatch(addMessage(kycMsg));

      setTimeout(() => {
        const successMsg = {
          sender: 'bot',
          message: `✅ KYC Verified Successfully!\n\nAll your details look good! Moving to credit assessment...`,
          type: 'text'
        };
        dispatch(addMessage(successMsg));

        setTimeout(() => {
          dispatch(setStage('credit'));
          checkCreditScore();
        }, 2000);
      }, 3000);
    }, 1500);
  };

  const checkCreditScore = async () => {
    // Mocked credit check to avoid backend dependency
    const creditMsg = {
      sender: 'bot',
      message: `Checking your credit score with CIBIL... 📊`,
      type: 'text'
    };
    dispatch(addMessage(creditMsg));

    // Generate a realistic mock score
    const score = Math.floor(720 + Math.random() * 120); // 720-839
    dispatch(setCreditScore(score));

    setTimeout(() => {
      setShowCreditScore(true);
      const scoreMsg = {
        sender: 'bot',
        message: 'Your credit score:',
        type: 'component',
        component: 'creditScore'
      };
      dispatch(addMessage(scoreMsg));

      setTimeout(() => {
        determineEligibility(score);
      }, 3000);
    }, 1500);
  };

  const determineEligibility = (score) => {
    const emiToSalaryRatio = (emi / salary) * 100;

    // 3-Tier Eligibility Logic
    if (crmData.preApproved && emiToSalaryRatio <= 50) {
      // Tier 1: Pre-approved - Instant Approve
      dispatch(setEligibilityTier('pre_approved'));
      dispatch(setStage('approval'));
      
      const approvalMsg = {
        sender: 'bot',
        message: `🎉 CONGRATULATIONS! 🎉\n\nYour loan is INSTANTLY APPROVED! ✅\n\nLoan Amount: ₹${loanAmount.toLocaleString('en-IN')}\nMonthly EMI: ₹${emi.toLocaleString('en-IN')}\nInterest Rate: ${interestRate}% p.a.\nTenure: ${tenure} months\n\nYou're pre-approved with excellent credit! No additional documents needed! 🚀`,
        type: 'text'
      };
      dispatch(addMessage(approvalMsg));

      dispatch(setShowConfetti(true));
      setTimeout(() => dispatch(setShowConfetti(false)), 5000);

      setTimeout(() => {
        dispatch(setStage('sanction'));
        generateSanctionLetter();
      }, 3000);
    } else if (emiToSalaryRatio <= 100 && score >= 700) {
      // Tier 2: Salary Slip Required
      dispatch(setEligibilityTier('salary_slip_required'));
      
      const uploadMsg = {
        sender: 'bot',
        message: `Good news! You're eligible! 👍\n\nYour EMI is ${emiToSalaryRatio.toFixed(1)}% of your salary. To proceed, please upload your latest salary slip for verification.`,
        type: 'text'
      };
      dispatch(addMessage(uploadMsg));

      setTimeout(() => {
        setShowUpload(true);
        const uploadComponentMsg = {
          sender: 'bot',
          message: 'Upload your salary slip:',
          type: 'component',
          component: 'upload'
        };
        dispatch(addMessage(uploadComponentMsg));
      }, 1500);
    } else {
      // Tier 3: Reject with Fallback
      dispatch(setEligibilityTier('rejected'));
      
      const rejectMsg = {
        sender: 'bot',
        message: `We're sorry, but we cannot approve the requested amount at this time. 😔\n\nReason: ${score < 700 ? 'Credit score below minimum requirement' : 'EMI exceeds affordable limit'}\n\nBut don't worry! We have a special offer for you! 🎁`,
        type: 'text'
      };
      dispatch(addMessage(rejectMsg));

      setTimeout(() => {
        const fallbackAmount = Math.floor(loanAmount * 0.5);
        const fallbackMsg = {
          sender: 'bot',
          message: `💡 Fallback Offer:\n\nWe can offer you ₹${fallbackAmount.toLocaleString('en-IN')} at 14% p.a.\n\nThis amount is pre-approved and you can get it instantly! Would you like to proceed with this offer?`,
          type: 'text'
        };
        dispatch(addMessage(fallbackMsg));
      }, 2000);
    }
  };

  const handleUploadSuccess = () => {
    setShowUpload(false);
    
    const successMsg = {
      sender: 'bot',
      message: `✅ Salary slip verified successfully!\n\nYour income matches our requirements. Processing approval...`,
      type: 'text'
    };
    dispatch(addMessage(successMsg));

    setTimeout(() => {
      dispatch(setStage('approval'));
      
      const approvalMsg = {
        sender: 'bot',
        message: `🎉 LOAN APPROVED! 🎉\n\nCongratulations! Your loan has been approved!\n\nLoan Amount: ₹${loanAmount.toLocaleString('en-IN')}\nMonthly EMI: ₹${emi.toLocaleString('en-IN')}\nInterest Rate: ${interestRate}% p.a.\n\nGenerating your sanction letter...`,
        type: 'text'
      };
      dispatch(addMessage(approvalMsg));

      dispatch(setShowConfetti(true));
      setTimeout(() => dispatch(setShowConfetti(false)), 5000);

      setTimeout(() => {
        dispatch(setStage('sanction'));
        generateSanctionLetter();
      }, 3000);
    }, 2000);
  };

  const handleDocumentsUploaded = (uploadedDocs) => {
    const successMsg = {
      sender: 'bot',
      message: `✅ All documents received successfully!\n\nVerifying your documents...`,
      type: 'text'
    };
    dispatch(addMessage(successMsg));

    setTimeout(() => {
      const verifyMsg = {
        sender: 'bot',
        message: `📋 Document verification complete!\n\n✓ PAN Card - Verified\n✓ Aadhaar Card - Verified\n✓ Salary Slips - Verified\n✓ Bank Statements - Verified\n\nNow proceeding with KYC verification...`,
        type: 'text'
      };
      dispatch(addMessage(verifyMsg));

      setTimeout(() => {
        dispatch(setStage('verification'));
        startKYCVerification();
      }, 2000);
    }, 2000);
  };

  const startKYCVerification = () => {
    const kycMsg = {
      sender: 'bot',
      message: `🔍 Verifying your KYC details with government databases...`,
      type: 'text'
    };
    dispatch(addMessage(kycMsg));

    setTimeout(() => {
      setShowKYC(true);
      const kycDataMsg = {
        sender: 'bot',
        message: 'Your verified KYC details:',
        type: 'component',
        component: 'kyc'
      };
      dispatch(addMessage(kycDataMsg));

      setTimeout(() => {
        setKycVerified(true);
        const kycSuccessMsg = {
          sender: 'bot',
          message: `✅ KYC Verification Successful!\n\nYour identity has been verified. Moving to credit assessment...`,
          type: 'text'
        };
        dispatch(addMessage(kycSuccessMsg));

        setTimeout(() => {
          dispatch(setStage('credit'));
          checkCreditScore();
        }, 2000);
      }, 3000);
    }, 2000);
  };

  const generateSanctionLetter = () => {
    const sanctionMsg = {
      sender: 'bot',
      message: `🎊 Congratulations ${applicantName || user?.name}! 🎊\n\n📄 Your loan has been sanctioned!\n\nGenerating your official sanction letter...`,
      type: 'text'
    };
    dispatch(addMessage(sanctionMsg));

    setTimeout(() => {
      const downloadMsg = {
        sender: 'bot',
        message: `✅ Your sanction letter is ready!\n\nClick below to download your official loan sanction letter. This document contains:\n\n📋 Loan amount and terms\n💰 EMI schedule\n📝 Terms and conditions\n✍️ Digital signature\n\nYou can download and save this for your records.`,
        type: 'text'
      };
      dispatch(addMessage(downloadMsg));

      setTimeout(() => {
        setShowSanction(true);
      }, 1000);
    }, 2000);
  };

  const onClose = () => {
    dispatch(setChatOpen(false));
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:justify-end p-0 md:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Confetti */}
        {showConfetti && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        )}

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          className="relative bg-white dark:bg-gray-800 rounded-t-3xl md:rounded-2xl shadow-2xl w-full md:w-[450px] h-[100vh] md:h-[700px] flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-tata text-white p-4 rounded-t-3xl md:rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <FaRobot className="text-2xl" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Tata Loan Assistant</h3>
                <p className="text-sm opacity-90">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStage={currentStage} />

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} chat-bubble-${msg.sender}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 bg-gradient-tata rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                    <FaRobot className="text-white text-sm" />
                  </div>
                )}
                
                <div className={`max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white'} rounded-2xl p-3 shadow-md`}>
                  {msg.component === 'documentUpload' ? (
                    <DocumentUpload onAllUploaded={handleDocumentsUploaded} applicantName={applicantName} />
                  ) : msg.component === 'loanInputs' && showLoanInputs ? (
                    <LoanInputs onSubmit={handleLoanSubmit} />
                  ) : msg.component === 'kyc' && showKYC ? (
                    <KYCVerification data={crmData} />
                  ) : msg.component === 'creditScore' && showCreditScore ? (
                    <CreditScoreGauge score={creditScore} />
                  ) : msg.component === 'upload' && showUpload ? (
                    <SalarySlipUpload onSuccess={handleUploadSuccess} salary={salary} emi={emi} />
                  ) : (
                    <p className="whitespace-pre-line">{msg.message}</p>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                    <FaUser className="text-gray-600 dark:text-gray-300 text-sm" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 bg-gradient-tata rounded-full flex items-center justify-center mr-2">
                  <FaRobot className="text-white text-sm" />
                </div>
                <div className="bg-white dark:bg-gray-700 rounded-2xl p-3 shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isRecording && handleSend()}
                placeholder={isRecording ? "Recording..." : "Type your message..."}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                disabled={isRecording}
              />
              
              {/* Voice Message Button */}
              <button
                onClick={() => {
                  setIsRecording(!isRecording);
                  if (!isRecording) {
                    toast.success('🎤 Voice recording started! (Demo UI only)');
                    setTimeout(() => {
                      setIsRecording(false);
                      setInput('Voice message: "I want to apply for a loan"');
                      toast.success('✅ Voice message converted to text!');
                    }, 3000);
                  }
                }}
                className={`px-4 py-3 rounded-xl transition-all ${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
                title={isRecording ? "Stop recording" : "Voice message"}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>
              
              <button
                onClick={handleSend}
                disabled={!input.trim() || isRecording}
                className="px-6 py-3 bg-gradient-tata text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane />
              </button>
            </div>
            {isRecording && (
              <p className="text-xs text-red-500 mt-2 animate-pulse">
                🔴 Recording... (Demo UI - Click again to stop)
              </p>
            )}
          </div>
        </motion.div>

        {/* Sanction Letter Modal */}
        {showSanction && (
          <SanctionLetterModal
            sessionId={sessionId}
            onClose={() => setShowSanction(false)}
          />
        )}
      </div>
    </AnimatePresence>
  );
};

export default ChatbotInterface;
