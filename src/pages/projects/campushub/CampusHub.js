
import campushubHomepage from 'assets/campushub/homepage-dark.png';
import campushubHomepagePlaceholder from 'assets/campushub/homepage-dark.png';
import campushubBackground from 'assets/campushub/homepage-light.png';
import campushubBackgroundPlaceholder from 'assets/campushub/homepage-light.png';
import campushubDashboard from 'assets/campushub/dashboard.png';
import campushubDashboardPlaceholder from 'assets/campushub/dashboard.png';
import campushubSignIn from 'assets/campushub/sign-in-light.png';
import campushubSignInPlaceholder from 'assets/campushub/sign-in-light.png';
import campushubSignUp from 'assets/campushub/sign-up-dark.png';
import campushubSignUpPlaceholder from 'assets/campushub/sign-up-dark.png';
import campushubEventsView from 'assets/campushub/events-list-view.png';
import campushubEventsViewPlaceholder from 'assets/campushub/events-list-view.png';
import campushubAdminPanel from 'assets/campushub/admin-panel.png';
import campushubAdminPanelPlaceholder from 'assets/campushub/admin-panel.png';
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
      <Meta title={title} prefix="Projects" description={description} />
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
                authentication, database, and storage. TanStack Query manages 
                server state efficiently.
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
                The responsive design looks great on any device, with cursor effects 
                and dynamic elements that make the experience engaging.
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
                usage and event statistics. Create, edit, and delete events with rich 
                text descriptions and banners.
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
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
