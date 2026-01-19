import profileKatakana from 'assets/katakana-profile.svg?url';
import profileImgLarge from 'assets/profile.jpg';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Greetings" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I'm Shoaib, a determined computer science student at <Link href="https://new.seu.edu.bd/">Southeast University</Link> in Dhaka, 
      Bangladesh, driven by my passion for coding and relentless pursuit of innovative 
      problem-solving.
      This portfolio stands as a testament to my capabilities and underscores my unwavering 
      dedication to the dynamic realm of technology. I’m always down for hearing
      about new projects, so feel free to drop me a line.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Currently, I work as a Packaging Coordinator at <Link href="https://allportcs.com/pac-d/">PacD</Link>, handling
      quality control, generating reports, and developing web applications. I also work as a Digital Marketer
      at <Link href="https://www.ibcs-primax.com/education/">IBCS-Primax</Link>, applying my technical skills to
      enhance digital outreach. In pursuit of my BSc in CSE, I continuously refine my programming prowess
      through practical experience. If you're interested in the tools and software I use, check out my <Link href="/uses">uses page</Link>.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Beyond coding, I indulge in a diverse array of entertainment, immersing myself in 
      compelling movies, anime, and TV series. To maintain equilibrium, I relish the strategic 
      rigor of badminton and chess, keeping my mental faculties razor-sharp.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      This portfolio stands as a testament to my capabilities and underscores my unwavering 
      dedication to the dynamic realm of technology.{' '}<Link href="/about_me">Learn More About Me</Link>.
      I’m always down for hearing about new projects, so feel free to drop me a line.
      
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg, profileImgLarge]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Overdressed as always."
                />
                <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
