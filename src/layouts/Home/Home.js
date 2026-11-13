import gamestackTexture2Large from 'assets/gamestack-list.jpg';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/gamestack-list.jpg';
import gamestackTextureLarge from 'assets/gamestack-login.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login.jpg';
import sliceTextureLarge from 'assets/slice-app.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/slice-app.jpg';
import cartonConnectTexture from 'assets/carton-connect/signin-desktop.webp';
import cartonConnectTextureSmall from 'assets/carton-connect/signin-desktop-sm.webp';
import cartonConnectTexturePlaceholder from 'assets/carton-connect/signin-desktop-placeholder.jpg';
import campushubTexture from 'assets/campushub/homepage-dark.png';
import campushubTextureLarge from 'assets/campushub/homepage-dark.png';
import campushubTexturePlaceholder from 'assets/campushub/homepage-dark-placeholder.jpg';
import github from 'assets/github.png';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

const disciplines = ['Developer', 'Data Analyst', 'System Designer', 'Techie'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const projectFour = useRef();
  const projectFive = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [
      intro,
      projectOne,
      projectTwo,
      projectThree,
      projectFour,
      projectFive,
      details,
    ];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
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
  }, []);

  return (
    <div className={styles.home}>
      <Meta
        title="Portfolio"
        description="Portfolio of Md. Shoaib Rana, a Computer Science graduate who designs
          and builds internal systems, live dashboards and cloud-hosted web apps."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="Carton Connect"
        description="A carton ordering and supply portal for Primark's export carton programme, run by PAC-D."
        buttonText="View project"
        buttonLink="/projects/carton-connect"
        model={{
          type: 'laptop',
          alt: 'Carton Connect sign-in page',
          textures: [
            {
              srcSet: [cartonConnectTextureSmall, cartonConnectTexture],
              placeholder: cartonConnectTexturePlaceholder,
            },
          ],
        }}
      />
      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
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
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
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
        id="project-4"
        alternate
        sectionRef={projectFour}
        visible={visibleSections.includes(projectFour.current)}
        index={4}
        title="Relive"
        description="Introducing 'Relive' - your soon-to-be stress-relief companion. Powered by AI, this Android app is your ticket to relaxation in the palm of your hand. Stay tuned for updates as we work on bringing you personalized stress-busting techniques and mindfulness exercises. Coming soon to help you find your calm amidst the chaos."
        buttonText="Coming Soon"
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
        id="project-5"
        sectionRef={projectFive}
        visible={visibleSections.includes(projectFive.current)}
        index={5}
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
