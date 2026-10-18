import { profile } from "@/lib/profile";

export function SiteFooter() {
  return (
    <footer className="footer">
      <p>
        © 2026 {profile.name} · Lahore, Pakistan
      </p>
      <p>Built with Three.js. Motion follows your reduced-motion setting.</p>
    </footer>
  );
}
