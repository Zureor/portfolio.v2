import dashboardDark from 'assets/carton-connect/dashboard-dark.webp';
import dashboardDarkSmall from 'assets/carton-connect/dashboard-dark-sm.webp';
import dashboardDarkPlaceholder from 'assets/carton-connect/dashboard-dark-placeholder.jpg';
import dashboardLight from 'assets/carton-connect/dashboard-light.webp';
import dashboardLightSmall from 'assets/carton-connect/dashboard-light-sm.webp';
import dashboardLightPlaceholder from 'assets/carton-connect/dashboard-light-placeholder.jpg';
import queryBuilder from 'assets/carton-connect/query-builder.webp';
import queryBuilderSmall from 'assets/carton-connect/query-builder-sm.webp';
import queryBuilderPlaceholder from 'assets/carton-connect/query-builder-placeholder.jpg';
import signinDesktop from 'assets/carton-connect/signin-desktop.webp';
import signinDesktopSmall from 'assets/carton-connect/signin-desktop-sm.webp';
import signinDesktopPlaceholder from 'assets/carton-connect/signin-desktop-placeholder.jpg';
import signinMobile from 'assets/carton-connect/signin-mobile.webp';
import signinMobilePlaceholder from 'assets/carton-connect/signin-mobile-placeholder.jpg';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
import { useTheme } from 'components/ThemeProvider';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionColumns,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment } from 'react';
import { media } from 'utils/style';
import styles from './CartonConnect.module.css';

const title = 'Carton Connect';
const description =
  "A carton ordering and supply portal for Primark's export carton programme, run by PAC-D.";
const roles = ['Product Design', 'Full-stack Development', 'Cloud Infrastructure'];
const siteUrl = 'https://cartonconnect.pac-d.com/';

const wideSizes = `(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`;

const orderFlow = [
  {
    step: 'Placed',
    copy: 'The factory orders cartons by Destination PO, style, pack and size, one line or a 500-row Excel import. Every line is priced on the server as it is entered.',
  },
  {
    step: 'Accepted',
    copy: 'The packaging supplier accepts or rejects, splits the order into deliveries and sets expected dates.',
  },
  {
    step: 'Delivered',
    copy: 'Each delivery is ticked off with a photo of its delivery challan. Status after acceptance is worked out from the deliveries, so it never drifts.',
  },
  {
    step: 'Completed',
    copy: 'Once the claim window closes, the order closes itself. Damaged or missing cartons go through an issue with photo or video evidence for Primark or PAC-D to approve.',
  },
];

const portalRoles = [
  { role: 'Factory', copy: 'Places orders, raises issues for damaged cartons.' },
  { role: 'Garment supplier', copy: 'Follows its orders, writes notes, runs reports.' },
  {
    role: 'Packaging supplier',
    copy: 'Accepts orders, schedules and records deliveries.',
  },
  { role: 'Primark', copy: 'Oversees every order and decides on issues.' },
  { role: 'PAC-D Admin', copy: 'Runs the programme: allocations, forecasts, edits.' },
  { role: 'Superadmin', copy: 'Owns accounts, settings and the audit log.' },
];

const timeline = [
  {
    date: 'Early October 2026',
    title: 'Requirements and design',
    copy: 'Worked out the order lifecycle, roles and rules with the programme team and wrote the design specification, approved on 7 October.',
  },
  {
    date: 'October 2026',
    title: 'Build',
    copy: 'Database, application, emails, reports and the admin tools, with automated tests written alongside every feature.',
  },
  {
    date: '24 October 2026',
    title: 'Cloud deployment',
    copy: 'Infrastructure defined as code and deployed to AWS, with a one-step release that checks the build before it ships.',
  },
  {
    date: '27 October 2026',
    title: 'Live',
    copy: 'Moved to its own address, cartonconnect.pac-d.com, then load-tested at ten million order lines and tuned until every page held up.',
  },
];

const stack = [
  'Next.js',
  'React',
  'TypeScript',
  'PostgreSQL',
  'AWS',
  'Docker',
  'Infrastructure as code',
  'Automated tests',
];

