import Link from "next/link";
import { Section } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <Section border={false} className="pt-24 pb-24 text-center">
      <p className="text-sm text-warm font-medium">Page not found</p>
      <h1 className="font-display text-5xl sm:text-6xl mt-4">404</h1>
      <p className="measure mx-auto text-ink-soft mt-5">
        The page you were looking for doesn&rsquo;t exist, may have moved, or
        hasn&rsquo;t been published yet.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button href="/">Return home</Button>
        <Button href="/search" variant="secondary">
          <Search size={16} /> Search the site
        </Button>
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-ink-soft">
        <Link href="/policies" className="hover:text-ink">Policies</Link>
        <Link href="/leadership" className="hover:text-ink">Leadership</Link>
        <Link href="/news" className="hover:text-ink">News</Link>
        <Link href="/contact" className="hover:text-ink">Contact</Link>
      </div>
    </Section>
  );
}
