/**
 * Analytics hooks — intentionally no-ops (zero third-party scripts ship today).
 * Wire a provider here later; every call site already exists.
 */
type EventName = 'add_to_cart' | 'remove_from_cart' | 'begin_checkout_whatsapp' | 'whatsapp_enquiry' | 'corporate_enquiry';

export function track(event: EventName, props?: Record<string, string | number>) {
  if (process.env.NODE_ENV === 'development') {
    console.debug('[analytics]', event, props ?? {});
  }
}
