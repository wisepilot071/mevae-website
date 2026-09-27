import Link from 'next/link';
import { announcement } from '@/data/announcement';

export function AnnouncementBar() {
  if (!announcement.text) return null;
  const inner = <span className="micro-label">{announcement.text}</span>;
  return (
    <div className="bg-forest px-4 py-2.5 text-center text-ivory on-dark">
      {announcement.href ? (
        <Link href={announcement.href} className="link-rule">
          {inner}
        </Link>
      ) : (
        inner
      )}
    </div>
  );
}
