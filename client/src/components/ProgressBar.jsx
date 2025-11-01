import { motion } from 'framer-motion';
import { FaComments, FaCheckCircle, FaChartLine, FaThumbsUp, FaFileAlt } from 'react-icons/fa';

const ProgressBar = ({ currentStage }) => {
  const stages = [
    { id: 'conversation', label: 'Conversation', icon: <FaComments /> },
    { id: 'verification', label: 'Verification', icon: <FaCheckCircle /> },
    { id: 'credit', label: 'Credit Check', icon: <FaChartLine /> },
    { id: 'approval', label: 'Approval', icon: <FaThumbsUp /> },
    { id: 'sanction', label: 'Sanction Letter', icon: <FaFileAlt /> }
  ];

  const currentIndex = stages.findIndex(s => s.id === currentStage);
  const progress = ((currentIndex + 1) / stages.length) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-tata rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Stage Icons */}
      <div className="flex justify-between items-center">
        {stages.map((stage, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={stage.id} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  isActive
                    ? 'bg-gradient-tata text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-purple-300' : ''}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: isCurrent ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                {stage.icon}
              </motion.div>
              <p className={`text-xs mt-2 text-center ${isActive ? 'text-primary dark:text-purple-400 font-semibold' : 'text-gray-400'}`}>
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Progress Percentage */}
      <div className="text-center mt-3">
        <span className="text-sm font-semibold text-primary dark:text-purple-400">
          {Math.round(progress)}% Complete
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
