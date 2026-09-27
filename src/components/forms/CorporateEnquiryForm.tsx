'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod/mini';
import { corporateForm as cf } from '@/config/forms';
import { brand, emailConfigured } from '@/config/brand';
import { whatsappConfig } from '@/config/whatsapp';
import { corporateEnquiryUrl } from '@/lib/whatsapp';
import { track } from '@/lib/analytics';
import { FormField, inputClass } from './FormField';
import { FormSuccess } from './FormSuccess';
import { Button } from '@/components/ui/Button';

const text = (min: number, max: number, msg: string) => z.string().check(z.trim(), z.minLength(min, msg), z.maxLength(max, msg));

const schema = z.object({
  name: text(2, 80, cf.errors.name),
  company: text(2, 120, cf.errors.company),
  email: z.pipe(z.string().check(z.trim()), z.email(cf.errors.email)),
  phone: z.pipe(
    z.pipe(
      z.string(),
      z.transform((v) => v.trim().replace(/[\s-]/g, '').replace(/^(\+?91)/, '')),
    ),
    z.string().check(z.regex(/^[6-9]\d{9}$/, cf.errors.phone)),
  ),
  quantity: z.coerce.number(cf.errors.quantity).check(
    z.refine((n) => Number.isInteger(n), cf.errors.quantity),
    z.minimum(1, cf.errors.quantity),
    z.maximum(100000, cf.errors.quantity),
  ),
  budget: z.string().check(z.minLength(1, cf.errors.budget)),
  occasion: z.string().check(z.minLength(1, cf.errors.occasion)),
  preferredHamper: z.optional(z.string()),
  message: text(5, 1500, cf.errors.message),
});

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

function Select({ a, reg, placeholder, options }: { a: object; reg: object; placeholder: string; options: string[] }) {
  return (
    <div className="relative">
      <select {...a} {...reg} defaultValue="" className={`${inputClass} appearance-none pr-10`}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg aria-hidden="true" viewBox="0 0 12 8" className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-brown-soft">
        <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/**
 * Corporate enquiry. There is no server inbox, so after validation we prepare the enquiry and
 * hand it off explicitly — the visitor sends it on WhatsApp or by email. Nothing pretends to submit.
 */
export function CorporateEnquiryForm({ hampers }: { hampers: { id: string; name: string }[] }) {
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<FormInput, unknown, FormOutput>({
    resolver: zodResolver(schema),
    shouldFocusError: true,
    mode: 'onTouched',
  });
  const errorCount = Object.keys(errors).length;

  const onSubmit = (data: FormOutput) => {
    const fields = { ...data, phone: `+91 ${data.phone}` };
    const wa = corporateEnquiryUrl(fields);
    const body = whatsappConfig.messages.corporateEnquiry(fields);
    const mail = emailConfigured ? `mailto:${brand.email}?subject=${encodeURIComponent(cf.emailSubject)}&body=${encodeURIComponent(body)}` : "";
    track('corporate_enquiry', { quantity: data.quantity });
    setSent({ wa, mail });
  };

  if (sent) {
    return (
      <FormSuccess
        whatsappHref={sent.wa}
        mailtoHref={sent.mail}
        onReset={() => {
          reset();
          setSent(null);
        }}
      />
    );
  }

  const f = cf.fields;
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label={cf.heading} className="grid gap-6 sm:grid-cols-2">
      {submitCount > 0 && errorCount > 0 && (
        <p role="alert" className="border-l-2 border-sindoor bg-blush/40 px-4 py-3 text-[0.9375rem] text-brown sm:col-span-2">
          {cf.errors.summary(errorCount)}
        </p>
      )}
      <FormField id="ce-name" label={f.name.label} error={errors.name?.message}>
        {(a) => <input {...a} {...register('name')} type="text" autoComplete={f.name.autoComplete} className={inputClass} />}
      </FormField>
      <FormField id="ce-company" label={f.company.label} error={errors.company?.message}>
        {(a) => <input {...a} {...register('company')} type="text" autoComplete={f.company.autoComplete} className={inputClass} />}
      </FormField>
      <FormField id="ce-email" label={f.email.label} error={errors.email?.message}>
        {(a) => <input {...a} {...register('email')} type="email" autoComplete={f.email.autoComplete} className={inputClass} />}
      </FormField>
      <FormField id="ce-phone" label={f.phone.label} hint={f.phone.hint} error={errors.phone?.message}>
        {(a) => <input {...a} {...register('phone')} type="tel" inputMode="tel" autoComplete={f.phone.autoComplete} className={inputClass} />}
      </FormField>
      <FormField id="ce-quantity" label={f.quantity.label} hint={f.quantity.hint} error={errors.quantity?.message}>
        {(a) => <input {...a} {...register('quantity')} type="number" inputMode="numeric" min={1} step={1} className={inputClass} />}
      </FormField>
      <FormField id="ce-budget" label={f.budget.label} error={errors.budget?.message}>
        {(a) => <Select a={a} reg={register('budget')} placeholder={f.budget.placeholder} options={f.budget.options} />}
      </FormField>
      <FormField id="ce-occasion" label={f.occasion.label} error={errors.occasion?.message}>
        {(a) => <Select a={a} reg={register('occasion')} placeholder={f.occasion.placeholder} options={f.occasion.options} />}
      </FormField>
      <FormField id="ce-hamper" label={f.preferredHamper.label}>
        {(a) => <Select a={a} reg={register('preferredHamper')} placeholder={f.preferredHamper.placeholder} options={[...hampers.map((h) => h.name), f.preferredHamper.undecided]} />}
      </FormField>
      <FormField id="ce-message" label={f.message.label} hint={f.message.hint} error={errors.message?.message} className="sm:col-span-2">
        {(a) => <textarea {...a} {...register('message')} rows={5} className={`${inputClass} resize-y`} />}
      </FormField>
      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? cf.submitting : cf.submit}
        </Button>
      </div>
    </form>
  );
}
