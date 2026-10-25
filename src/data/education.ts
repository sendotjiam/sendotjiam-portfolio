export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  date: string;
  gpa?: string;
  desc: string[];
  skills: string[];
  logo: string;
  link?: string;
}

export const education: EducationItem[] = [
  {
    id: 'binus-cs',
    degree: 'Bachelor of Computer Science',
    institution: 'Bina Nusantara University (BINUS)',
    date: 'Aug 2019 — Mar 2023',
    gpa: '3.77 / 4.00',
    desc: [
      'Graduated with honors, specializing in Mobile Application Development and Software Engineering.',
      'Comprehensive study of native mobile development (iOS & Android), Data Structures, Algorithms, Distributed Systems, and Object-Oriented Software Design Patterns.',
    ],
    skills: ['iOS SDK', 'Swift', 'Data Structures & Algorithms', 'Design Patterns', 'Mobile Architecture'],
    logo: '/assets/edu-logo/binus-logo.jpeg',
  },
  {
    id: 'synrgy-ios',
    degree: 'iOS Engineering Bootcamp',
    institution: 'BCA — SYNRGY x Binar Academy',
    date: 'Mar 2022 — Jul 2022',
    desc: [
      'Intensive corporate fellowship in native iOS engineering and architectural patterns.',
      'Led the iOS engineering team for Homepoint e-commerce application, implementing Clean MVVM Architecture, RxSwift reactive streams, and XCTest automated test coverage.',
    ],
    skills: ['Swift', 'UIKit', 'Clean MVVM', 'RxSwift', 'Alamofire', 'XCTest'],
    logo: '/assets/edu-logo/synrgy-logo.jpeg',
    link: 'https://github.com/sendotjiam/homepoint',
  },
  {
    id: 'synrgy-web',
    degree: 'Fullstack Web Developer Bootcamp',
    institution: 'BCA — SYNRGY x Binar Academy',
    date: 'Jan 2022 — Mar 2022',
    desc: [
      'Mastered fullstack JavaScript paradigms, RESTful microservice architectures, and relational database modeling.',
      'Contributed as backend engineer on Team Sakara delivering secure Node.js APIs and cloud deployment workflows.',
    ],
    skills: ['Node.js', 'Express', 'JavaScript', 'PostgreSQL', 'Heroku CI/CD'],
    logo: '/assets/edu-logo/synrgy-logo.jpeg',
    link: 'https://github.com/sendotjiam/sakara-backend',
  },
];
