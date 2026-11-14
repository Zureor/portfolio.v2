import campushubHomepage from 'assets/campushub/homepage-dark.png';
import campushubHomepagePlaceholder from 'assets/campushub/homepage-dark-placeholder.jpg';
import campushubBackground from 'assets/campushub/homepage-light.png';
import campushubBackgroundPlaceholder from 'assets/campushub/homepage-light-placeholder.jpg';
import campushubDashboard from 'assets/campushub/dashboard.png';
import campushubDashboardPlaceholder from 'assets/campushub/dashboard-placeholder.jpg';
import campushubSignIn from 'assets/campushub/sign-in-light.png';
import campushubSignInPlaceholder from 'assets/campushub/sign-in-light-placeholder.jpg';
import campushubSignUp from 'assets/campushub/sign-up-dark.png';
import campushubSignUpPlaceholder from 'assets/campushub/sign-up-dark-placeholder.jpg';
import campushubEventsView from 'assets/campushub/events-list-view.png';
import campushubEventsViewPlaceholder from 'assets/campushub/events-list-view-placeholder.jpg';
import campushubAdminPanel from 'assets/campushub/admin-panel.png';
import campushubAdminPanelPlaceholder from 'assets/campushub/admin-panel-placeholder.jpg';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';
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
import styles from './CampusHub.module.css';

const title = 'SEU CampusHub';
const description =
  'A modern, dynamic event management platform tailored for Southeast University students and administrators. Discover, Register, and Manage Campus Events with Ease.';
const roles = ['Frontend Development', 'Backend Development', 'UI/UX Design'];

export const CampusHub = () => {
  return (
    <Fragment>
      <Meta
        title="SEU CampusHub: Campus Event Platform"
        description="Event management platform for Southeast University: students discover and register for campus events, admins manage them from a dedicated dashboard."
        schema={{
          '@type': 'CreativeWork',
          name: title,
          description,
          creator: { '@id': `${process.env.NEXT_PUBLIC_WEBSITE_URL}/#person` },
        }}
      />
      <ProjectContainer className={styles.campushub}>
        <ProjectBackground
          src={campushubBackground}
          srcSet={`${campushubBackground.src} 1280w, ${campushubBackground.src} 2560w`}
          placeholder={campushubBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://seucampushub.netlify.app/"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={[campushubHomepage, campushubHomepage]}
              placeholder={campushubHomepagePlaceholder}
              alt="Homepage of SEU CampusHub"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Technical Stack</ProjectSectionHeading>
              <ProjectSectionText>
                Built using React with Vite for blazing-fast development and TypeScript
                for type-safe code. The UI is crafted with Tailwind CSS and Shadcn UI
                components for a modern, consistent design.
              </ProjectSectionText>
              <ProjectSectionText>
                Framer Motion powers the smooth animations, while Firebase handles
                authentication, database, and storage. TanStack Query manages server
                state, and routing runs on wouter to keep the bundle small.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[campushubSignUp, campushubSignUp]}
                placeholder={campushubSignUpPlaceholder}
                alt="Sign up screen in dark mode."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[campushubSignIn, campushubSignIn]}
                placeholder={campushubSignInPlaceholder}
                alt="Sign in screen in light mode."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Student Features</ProjectSectionHeading>
              <ProjectSectionText>
                Browse upcoming, past, and featured events in a beautiful grid layout.
                One-click registration for events, personal dashboard to track
                registrations, and interactive UI with smooth animations.
              </ProjectSectionText>
              <ProjectSectionText>
                The responsive design looks great on any device, with cursor effects and
                dynamic elements that make the experience engaging.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[campushubEventsView, campushubEventsView]}
              placeholder={campushubEventsViewPlaceholder}
              alt="Events list view showing campus events."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Admin Dashboard</ProjectSectionHeading>
              <ProjectSectionText>
                Comprehensive dashboard for administrators with insights into platform
                usage and event statistics. Create, edit, and delete events with rich text
                descriptions and banners.
              </ProjectSectionText>
              <ProjectSectionText>
                Features include category control, user management, and registration
                tracking to oversee platform operations efficiently.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[campushubAdminPanel, campushubAdminPanel]}
              placeholder={campushubAdminPanelPlaceholder}
              alt="Admin panel for managing events."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>User Dashboard</ProjectSectionHeading>
              <ProjectSectionText>
                Personal dashboard for students to track their registrations, interested
                events, and history. Update personal details and preferences easily.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[campushubDashboard, campushubDashboard]}
              placeholder={campushubDashboardPlaceholder}
              alt="User dashboard showing registered events."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>
                Three roles, enforced in the database
              </ProjectSectionHeading>
              <ProjectSectionText>
                Every account is a student, an admin or a super user. The checks do not
                live only in the interface: Firestore security rules read the role from
                the user&apos;s own record on every write, so hiding a button is never the
                only thing between a student and the admin tools.
              </ProjectSectionText>
              <ProjectSectionText>
                New accounts can only be created as students, and people can edit their
                own profile but not their role. A signed-in student can change an event
                only to update its registration and interest counts. Everything else on an
                event, along with categories and user management, is reserved for admins
                and super users.
              </ProjectSectionText>
            </ProjectTextRow>
            <ProjectTextRow>
              <ProjectSectionHeading>How the data is shaped</ProjectSectionHeading>
              <ProjectSectionText>
                Four Firestore collections carry the app: events, categories,
                registrations and users. An event has a venue, organiser, banner, an
                optional capacity and a Draft or Published status, so admins can prepare
                an event before publishing it.
              </ProjectSectionText>
              <ProjectSectionText>
                Categories live in the database rather than in code, each with its own
                name, colour and icon, so admins can add one without a redeploy.
                Registrations are separate documents tied to a user and an event, which is
                what lets admins pull the attendee list for any event.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
