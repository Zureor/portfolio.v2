import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const SkillProgressBar = ({ skill, percentage }) => {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({ width: `${percentage}%` });
    }
  }, [inView, controls, percentage]);

  return (
    <div ref={ref} className="skill-progress-bar">
      <div className="skill-name">{skill}</div>
      <div className="progress-bar-container">
        <motion.div
          className="progress-bar"
          animate={{ width: `${percentage}%`, backgroundColor: '#66ccff' }}
          initial={{ width: '0%', backgroundColor: '#66ccff' }}
          transition={{ duration: 1 }}
          whileHover={{
            scale: 1.05,
            backgroundColor: '#ffff00',
            boxShadow: '0 0 10px #ffff00, 0 0 20px #ffff00, 0 0 30px #ffff00, 0 0 40px #ffff00',
            transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' },
          }}
        />
      </div>

      <style>{`
        .skill-progress-bar {
          margin-bottom: 20px;
        }

        .skill-name {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 5px;
          text-align: left;
        }

        .progress-bar-container {
          width: 100%;
          height: 10px;
          background-color: #333;
          border-radius: 5px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background-color: #66ccff;
          border-radius: 5px;
          transition: width 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SkillProgressBar;
