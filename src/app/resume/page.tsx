import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import {
  award,
  education,
  jobs,
  languages,
  profile,
  projects,
  skillGroups,
} from "@/lib/profile";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Jabran Khan, Full Stack AI Mobile Engineer. React Native, TypeScript, Node.js, Express.js, MongoDB, and LLM integrations across RapidDev, KryptoMind, and Ammag Technologies.",
};

const awardList = award.split("·").map((item) => item.trim());

const summaryParagraphs = [
  "Full Stack AI Mobile Engineer with 5+ years of experience taking mobile products from initial screen design to production release across iOS and Android, with 20+ shipped applications for startups and enterprise teams. Strong expertise leading cross-platform mobile architecture in React Native and TypeScript, paired with full backend ownership in Node.js, Express.js, and MongoDB.",
  "Hands-on experience wiring OpenAI GPT, Anthropic Claude, and Google Gemini into production mobile workflows — covering conversational chat, intelligent search, and task automation — alongside Web2 and Web3 mobile capabilities including multi-chain crypto wallets, payment integrations, deep linking, universal links, push notifications, and App Store and Play Store delivery.",
];

export default function ResumePage() {
  return (
    <main id="content">
      <div className="resume-bar">
        <Link href="/">← Portfolio</Link>
        <div className="ctas" style={{ marginTop: 0 }}>
          <a className="btn btn--primary btn--sm" href={profile.resumePdf} download>
            Download PDF
          </a>
          <PrintButton />
        </div>
      </div>

      <article className="cv-paper">
        <div className="cv-accent" aria-hidden="true" />
        <div className="cv-inner">
          <header className="cv-header">
            <div>
              <h1 className="cv-name">{profile.name}</h1>
              <p className="cv-role">{profile.role}</p>
              <p className="cv-subrole">
                React Native (iOS &amp; Android) · TypeScript · Node.js &amp; Express.js · MongoDB · LLM Integrations
              </p>
            </div>
            <ul className="cv-contacts" aria-label="Contact information">
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <a href={profile.phoneHref}>{profile.phone}</a>
              </li>
              <li>{profile.location}</li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  {profile.linkedinLabel}
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  {profile.githubLabel}
                </a>
              </li>
            </ul>
          </header>

          <div className="cv-stats cv-stats--wide">
            <div>
              <strong>5+ Years</strong>
              <span>Production Experience</span>
            </div>
            <div>
              <strong>20+ Apps</strong>
              <span>Products Shipped</span>
            </div>
            <div>
              <strong>iOS &amp; Android</strong>
              <span>App Store &amp; Play Store</span>
            </div>
            <div>
              <strong>Full Stack</strong>
              <span>Mobile · Node.js · AI</span>
            </div>
          </div>

          <section className="cv-section">
            <div className="cv-sec-head">
              <h2>Professional Summary</h2>
              <span className="cv-sec-line" />
            </div>
            <div className="cv-summary-box">
              {summaryParagraphs.map((paragraph) => (
                <p className="cv-summary" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-sec-head">
              <h2>Technical Skills</h2>
              <span className="cv-sec-line" />
            </div>
            <div className="cv-skills-table">
              {skillGroups.map((group) => (
                <div className="cv-skill-row" key={group.title}>
                  <span className="cv-skill-cat">{group.title}</span>
                  <span className="cv-skill-vals">{group.items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section">
            <div className="cv-sec-head">
              <h2>Professional Experience</h2>
              <span className="cv-sec-line" />
            </div>
            {jobs.map((job) => (
              <article className="cv-job" key={job.company}>
                <div className="cv-job-top">
                  <h3>
                    <span className="cv-job-role">{job.role}</span> ·{" "}
                    <span className="cv-job-company">{job.company}</span>
                    {job.location ? <span className="cv-job-inline-loc"> — {job.location}</span> : null}
                  </h3>
                  <span className="cv-date">{job.period}</span>
                </div>
                <ul className="cv-bullets">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="cv-section">
            <div className="cv-sec-head">
              <h2>Selected Projects (From 20+ Shipped Applications)</h2>
              <span className="cv-sec-line" />
            </div>
            {projects.map((project) => (
              <article className="cv-project" key={project.slug}>
                <div className="cv-job-top">
                  <h3 className="cv-job-role">{project.name}</h3>
                  <span className="cv-date">{project.period}</span>
                </div>
                <p className="cv-proj-summary">{project.summary}</p>
                <p className="cv-proj-stack">Stack: {project.stack.join(" · ")}</p>
                <ul className="cv-bullets">
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="cv-bottom-grid">
            <div className="cv-card cv-card--top">
              <span className="cv-card-kicker">Education</span>
              <strong>{education.degree}</strong>
              <span>
                {education.school} · {education.period}
              </span>
            </div>
            <div className="cv-card cv-card--top">
              <span className="cv-card-kicker">Awards &amp; Recognition</span>
              {awardList.map((item) => (
                <strong key={item}>{item}</strong>
              ))}
            </div>
            <div className="cv-card cv-card--top">
              <span className="cv-card-kicker">Languages</span>
              <strong>{languages.join(" · ")}</strong>
              <span>Professional proficiency</span>
            </div>
          </section>
        </div>
      </article>
    </main>
  );
}
