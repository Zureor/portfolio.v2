import { useGSAP } from '@gsap/react';
import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Icon } from 'components/Icon';
import { Link } from 'components/Link';
import { LogoLoop } from 'components/LogoLoop';
import { Meta } from 'components/Meta';
import { Text } from 'components/Text';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
} from 'layouts/Project';
import { Fragment, useRef } from 'react';
import { FaAws, FaRobot } from 'react-icons/fa';
import { PiMicrosoftExcelLogo } from 'react-icons/pi';
import {
  SiCinema4D,
  SiCisco,
  SiCplusplus,
  SiDocker,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSharp,
  SiTypescript,
  SiUbuntu,
  SiUnrealengine,
  SiVitest,
} from 'react-icons/si';
import { TbBrandAdobePhotoshop, TbBrandOpenai, TbSql } from 'react-icons/tb';
import styles from './AboutMe.module.css';
import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import usesBackground from 'assets/uses-background.mp4';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const title = 'About Me';
const description =
  'Computer Science graduate building internal systems, live dashboards and cloud-hosted web apps, with a background in business intelligence and workflow automation.';
// Kept distinct from the profile copy below so the page does not open by saying
// the same sentence twice.
const headline =
  'My experience in systems, analytics and automation, published research, and qualifications.';

const profile = [
  'Computer Science graduate who designs and builds internal systems end to end, from requirements to cloud deployment. Skilled in Python, SQL, PostgreSQL, Next.js and AWS, with a background in business intelligence, data analytics and workflow automation.',
  'Actively exploring generative AI and local model deployment through personal projects, applying automation to real-world coding and productivity workflows.',
];

const snapshot = [
  { label: 'Based in', value: 'Gulshan, Dhaka, Bangladesh' },
  { label: 'Focus', value: 'Internal systems, live dashboards, automation' },
  { label: 'Degree', value: 'BSc Computer Science & Engineering, CGPA 3.71' },
  { label: 'Research', value: 'Explainable ML for clinical screening' },
];

const experience = [
  {
    id: 'pacd-dev',
    period: '10/2026 - Present',
    role: 'Packaging Infrastructure System Developer',
    org: 'PACD, Allport Cargo Services USA',
    location: 'Remote',
    url: 'https://allportcs.com/pac-d/',
    points: [
      "Develops the team's new internal systems, taking each project from requirements to production.",
      'Replaced most of the traditional Excel reporting with live dashboards backed by PostgreSQL and hosted on AWS.',
      'Designed, built and deployed Carton Connect single-handedly: a carton ordering and supply portal used by factories, garment suppliers, packaging suppliers, PAC-D and Primark.',
    ],
  },
  {
    id: 'pacd',
    period: '06/2025 - 09/2026',
    role: 'Packaging Coordinator',
    org: 'PACD, Allport Cargo Services USA',
    location: 'Remote',
    url: 'https://allportcs.com/pac-d/',
    points: [
      'Quality-controlled packaging and shipments for six Southeast Asian countries.',
      'Analysed operational data and produced supplier, client and internal reports using Python, Excel VBA and PowerPoint.',
      "Replaced legacy Excel VBA reporting with a Python system that auto-generates every supplier's monthly report and raw data, adding an expanded KPI set, visual analytics and multi-year trend analysis in place of single-month tables.",
      'Built an automated Power Automate pipeline that distributes the monthly reports to every supplier without manual handling.',
      'Developed a web-based carton price calculator and a shipment label generator, standardising labelling across suppliers in all six countries.',
    ],
  },
  {
    id: 'ibcs',
    period: '06/2024 - 07/2025',
    role: 'Course Coordinator & Digital Marketing Executive',
    org: 'IBCS-PRIMAX Software (Bangladesh) Limited',
    location: 'Dhaka',
    points: [
      'Helped the company qualify as an approved training provider for the IsDB-BISEW IT Scholarship Programme, and won Pragati Life Insurance PLC as a corporate training client.',
      'Engineered an interactive, website-style digital course catalog that clarified prerequisites and key insights, increasing client inquiries and course sign-ups by 30%.',
      'Rewrote and updated outdated curricula across several courses.',
      'Coordinated course schedules and trainee communications (largely polytechnic students); ran social media, inquiries and campaign artwork.',
    ],
  },
  {
    id: 'freelance',
    period: '06/2023 - 04/2024',
    role: 'Freelance Web Developer',
    org: 'Self-employed',
    location: 'Remote',
    points: [
      'Custom, responsive website design and development, e-commerce builds with secure payment gateways, and ongoing site maintenance.',
    ],
  },
  {
    id: 'gamex',
    period: '07/2022 - 04/2023',
    role: 'Junior Software Developer (Intern)',
    org: 'GameX Ltd',
    location: 'Dhaka',
    points: [
      'Built Unreal Engine blueprints for game mechanics, produced 3D assets, and contributed gameplay design proposals.',
    ],
  },
  {
    id: 'itbd',
    period: '11/2021 - 03/2022',
    role: 'Network Engineer (Intern)',
    org: 'IT Bangladesh',
    location: 'Dhaka',
    points: [
      'Configured Cisco routers and routing protocols, developed network simulations for scenario testing, and assisted in troubleshooting.',
    ],
  },
];

