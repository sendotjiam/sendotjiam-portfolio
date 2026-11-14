# PRODUCT.md — Sendo Tjiamis Portfolio

## Product Overview
Personal portfolio website for Sendo Tjiamis, iOS Engineer.

## Audience & Core Users
- **Primary:** Tech recruiters, Engineering Managers, and iOS Leads evaluating talent for high-impact mobile roles.
- **Secondary:** Fellow mobile engineers, collaborators, and tech community members.

## Primary Objective & Single Job
Demonstrate world-class iOS engineering expertise, track record at tier-1 tech companies (Grab, ByteDance/Tokopedia), and production mobile leadership to drive high-quality career inquiries and contact.

## Key Content & Proof Points
1. **Current Role:** Software Engineer - iOS at Grab (Driver app, high performance, real-time in-transit lifecycle).
2. **Past Experience:** 
   - ByteDance (Tokopedia): TikTok Seller Center binding, Server-Driven UI, Modular Arch.
   - Grab (OVO): High-security payment features, biometric auth.
   - PT. Bank MNC International & Kalbe: Early banking and e-health mobile foundations.
3. **Featured Projects:** Grab Driver iOS, Tokopedia & TikTok Seller, WikiBus Singapore, OVO Digital Wallet, Zest for macOS, EduAI Tutor.
4. **Core Technical Competencies:** Swift Concurrency, SwiftUI, UIKit (programmatic), Reactive streams (Combine/RxSwift), Modular SPM, Performance Profiling, and modern Agentic Harnesses.
5. **Key Actions:** 
   - Primary: Contact / "Get in touch" (email)
   - Secondary: Copy email, GitHub, LinkedIn, App Store links.

## Design Thesis
An iOS engineer's portfolio that feels like a first-party Apple experience: quiet chrome, refined typography, and the shipped mobile apps as the hero.

## Strategic Roadmap: Company vs Personal Products Evolution

### Phase 1: Current Unified Baseline (Active)
- **Status:** Unified Projects section.
- **Rules:**
  - Company apps (Grab Driver, Tokopedia, OVO) and finished indie tools (Zest) remain integrated in the main showcase.
  - **Zero-Noise Policy for WIP:** Personal projects in development (WikiTransport, Friday / PowerBrain, PatrickIsLearning, Domino) remain completely hidden until their MVP and dedicated showcase pages are complete.
  - Finished products feature dedicated landing routes (e.g., [`/zest`](/zest) with interactive macOS simulator).

### Phase 2: Split Transition (Trigger: 2–3 Shipped Personal MVPs)
- **Trigger:** Activates once 2 or more additional indie projects reach MVP (e.g., Zest + WikiTransport + Friday).
- **Target Architecture:** Split the homepage presentation into two focused tiers:
  1. **Enterprise Track Record / Production Systems:** Highlighted alongside or within Career Experience (Grab, ByteDance/Tokopedia, OVO), focusing on scale, throughput, socket resilience, and team leadership.
  2. **Indie Studio & Tools:** Dedicated section showcasing standalone 0-to-1 products built from scratch (Zest, WikiTransport, Friday, PatrickIsLearning, Domino).
- **Route Convention:** Flat top-level slugs (`/zest`, `/wikitransport`, `/friday`, `/patrickislearning`, `/domino`).
- **Showcase Page Specification:** Follow the proven blueprint established in `src/components/zest/`:
  - **Hero:** Value proposition, one-line punchline, and platform badges.
  - **Tactile Simulator / Interactive Demo:** Live browser interactive simulator demonstrating the product in action.
  - **Architecture & Technical Spec:** Deep-dive into architectural choices (e.g., Swift 6, local SQLite/SPM, zero telemetry).
  - **Download / CTA:** Direct releases, GitHub repo, or web demo links.

