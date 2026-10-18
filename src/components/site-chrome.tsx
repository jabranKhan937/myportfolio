"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";
import { WorldCanvas } from "@/components/world-canvas";

const links = [
  { href: "/#impact", id: "impact", label: "Impact" },
  { href: "/#stx-wallet", id: "projects", label: "Projects" },
  { href: "/#skills", id: "skills", label: "Skills" },
  { href: "/#experience", id: "experience", label: "Experience" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

const rail = [
  { id: "top", name: "Intro" },
  { id: "impact", name: "Impact" },
  { id: "stx-wallet", name: "STX Wallet" },
  { id: "localshows", name: "LocalShows" },
  { id: "you-waggle", name: "You Waggle" },
  { id: "skills", name: "Skills" },
  { id: "experience", name: "Career" },
  { id: "contact", name: "Contact" },
];

const projectIds = new Set(["stx-wallet", "localshows", "you-waggle"]);

export function SiteChrome() {
  const pathname = usePathname();
  const bar = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("top");
  const home = pathname === "/";

  useEffect(() => {
    const toggle = document.querySelector<HTMLButtonElement>(".quick-toggle");
    if (toggle && document.documentElement.classList.contains("is-quick")) {
      toggle.setAttribute("aria-pressed", "true");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!home) return;
    const nodes = rail
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.4, 0.7] },
    );
    nodes.forEach((node) => spy.observe(node));
    return () => {
      spy.disconnect();
    };
  }, [home, pathname]);

  function toggleQuick(event: React.MouseEvent<HTMLButtonElement>) {
    const next = event.currentTarget.getAttribute("aria-pressed") !== "true";
    event.currentTarget.setAttribute("aria-pressed", String(next));
    document.documentElement.classList.toggle("is-quick", next);
    localStorage.setItem("quick-view", next ? "1" : "0");
  }

  function hrefFor(id: string) {
    return home ? `#${id}` : `/#${id}`;
  }

  return (
    <>
      <div className="progress" aria-hidden="true">
        <span ref={bar} className="progress__bar" />
      </div>
      <header className="nav">
        <div className="nav__inner">
          <Link className="nav__brand" href={home ? "#top" : "/"} aria-label="Jabran Khan, back to top">
            <span className="nav__mark" aria-hidden="true">
              JK
            </span>
            <span className="nav__name">jabran.khan</span>
          </Link>
          <nav className="nav__menu" aria-label="Sections">
            <button
              className="nav__toggle"
              type="button"
              aria-expanded={open}
              aria-controls="nav-links"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Menu"}</span>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="22" height="22">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </button>
            <ul className={`nav__links${open ? " is-open" : ""}`} id="nav-links">
              {links.map((link) => {
                const active =
                  home &&
                  (current === link.id || (link.id === "projects" && projectIds.has(current)));
                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      aria-current={active ? "true" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button className="quick-toggle" type="button" aria-pressed="false" onClick={toggleQuick}>
            <span className="quick-toggle__track" aria-hidden="true">
              <span className="quick-toggle__thumb" />
            </span>
            <span>Quick view</span>
          </button>
          <a className="btn btn--primary btn--sm" href={profile.resumePdf} download>
            <span>CV</span>
          </a>
        </div>
      </header>
      <WorldCanvas />
      <div className="scrim" aria-hidden="true" />
      <nav className="rail" aria-label="Page sections">
        <ol>
          {rail.map((item) => (
            <li key={item.id}>
              <a href={hrefFor(item.id)} aria-current={home && current === item.id ? "true" : undefined}>
                <span className="rail__name">{item.name}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
