import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import {
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from 'layouts/Project';
import { Fragment } from 'react';
import styles from './Liminal.module.css';

const title = 'liminal';
const description =
  'A Python library that calibrates LLM judges against human labels using Item Response Theory, treating each judge as a measured instrument rather than an oracle.';
const roles = ['Statistical Modeling', 'Python Library', 'Research Tooling'];
const repoUrl = 'https://github.com/Zureor/liminal';

export const Liminal = () => {
  return (
    <Fragment>
      <Meta title={title} prefix="Projects" description={description} />
      <ProjectContainer className={styles.liminal}>
        <ProjectHeader
          title={title}
          description={description}
          url={repoUrl}
          linkLabel="View source"
          roles={roles}
        />
        <ProjectSection className={styles.section} padding="top">
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>The measurement problem</ProjectSectionHeading>
              <ProjectSectionText>
                LLM-as-judge is how most teams evaluate chatbots, summarizers and
                RAG pipelines. The trouble is that a judge is a biased
                instrument: it rewards verbosity, drifts from human taste, and
                disagrees with other judges. Most eval tooling reads its scores
                as ground truth anyway.
              </ProjectSectionText>
              <div className={styles.stat}>
                <p className={styles.statFigure}>&#954; &#8776; 0.3</p>
                <p className={styles.statCopy}>
                  Agreement between a naive LLM judge and human experts on
                  SummEval. Model rankings derived from that judge are unstable.
                </p>
              </div>
              <ProjectSectionText>
                liminal fits a statistical model of the judges instead, so the
                output separates who is harsh, who is noisy, and what quality
                actually looks like underneath.
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>Close</ProjectSectionHeading>
              <ProjectSectionText>
                <Button
                  secondary
                  iconHoverShift
                  icon="chevronRight"
                  href={repoUrl}
                >
                  View source
                </Button>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
};
