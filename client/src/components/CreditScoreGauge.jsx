import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreditScoreGauge = ({ score }) => {
  const getScoreColor = (score) => {
    if (score >= 800) return '#00C851'; // Excellent - Green
    if (score >= 750) return '#00E676'; // Good - Light Green
    if (score >= 700) return '#FFA726'; // Fair - Orange
    return '#FF5252'; // Poor - Red
  };

  const getScoreLabel = (score) => {
    if (score >= 800) return 'Excellent';
    if (score >= 750) return 'Good';
    if (score >= 700) return 'Fair';
    return 'Poor';
  };

  const percentage = ((score - 300) / (900 - 300)) * 100;
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-xl"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">Your Credit Score</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">Powered by CIBIL</p>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-48 h-48">
          <CircularProgressbar
            value={percentage}
            text={`${score}`}
            styles={buildStyles({
              rotation: 0.25,
              strokeLinecap: 'round',
              textSize: '24px',
              pathTransitionDuration: 2,
              pathColor: color,
              textColor: color,
              trailColor: '#e0e0e0',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
      </div>

      <div className="text-center mb-4">
        <div 
          className="inline-block px-6 py-2 rounded-full font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {label}
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Score Range</span>
          <span className="font-semibold text-gray-800 dark:text-white">300 - 900</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Your Score</span>
          <span className="font-bold text-primary">{score}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-900 rounded-lg">
          <span className="text-gray-600 dark:text-gray-400">Status</span>
          <span className="font-semibold" style={{ color }}>{label}</span>
        </div>
      </div>

      {score >= 700 ? (
        <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-400 text-center font-semibold">
            ✅ Great! You qualify for the best interest rates!
          </p>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          <p className="text-sm text-orange-700 dark:text-orange-400 text-center font-semibold">
            ⚠️ Your score is below our minimum requirement (700)
          </p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-center">
        <div>
          <div className="w-full h-2 bg-red-500 rounded mb-1"></div>
          <span className="text-gray-600 dark:text-gray-400">300-650</span>
        </div>
        <div>
          <div className="w-full h-2 bg-orange-500 rounded mb-1"></div>
          <span className="text-gray-600 dark:text-gray-400">650-750</span>
        </div>
        <div>
          <div className="w-full h-2 bg-green-400 rounded mb-1"></div>
          <span className="text-gray-600 dark:text-gray-400">750-800</span>
        </div>
        <div>
          <div className="w-full h-2 bg-green-600 rounded mb-1"></div>
          <span className="text-gray-600 dark:text-gray-400">800-900</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CreditScoreGauge;
