'use client';

import { useEffect, useRef } from 'react';
import { corporateForm } from '@/config/forms';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { MailIcon } from '@/components/ui/Icons';

/** Confirmation state: the enquiry is prepared; the visitor chooses how to send it. */
export function FormSuccess({ whatsappHref, mailtoHref, onReset }: { whatsappHref: string; mailtoHref: string; onReset: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const s = corporateForm.success;
  const btn = 'flex min-h-[54px] flex-1 items-center justify-center gap-2.5 px-6 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-ui';
  return (
    <div ref={ref} tabIndex={-1} role="status" className="border-y rule py-10 outline-none">
      <span aria-hidden="true" className="font-serif text-[1.3rem] tracking-[0.16em] text-gold">
        MEVAÉ
      </span>
      <p className="mt-4 font-serif text-h3">{s.heading}</p>
      <p className="mt-3 max-w-md text-brown-soft">{s.body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={`${btn} bg-brown text-ivory hover:bg-gold-ink`}>
          <WhatsAppIcon /> {s.whatsapp}
        </a>
        {mailtoHref && (
          <a href={mailtoHref} className={`${btn} border border-brown text-brown hover:bg-brown hover:text-ivory`}>
            <MailIcon /> {s.email}
          </a>
        )}
      </div>
      <Button variant="text" onClick={onReset} className="mt-6">
        {s.reset}
      </Button>
    </div>
  );
}
