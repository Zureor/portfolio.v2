import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Footer } from 'components/Footer';
import { Heading } from 'components/Heading';
import { Meta } from 'components/Meta';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './AboutMe.module.css';
import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import usesBackground from 'assets/uses-background.mp4';

const title = 'About Me';
const description = 'My skills, education, and professional experience.';

const skills = [
  { skill: 'Python', percentage: 85 },
  { skill: 'Java', percentage: 62 },
  { skill: 'C#', percentage: 75 },
  { skill: 'C', percentage: 70 },
  { skill: 'HTML', percentage: 95 },
  { skill: 'CSS', percentage: 80 },
  { skill: 'Javascript', percentage: 65 },
  { skill: 'PHP', percentage: 58 },
];

const softskills = [
  { skill: 'Unity', percentage: 75 },
  { skill: 'Unreal Engine', percentage: 80 },
  { skill: 'Cinema 4D', percentage: 75 },
  { skill: 'Cisco Packet Tracer', percentage: 90 },
  { skill: 'Adobe Photoshop', percentage: 80 },
  { skill: 'Adobe Lightroom', percentage: 90 },
  { skill: 'Adobe Illustrator', percentage: 60 },
  { skill: 'Android Studio', percentage: 55 },
];

const testingSkills = [
  { skill: 'SQA', percentage: 70 },
  { skill: 'Manual Testing', percentage: 75 },
];

const aiSkills = [
  { skill: 'Prompt Engineering', percentage: 85 },
  { skill: 'ChatGPT / Claude', percentage: 90 },
  { skill: 'AI Image Generation', percentage: 75 },
  { skill: 'Machine Learning Basics', percentage: 60 },
  { skill: 'AI-Assisted Development', percentage: 80 },
];

const educationData = [
  {
    id: 1,
    date: 'Ongoing',
    title: "Bachelor's in Computer Science and Engineering",
    subtitle: 'Southeast University, Dhaka, Bangladesh',
  },
  {
    id: 2,
    date: '2021',
    title: 'Diploma in Computer Engineering',
    subtitle: 'Dhaka Polytechnic Institute',
    details: 'CGPA: 3.45',
  },
  {
    id: 3,
    date: '2017',
    title: 'SSC in Science',
    subtitle: 'Rayhan School And College, Dhaka',
    details: 'GPA: 5.00',
  },
];

const experienceData = [
  {
    id: 1,
    date: 'Aug 2025 - Present',
    title: 'Packaging Coordinator',
    subtitle: 'PacD (All Port Container Services)',
    link: 'https://allportcs.com/pac-d/',
    responsibilities: [
      'QC every package from factory and approve/reject them for shipping',
      'Generating reports for suppliers and factories',
      'Creating web applications and Excel applications for pricing calculations',
      'Generating reports and labels for clients and suppliers',
    ],
  },
  {
    id: 2,
    date: 'Jul 2024 - Present',
    title: 'Digital Marketer',
    subtitle: 'IBCS-PRIMAX Software Limited',
    responsibilities: [
      'Maintaining social media and answering queries for courses and training programs',
      'Handling trainee communications from students and corporate clients',
      'Designing banners for social media and ceremonial activities',
      'Lab assistant managing network connections and troubleshooting',
      'Manual testing for Dhaka WASA\'s ERP system',
      'Course coordination for individual and corporate clients',
    ],
  },
  {
    id: 3,
    date: 'May 2023 - Mar 2024',
    title: 'Freelance Web Developer',
    subtitle: 'Self-employed',
    responsibilities: [
      'Custom website design and development',
      'Responsive web development for cross-device compatibility',
      'E-commerce development with secure payment gateways',
      'Website maintenance and updates',
    ],
  },
  {
    id: 4,
    date: 'Jul 2022 - Dec 2022',
    title: 'Game Developer Intern',
    subtitle: 'GameXltd',
    responsibilities: [
      'Created Unreal Engine blueprints for game mechanics',
      'Developed 3D models for game assets',
      'Provided game mechanics ideas and suggestions',
    ],
  },
  {
    id: 5,
    date: 'Nov 2021 - Mar 2022',
    title: 'Network Engineer Intern',
    subtitle: 'IT Bangladesh',
    responsibilities: [
      'Cisco router configurations and routing protocols',
      'Developed complex network simulations',
      'Troubleshooting and resolving network issues',
    ],
  },
];

