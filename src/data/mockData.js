const jobListings = [
  {
    companyName: "Tech Innovators Inc.",
    companyType: "Software Development",
    role: "Full-Stack Developer",
    jobType: "Freelancer",
    companyDescription:
      "A leading software company specializing in AI-driven applications.",
    requirements: ["JavaScript", "React.js", "Node.js"],
    publishedDate: "2025-02-21",
    imageUrl:
      "https://metro.org/sites/default/files/inline-images/DSC_6289.JPG",
  },
  {
    companyName: "Cloud Solutions Ltd.",
    companyType: "Cloud Computing",
    role: "Cloud Engineer",
    jobType: "Freelancer",
    companyDescription:
      "Providing top-tier cloud solutions for enterprises worldwide. Services—including servers, storage, databases, networking, software, analytics, and intelligence",
    requirements: ["AWS", "Docker", "Kubernetes"],
    publishedDate: "2025-02-20",
    imageUrl:
      "https://images.agoramedia.com/wte3.0/gcms/job-hunting-while-pregnant-2021-722x406.jpg",
  },
  {
    companyName: "CyberSecure Inc.",
    companyType: "Cybersecurity",
    role: "Security Analyst",
    jobType: "Freelancer",
    companyDescription:
      "Enhancing cybersecurity for businesses with innovative security solutions.",
    requirements: ["Penetration Testing", "SIEM", "Python"],
    publishedDate: "2025-02-19",
    imageUrl:
      "https://www.sydney.edu.au/content/dam/people/students/icpu-students-in-a-brainstorming-session.jpg",
  },
  {
    companyName: "AI Revolution Co.",
    companyType: "Artificial Intelligence",
    role: "AI/ML Engineer",
    jobType: "Freelancer",
    companyDescription:
      "Pioneering artificial intelligence solutions for various industries.",
    requirements: ["Python", "TensorFlow", "Deep Learning"],
    publishedDate: "2025-02-18",
    imageUrl:
      "https://files.oaiusercontent.com/file-VRn3qLN7LvAWdaooZi2Pdh?se=2025-03-07T08%3A58%3A28Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D7c9dff34-0ae6-4667-a4a6-acb72b66c020.webp&sig=w71F/vMWHh77qeKWCYQY%2BXf5AhDX2gCLoxHw2%2BpMoW0%3D",
  },
  {
    companyName: "Data Insights LLC",
    companyType: "Data Analytics",
    role: "Data Scientist",
    jobType: "Freelancer",
    companyDescription:
      "Helping businesses make data-driven decisions through advanced analytics.",
    requirements: ["SQL", "Machine Learning", "Power BI"],
    publishedDate: "2025-02-17",
    imageUrl:
      "https://files.oaiusercontent.com/file-8Q8x2wV4rpAKa4YhiFqSUh?se=2025-03-07T08%3A59%3A07Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D91e1a338-8f74-4e3e-ada8-1bc317263358.webp&sig=nvjiMScteqfGugqGdzB%2B4MlZKpNEWJer4zIjIwkBwPQ%3D",
  },
  {
    companyName: "DevOps Masters",
    companyType: "IT Services",
    role: "DevOps Engineer",
    jobType: "Freelancer",
    companyDescription:
      "Bridging the gap between development and operations for seamless deployments.",
    requirements: ["CI/CD", "Terraform", "Jenkins"],
    publishedDate: "2025-02-16",
    imageUrl:
      "https://files.oaiusercontent.com/file-Y528HvxHz9SuntsDLmMk8e?se=2025-03-07T09%3A02%3A15Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D22f458a3-8d4c-40fd-8882-15ea1fd1b1dd.webp&sig=84ThBQi0deOZnMeRdzTGITZ/YWf69y3QYdrbZb2ryFM%3D",
  },
  {
    companyName: "UI/UX Pro",
    companyType: "Design Studio",
    role: "UI/UX Designer",
    jobType: "Freelancer",
    companyDescription:
      "Crafting intuitive and aesthetically pleasing user experiences.",
    requirements: ["Figma", "Adobe XD", "User Research"],
    publishedDate: "2025-02-15",
    imageUrl:
      "https://files.oaiusercontent.com/file-BCfV2MjZePeF9QMi91EujX?se=2025-03-07T09%3A00%3A38Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D463d738f-5c35-40c9-bbf5-af679b0e64dc.webp&sig=dFP1Cn6/dS10qTKBf/uhWv3BC3RZ%2BcGkYgqK2WvoEmM%3D",
  },
  {
    companyName: "Mobile First Co.",
    companyType: "Mobile App Development",
    role: "Mobile App Developer",
    jobType: "Freelancer",
    companyDescription:
      "Building cutting-edge mobile applications for various industries.",
    requirements: ["Flutter", "React Native", "Swift"],
    publishedDate: "2025-02-14",
    imageUrl:
      "https://files.oaiusercontent.com/file-AUiJF34AdjujmcHCy4KLk3?se=2025-03-07T09%3A01%3A10Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dde6ac845-975a-4132-b678-6a4bdac3349e.webp&sig=k6/mtJFQQjxcv%2BzOF%2BxhRDp7sGkOFbIJosxawFaNIss%3D",
  },
  {
    companyName: "Blockchain Innovators",
    companyType: "Blockchain Solutions",
    role: "Blockchain Developer",
    jobType: "Freelancer",
    companyDescription:
      "Developing secure and scalable blockchain applications.",
    requirements: ["Solidity", "Ethereum", "Hyperledger"],
    publishedDate: "2025-02-13",
    imageUrl: "https://example.com/images/blockchain.jpg",
  },
  {
    companyName: "SEO Experts Ltd.",
    companyType: "Digital Marketing",
    role: "SEO Specialist",
    jobType: "Freelancer",
    companyDescription: "Optimizing websites to rank higher in search engines.",
    requirements: ["Google Analytics", "SEO Auditing", "Keyword Research"],
    publishedDate: "2025-02-12",
    imageUrl: "https://example.com/images/seo.jpg",
  },
  {
    companyName: "Content Creators Hub",
    companyType: "Content Marketing",
    role: "Content Writer",
    jobType: "Freelancer",
    companyDescription:
      "Creating engaging and high-quality content for businesses.",
    requirements: ["Copywriting", "SEO Writing", "Content Strategy"],
    publishedDate: "2025-02-11",
    imageUrl: "https://example.com/images/writer.jpg",
  },
  {
    companyName: "E-Commerce Builders",
    companyType: "E-Commerce Solutions",
    role: "Shopify Developer",
    jobType: "Freelancer",
    companyDescription:
      "Building and customizing Shopify stores for online businesses.",
    requirements: ["Shopify Liquid", "JavaScript", "E-Commerce Development"],
    publishedDate: "2025-02-10",
    imageUrl: "https://example.com/images/shopify.jpg",
  },
  {
    companyName: "Blockchain Innovators",
    companyType: "Blockchain Solutions",
    role: "Blockchain Developer",
    jobType: "Freelancer",
    companyDescription:
      "Developing secure and scalable blockchain applications.",
    requirements: ["Solidity", "Ethereum", "Hyperledger"],
    publishedDate: "2025-02-13",
    imageUrl: "https://example.com/images/blockchain.jpg",
  },
  {
    companyName: "SEO Experts Ltd.",
    companyType: "Digital Marketing",
    role: "SEO Specialist",
    jobType: "Freelancer",
    companyDescription: "Optimizing websites to rank higher in search engines.",
    requirements: ["Google Analytics", "SEO Auditing", "Keyword Research"],
    publishedDate: "2025-02-12",
    imageUrl: "https://example.com/images/seo.jpg",
  },
  {
    companyName: "Software Giants",
    companyType: "Enterprise Solutions",
    role: "Software Engineer",
    jobType: "Job Seeker",
    companyDescription:
      "Delivering enterprise software solutions for global businesses.",
    requirements: ["Java", "Spring Boot", "Microservices"],
    publishedDate: "2025-02-11",
    imageUrl: "https://example.com/images/software.jpg",
  },
  {
    companyName: "E-Commerce Solutions",
    companyType: "E-Commerce",
    role: "Shopify Developer",
    jobType: "Freelancer",
    companyDescription: "Building custom Shopify stores for online retailers.",
    requirements: ["Shopify", "Liquid", "JavaScript"],
    publishedDate: "2025-02-10",
    imageUrl: "https://example.com/images/shopify.jpg",
  },
];

export default jobListings;
