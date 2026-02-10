export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">About CHOC</h1>

      <div className="space-y-6 text-foreground/80 leading-relaxed">
        <p>
          CHOC is an editorial platform and curated shop. We tell stories about the people,
          ideas, and objects that shape how we live — and we offer a small, intentional selection
          of goods that reflect those values.
        </p>
        <p>
          We believe in quality over quantity, craft over convenience, and curiosity over certainty.
          Every article we publish and every product we carry has been chosen with care.
        </p>
        <p>
          Founded in 2026, CHOC started as a simple idea: what if a magazine and a shop
          could exist in the same space, each enriching the other?
        </p>
      </div>

      <div className="mt-12 pt-8 border-t border-foreground/10">
        <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
        <p className="text-sm text-muted">
          For editorial inquiries, collaborations, or wholesale — reach out at{" "}
          <a href="mailto:hello@choc.com" className="text-accent hover:underline">hello@choc.com</a>
        </p>
      </div>
    </div>
  );
}
