// ---- Résumé content, structured like a git history ----

const EXPERIENCE = [
  {
    id: "trp",
    role: "Senior Software Engineer",
    company: "T. Rowe Price",
    location: "Owings Mills, MD",
    start: "Mar 2023",
    end: "Present",
    current: true,
    summary: "Event-driven backend & full-stack platforms for margin calculation and regulatory reporting.",
    achievements: [
      "Architected and developed event-driven backend services in .NET using AWS SNS/SQS and Lambda for Cassini margin calculations and regulatory reporting.",
      "Built an MCP server to integrate LLMs with native databases.",
      "Built full-stack applications with Angular + AG Grid and .NET REST APIs, managed via Apigee API Gateway with OAuth 2.0, JWT, and AD-based access control.",
      "Modernized legacy systems to AWS, introducing serverless microservices and automated CI/CD deployments.",
      "Migrated global compliance reporting (LSEG, ASIC, MAS) to REFIT format, optimizing SQL performance and data pipelines.",
      "Mentored junior engineers on API design, message-based architecture, and cloud deployment practices."
    ],
    tools: ["C#",".NET", "Angular", "AG Grid", "AWS Lambda", "SNS/SQS", "Apigee", "AWS", "CI/CD", "SQL", "OAuth 2.0", "JWT", "Active Directory", "MCP", "LLMs"]
  },
  {
    id: "amzn",
    role: "Senior Software Engineer — ETL",
    company: "Amazon",
    location: "Remote — Seattle, WA",
    start: "Apr 2022",
    end: "Mar 2023",
    current: false,
    summary: "Compliance ETL pipelines and account-wide encryption-at-rest across petabytes of S3 data.",
    achievements: [
      "Integrated a new compliance reporting pipeline into an existing DynamoDB → S3 → Redshift ETL architecture; implemented AWS Glue jobs in Python for lightweight transformations and optimized Redshift models for large-scale analytical workloads.",
      "Implemented encryption-at-rest policy using custom AWS KMS keys across 7 AWS accounts, securing 2+ PB of S3 data and standardizing bucket-level security posture for all teams.",
      "Owned and resolved service tickets, ensuring system reliability.",
      "Designed and maintained CI/CD pipelines, integrating multiple components for seamless deployment."
    ],
    tools: ["Python", "S3", "Redshift", "AWS Glue", "AWS KMS", "CI/CD", "DynamoDB"]
  },
  {
    id: "ups2",
    role: "Intermediate Applications Developer",
    company: "United Parcel Service",
    location: "Timonium, MD",
    start: "Jan 2021",
    end: "Apr 2022",
    current: false,
    summary: "Kubernetes-based route optimization for Final Mile Delivery, cutting SLA times by 30%.",
    achievements: [
      "Designed and implemented a scalable microservice-based Route Optimization Service for Final Mile Delivery, deployed on Kubernetes in GCP, reducing SLA times by 30%.",
      "Built scalable .NET Core services with ASP.NET MVC architecture for cross-platform compatibility.",
      "Mentored junior developers and interns, accelerating onboarding and technical proficiency."
    ],
    tools: [".NET Core", "ASP.NET MVC", "Kubernetes", "GCP"]
  },
  {
    id: "ups1",
    role: "Applications Developer",
    company: "United Parcel Service",
    location: "Timonium, MD",
    start: "Feb 2018",
    end: "Jan 2021",
    current: false,
    summary: "Modernized core WCF/WinForm systems running across 3,500+ UPS global hubs.",
    achievements: [
      "Maintained and modernized core WCF services and a WinForm application used across 3,500+ UPS global hubs.",
      "Enhanced SQL Server performance through optimized stored procedures, schema updates, and unit tests.",
      "Delivered second-level application support during peak operations, resolving critical issues in real time."
    ],
    tools: ["WCF", "WinForms", ".NET Framework", "SQL Server", "Stored Procedures"]
  }
];

