import Link from "next/link";
import Image from "next/image";
import type { LeadershipProfile } from "@/lib/types";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { UserCircle2 } from "lucide-react";

export function LeadershipCard({ profile }: { profile: LeadershipProfile }) {
  return (
    <Link href={`/leadership/${profile.slug}`} className="flex flex-col gap-3 group">
      <div className="relative aspect-[4/5] bg-stone rounded-[4px] overflow-hidden border rule">
        {profile.image ? (
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <UserCircle2 size={48} className="text-ink-faint" strokeWidth={1.25} />
          </div>
        )}
      </div>
      <div>
        <h3 className="font-display text-lg group-hover:text-accent">{profile.name}</h3>
        <p className="text-sm text-ink-soft">{profile.role}</p>
      </div>
      <VerificationBadge status={profile.verificationStatus} />
    </Link>
  );
}