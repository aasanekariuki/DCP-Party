import type { Metadata } from "next";
import { Section } from "@/components/layout/PageContainer";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = { title: "Contact" };

const details = [
  { label: "Email", value: "Official contact information pending verification.", Icon: Mail },
  { label: "Phone", value: "Official contact information pending verification.", Icon: Phone },
  { label: "Office", value: "Official contact information pending verification.", Icon: MapPin },
];

export default function ContactPage() {
  return (
    <>
      <Section border={false} className="pt-14">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="font-display text-4xl sm:text-5xl mt-4 max-w-3xl leading-tight">
          Reach the right department.
        </h1>
        <p className="measure text-ink-soft mt-6">
          General inquiries, public information requests, media, events,
          partnerships, and membership questions all route through this
          page.
        </p>
      </Section>
      <Section>
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 flex flex-col gap-6">
            {details.map(({ label, value, Icon }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={18} className="text-accent mt-0.5" strokeWidth={1.75} />
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-sm text-ink-faint">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
