import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import usesBackground from 'assets/uses-background.mp4';
import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Link } from 'components/Link';
import { Meta } from 'components/Meta';
import { Magnetic, Parallax, Reveal, Spotlight, Tilt } from 'components/Motion';
import { Text } from 'components/Text';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
} from 'layouts/Project';
import { Fragment } from 'react';
import styles from './Stack.module.css';

const title = 'Stack';
const description =
  'The tools, models and machines I actually run day to day. Heavy on open source, light on brand loyalty.';

const assistant = {
  name: 'Hermes',
  role: 'Personal assistant',
  copy: 'Handles my day-to-day tasks and remembers the things I would otherwise lose track of, which turns out to be most of what I actually want from an assistant.',
};

const codingAgents = [
  {
    id: 'opencode',
    name: 'OpenCode',
    url: 'https://opencode.ai/',
    copy: 'My default coding CLI. Open source and model-agnostic, which is the entire reason it suits me.',
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    url: 'https://claude.com/product/claude-code',
    copy: 'The other one I keep open. Different strengths, so which one I reach for depends on the job.',
  },
];

const providers = [
  {
    id: 'openrouter',
    name: 'OpenRouter',
    url: 'https://openrouter.ai/',
    copy: 'One endpoint, a long list of models behind it. Cheap enough to switch that I actually do.',
  },
  {
    id: 'nim',
    name: 'NVIDIA NIM',
    url: 'https://build.nvidia.com/',
    copy: 'Where I run open models fast without standing up the infrastructure myself.',
  },
];

const development = [
  {
    id: 'editors',
    label: 'Editors',
    value: (
      <Fragment>
        <Link href="https://www.jetbrains.com/ides/">JetBrains</Link> across the board,
        PyCharm, WebStorm, IntelliJ and CLion depending on the language.{' '}
        <Link href="https://code.visualstudio.com/">VS Code</Link> when something wants
        it.
      </Fragment>
    ),
  },
  {
    id: 'frontend',
    label: 'Frontend',
    value: (
      <Fragment>
        <Link href="https://reactjs.org/">React</Link>, which is what this site is built
        on.
      </Fragment>
    ),
  },
  {
    id: 'animation',
    label: 'Animation',
    value: (
      <Fragment>
        <Link href="https://gsap.com/">GSAP</Link> for scroll and pointer work, with{' '}
        <Link href="https://www.framer.com/motion/">Framer Motion</Link> still handling
        the older components here.
      </Fragment>
    ),
  },
  {
    id: 'webgl',
    label: '3D on the web',
    value: (
      <Fragment>
        <Link href="https://threejs.org/">three.js</Link>. Steep to start with, then very
        hard to put down.
      </Fragment>
    ),
  },
  {
    id: 'engines',
    label: 'Game engines',
    value: (
      <Fragment>
        <Link href="https://www.unrealengine.com/en-US/unreal-engine-5">
          Unreal Engine
        </Link>{' '}
        mostly, <Link href="https://unity.com/">Unity</Link> when the project calls for
        it.
      </Fragment>
    ),
  },
];

const design = [
  {
    id: 'raster',
    label: '2D and photo',
    value: 'Photoshop, Lightroom and Illustrator.',
  },
  {
    id: 'three',
    label: '3D',
    value: (
      <Fragment>
        <Link href="https://www.maxon.net/en/cinema-4d">Cinema 4D</Link> is the one I know
        properly. Some{' '}
        <Link href="https://www.autodesk.com/products/maya/overview">Maya</Link> and{' '}
        <Link href="https://www.blender.org/">Blender</Link> alongside it.
      </Fragment>
    ),
  },
  {
    id: 'interface',
    label: 'Interface',
    value: (
      <Fragment>
        <Link href="https://www.figma.com/">Figma</Link>, still getting properly fluent.
      </Fragment>
    ),
  },
  {
    id: 'web',
    label: 'Client sites',
    value: (
      <Fragment>
        WordPress with <Link href="https://elementor.com/">Elementor</Link> for the design
        work that pays.
      </Fragment>
    ),
  },
];

const hardware = [
  { id: 'desktop', label: 'Desktop', value: 'Custom built' },
  { id: 'os', label: 'Operating system', value: 'Windows 11 with WSL2' },
  { id: 'laptop', label: 'Laptop', value: 'MacBook Air M2 15″' },
  { id: 'camera', label: 'Camera', value: 'Canon EOS 700D' },
];

const KeyedRow = ({ item }) => (
  <li className={styles.row} data-reveal-item>
    <p className={styles.rowLabel}>{item.label}</p>
    <div className={styles.rowValue}>{item.value}</div>
  </li>
);