export const CartonConnect = () => {
  const { themeId } = useTheme();
  const dashboard = themeId === 'light' ? dashboardLight : dashboardDark;
  const dashboardSmall = themeId === 'light' ? dashboardLightSmall : dashboardDarkSmall;
  const dashboardPlaceholder =
    themeId === 'light' ? dashboardLightPlaceholder : dashboardDarkPlaceholder;

  return (
    <Fragment>
      <Meta
        title="Carton Connect: Carton Ordering Portal"
        description={description}
        schema={{
          '@type': 'CreativeWork',
          name: title,
          description,
          creator: { '@id': `${process.env.NEXT_PUBLIC_WEBSITE_URL}/#person` },
        }}
      />
      <ProjectContainer className={styles.cartonConnect}>
        <ProjectBackground
          src={signinDesktopPlaceholder}
          srcSet={`${signinDesktopPlaceholder.src} 1280w`}
          placeholder={signinDesktopPlaceholder}
          opacity={0.5}
        />
        <ProjectHeader
          title={title}
          description={description}
          url={siteUrl}
          linkLabel="Visit site"
          roles={roles}
        />
        <ProjectSection className={styles.section} padding="top">
          <ProjectSectionContent>
            <ProjectImage
              className={styles.screenshot}
              srcSet={[signinDesktopSmall, signinDesktop]}
              placeholder={signinDesktopPlaceholder}
              alt="Carton Connect sign-in page showing the order steps: placed, accepted, delivered, completed."
              sizes={wideSizes}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>The problem</ProjectSectionHeading>
              <ProjectSectionText>
                Export cartons for Primark move between three kinds of company: the
                factories that pack garments, the garment suppliers who own the orders,
                and the packaging suppliers who make the cartons. Those orders were
                tracked by hand, through email chains and spreadsheets, so nobody saw the
                same status at the same time and every price was worked out separately.
              </ProjectSectionText>
              <ProjectSectionText>
                Carton Connect replaces all of that with one shared record per order.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.section} light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>How an order moves</ProjectSectionHeading>
              <ProjectSectionText>
                Every order line follows the same four steps, and everyone with a stake in
                it sees each step as it happens.
              </ProjectSectionText>
              <ol className={styles.flow}>
                {orderFlow.map(({ step, copy }, index) => (
                  <li className={styles.flowStep} key={step}>
                    <span className={styles.flowIndex} aria-hidden>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.flowTitle}>{step}</span>
                    <span className={styles.flowCopy}>{copy}</span>
                  </li>
                ))}
              </ol>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>Six roles, one portal</ProjectSectionHeading>
              <ProjectSectionText>
                Each user belongs to one company and sees only that company's orders.
                Factories never see other factories and suppliers never see other
                suppliers. The rule is enforced twice, in the application and in the
                database itself, and tested for every role.
              </ProjectSectionText>
              <dl className={styles.roles}>
                {portalRoles.map(({ role, copy }) => (
                  <div className={styles.roleRow} key={role}>
                    <dt>{role}</dt>
                    <dd>{copy}</dd>
                  </div>
                ))}
              </dl>
            </ProjectTextRow>
          </ProjectSectionContent>
          <ProjectSectionContent className={styles.media}>
            <ProjectImage
              className={styles.screenshot}
              srcSet={[dashboardSmall, dashboard]}
              placeholder={dashboardPlaceholder}
              alt="Carton Connect home dashboard with order counts by status, recent reports and announcements."
              sizes={wideSizes}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.section} light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>Reports and oversight</ProjectSectionHeading>
              <ProjectSectionText>
                A query builder lets anyone pick from 45 order, delivery and issue fields,
                add filters and export to Excel, PDF or JSON. Reports build in the
                background, can be scheduled weekly or monthly, and arrive by email.
                Primark and PAC-D also get carton supply figures per packaging supplier,
                on-time rates, factory allocation shares and a carton-volume forecast.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
          <ProjectSectionContent className={styles.media}>
            <ProjectImage
              className={styles.screenshot}
              srcSet={[queryBuilderSmall, queryBuilder]}
              placeholder={queryBuilderPlaceholder}
              alt="The report query builder with available fields, selected fields and filters."
              sizes={wideSizes}
            />
          </ProjectSectionContent>
        </ProjectSection>

        <ProjectSection className={styles.section}>
          <ProjectSectionColumns centered className={styles.columns}>
            <div>
              <ProjectSectionHeading>Built to scale</ProjectSectionHeading>
              <ProjectSectionText>
                The portal is sized for hundreds of daily users and millions of order
                lines a year. Before launch it was load-tested against ten million order
                lines, and the slow paths it found were fixed and re-measured. Factories
                use it from their phones to upload evidence on the spot.
              </ProjectSectionText>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <p className={styles.statFigure}>10M</p>
                  <p className={styles.statCopy}>order lines in the load test</p>
                </div>
                <div className={styles.stat}>
                  <p className={styles.statFigure}>1,600+</p>
                  <p className={styles.statCopy}>automated tests on every change</p>
                </div>
              </div>
              <ul className={styles.stack} aria-label="Tech stack">
                {stack.map(item => (
                  <li className={styles.stackItem} key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              className={styles.phone}
              srcSet={[signinMobile, signinMobile]}
              placeholder={signinMobilePlaceholder}
              alt="Carton Connect sign-in page on a phone."
              sizes={`(max-width: ${media.mobile}px) 60vw, 320px`}
            />
          </ProjectSectionColumns>
        </ProjectSection>

        <ProjectSection className={styles.section} light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>Solo, end to end</ProjectSectionHeading>
              <ProjectSectionText>
                I did every part of this myself: requirements, product design, the
                database, the application, testing, cloud infrastructure, deployment and
                the releases that keep it running. From an approved specification to a
                live portal took three weeks.
              </ProjectSectionText>
              <ol className={styles.timeline}>
                {timeline.map(item => (
                  <li className={styles.timelineItem} key={item.title}>
                    <span className={styles.timelineDate}>{item.date}</span>
                    <span className={styles.timelineTitle}>{item.title}</span>
                    <span className={styles.timelineCopy}>{item.copy}</span>
                  </li>
                ))}
              </ol>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
