/** Form labels, options, hints and validation messages for the corporate enquiry. */
export const corporateForm = {
  heading: 'Corporate enquiry',
  submit: 'Send enquiry',
  submitting: 'Preparing your enquiry…',
  fields: {
    name: { label: 'Name', autoComplete: 'name' },
    company: { label: 'Company', autoComplete: 'organization' },
    email: { label: 'Work email', autoComplete: 'email' },
    phone: { label: 'Phone', autoComplete: 'tel', hint: '10-digit mobile number' },
    quantity: { label: 'Approximate quantity', hint: 'Number of hampers' },
    budget: {
      label: 'Budget per hamper',
      placeholder: 'Choose a range',
      options: ['Under ₹1,000', '₹1,000 – ₹2,000', '₹2,000 – ₹3,500', '₹3,500 and above', 'Not sure yet'],
    },
    occasion: {
      label: 'Occasion',
      placeholder: 'Choose an occasion',
      options: ['Diwali gifting', 'Client appreciation', 'Employee gifting', 'Event or conference', 'Wedding or family occasion', 'Other'],
    },
    preferredHamper: { label: 'Preferred hamper (optional)', placeholder: 'No preference', undecided: 'Not sure yet — suggest one' },
    message: { label: 'Message', hint: 'Delivery dates, locations, branding or anything else we should know' },
  },
  errors: {
    name: 'Please tell us your name.',
    company: 'Please add your company name.',
    phone: 'Please enter a valid 10-digit phone number.',
    email: 'Please enter a valid email address.',
    quantity: 'Please enter an approximate number of hampers.',
    budget: 'Please choose a budget range, or “Not sure yet”.',
    occasion: 'Please choose the occasion.',
    message: 'A short note helps us help you.',
    summary: (n: number) => `Please check ${n} ${n === 1 ? 'field' : 'fields'} highlighted below.`,
  },
  success: {
    heading: 'Thank you — your enquiry is ready to send.',
    body: 'We’ve prepared your enquiry. Send it on WhatsApp or by email and we’ll reply with options.',
    whatsapp: 'Send on WhatsApp',
    email: 'Send by email',
    reset: 'Start a new enquiry',
  },
  emailSubject: 'Corporate gifting enquiry',
};