export const Stack = () => (
  <Fragment>
    <Meta title={title} description={description} />
    <ProjectContainer className={styles.stack}>
      <ProjectBackground
        src={{ src: usesBackground }}
        placeholder={usesBackgroundPlaceholder}
        opacity={0.7}
      />
      <ProjectHeader title={title} description={description} />

      {/* Agents: one assistant panel against a pair of coding CLIs */}
      <ProjectSection padding="none" className={styles.section}>
        {/* Every section keeps the default width: .sectionInner centers its
            content, so a wider block here would sit further left than the rest
            and break the page's left rail. */}
        <ProjectSectionContent>
          <Reveal className={styles.agents}>
            <ProjectSectionHeading className={styles.agentsHeading}>
              Agents I run
            </ProjectSectionHeading>
            {/* The two columns drift at different rates so the assistant reads
                as the nearer plane and the CLIs sit behind it. */}
            <Parallax className={styles.assistantPlane} speed={-8} minWidth={1041}>
              <Tilt data-reveal-item>
                <Spotlight as="article" className={styles.assistant}>
                  {/* data-depth lifts these toward the viewer, so they shift
                      against the panel as it turns */}
                  <div className={styles.assistantMeta} data-depth="42">
                    <h3 className={styles.assistantName}>{assistant.name}</h3>
                    <p className={styles.assistantRole}>{assistant.role}</p>
                  </div>
                  <p className={styles.assistantCopy} data-depth="18">
                    {assistant.copy}
                  </p>
                </Spotlight>
              </Tilt>
            </Parallax>
            <Parallax className={styles.pairPlane} speed={5} minWidth={1041}>
              <div className={styles.agentPair}>
                {codingAgents.map(agent => (
                  <article className={styles.agent} data-reveal-item key={agent.id}>
                    <h3 className={styles.agentName}>
                      <Link href={agent.url}>{agent.name}</Link>
                    </h3>
                    <p className={styles.agentCopy}>{agent.copy}</p>
                  </article>
                ))}
              </div>
            </Parallax>
          </Reveal>
        </ProjectSectionContent>
      </ProjectSection>

      {/* Models: the argument, then the two places I get them from */}
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <Reveal className={styles.models}>
            <ProjectSectionHeading>Models and providers</ProjectSectionHeading>
            <Text as="p" size="l" className={styles.manifesto}>
              I do not have a favourite model, I have a favourite way of picking one.
              Being locked to Claude or Gemini or ChatGPT because it is the default is the
              opposite of what I want from this. I am an open source believer, so I try a
              lot of them and use whichever is genuinely good at the task in front of me.
            </Text>
            <ul className={styles.providerList}>
              {providers.map(provider => (
                <li className={styles.provider} data-reveal-item key={provider.id}>
                  <h3 className={styles.providerName}>
                    <Link href={provider.url}>{provider.name}</Link>
                  </h3>
                  <p className={styles.providerCopy}>{provider.copy}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </ProjectSectionContent>
      </ProjectSection>

      {/* Build tools: two keyed ledgers at different lengths */}
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <div className={styles.craftPair}>
            <Reveal as="section" className={styles.craft}>
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ul className={styles.rowList}>
                {development.map(item => (
                  <KeyedRow item={item} key={item.id} />
                ))}
              </ul>
            </Reveal>
            <Reveal as="section" className={styles.craft}>
              <ProjectSectionHeading>Design and 3D</ProjectSectionHeading>
              <ul className={styles.rowList}>
                {design.map(item => (
                  <KeyedRow item={item} key={item.id} />
                ))}
              </ul>
            </Reveal>
          </div>
        </ProjectSectionContent>
      </ProjectSection>

      {/* Hardware: same keyed ledger as above, so the page holds one measure */}
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <Reveal as="section" className={styles.craft}>
            <ProjectSectionHeading>Hardware</ProjectSectionHeading>
            <ul className={styles.rowList}>
              {hardware.map(item => (
                <KeyedRow item={item} key={item.id} />
              ))}
            </ul>
          </Reveal>
        </ProjectSectionContent>
      </ProjectSection>

      {/* Closing: where the next thing on this page usually comes from */}
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <div className={styles.outro}>
            <Text as="p" size="l" className={styles.outroCopy}>
              Most of what ends up on this page started as something I found on GitHub
              late at night and wanted to take apart. If you have built something worth
              stealing ideas from, I would like to see it.
            </Text>
            <Magnetic>
              <Button secondary iconHoverShift icon="chevronRight" href="/contact">
                Send me a message
              </Button>
            </Magnetic>
          </div>
        </ProjectSectionContent>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </Fragment>
);
