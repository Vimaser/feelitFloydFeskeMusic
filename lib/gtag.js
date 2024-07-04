export const GA_TRACKING_ID = 'G-3S7EP0HH7H';

export const pageview = (url) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
      });
    }
  };
  
  export const event = ({ action, category, label, value }) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  };