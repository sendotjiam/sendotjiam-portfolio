// Google Analytics 4 Event Tracking Utilities
// GA4 Measurement ID: G-72G97X9CYK

// Check if gtag is available
function isGtagAvailable() {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

// Track project card clicks
export function trackProjectClick(projectName, projectType = 'unknown') {
  if (isGtagAvailable()) {
    window.gtag('event', 'project_click', {
      event_category: 'engagement',
      event_label: projectName,
      project_type: projectType,
      custom_parameter: 'portfolio_interaction'
    });
  }
  console.log(`Analytics: Project clicked - ${projectName}`);
}

// Track work experience timeline interactions
export function trackTimelineInteraction(company, jobTitle, interactionType = 'view') {
  if (isGtagAvailable()) {
    window.gtag('event', 'timeline_interaction', {
      event_category: 'engagement',
      event_label: `${company} - ${jobTitle}`,
      interaction_type: interactionType,
      company: company,
      custom_parameter: 'timeline_engagement'
    });
  }
  console.log(`Analytics: Timeline interaction - ${company} (${interactionType})`);
}

// Track contact button clicks
export function trackContactClick(contactType, destination = '') {
  if (isGtagAvailable()) {
    window.gtag('event', 'contact_click', {
      event_category: 'conversion',
      event_label: contactType,
      contact_type: contactType,
      destination: destination,
      custom_parameter: 'contact_engagement'
    });
  }
  console.log(`Analytics: Contact clicked - ${contactType}`);
}

// Track time spent on sections (call when section comes into view)
export function trackSectionView(sectionName, timeSpent = 0) {
  if (isGtagAvailable()) {
    window.gtag('event', 'section_view', {
      event_category: 'engagement',
      event_label: sectionName,
      section_name: sectionName,
      time_spent: timeSpent,
      custom_parameter: 'section_engagement'
    });
  }
  console.log(`Analytics: Section viewed - ${sectionName} (${timeSpent}s)`);
}

// Track page views (automatic with GA4, but you can add custom parameters)
export function trackPageView(pageName, additionalData = {}) {
  if (isGtagAvailable()) {
    window.gtag('event', 'page_view', {
      page_title: pageName,
      ...additionalData
    });
  }
  console.log(`Analytics: Page view - ${pageName}`);
}

// Utility to track time spent on page/section
export class TimeTracker {
  constructor(sectionName) {
    this.sectionName = sectionName;
    this.startTime = Date.now();
  }

  stop() {
    const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
    trackSectionView(this.sectionName, timeSpent);
    return timeSpent;
  }
}

// Initialize section time tracking with Intersection Observer
export function initSectionTracking() {
  if (typeof window === 'undefined') return;

  const sectionTrackers = new Map();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const sectionName = entry.target.dataset.section || entry.target.tagName.toLowerCase();
      
      if (entry.isIntersecting) {
        // Section came into view
        if (!sectionTrackers.has(sectionName)) {
          sectionTrackers.set(sectionName, new TimeTracker(sectionName));
        }
      } else {
        // Section left view
        const tracker = sectionTrackers.get(sectionName);
        if (tracker) {
          tracker.stop();
          sectionTrackers.delete(sectionName);
        }
      }
    });
  }, {
    threshold: 0.5, // Track when 50% of section is visible
    rootMargin: '0px'
  });

  // Observe main sections
  document.querySelectorAll('main, section, .timeline-container, .projects-section').forEach((section) => {
    observer.observe(section);
  });
}