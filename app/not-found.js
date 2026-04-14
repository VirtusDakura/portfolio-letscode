import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="section__inner" style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: "1.5rem" }}>404</div>
        <h1 className="section__title" style={{ fontSize: "2rem" }}>
          Page not found
        </h1>
        <p className="section__desc" style={{ marginBottom: "2rem" }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn btn--primary">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
