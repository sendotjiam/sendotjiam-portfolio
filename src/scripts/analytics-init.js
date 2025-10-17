// Analytics Initialization Script
// This script sets up all the event tracking for the portfolio

import { 
  trackProjectClick, 
  trackTimelineInteraction, 
  trackContactClick, 
  initSectionTracking 
} from './analytics.js';

// Initialize all analytics tracking
export function initAnalytics() {
  console.log('Initializing portfolio analytics...');

  // Initialize section time tracking
  initSectionTracking();

  // Track project card clicks
  setupProjectTracking();

  // Track timeline interactions
  setupTimelineTracking();

  // Track contact button clicks
  setupContactTracking();

  console.log('Portfolio analytics initialized successfully');
}

// Set up project card click tracking
function setupProjectTracking() {
  // Track project links
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const projectName = e.currentTarget.dataset.projectName || 'Unknown Project';
      const linkType = e.currentTarget.dataset.linkType || 'project';
      
      trackProjectClick(projectName, linkType);
    });
  });

  // Track project cards on home page
  document.querySelectorAll('.projects-container').forEach(container => {
    container.addEventListener('click', (e) => {
      const projectTitle = container.querySelector('h4')?.textContent || 'Unknown Project';
      trackProjectClick(projectTitle, 'home_page_card');
    });
  });
}

// Set up timeline interaction tracking
function setupTimelineTracking() {
  // Track timeline item clicks
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const company = item.dataset.company || 'Unknown Company';
      const jobTitle = item.dataset.jobTitle || 'Unknown Position';
      
      trackTimelineInteraction(company, jobTitle, 'click');
    });
  });

  // Track timeline item hover (engagement)
  document.querySelectorAll('.timeline-item').forEach(item => {
    let hoverTimer;
    
    item.addEventListener('mouseenter', (e) => {
      hoverTimer = setTimeout(() => {
        const company = item.dataset.company || 'Unknown Company';
        const jobTitle = item.dataset.jobTitle || 'Unknown Position';
        
        trackTimelineInteraction(company, jobTitle, 'hover_engagement');
      }, 2000); // Track after 2 seconds of hover
    });

    item.addEventListener('mouseleave', () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    });
  });
}

// Set up contact button tracking
function setupContactTracking() {
  // Track email contact
  document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const email = e.currentTarget.href.replace('mailto:', '');
      trackContactClick('email', email);
    });
  });

  // Track LinkedIn clicks
  document.querySelectorAll('a[href*="linkedin.com"]').forEach(link => {
    link.addEventListener('click', (e) => {
      trackContactClick('linkedin', e.currentTarget.href);
    });
  });

  // Track any other contact buttons
  document.querySelectorAll('.contact-button, .button').forEach(button => {
    button.addEventListener('click', (e) => {
      const buttonText = e.currentTarget.textContent?.trim() || 'Unknown';
      const href = e.currentTarget.href || '';
      
      if (href.includes('mailto:')) {
        trackContactClick('email', href.replace('mailto:', ''));
      } else if (href.includes('linkedin')) {
        trackContactClick('linkedin', href);
      } else {
        trackContactClick('button', buttonText);
      }
    });
  });
}

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalytics);
  } else {
    initAnalytics();
  }

  // Re-initialize on Astro page transitions
  document.addEventListener('astro:page-load', initAnalytics);
}