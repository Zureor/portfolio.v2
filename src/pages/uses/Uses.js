import usesBackgroundPlaceholder from 'assets/uses-background-placeholder.jpg';
import usesBackground from 'assets/uses-background.mp4';
import { Footer } from 'components/Footer';
import { Link } from 'components/Link';
import { List, ListItem } from 'components/List';
import { Meta } from 'components/Meta';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from 'components/Table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment } from 'react';
import styles from './Uses.module.css';

export const Uses = () => {
  return (
    <Fragment>
      <Meta
        title="Uses"
        description="A list of hardware and software I use to do my thing"
      />
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={{ src: usesBackground }}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="A somewhat comprehensive list of tools, apps, hardware, and more that I use on a daily basis to design and code things. And yeah, that is a Johnny Mnemonic GIF in the background."
        />
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Design</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                <ListItem>
                    Lately, I've been all about WordPress, especially with plugins 
                    like <Link href="https://elementor.com/"> Elementor</Link> for 
                    my web design gigs. I'm also tinkering
                    with <Link href="https://www.maxon.net/en/cinema-4d">Figma</Link>, but
                    still working on getting the hang of them.
                  </ListItem>
                  <ListItem>
                    When it comes to 2D graphics or photo editing, I stick 
                    with Adobe Photoshop, Lightroom, and Illustrator because 
                    they are top-notch and have everything I need. Plus, I'm 
                    really into tools that integrate AI. If you have got any 
                    recommendations for alternatives with AI integration, <Link href="/contact">hit me up!</Link>.
                  </ListItem>
                  <ListItem>
                    I mainly work with <Link href="https://www.maxon.net/en/cinema-4d">
                    Cinema 4D</Link> for 3D modeling and animation, although I also have 
                    some experience with <Link href="https://www.autodesk.com/products/maya/overview">
                    Maya</Link> and <Link href="https://www.blender.org/">Blender
                    </Link>. However, Cinema 4D is my preferred choice.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Development</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    I mostly use <Link href="https://www.jetbrains.com/ides/">Jetbrains</Link> softwares such 
                    as PyCharm, WebStorm, IntelliJ, Clion to code. 
                    Their ai assistant is really good. Also use <Link href="https://code.visualstudio.com/">VSCode</Link> sometimes 
                    as an alternative.
                  </ListItem>
                  <ListItem>
                    Chrome is my main browser for both development and general use.
                  </ListItem>
                  <ListItem>
                    <Link href="https://reactjs.org/">React</Link> is my front end
                    Javascript library of choice. The component-centric mental model is
                    the first thing that truly made sense to me as a designer.
                  </ListItem>
                  <ListItem>
                    For 3D effects and image shaders I use{' '}
                    <Link href="https://threejs.org/">three.js</Link>. It has a bit of a
                    learning curve but you can do some really powerful stuff with it.
                  </ListItem>
                  <ListItem>
                  When it comes to game development, I switch 
                  between <Link href="https://unity.com/">Unity</Link> and <Link href="https://www.unrealengine.com/en-US/unreal-engine-5">Unreal Engine</Link>, depending
                   on the project I'm tackling.
                  </ListItem>
                  <ListItem>
                    For Javascript animations I use{' '}
                    <Link href="https://www.framer.com/motion/">Framer Motion</Link>, it’s
                    a great way to add spring animations to React and three.js.
                  </ListItem>
                  
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>Hardware</ProjectSectionHeading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeadCell>Desktop</TableHeadCell>
                    <TableCell>Custom built</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Operating system</TableHeadCell>
                    <TableCell>Windows 11</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Laptop</TableHeadCell>
                    <TableCell>Macbook Air M2 15″</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Camera</TableHeadCell>
                    <TableCell>Canon EOS 700D</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
