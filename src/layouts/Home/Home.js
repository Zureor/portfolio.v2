import gamestackTexture2Large from 'assets/gamestack-list-1150.webp';
import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexture2 from 'assets/gamestack-list-640.webp';
import gamestackTextureLarge from 'assets/gamestack-login-1150.webp';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import gamestackTexture from 'assets/gamestack-login-640.webp';
import sliceTextureLarge from 'assets/slice-app-2048.webp';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceTexture from 'assets/slice-app-1280.webp';
import cartonConnectTexture from 'assets/carton-connect/signin-desktop.webp';
import cartonConnectTextureSmall from 'assets/carton-connect/signin-desktop-sm.webp';
import cartonConnectTexturePlaceholder from 'assets/carton-connect/signin-desktop-placeholder.jpg';
import campushubTexture from 'assets/campushub/homepage-dark-1280.webp';
import campushubTextureLarge from 'assets/campushub/homepage-dark-2048.webp';
import campushubTexturePlaceholder from 'assets/campushub/homepage-dark-placeholder.jpg';
import githubPlaceholder from 'assets/github-placeholder.jpg';
import github from 'assets/github.webp';
import { useGSAP } from '@gsap/react';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from 'hooks/useSmoothScroll';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Must match the media condition on `.track` in Home.module.css.
const horizontalMedia = '(min-width: 1041px) and (prefers-reduced-motion: no-preference)';

const disciplines = ['Developer', 'Data Analyst', 'System Designer', 'Techie'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectsRef = useRef();
  const trackRef = useRef();
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

  // Desktop: pin the projects and glide the track sideways as the page scrolls.
  // Phones, tablets and reduced-motion visitors keep the vertical stack.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(horizontalMedia, () => {
        const track = trackRef.current;
        // offsetWidth is the panels themselves (5 × 100vw); scrollWidth would also
        // count decorations that overflow the last panel.
        const panelWidth = () => track.offsetWidth / track.children.length;
        const distance = () => track.offsetWidth - document.documentElement.clientWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: projectsRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${distance()}`,
            invalidateOnRefresh: true,
          },
        });

        // Keyboard focus inside a panel that is off to the side: scroll so that
        // panel is the one on screen. The track moves 1:1 with scroll.
        const handleFocus = event => {
          const panel = [...track.children].findIndex(child =>
            child.contains(event.target)
          );
          if (panel < 0) return;
          const y =
            tween.scrollTrigger.start + Math.min(panel * panelWidth(), distance());
          // Next frame, so it lands after the browser's own focus scroll.
          requestAnimationFrame(() => {
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
            else window.scrollTo(0, y);
          });
        };

        track.addEventListener('focusin', handleFocus);

        // Re-measure once the page transition has settled. Arriving at /#details, the
        // first jump happened before the pin added its scroll space, so it landed around
        // project 2: jump again to wherever the target is now.
        const refresh = setTimeout(() => {
          ScrollTrigger.refresh();
          const target = document.getElementById(window.location.hash.slice(1));
          const belowPin =
            target &&
            projectsRef.current.compareDocumentPosition(target) &
              Node.DOCUMENT_POSITION_FOLLOWING;
          if (!belowPin || projectsRef.current.contains(target)) return;
          const y = target.getBoundingClientRect().top + window.scrollY;
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
          else window.scrollTo(0, y);
        }, 500);

        return () => {
          clearTimeout(refresh);
          track.removeEventListener('focusin', handleFocus);
        };
      });

      return () => mm.revert();
    },
    { scope: projectsRef }
  );

  return (
    <div className={styles.home}>
      <Meta
        title="Systems Developer & Data Analyst"
        description="Portfolio of Md. Shoaib Rana, a Computer Science graduate who designs
          and builds internal systems, live dashboards and cloud-hosted web apps."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <div className={styles.projects} ref={projectsRef}>
        <div className={styles.track} ref={trackRef}>
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
                  placeholder: githubPlaceholder,
                },
              ],
            }}
          />
        </div>
      </div>
      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
