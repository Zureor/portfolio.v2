import { Button } from 'components/Button';
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Depth } from 'components/Motion';
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
        <ProjectSection className={styles.section} light>
          <ProjectSectionContent>
            <ProjectTextRow width="l" stretch>
              <ProjectSectionHeading>What the model says</ProjectSectionHeading>
              <ProjectSectionText>
                liminal fits a Graded Response Model, which treats a 1&ndash;5
                rating as an ordered category rather than a number to average.
                The probability that judge <em>j</em> rates item <em>i</em> at
                least <em>k</em> is:
              </ProjectSectionText>
              <p className={styles.formula}>
                P(rating<sub>ij</sub> &#8805; k) = &#963;( a<sub>j</sub> &#183;
                ( &#952;<sub>i</sub> &#8722; &#946;<sub>j</sub> +
                &#947;<sub>j</sub>&#183;z<sub>i</sub> &#8722;
                &#964;<sub>jk</sub> ) )
              </p>
              <dl className={styles.ledger}>
                <div className={styles.ledgerRow}>
                  <dt>&#952;<sub>i</sub></dt>
                  <dd>Latent true quality of item i, the thing you actually wanted to measure.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#946;<sub>j</sub></dt>
                  <dd>Severity of judge j. Higher means a harder grader.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>a<sub>j</sub></dt>
                  <dd>Discrimination of judge j. Higher means more reliable.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#947;<sub>j</sub></dt>
                  <dd>Length-bias coefficient. Positive means the judge rewards verbosity.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>z<sub>i</sub></dt>
                  <dd>Standardized log-length of item i, the covariate that carries the bias.</dd>
                </div>
                <div className={styles.ledgerRow}>
                  <dt>&#964;<sub>jk</sub></dt>
                  <dd>Judge j&#8217;s k-th category threshold. Four of them for a five-point scale.</dd>
                </div>
              </dl>
              <ProjectSectionText>
                Separating &#947; from &#952; is what pulls &#8220;long&#8221;
                apart from &#8220;good&#8221;, which is the best-documented
                failure mode these judges have.
              </ProjectSectionText>
              <Depth className={styles.figure} perspective={1100} travel={70}>
                <div className={styles.figureLayer} data-depth="-40" aria-hidden="true">
                  <svg className={styles.figureSvg} viewBox="0 0 600 300">
                    <g stroke="rgb(var(--rgbText) / 0.25)" strokeWidth="1">
                      <line x1="40" y1="260" x2="580" y2="260" />
                      <line x1="40" y1="20" x2="40" y2="260" />
                    </g>
                  </svg>
                </div>
                <div
                  className={styles.figureLayer}
                  data-depth="30"
                  role="img"
                  aria-label="Two logistic response curves plotted against latent quality. The lenient judge's curve rises earlier than the harsh judge's, so the same item draws a different rating from each."
                >
                  <svg className={styles.figureSvg} viewBox="0 0 600 300">
                    <g fill="none" strokeWidth="2">
                      <path
                        d="M 40 240 L 110 240 C 165 240 175 40 230 40 L 580 40"
                        stroke="rgb(var(--rgbPrimary))"
                      />
                      <path
                        d="M 40 240 L 260 240 C 315 240 325 40 380 40 L 580 40"
                        stroke="rgb(var(--rgbText) / 0.45)"
                        strokeDasharray="6 5"
                      />
                    </g>
                  </svg>
                </div>
                <div className={styles.figureLayer} data-depth="70" aria-hidden="true">
                  <svg className={styles.figureSvg} viewBox="0 0 600 300">
                    <g className={styles.figureLabels} fill="rgb(var(--rgbText) / 0.7)">
                      <text x="240" y="32">lenient judge</text>
                      <text x="392" y="60">harsh judge</text>
                      <text x="40" y="284">latent quality &#952;</text>
                      <text x="470" y="284">P(rating &#8805; k)</text>
                    </g>
                  </svg>
                </div>
              </Depth>
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
