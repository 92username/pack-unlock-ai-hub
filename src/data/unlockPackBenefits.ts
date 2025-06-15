
export type Benefit = {
  id: string;
  name: string;
  provider: string;
  category: 
    | "Cloud"
    | "Design"
    | "Developer Tools"
    | "Domains"
    | "API & Infrastructure"
    | "Courses"
    | "Marketing"
    | "Productivity"
    | "Security"
    | "Other";
  description: string;
  activationUrl: string;
  value: number;
  // Possible: period?: string;
};

export const unlockPackBenefits: Benefit[] = [
  // Cloud
  {
    id: "nuvem-digitalocean",
    name: "DigitalOcean Credits",
    provider: "Cloud",
    category: "Cloud",
    description: "Créditos para infraestrutura em nuvem",
    activationUrl: "https://www.digitalocean.com/github-students",
    value: 200,
  },
  {
    id: "nuvem-azure",
    name: "Microsoft Azure for Students",
    provider: "Cloud",
    category: "Cloud",
    description: "Créditos em serviços de nuvem Microsoft",
    activationUrl: "https://azure.microsoft.com/en-us/free/students/",
    value: 200,
  },
  {
    id: "heroku-hosting",
    name: "Heroku Hosting",
    provider: "Cloud Hosting",
    category: "Cloud",
    description: "Hospedagem de aplicações na nuvem",
    activationUrl: "https://www.heroku.com",
    value: 312,
  },
  {
    id: "visual-studio-devtools",
    name: "Visual Studio Tools (Microsoft Dev Essentials)",
    provider: "Dev Tools",
    category: "Cloud",
    description: "Acesso gratuito a ferramentas e IDEs da Microsoft",
    activationUrl: "https://visualstudio.microsoft.com/dev-essentials/",
    value: 8757,
  },
  {
    id: "new-relic-observability",
    name: "New Relic Observability Suite",
    provider: "Monitoring",
    category: "Cloud",
    description: "Ferramentas de monitoramento de aplicações",
    activationUrl: "https://newrelic.com/github-students",
    value: 3816,
  },
  // Design
  {
    id: "bootstrap-studio-visual-site-builder",
    name: "Bootstrap Studio",
    provider: "Design",
    category: "Design",
    description: "Criação visual de sites com 100% de desconto para estudantes",
    activationUrl: "https://bootstrapstudio.io/student-discount",
    value: 29,
  },
  {
    id: "polypane-browser",
    name: "Polypane Browser",
    provider: "Frontend Tools",
    category: "Design",
    description: "Responsive development browser for modern frontend workflows",
    activationUrl: "https://polypane.app/education/",
    value: 144,
  },
  {
    id: "iconscout-library",
    name: "IconScout",
    provider: "Design Assets",
    category: "Design",
    description: "Access premium icons and illustrations 100% free",
    activationUrl: "https://iconscout.com/github-students",
    value: 179.88,
  },
  {
    id: "icons8-ai-tools",
    name: "Icons8",
    provider: "Design & AI",
    category: "Design",
    description: "Graphics, icons, and AI-powered tools for creatives",
    activationUrl: "https://icons8.com/github-students",
    value: 135,
  },
  {
    id: "visme-presentations",
    name: "Visme",
    provider: "Design Tools",
    category: "Design",
    description: "Design professional presentations with premium access",
    activationUrl: "https://www.visme.co/github-students/",
    value: 36.75,
  },
  {
    id: "themeisle-wp-themes",
    name: "Themeisle",
    provider: "WordPress",
    category: "Design",
    description: "Premium WordPress themes free for students",
    activationUrl: "https://themeisle.com/github-students/",
    value: 259,
  },
  // Example "Xoxo" as Design, though you can update later. 
  {
    id: "xoxo-app-example",
    name: "Xoxo",
    provider: "Xoxo",
    category: "Design",
    description: "Placeholder for Xoxo app - update with details.",
    activationUrl: "#",
    value: 0,
  },

  // Developer Tools
  {
    id: "1password-students",
    name: "1Password for Developers",
    provider: "1Password",
    category: "Developer Tools",
    description: "Unlimited password manager for student developers, free with school verification.",
    activationUrl: "https://1password.com/developers/students",
    value: 35,
  },
  {
    id: "browserstack-test-platform",
    name: "BrowserStack",
    provider: "BrowserStack",
    category: "Developer Tools",
    description: "Run tests on real devices and browsers in the cloud",
    activationUrl: "https://www.browserstack.com/github-students",
    value: 2388,
  },
  {
    id: "bump-sh-api-docs",
    name: "Bump.sh",
    provider: "Bump.sh",
    category: "Developer Tools",
    description: "Auto-generated, versioned API documentation platform",
    activationUrl: "https://bump.sh/github-students",
    value: 5364,
  },
  {
    id: "codecov-coverage",
    name: "Codecov",
    provider: "Codecov",
    category: "Developer Tools",
    description: "Code coverage and quality reporting tool",
    activationUrl: "https://about.codecov.io/github-students",
    value: 432,
  },
  {
    id: "codedex-gamified-coding",
    name: "Codédex",
    provider: "Codédex",
    category: "Developer Tools",
    description: "Gamified programming courses and challenges",
    activationUrl: "https://www.codedex.io/github-students",
    value: 23.89,
  },
  {
    id: "codescene-analysis",
    name: "CodeScene",
    provider: "CodeScene",
    category: "Developer Tools",
    description: "Code analysis and visualization platform",
    activationUrl: "#",
    value: 216,
  },
  {
    id: "configcat-feature-flags",
    name: "ConfigCat",
    provider: "ConfigCat",
    category: "Developer Tools",
    description: "Feature flag service to control release rollouts",
    activationUrl: "#",
    value: 4320,
  },
  {
    id: "cryptolens-licensing",
    name: "CryptoLens",
    provider: "CryptoLens",
    category: "Developer Tools",
    description: "Tool to license and distribute your software",
    activationUrl: "https://cryptolens.io",
    value: 1782,
  },
  {
    id: "deepnote-notebooks",
    name: "Deepnote",
    provider: "Deepnote",
    category: "Developer Tools",
    description: "Collaborative Jupyter notebooks in the cloud",
    activationUrl: "https://deepnote.com/education",
    value: 1782,
  },
  {
    id: "deepscan-js-analyzer",
    name: "DeepScan",
    provider: "DeepScan",
    category: "Developer Tools",
    description: "JavaScript code analyzer for code quality and bug detection",
    activationUrl: "https://deepscan.io/github-students",
    value: 48,
  },
  // Add the rest of the Developer Tools here as you supply more info...

  // Domains
  {
    id: "dottech-domain",
    name: ".TECH Domain via GitHub Pack",
    provider: ".TECH",
    category: "Domains",
    description: "One-year .TECH domain registration for free via GitHub Student Pack.",
    activationUrl: "https://get.tech",
    value: 9,
  },
  {
    id: "namecom-domain",
    name: "Name.com Domain",
    provider: "Name.com",
    category: "Domains",
    description: "Free/discounted student domain from Name.com",
    activationUrl: "#",
    value: 0,
  },
  {
    id: "namecheap-domain",
    name: "Namecheap Domain",
    provider: "Namecheap",
    category: "Domains",
    description: "Student offer for domain from Namecheap",
    activationUrl: "#",
    value: 0,
  },

  // API & Infrastructure, Courses, Marketing, Productivity, Security follow same structure.
  // Just examples below, add others as you list them.
  {
    id: "mongodb-atlas-cert",
    name: "MongoDB Atlas + Certification",
    provider: "MongoDB",
    category: "API & Infrastructure",
    description: "Cloud database and student access to MongoDB Associate Developer Certification.",
    activationUrl: "https://www.mongodb.com/students",
    value: 200,
  },
  {
    id: "algoexpert-courses",
    name: "AlgoExpert.io",
    provider: "AlgoExpert",
    category: "Courses",
    description: "Coding interview prep platform with curated problems.",
    activationUrl: "#",
    value: 0,
  },
  {
    id: "notion-students",
    name: "Notion for Students",
    provider: "Notion",
    category: "Productivity",
    description: "Notion’s Plus Plan for free, with a verified student email.",
    activationUrl: "https://www.notion.com/product/notion-for-education",
    value: 360,
  },
  {
    id: "blackfire-profiler",
    name: "Blackfire.io Profiler",
    provider: "Blackfire.io",
    category: "Security",
    description: "Performance profiling for web apps; one year free for students.",
    activationUrl: "https://www.blackfire.io/students/",
    value: 12528,
  },
  // ... Continue for the rest, use "Other" as temp for any unassigned
];