// Skill Progress Bar Component
const SkillBar = ({ skill, percentage }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className={styles.skillBar}>
      <div className={styles.skillName}>
        {skill}
      </div>
      <div className={styles.skillBarContainer}>
        <div
          className={styles.skillProgress}
          style={{ width: inView ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
};

// Timeline Item Component
const TimelineItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`${styles.timelineItem} ${expanded ? styles.timelineItemExpanded : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <p className={styles.timelineDate}>{item.date}</p>
      <h4 className={styles.timelineTitle}>{item.title}</h4>
      <p className={styles.timelineSubtitle}>{item.subtitle}</p>
      {item.details && <p className={styles.timelineSubtitle}>{item.details}</p>}
      {item.responsibilities && (
        <div className={`${styles.timelineDetails} ${expanded ? styles.timelineDetailsExpanded : ''}`}>
          <p className={styles.timelineResponsibilities}>Key Responsibilities:</p>
          <ul className={styles.timelineList}>
            {item.responsibilities.map((resp, idx) => (
              <li key={idx} className={styles.timelineListItem}>{resp}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export function AboutMe() {
  return (
    <Fragment>
      <Meta title={title} prefix="About" description={description} />
      <ProjectContainer className={styles.aboutMe}>
        <ProjectBackground
          src={{ src: usesBackground }}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title={title}
          description="A comprehensive overview of my technical skills, educational background, and professional journey."
        />

        {/* Skills Section */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l">
              <ProjectSectionHeading>Technical Skills</ProjectSectionHeading>
            </ProjectTextRow>
            <div className={styles.skillsGrid}>
              <div className={styles.skillCategory}>
                <Heading level={4} as="h3">Programming Languages</Heading>
                {skills.map((item, index) => (
                  <SkillBar key={index} skill={item.skill} percentage={item.percentage} />
                ))}
              </div>
              <div className={styles.skillCategory}>
                <Heading level={4} as="h3">Software & Tools</Heading>
                {softskills.map((item, index) => (
                  <SkillBar key={index} skill={item.skill} percentage={item.percentage} />
                ))}
              </div>
              <div className={styles.skillCategory}>
                <Heading level={4} as="h3">Testing & QA</Heading>
                {testingSkills.map((item, index) => (
                  <SkillBar key={index} skill={item.skill} percentage={item.percentage} />
                ))}
              </div>
              <div className={styles.skillCategory}>
                <Heading level={4} as="h3">AI & Machine Learning</Heading>
                {aiSkills.map((item, index) => (
                  <SkillBar key={index} skill={item.skill} percentage={item.percentage} />
                ))}
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Education & Experience Section */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l">
              <ProjectSectionHeading>Education & Experience</ProjectSectionHeading>
            </ProjectTextRow>
            <div className={styles.timelineGrid}>
              <div className={styles.timelineColumn}>
                <Heading level={4} as="h3">Education</Heading>
                <Divider />
                <div className={styles.timeline}>
                  {educationData.map((item) => (
                    <TimelineItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
              <div className={styles.timelineColumn}>
                <Heading level={4} as="h3">Experience</Heading>
                <Divider />
                <div className={styles.timeline}>
                  {experienceData.map((item) => (
                    <TimelineItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Download CV Section */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <div className={styles.downloadSection}>
              <Button
                secondary
                iconHoverShift
                icon="chevronRight"
                href="https://drive.google.com/uc?export=download&id=15TPtlE2wTTDpbH3K6FAUkG6zRZVoKt1j"
              >
                Download CV
              </Button>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
