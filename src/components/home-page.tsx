import { Reveal } from "@/components/reveal";
import { SplitTitle } from "@/components/split-title";
import {
  award,
  education,
  jobs,
  languages,
  profile,
  projects,
  skillGroups,
} from "@/lib/profile";

const marks: Record<string, { metric: string; note: string; status: string }> = {
  "stx-wallet": { metric: "4 chains", note: "STX · BNB · ETH · SOL", status: "Mobile · Web3" },
  localshows: { metric: "Events", note: "feeds and profiles", status: "Mobile" },
  "you-waggle": { metric: "Mobile", note: "iOS and Android", status: "Product app" },
};

export function HomePage() {
  return (
    <main id="content">
      <section className="station station--hero" id="top" aria-labelledby="hero-title">
        <div className="hero">
          <p className="code" data-intro>
            <span className="code__dot" aria-hidden="true" />
            {profile.location}
          </p>
          <SplitTitle text={profile.name} />
          <p className="hero__role" data-intro>
            {profile.role}
          </p>
          <p className="hero__lead" data-intro>
            {profile.lede}
          </p>
          <div className="ctas" data-intro>
            <a className="btn btn--primary" href={profile.resumePdf} download>
              Download CV <span className="btn__meta">PDF</span>
            </a>
            <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
              Email
            </a>
            <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <ul className="stats" aria-label="Key facts" data-intro>
            <li>
              <strong>5+</strong>
              <span>years in production</span>
            </li>
            <li>
              <strong>20+</strong>
              <span>products shipped</span>
            </li>
            <li>
              <strong>iOS</strong>
              <span>and Android</span>
            </li>
            <li>
              <strong>3</strong>
              <span>companies</span>
            </li>
          </ul>
        </div>
        <a className="scroll-cue" href="#impact">
          <span>Start the line</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M12 5v14m0 0-5-5m5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </a>
      </section>

      <section className="station" id="impact" aria-labelledby="impact-title">
        <Reveal className="plate plate--wide">
          <header className="plate__head">
            <span>Overview</span>
            <span className="plate__status">At a glance</span>
          </header>
          <h2 id="impact-title">Impact in production</h2>
          <dl className="glance">
            <div>
              <dt>Now</dt>
              <dd>RapidDev, a USA company — working remotely (May 2025 – Present)</dd>
            </div>
            <div>
              <dt>Core</dt>
              <dd>React Native, TypeScript, Node.js, Express.js, MongoDB, and AI integrations</dd>
            </div>
            <div>
              <dt>AI</dt>
              <dd>GPT, Claude, Gemini, LangChain</dd>
            </div>
            <div>
              <dt>Mobile</dt>
              <dd>React Native, iOS, Android, App Store and Play Store</dd>
            </div>
            <div>
              <dt>Ops</dt>
              <dd>Docker, GitHub CI/CD, AWS, Azure, GCP</dd>
            </div>
            <div>
              <dt>Degree</dt>
              <dd>
                {education.degree}, {education.school}
              </dd>
            </div>
          </dl>
          <ul className="metrics">
            <li>
              <strong>5+</strong>
              <span>Years building iOS and Android apps, Node.js &amp; Express.js backends, and AI workflows end to end.</span>
            </li>
            <li>
              <strong>20+</strong>
              <span>Latest shipped products, including STX Wallet, LocalShows, and You Waggle.</span>
            </li>
          </ul>
        </Reveal>
      </section>

      {projects.map((project) => {
        const mark = marks[project.slug];
        return (
          <section
            className="station"
            id={project.slug}
            key={project.slug}
            aria-labelledby={`${project.slug}-title`}
          >
            <Reveal className="plate">
              <header className="plate__head">
                <span>Project</span>
                <span className="plate__status">{mark?.status ?? project.period}</span>
              </header>
              {mark ? (
                <p className="plate__metric">
                  {mark.metric} <span>{mark.note}</span>
                </p>
              ) : null}
              <h2 id={`${project.slug}-title`}>{project.name}</h2>
              <p className="plate__lead">{project.summary}</p>
              <ul className="points">
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ul className="chips" aria-label="Tech">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </section>
        );
      })}

      <section className="station" id="skills" aria-labelledby="skills-title">
        <Reveal className="plate plate--wide">
          <header className="plate__head">
            <span>Toolkit</span>
            <span className="plate__status">The stack</span>
          </header>
          <h2 id="skills-title">Skills</h2>
          <div className="skills">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3>{group.title}</h3>
                <ul className="chips">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="station" id="experience" aria-labelledby="exp-title">
        <Reveal className="plate plate--wide">
          <header className="plate__head">
            <span>Career</span>
            <span className="plate__status">2021 – Present</span>
          </header>
          <h2 id="exp-title">Experience</h2>
          <ol className="jobs">
            {jobs.map((job) => (
              <li key={job.company}>
                <div className="job__head">
                  <h3>
                    {job.company}{" "}
                    <span>
                      {job.role}
                      {job.location ? ` · ${job.location}` : ""}
                    </span>
                  </h3>
                  <p className="job__date">{job.period}</p>
                </div>
                <ul className="points">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <h3 className="edu__title">Education</h3>
          <ul className="edu">
            <li>
              <strong>{education.degree}</strong>
              <span>
                {education.school} · {education.period}
              </span>
            </li>
          </ul>
          <h3 className="edu__title">Languages</h3>
          <ul className="edu">
            <li>
              <strong>{languages.join(" · ")}</strong>
            </li>
          </ul>
          <h3 className="edu__title">Recognition</h3>
          <ul className="edu">
            <li>
              <strong>{award}</strong>
            </li>
          </ul>
        </Reveal>
      </section>

      <section className="station" id="contact" aria-labelledby="contact-title">
        <Reveal className="plate plate--wide">
          <header className="plate__head">
            <span>Next step</span>
            <span className="plate__status">Contact</span>
          </header>
          <h2 id="contact-title">Hiring a full stack AI mobile engineer?</h2>
          <p className="plate__lead">
            {profile.availability}. Reach me by email or phone, or take the resume with you.
          </p>
          <div className="ctas">
            <a className="btn btn--primary" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <a className="btn btn--ghost" href={profile.phoneHref}>
              {profile.phone}
            </a>
            <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn--ghost" href={profile.resumePdf} download>
              Download CV
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
