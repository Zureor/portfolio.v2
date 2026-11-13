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
import { useTheme } from 'components/ThemeProvider';
import { Transition } from 'components/Transition';
import { useInViewport, useScrollPause } from 'hooks';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useRef, useState } from 'react';
import { media } from 'utils/style';
import { hasWebGL, rgbTokenToHex } from 'utils/webgl';
import styles from './Profile.module.css';

// Start the veil (and fetch the full photo) once the photo is within a screen of view.
const nearView = { rootMargin: '100% 0px' };
// Or earlier, during a scroll pause (the horizontal projects sit above Details).
const aheadView = { rootMargin: '300% 0px' };

const DitherVeil = dynamic(
  () => import('components/DitherVeil').then(mod => mod.DitherVeil),
  { ssr: false }
);

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Greetings" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I'm Shoaib, a Computer Science graduate who designs and builds internal systems.
      Most of my professional work involves taking manual, repetitive processes and
      rebuilding them into systems that run on their own, from live dashboards on
      PostgreSQL to full web apps on AWS. I like the kind of work where you find a process
      someone's been doing by hand for years and figure out how to make it disappear into
      the background.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Outside of that, I spend a lot of time on generative AI, particularly running models
      locally instead of leaning on cloud APIs. That's led me down a path of building
      small automation setups around local models, giving them memory, tool access, and
      ways to control them remotely, mostly for my own coding and productivity workflows.
      It's less about following AI trends and more about seeing what's actually possible
      when you own the whole stack yourself.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I'm also drawn to research, particularly where AI meets real-world problems that
      carry actual stakes, not just benchmark scores. That's an ongoing thread for me, one
      I expect to keep pulling on for a while.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      Away from a screen, it's badminton, chess, and enough anime to embarrass myself if
      you ask.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      More on the <Link href="/about_me">about page</Link>, or check what's actually
      running my setup on the <Link href="/stack">stack page</Link>.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;
  const theme = useTheme();
  const light = theme.themeId === 'light';
  // The plain photo renders on the server and without WebGL; the veil swaps in after mount.
  const imageRef = useRef();
  const near = useInViewport(imageRef, true, nearView);
  const ahead = useInViewport(imageRef, true, aheadView);
  const pause = useScrollPause();
  const [veil, setVeil] = useState(false);

  useEffect(() => {
    if ((near || (ahead && pause)) && hasWebGL()) setVeil(true);
  }, [near, ahead, pause]);

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
              <div className={styles.image} ref={imageRef}>
                {veil ? (
                  // Dithered portrait; hovering reveals the photo in full colour.
                  <div
                    className={styles.veil}
                    role="img"
                    aria-label="Overdressed as always."
                  >
                    <DitherVeil
                      src={profileImgLarge.src}
                      fit="cover"
                      pattern="floyd"
                      pixelSize={2}
                      // Ink is the darkest tone, so it is the dark colour in either theme.
                      inkColor={rgbTokenToHex(
                        light ? theme.rgbText : theme.rgbBackground
                      )}
                      paperColor={rgbTokenToHex(
                        light ? theme.rgbBackground : theme.rgbText
                      )}
                      rimColor={rgbTokenToHex(theme.rgbAccent)}
                      rim={0.15}
                      revealRadius={160}
                    />
                  </div>
                ) : (
                  <Image
                    reveal
                    delay={100}
                    placeholder={profileImgPlaceholder}
                    srcSet={[profileImg, profileImgLarge]}
                    sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                    alt="Overdressed as always."
                  />
                )}
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
