import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Timeline.module.css';

const Timeline = ({ timelineData }) => {
  return (
    <div className={styles['timeline-container']}>
      {timelineData.map((event, index) => (
        <TimelineItem key={event.id} event={event} index={index} />
      ))}
    </div>
  );
};

const TimelineItem = ({ event, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const handleItemClick = () => {
    setIsExpanded(!isExpanded);
  };

  const hasContent =
    event.description ||
    event.institution ||
    event.board ||
    event.grade ||
    event.company ||
    event.duration ||
    event.responsibilities ||
    event.r1 ||
    event.r2 ||
    event.r3 ||
    event.r4 ||
    event.r5 ||
    event.r6 ||
    event.r7;

  return (
    <motion.div
      ref={ref}
      className={`${styles['timeline-item']} ${isExpanded && styles['expanded']}`}
      custom={index}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: inView ? 1 : 0, scale: isExpanded ? 1.05 : .9 }}
      transition={{ duration: 0.5 }}
      onClick={handleItemClick}
      style={{ marginBottom: isExpanded ? '20px' : '5px' }}
    >
      <h3>{event.date}</h3>
      <p className={`${styles['description']} ${isExpanded && styles['expanded-description']}`}>{event.description}</p>
      {hasContent && (
        <div className={styles['expanded-content']}>
          {event.institution && <p>{event.institution}</p>}
          {event.board && <p>{event.board}</p>}
          {event.grade && <p>{event.grade}</p>}
          {event.company && <p className={styles['company']}>{event.company}</p>}
          {event.duration && <p className={styles['duration']}>{event.duration}</p>}
          {event.responsibilities && <p className={styles['responsibilities']}>{event.responsibilities}</p>}
          <ul className={styles['timeline-details']}>
            {event.r1 && <li>{event.r1}</li>}
            {event.r2 && <li>{event.r2}</li>}
            {event.r3 && <li>{event.r3}</li>}
            {event.r4 && <li>{event.r4}</li>}
            {event.r5 && <li>{event.r5}</li>}
            {event.r6 && <li>{event.r6}</li>}
            {event.r7 && <li>{event.r7}</li>}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Timeline;