const publication = {
  year: '2026',
  authors: 'Rahman, M. M., Shacho, M. S. A., Rana, M. S., & Das, P. K.',
  paperTitle:
    'A Sensitivity-Optimised Ensemble Framework for Explainable Chronic Kidney Disease Screening',
  venue:
    '2026 International Conference on Circuit, Systems and Communication (ICCSC), Fez, Morocco, 2-3 July 2026. Published by IEEE.',
  doi: '10.1109/ICCSC71566.2026.11650312',
  status: 'Published',
  contribution:
    'Led the technical work: research concept, model design and implementation of the sensitivity-optimised ensemble, explainability analysis and reference framework.',
};

const affiliation = {
  period: '05/2025 - Present',
  role: 'Presenter & International Communicator',
  org: 'RoboLife Technologies',
};

// Brand icons for the skill loops; skills without a logo show their name only.
const skillIcons = {
  'Next.js': SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  'Node.js': SiNodedotjs,
  PostgreSQL: SiPostgresql,
  AWS: FaAws,
  Docker: SiDocker,
  'Automated testing': SiVitest,
  Python: SiPython,
  pandas: SiPandas,
  NumPy: SiNumpy,
  SQL: TbSql,
  'C++': SiCplusplus,
  'C#': SiSharp,
  JavaScript: SiJavascript,
  'HTML/CSS': SiHtml5,
  'Excel (advanced)': PiMicrosoftExcelLogo,
  'LLM APIs (OpenAI, Claude, Gemini)': TbBrandOpenai,
  'AI agents & chatbots': FaRobot,
  'scikit-learn': SiScikitlearn,
  'Python scripting': SiPython,
  'WSL2 integration': SiUbuntu,
  Git: SiGit,
  'Cisco networking': SiCisco,
  'Photoshop & Lightroom': TbBrandAdobePhotoshop,
  'Cinema 4D': SiCinema4D,
  'Unreal Engine': SiUnrealengine,
};

const toLogos = items =>
  items.map(title => {
    const SkillIcon = skillIcons[title];
    return {
      // No logo: an empty 1em strut keeps the name level with the logo'd items.
      node: SkillIcon ? <SkillIcon /> : <span style={{ height: '1em' }} />,
      title,
      hoverColor: 'rgb(var(--rgbPrimary))',
    };
  });

const skillGroups = [
  {
    id: 'web',
    name: 'Web & Cloud',
    items: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Infrastructure as code (AWS CDK)',
      'Automated testing',
    ],
  },
  {
    id: 'programming',
    name: 'Programming',
    items: [
      'Python',
      'pandas',
      'NumPy',
      'matplotlib',
      'SQL',
      'C++',
      'C#',
      'JavaScript',
      'HTML/CSS',
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics & BI',
    items: [
      'Power BI',
      'Excel (advanced)',
      'VBA / macros',
      'Dashboard & KPI design',
      'Reporting automation',
      'Data cleaning',
    ],
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    items: [
      'Prompt engineering',
      'LLM APIs (OpenAI, Claude, Gemini)',
      'RAG',
      'AI agents & chatbots',
      'scikit-learn',
      'Explainable AI (SHAP)',
      'AI-assisted development',
    ],
  },
  {
    id: 'automation',
    name: 'Automation',
    items: [
      'Power Automate',
      'Python scripting',
      'Email & document workflows',
      'Internal web tools',
      'WSL2 integration',
    ],
  },
  {
    id: 'tools',
    name: 'Tools',
    items: [
      'Git',
      'Cisco networking',
      'Photoshop & Lightroom',
      'Cinema 4D',
      'Unreal Engine',
      'Canva',
    ],
  },
];

// Built once so the loops don't re-measure on every render.
const skillLoops = skillGroups.map(group => ({ ...group, logos: toLogos(group.items) }));

