import sliceAppPlaceholder from 'assets/slice-app-placeholder.jpg';
import sliceApp from 'assets/slice-app.jpg';
import sliceBackgroundPlaceholder from 'assets/slice-background-placeholder.jpg';
import sliceBackground from 'assets/slice-background.jpg';
import sliceSidebarAnnotationsPlaceholder from 'assets/slice-sidebar-annotations-placeholder.png';
import sliceSidebarAnnotations from 'assets/slice-sidebar-annotations.png';
import sliceSidebarLayersPlaceholder from 'assets/slice-sidebar-layers-placeholder.png';
import sliceSidebarLayers from 'assets/slice-sidebar-layers.png';
import sliceSlidesPlaceholder from 'assets/slice-slides-placeholder.jpg';
import sliceSlides from 'assets/slice-slides.jpg';
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
import styles from './Zahoor.module.css';

const title = 'Zahoor';
const description =
  'In collaboration with Zahoor, a Bangladeshi online fashion boutique, I designed and developed their e-commerce website.';
const roles = ['User Research', 'Interface Design', 'Backend Development'];

export const Zahoor = () => {
  return (
    <Fragment>
      <Meta
        title="Zahoor: Fashion E-commerce Website"
        description={description}
        schema={{
          '@type': 'CreativeWork',
          name: title,
          description,
          creator: { '@id': `${process.env.NEXT_PUBLIC_WEBSITE_URL}/#person` },
        }}
      />
      <ProjectContainer className={styles.zahoor}>
        <ProjectBackground
          src={sliceBackground}
          srcSet={`${sliceBackground.src} 1280w, ${sliceBackground.src} 2560w`}
          placeholder={sliceBackgroundPlaceholder}
          opacity={0.8}
        />
        <ProjectHeader title={title} description={description} roles={roles} />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={[sliceApp, sliceApp]}
              placeholder={sliceAppPlaceholder}
              alt="Homepage of Zahoor"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns centered className={styles.columns}>
            <div className={styles.imagesText}>
              <ProjectSectionHeading>Technical Specifications</ProjectSectionHeading>
              <ProjectSectionText>
                Built using WordPress, a user-friendly content management system, for easy
                updates and content management.
              </ProjectSectionText>
              <ProjectSectionText>
                WooCommerce, a powerful e-commerce plugin for WordPress, provides a robust
                online store functionality.
              </ProjectSectionText>
            </div>
            <div className={styles.sidebarImages}>
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarLayers, sliceSidebarLayers]}
                placeholder={sliceSidebarLayersPlaceholder}
                alt="Zahoor mobile homepage with Eid campaign banners and featured products."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
              <Image
                className={styles.sidebarImage}
                srcSet={[sliceSidebarAnnotations, sliceSidebarAnnotations]}
                placeholder={sliceSidebarAnnotationsPlaceholder}
                alt="Zahoor mobile category page for women's wear: kurta, co-ord set, salwar kameez and partywear."
                sizes={`(max-width: ${media.mobile}px) 200px, 343px`}
              />
            </div>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Improving the experience</ProjectSectionHeading>
              <ProjectSectionText>
                Designed a mobile application so the shop team could upload, organise and
                manage products without opening the WordPress dashboard.
              </ProjectSectionText>
              <ProjectSectionText>
                Features include product import, cost and profit tracking, and coupon
                management.
              </ProjectSectionText>
            </ProjectTextRow>
            <Image
              srcSet={[sliceSlides, sliceSlides]}
              placeholder={sliceSlidesPlaceholder}
              alt="Interface of a category."
              sizes={`(max-width: ${media.mobile}px) 500px, (max-width: ${media.tablet}px) 800px, 1000px`}
            />
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Built for shopping on a phone</ProjectSectionHeading>
              <ProjectSectionText>
                On mobile the store keeps its main actions in a fixed bottom bar: Home,
                Wishlist, Search, Cart and Contact, with a chat button within reach of the
                thumb. Nothing important sits behind the menu.
              </ProjectSectionText>
              <ProjectSectionText>
                Categories branch into the cuts customers actually shop by. Women&apos;s
                wear, for example, opens on kurta, co-ord set, salwar kameez and
                partywear. Seasonal campaigns such as the Eid Fest 2024 sale run as
                full-width banners at the top of the homepage, above the featured
                products.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