const PROJECTS = [
  {
    id: "proj-catsdogs",
    role: "Lead Programmer & ETL Developer",
    company: "Image Classification: Cats vs. Dogs",
    location: "UMBC, MD",
    start: "2022",
    end: "2023",
    current: false,
    summary: "Deep learning model comparison (ResNet50 vs VGG16) on the Google Open Images V4 dataset.",
    achievements: [
      "Developed a deep learning model comparing ResNet50 and VGG16 architectures using the Google Open Images V4 dataset in Jupyter Notebook.",
      "Built ETL pipelines with Hadoop + Spark RDD, integrating pandas and scikit-learn for data preprocessing, feature extraction, and performance evaluation."
    ],
    tools: ["Jupyter", "ResNet50", "VGG16", "Hadoop", "Spark RDD", "pandas", "scikit-learn"]
  },
  {
    id: "proj-robot",
    role: "Programmer",
    company: "Object Avoidance Robot (GPU-based)",
    location: "UMBC, MD",
    start: "2022",
    end: "2023",
    current: false,
    summary: "Real-time object avoidance on an NVIDIA Jetson Nano, validated in Gazebo and live testing.",
    achievements: [
      "Designed and deployed an image classification model on NVIDIA Jetson Nano (2GB GPU) for real-time object avoidance.",
      "Trained models using scikit-learn and PyCUDA on remote GPU servers; deployed to ROS, validated in Gazebo, and tested live for navigation accuracy."
    ],
    tools: ["NVIDIA Jetson Nano", "scikit-learn", "PyCUDA", "ROS", "Gazebo"]
  },
  {
    id: "proj-cars",
    role: "Programmer",
    company: "Car Sales Analyzer",
    location: "UMBC, MD",
    start: "2021",
    end: "2022",
    current: false,
    summary: "20 years of Maryland car sales data scraped, cleaned, and modeled for seasonal trends.",
    achievements: [
      "Built a Python-based data analysis tool in Jupyter Notebook to scrape and analyze 20 years of Maryland car sales data.",
      "Used Requests and BeautifulSoup for web scraping, Pandas for ETL, scikit-learn for trend modeling, and Seaborn for visualization of seasonal price and sales patterns."
    ],
    tools: ["Python", "Requests", "BeautifulSoup", "Pandas", "scikit-learn", "Seaborn"]
  }
];

const TAGS = [
  {
    id: "tag-mps",
    role: "v2.0 — M.P.S. Data Science",
    company: "University of Maryland, Baltimore County",
    location: "Baltimore, MD",
    start: "May 2023",
    end: "",
    summary: "Master's, Professional Studies in Data Science.",
    achievements: [
      "Coursework and applied projects spanning machine learning, big-data pipelines, and statistical analysis (see the data-science-projects branch)."
    ],
    tools: []
  },
  {
    id: "tag-bs",
    role: "v1.0 — B.S. Computer Science",
    company: "University of Maryland, Baltimore County",
    location: "Baltimore, MD",
    start: "Dec 2017",
    end: "",
    summary: "Bachelor of Science in Computer Science.",
    achievements: [
      "Received the Maryland Higher Education Commission Scholarship throughout the program."
    ],
    tools: []
  }
];

const SKILLS = [
  { category: "Languages", items: ["C#", "Java", "Python"] },
  { category: "Frameworks", items: [".NET Core", "ASP.NET MVC", ".NET Framework", "Spring", "Spring MVC", "Angular"] },
  { category: "Cloud Compute", items: ["AWS EC2", "ECS", "Lambda/Fargate", "EMR", "AWS Glue", "GKE", "Google Cloud Functions"] },
  { category: "Cloud Storage", items: ["S3", "RDS", "Redshift", "Cloud Storage"] },
  { category: "Databases", items: ["PostgreSQL", "SQL Server", "RDS", "DynamoDB"] },
  { category: "Data / ML", items: ["pandas", "scikit-learn", "Spark", "Hadoop", "Jupyter", "PyCUDA"] }
];