const education = [
  {
    id: 'bsc',
    period: '2022 - 2026',
    qualification: 'BSc in Computer Science & Engineering',
    institution: 'Southeast University',
    grade: '3.71',
    gradeLabel: 'CGPA',
  },
  {
    id: 'diploma',
    period: '2017 - 2021',
    qualification: 'Diploma in Computer Technology',
    institution: 'Dhaka Polytechnic Institute',
    grade: '3.31',
    gradeLabel: 'CGPA',
  },
  {
    id: 'ssc',
    period: '2017',
    qualification: 'SSC, Science',
    institution: 'Rayhan School & College',
    grade: '5.00',
    gradeLabel: 'GPA',
  },
];

const certifications = [
  {
    id: 'qa',
    year: '2025',
    name: 'Quality Assurance and Software Testing',
    issuer: 'ICT Division, Bangladesh',
    programme: 'Enhancing Digital Government and Economy (EDGE) Project',
  },
  {
    id: 'ccna',
    year: '2022',
    name: 'Cisco Certified Network Associate',
    issuer: 'IT Bangladesh',
  },
  {
    id: 'gamedev',
    year: '2022',
    name: 'Mobile Game Development (Cross Platform)',
    issuer: 'ICT Division, Bangladesh',
    programme: 'Skill Development for Mobile Game and Application Project',
  },
];

// Served straight from public/ rather than Google Drive, so the button hands
// over the file instead of bouncing through a viewer page.
const cvUrl = '/md-shoaib-rana-cv.pdf';
const cvFileName = 'Md-Shoaib-Rana-CV.pdf';

const ExperienceEntry = ({ item }) => (
  <li className={styles.roleItem} data-reveal="role" data-hover="row">
    <div className={styles.roleMarker} data-hover-marker aria-hidden="true" />
    <p className={styles.rolePeriod}>{item.period}</p>
    <h3 className={styles.roleTitle}>{item.role}</h3>
    <p className={styles.roleOrg}>
      {item.url ? (
        <a
          className={styles.roleOrgLink}
          href={item.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.org}
          <Icon className={styles.roleOrgIcon} icon="link" />
        </a>
      ) : (
        item.org
      )}
      <span className={styles.roleLocation}>{item.location}</span>
    </p>
    <ul className={styles.rolePoints}>
      {item.points.map(point => (
        <li className={styles.rolePoint} key={point}>
          {point}
        </li>
      ))}
    </ul>
  </li>
);

