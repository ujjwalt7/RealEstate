import { supabase } from './supabase';

/**
 * Log an analytics event to Supabase
 * @param {string} eventType - e.g. 'page_view', 'property_view', 'contact_submit', etc.
 * @param {object} options - { userId, propertyId, page, metadata }
 */
export async function logEvent(eventType, { userId = null, propertyId = null, page = null, metadata = {} } = {}) {
  try {
    await supabase.from('analytics_events').insert([
      {
        event_type: eventType,
        user_id: userId,
        property_id: propertyId,
        page,
        metadata,
      }
    ]);
  } catch (err) {
    // Optionally log error
    // console.error('Failed to log analytics event:', err);
  }
} 