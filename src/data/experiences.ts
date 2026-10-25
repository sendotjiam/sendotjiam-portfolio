export interface ExperienceItem {
  jobTitle: string;
  company: string;
  logo: string;
  date: string;
  location?: string;
  desc: string[];
  tech: string[];
  appStoreLink?: string;
}

export const experiences: ExperienceItem[] = [
  {
    jobTitle: "iOS Software Engineer",
    company: "Grab",
    logo: "/assets/company-logo/grab-logo.jpeg",
    date: "Nov 2025 - Present",
    location: "Jakarta, Indonesia",
    desc: [
      "Built and shipped **user-facing features** for the **Grab Driver iOS app**, delivering highly performant and polished experiences to **millions of users** across Southeast Asia.",
      "Took **clear ownership** of the **\"In Transit\" flow** (spanning from job acceptance until after the job is completed), iterating quickly based on user feedback to remove friction and improve the **daily driver experience**.",
      "Demonstrated **good team communication and collaboration skills** across **Product, Design, and Backend teams** to align on product hypotheses, explicitly making technical tradeoffs to maintain a **bias toward shipping and learning**.",
      "Collaborated with the team to build the **Grab AI Harness Engineering plugin** from scratch, and keep contributing to it and its **Knowledge Base**, accelerating team onboarding and productivity.",
      "Leveraged the Grab AI Harness to drive **end-to-end feature development**, taking full ownership from **initial product specifications to final Merge Requests**."
    ],
    tech: [
      "Swift",
      "UIKit",
      "RxSwift",
      "VIPER",
      "MVVM",
      "Grab AI Harness",
      "Knowledge Base",
      "Unit Tests",
      "CI/CD"
    ],
    appStoreLink: "https://apps.apple.com/us/app/grab-driver-app-for-partners/id1257641454"
  },
  {
    jobTitle: "iOS Software Engineer",
    company: "ByteDance (Tokopedia)",
    logo: "/assets/company-logo/bytedance-logo.jpeg",
    date: "Oct 2023 - Nov 2025",
    location: "Jakarta, Indonesia",
    desc: [
      "Shipped high-impact user-facing features for the TikTok Seller Center iOS app in **Swift** and **SwiftUI**, driving merchant **activation and engagement** during the massive migration from Tokopedia.",
      "Built a reusable TikTok Buyer & Seller Binding service by integrating the **TikTok Open Auth SDK** — laying the foundation for Tokopedia and TikTok Shop integration.",
      "Revamped login and registration flows to instinctively eliminate UI jank and confusing flows, creating a **seamless onboarding experience** that simplified user activation.",
      "Architected **Server-Driven UI** for the Tokopedia Account page, enabling rapid **A/B testing**, product experimentation, and significantly faster iterations.",
      "Implemented mandatory KYC flow for new sellers using the GoTo Group KYC SDK, improving overall seller quality and compliance.",
      "Leveraged **data literacy** and product sense to build personalized shopping preference features, utilizing **metrics and dashboards** to validate improvements in user retention.",
      "Spearheaded the migration of global UI components from Texture to **UIKit** and **SwiftUI**, adopting modern app architecture and **concurrency patterns** to drastically improve performance and debug **complex code bases**."
    ],
    tech: [
      "Swift",
      "SwiftUI",
      "UIKit",
      "Texture (AsyncDisplayKit)",
      "Server-Driven UI",
      "TikTok Open Auth SDK",
      "Concurrency",
      "RxSwift",
      "Combine",
      "TCA",
      "A/B Testing"
    ],
    appStoreLink: "https://apps.apple.com/id/app/tokopedia/id1001394201"
  },
  {
    jobTitle: "iOS Software Engineer Intern",
    company: "Grab (OVO)",
    logo: "/assets/company-logo/grab-logo.jpeg",
    date: "Sep 2022 - May 2023",
    location: "Jakarta, Indonesia",
    desc: [
      "Developed and delivered **payment features** on time while demonstrating strong **team communication and collaboration skills** across divisions.",
      "Increased internal team productivity by creating **technical documentation** for OVO App payment features.",
      "Fixed bugs and enhanced functionality of OVO App, demonstrating strong problem-solving skills.",
      "Conducted **code reviews** for other team members' merge requests, ensuring adherence to best practices and code quality.",
      "Contributed to core mobile infrastructure by implementing a robust **feature flag system**, laying the groundwork for safe rollouts and A/B product experimentation."
    ],
    tech: [
      "Swift",
      "UIKit",
      "Payment Features",
      "Feature Flags",
      "ReactiveKit",
      "MVVM",
      "Unit Tests",
      "Technical Docs"
    ],
    appStoreLink: "https://apps.apple.com/id/app/ovo/id1142114207"
  },
  {
    jobTitle: "iOS Software Engineer Intern",
    company: "PT Bank MNC Internasional Tbk",
    logo: "/assets/company-logo/mnc-bank-logo.jpeg",
    date: "Feb 2022 - Aug 2022",
    location: "Jakarta, Indonesia",
    desc: [
      "Conducted research and successfully integrated **Firebase Analytics** into a basic transfer simulation application.",
      "Explored and incorporated **Realtime Database** functionality into a basic chat application.",
      "Completed development of Motion Banking App features on schedule, working closely with stakeholders from various departments."
    ],
    tech: ["Swift", "UIKit (Xib)", "Firebase Analytics", "Realtime Database", "RxSwift", "MVVM"],
    appStoreLink: "https://apps.apple.com/id/app/motionbank/id1506555741"
  },
  {
    jobTitle: "iOS Software Engineer Intern",
    company: "PT Karsa Lintas Buwana (Kalbe E-Health)",
    logo: "/assets/company-logo/kalbe-logo.jpeg",
    date: "Aug 2021 - Feb 2022",
    location: "Jakarta, Indonesia",
    desc: [
      "Contributed to the migration of the KlikDiabetes application from a hybrid framework to a **native framework**, utilizing the capabilities of the iOS SDK.",
      "Participated in the development of the KlikDiabetes application, utilizing the iOS SDK to enhance its functionality in the native framework."
    ],
    tech: ["Swift", "iOS SDK", "Native Migration", "UIKit", "MVC"],
    appStoreLink: "https://apps.apple.com/id/app/klik-diabetes/id1541593080"
  }
];
