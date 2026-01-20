import gamestackTexture2Large from 'assets/gamestack-list.jpg';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/gamestack-list.jpg';
import gamestackTextureLarge from 'assets/gamestack-login.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login.jpg';
import sliceTextureLarge from 'assets/slice-app.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import campushubTexture from 'assets/campushub/homepage-dark.png';
import campushubTextureLarge from 'assets/campushub/homepage-dark.png';
import campushubTexturePlaceholder from 'assets/campushub/homepage-dark.png';
import github from 'assets/github.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Developer', 'Student', 'Animator', 'Techie'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectTwo, projectThree, projectFour, projectFive, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      <Meta
        title="Portfolio"
        description="Design portfolio of Shoaib — a product designer working on web & mobile
          apps with a focus on motion, experience design, and accessibility."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={1}
        title="SEU CampusHub"
        description="A modern, dynamic event management platform tailored for Southeast University students and administrators. Discover, Register, and Manage Campus Events."
        buttonText="View project"
        buttonLink="/projects/campushub"
        model={{
          type: 'laptop',
          alt: 'SEU CampusHub Homepage',
          textures: [
            {
              srcSet: [campushubTexture, campushubTextureLarge],
              placeholder: campushubTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={2}
        title="Zahoor"
        description="Zahoor is a Bangladeshi e-commerce destination, curating a diverse selection of products for discerning customers nationwide."
        buttonText="View project"
        buttonLink="/projects/zahoor"
        model={{
          type: 'laptop',
          alt: 'Annotating a Homepage of Zahoor website',
          textures: [
            {
              srcSet: [sliceTexture, sliceTextureLarge],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-3"
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={3}
        title="Relive"
        description="Introducing 'Relieve' - your soon-to-be stress-relief companion. Powered by AI, this Android app is your ticket to relaxation in the palm of your hand. Stay tuned for updates as we work on bringing you personalized stress-busting techniques and mindfulness exercises. Coming soon to help you find your calm amidst the chaos."
        buttonText="Comming Soon"
        buttonLink=""
        model={{
          type: 'phone',
          alt: 'App login screen',
          textures: [
            {
              srcSet: [gamestackTexture, gamestackTextureLarge],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [gamestackTexture2, gamestackTexture2Large],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-4"
        alternate
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={4}
        title="Other Projects"
        description=""
        buttonText="View project"
        buttonLink="/projects/github"
        model={{
          type: 'laptop',
          alt: 'GitHub projects showcase',
          textures: [
            {
              srcSet: [github, github],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />
      
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
