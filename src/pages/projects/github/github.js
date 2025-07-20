
import githubBackgroundPlaceholder from 'assets/github.png';
import githubBackground from 'assets/coding_video.mp4';
import ulms_back from 'assets/projects/ULMS_Back.png';
import ulms from 'assets/projects/ULMS.png';
import student_dashboard from 'assets/projects/excel_dashboard.png';
import student_dashboard_back from 'assets/projects/excel_dashboard_back.png';
import expense_dashboard from 'assets/projects/expense.jpg';
import portfolio from 'assets/projects/portfolio.png';
import perfume_dashboard_bg from 'assets/projects/perfume_dash_bg.png';
import perfume_dashboard from 'assets/projects/perfume_dash.png';
import { Footer } from 'components/Footer';
import { Image } from 'components/Image';
import { Meta } from 'components/Meta';

import { Button } from 'components/Button';
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
import styles from './github.module.css';


const description =
  'These are small projects I’ve worked on over the years—some for university assignments, others just for fun. They weren’t built for commercial use, but they helped me learn a lot and explore different tools and ideas.';
//const roles = ['User Research', 'Interface Design', 'Backend Development'];

export const github = () => {
  return (
    <Fragment>
      <Meta title='Other Projects' prefix="Projects" description={description} />
      <ProjectContainer className={styles.github}>
        <ProjectBackground
          src={githubBackground}
          srcSet={`${githubBackground.src} 1280w, ${githubBackground.src} 2560w`}
          placeholder={githubBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader
          description={description}
        />
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[ulms_back, ulms_back]}
                placeholder={ulms_back}
                alt="Mobile view."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[ulms, ulms]}
                placeholder={ulms}
                alt="Mobile view."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>University Library Management System</ProjectSectionHeading>
              <ProjectSectionText>
              This University Library Management System is a handy web app that makes library life easier 
              for everyone. Students can quickly reserve the books they need and keep track of any fines 
              they might have. Librarians get a simple way to manage books and handle reservations, while 
              admins take care of user accounts. There’s even a feature to add lots of books at once using 
              an API. It’s built with PHP and MySQL, with a clean HTML/CSS frontend—basically, everything 
              you need to keep the library running smoothly!
              </ProjectSectionText>
              <ProjectSectionText>
                <Button
                    secondary
                    iconHoverShift
                    icon="chevronRight"                            
                    href="https://github.com/Zureor/ULMS">
                        View Source Code
                </Button>
              </ProjectSectionText>
            </div>
            
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Student Dashboard</ProjectSectionHeading>
              <ProjectSectionText>
              This interactive student dashboard is developed using Excel Macros (VBA) and 
              provides a clear overview of academic performance. It includes a visual representation
               of credit completion progress, a grade distribution chart showing the count of each 
               letter grade, and a combined graph displaying semester-wise GPA, CGPA trends, and credit 
               summary. The dashboard offers a clean and efficient way for students to track their 
               academic journey and make informed decisions.
              </ProjectSectionText>
              <ProjectSectionText>
                <Button
                    secondary
                    iconHoverShift
                    icon="chevronRight"                            
                    href="https://github.com/Zureor/Student_dashboard">
                        View Source Code
                </Button>
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[student_dashboard_back, student_dashboard_back]}
                placeholder={student_dashboard_back}
                alt="Mobile view."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[student_dashboard, student_dashboard]}
                placeholder={student_dashboard}
                alt="Mobile view."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Portfolio Website</ProjectSectionHeading>
              <ProjectSectionText>
                This is a simple portfolio website I built to showcase web development skills. 
                It features a clean, responsive design that works well across all devices—desktops, 
                tablets, and phones. The site includes smooth scrolling, hover effects, and 
                well-organized sections to present skills, experience, and project highlights clearly. 
                It was built using HTML5, CSS3, and JavaScript, and served as a personal branding site during its time.
              </ProjectSectionText>
              <ProjectSectionText>
                <Button
                    secondary
                    iconHoverShift
                    icon="chevronRight"                            
                    href="https://github.com/Zureor/portfolio">
                        View Source Code
                </Button>
                <Button
                    secondary
                    iconHoverShift
                    icon="chevronRight"                            
                    href="https://zureor.github.io/portfolio/">
                        View Live Site
                </Button>
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[portfolio, portfolio]}
              placeholder={portfolio}
              alt="Interface of a category."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[perfume_dashboard_bg, perfume_dashboard_bg]}
                placeholder={perfume_dashboard_bg}
                alt="Mobile view."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[perfume_dashboard, perfume_dashboard]}
                placeholder={perfume_dashboard}
                alt="Mobile view."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Perfume Sales Dashboard</ProjectSectionHeading>
              <ProjectSectionText>
              An interactive Power BI dashboard that explores perfume sales by product,
              brand, and season. It highlights revenue trends, seasonal patterns, and lets
               you filter the data for deeper insights. The project also includes data cleaning steps 
               like splitting multi-season entries, and features a clean, polished layout for better storytelling.
              </ProjectSectionText>
              <ProjectSectionText>
                <Button
                    secondary
                    iconHoverShift
                    icon="chevronRight"                            
                    href="https://github.com/Zureor/PerfumeSalesDashboard">
                        View Source Code
                </Button>
              </ProjectSectionText>
            </div>
            
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Monty Expense Tracker</ProjectSectionHeading>
              <ProjectSectionText>
              A simple finance tracker built with Java, Spring Web, and MySQL. 
              It lets you log income and expenses, organize them by category, and 
              view your full transaction history.
              </ProjectSectionText>
              <ProjectSectionText>
                <Button
                    secondary
                    iconHoverShift
                    icon="chevronRight"                            
                    href="https://github.com/Zureor/Monty-Expense-Tracker">
                        View Source Code
                </Button>
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[expense_dashboard, expense_dashboard]}
                placeholder={expense_dashboard}
                alt="Mobile view."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