export function AboutMe() {
  const root = useRef(null);
  const spineRef = useRef(null);
  const experienceRef = useRef(null);
  const paperRef = useRef(null);
  const glowRef = useRef(null);
  const magnetRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia(root);

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Draws the career spine as you scroll, so the reader can tell how far
        // through the chronology they are.
        if (spineRef.current && experienceRef.current) {
          gsap.fromTo(
            spineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: 'none',
              transformOrigin: 'top center',
              scrollTrigger: {
                trigger: experienceRef.current,
                start: 'top 70%',
                end: 'bottom 80%',
                scrub: 0.5,
              },
            }
          );
        }

        // Reveals each entry as it enters, so the chronology arrives in order
        // instead of all at once.
        const revealBatch = selector =>
          ScrollTrigger.batch(selector, {
            start: 'top 88%',
            // A reveal only needs to fire once; without this every item leaves
            // a live ScrollTrigger recalculating on each scroll thereafter.
            once: true,
            onEnter: batch =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power2.out',
                // 'auto' rather than true so a reveal replay does not kill the
                // hover tweens below, which drive different properties.
                overwrite: 'auto',
              }),
          });

        gsap.set('[data-reveal="role"]', { opacity: 0, y: 32 });
        gsap.set('[data-reveal="stack"]', { opacity: 0, y: 24 });
        gsap.set('[data-reveal="row"]', { opacity: 0, y: 20 });

        revealBatch('[data-reveal="role"]');
        revealBatch('[data-reveal="stack"]');
        revealBatch('[data-reveal="row"]');

        // Lifts the accepted paper against the scroll, marking it as the single
        // strongest credential on the page.
        gsap.to('[data-parallax="paper"]', {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-parallax="paper"]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      });

      // Hover work is pointer-only: on touch these events fire on tap and read
      // as the page twitching under your finger.
      mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
        const scope = root.current;
        const teardown = [];

        const on = (element, type, handler) => {
          element.addEventListener(type, handler);
          teardown.push(() => element.removeEventListener(type, handler));
        };

        const query = selector => [...scope.querySelectorAll(selector)];

        // Rows: nudging the hovered entry aside makes a long, dense list
        // easier to keep your place in.
        const rows = query('[data-hover="row"]');

        rows.forEach(row => {
          const marker = row.querySelector('[data-hover-marker]');
          const grade = row.querySelector('[data-hover-grade]');

          const enter = () => {
            gsap.to(row, { x: 8, duration: 0.4, ease: 'power3.out' });
            if (marker) {
              gsap.to(marker, {
                // Cancels the row's shift so the marker stays on the spine.
                x: -8,
                scale: 1.5,
                rotate: 135,
                duration: 0.45,
                ease: 'back.out(2.2)',
              });
            }
            if (grade) {
              gsap.to(grade, { scale: 1.12, duration: 0.4, ease: 'power3.out' });
            }
          };

          const leave = () => {
            gsap.to(row, { x: 0, duration: 0.45, ease: 'power3.out' });
            if (marker) {
              gsap.to(marker, {
                x: 0,
                scale: 1,
                rotate: 45,
                duration: 0.45,
                ease: 'power3.out',
              });
            }
            if (grade) {
              gsap.to(grade, { scale: 1, duration: 0.4, ease: 'power3.out' });
            }
          };

          on(row, 'pointerenter', enter);
          on(row, 'pointerleave', leave);
        });

        // Publication: a light that tracks the cursor, so the page's strongest
        // credential is the one panel that reacts to you.
        const paper = paperRef.current;
        const glow = glowRef.current;

        if (paper && glow) {
          const setX = gsap.quickSetter(glow, '--glowX', 'px');
          const setY = gsap.quickSetter(glow, '--glowY', 'px');
          let bounds = null;

          on(paper, 'pointerenter', () => {
            bounds = paper.getBoundingClientRect();
            gsap.to(glow, { opacity: 1, duration: 0.4, ease: 'power2.out' });
          });

          on(paper, 'pointermove', event => {
            if (!bounds) bounds = paper.getBoundingClientRect();
            setX(event.clientX - bounds.left);
            setY(event.clientY - bounds.top);
          });

          on(paper, 'pointerleave', () => {
            bounds = null;
            gsap.to(glow, { opacity: 0, duration: 0.5, ease: 'power2.out' });
          });
        }

        // Download CV: the page's one real action leans toward the cursor.
        const magnet = magnetRef.current;

        if (magnet) {
          const pull = gsap.utils.clamp(-16, 16);
          const xTo = gsap.quickTo(magnet, 'x', { duration: 0.5, ease: 'power3' });
          const yTo = gsap.quickTo(magnet, 'y', { duration: 0.5, ease: 'power3' });
          let bounds = null;

          on(magnet, 'pointerenter', () => {
            bounds = magnet.getBoundingClientRect();
          });

          on(magnet, 'pointermove', event => {
            if (!bounds) bounds = magnet.getBoundingClientRect();
            xTo(pull((event.clientX - (bounds.left + bounds.width / 2)) * 0.4));
            yTo(pull((event.clientY - (bounds.top + bounds.height / 2)) * 0.4));
          });

          on(magnet, 'pointerleave', () => {
            bounds = null;
            xTo(0);
            yTo(0);
          });
        }

        return () => {
          teardown.forEach(off => off());

          // Hover tweens are created after this context runs, so revert()
          // does not know about them. Drop their inline styles by hand.
          const hovered = [...rows, magnet, glow].filter(Boolean);
          const markers = query('[data-hover-marker], [data-hover-grade]');

          gsap.killTweensOf([...hovered, ...markers]);
          gsap.set([...hovered, ...markers], { clearProps: 'transform,opacity' });
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <Fragment>
      <Meta title={title} prefix="About" description={description} />
      <ProjectContainer className={styles.aboutMe} ref={root}>
        <ProjectBackground
          src={{ src: usesBackground }}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader title={title} description={headline} />

        {/* Profile: lead copy against a fixed-fact column */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <div className={styles.intro}>
              <div className={styles.introLead}>
                {profile.map(paragraph => (
                  <Text as="p" size="l" key={paragraph}>
                    {paragraph}
                  </Text>
                ))}
              </div>
              <dl className={styles.snapshot}>
                {snapshot.map(fact => (
                  <div className={styles.snapshotItem} key={fact.label}>
                    <dt className={styles.snapshotLabel}>{fact.label}</dt>
                    <dd className={styles.snapshotValue}>{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Experience: sticky heading against a scrolling spine */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <div className={styles.spineLayout} ref={experienceRef}>
              <div className={styles.spineAside}>
                <ProjectSectionHeading>Experience</ProjectSectionHeading>
                <Text as="p" size="s" secondary className={styles.spineNote}>
                  Systems, analytics and automation roles since 2021.
                </Text>
              </div>
              <div className={styles.spineTrack}>
                <div className={styles.spineRail} aria-hidden="true">
                  <div className={styles.spineProgress} ref={spineRef} />
                </div>
                <ol className={styles.roleList}>
                  {experience.map(item => (
                    <ExperienceEntry item={item} key={item.id} />
                  ))}
                </ol>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Publication: single full-width feature */}
        <ProjectSection padding="none" className={styles.section}>
          {/* Default width, not xl: .sectionInner centers its content, so a
              wider block would sit further left than every other section. */}
          <ProjectSectionContent>
            <article className={styles.paper} data-parallax="paper" ref={paperRef}>
              <div className={styles.paperGlow} ref={glowRef} aria-hidden="true" />
              <div className={styles.paperMeta}>
                <span className={styles.paperYear}>{publication.year}</span>
                <span className={styles.paperStatus}>{publication.status}</span>
              </div>
              <div className={styles.paperBody}>
                <ProjectSectionHeading className={styles.paperHeading}>
                  Publication
                </ProjectSectionHeading>
                <h3 className={styles.paperTitle}>{publication.paperTitle}</h3>
                <p className={styles.paperAuthors}>{publication.authors}</p>
                <p className={styles.paperVenue}>{publication.venue}</p>
                <p className={styles.paperVenue}>
                  DOI{' '}
                  <Link href={`https://doi.org/${publication.doi}`}>
                    {publication.doi}
                  </Link>
                </p>
                <p className={styles.paperContribution}>{publication.contribution}</p>
              </div>
            </article>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Skills: grouped chips, no invented proficiency scores */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <div className={styles.stack}>
              <ProjectSectionHeading>Skills</ProjectSectionHeading>
              <div className={styles.stackGrid}>
                {skillLoops.map((group, index) => (
                  <section
                    className={styles.stackGroup}
                    data-reveal="stack"
                    data-span="full"
                    key={group.id}
                  >
                    <h3 className={styles.stackName}>{group.name}</h3>
                    <LogoLoop
                      className={styles.skillLoop}
                      logos={group.logos}
                      direction={index % 2 ? 'right' : 'left'}
                      speed={40}
                      hoverSpeed={12}
                      logoHeight={22}
                      gap={40}
                      labels="inline"
                      ariaLabel={`${group.name} skills`}
                    />
                  </section>
                ))}
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Education and certifications: paired ledgers at different weights */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <div className={styles.ledgerPair}>
              <section className={styles.ledger}>
                <ProjectSectionHeading>Education</ProjectSectionHeading>
                <ul className={styles.ledgerList}>
                  {education.map(item => (
                    <li
                      className={styles.ledgerRow}
                      data-reveal="row"
                      data-hover="row"
                      key={item.id}
                    >
                      <div className={styles.ledgerMain}>
                        <p className={styles.ledgerPeriod}>{item.period}</p>
                        <h3 className={styles.ledgerTitle}>{item.qualification}</h3>
                        <p className={styles.ledgerSub}>{item.institution}</p>
                      </div>
                      <p className={styles.ledgerGrade}>
                        <span className={styles.ledgerGradeValue} data-hover-grade>
                          {item.grade}
                        </span>
                        <span className={styles.ledgerGradeLabel}>{item.gradeLabel}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
              <section className={styles.ledger}>
                <ProjectSectionHeading>Certifications</ProjectSectionHeading>
                <ul className={styles.ledgerList}>
                  {certifications.map(item => (
                    <li
                      className={styles.ledgerRow}
                      data-reveal="row"
                      data-hover="row"
                      key={item.id}
                    >
                      <div className={styles.ledgerMain}>
                        <p className={styles.ledgerPeriod}>{item.year}</p>
                        <h3 className={styles.ledgerTitle}>{item.name}</h3>
                        <p className={styles.ledgerSub}>{item.issuer}</p>
                        {!!item.programme && (
                          <p className={styles.ledgerNote}>{item.programme}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        {/* Affiliation: single highlighted row */}
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <div className={styles.affiliation}>
              <ProjectSectionHeading className={styles.affiliationHeading}>
                Professional affiliation
              </ProjectSectionHeading>
              <div className={styles.affiliationRow} data-hover="row">
                <p className={styles.affiliationPeriod}>{affiliation.period}</p>
                <div>
                  <h3 className={styles.affiliationRole}>{affiliation.role}</h3>
                  <p className={styles.affiliationOrg}>{affiliation.org}</p>
                </div>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <div className={styles.outro}>
              <div className={styles.magnet} ref={magnetRef}>
                <Button
                  secondary
                  iconHoverShift
                  icon="chevronRight"
                  href={cvUrl}
                  download={cvFileName}
                >
                  Download CV
                </Button>
              </div>
            </div>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
