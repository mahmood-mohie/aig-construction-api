
//Run this script only once to avoid duplicate data. 
//After successful execution, you can comment out the populateDatabase() call or delete populate.js to prevent accidental re-runs

const mongoose = require('mongoose');

// Connect to MongoDB using the URI that exist in environment variables
mongoose.connect("mongodb+srv://mahmoudcoder001:N73SRZicY2NW9nnT@cluster0.fclx5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Import models
const Company = require('./models/company');
const Service = require('./models/service');
const Project = require('./models/project');
const ContactInfo = require('./models/contactInfo');
const ContactMessage = require('./models/contactMessage');
const Testimonial = require('./models/testimonial');
const Statistic = require('./models/statistic');
const QuoteRequest = require('./models/quoteRequest');
const BlogPost = require('./models/blogPost');
const JobListing = require('./models/jobListing');
const JobApplication = require('./models/jobApplication');

// define company data with multilingual support.
const companyData = {
  name: {
    ar: "المجموعة العربية الإيطالية للإنشاء والتعمير",
    en: "Arab Italian Group for Construction & Development (AIG)"
  },
  companyLogos: [
    "https://i.imgur.com/eYfa6Cz.png",
  ],
  slogan: {
    ar: "الجودة الإيطالية بالروح المصرية",
    en: "Italian Quality with Egyptian Spirit"
  },
  mainFeature: {
    ar: "الريادة في المشاريع متعددة التخصصات منذ 1998",
    en: "Pioneers in Multidisciplinary Projects Since 1998"
  },
  about: {
    ar: "شركة رائدة في مجال المقاولات والتطوير العقاري، تجمع بين الخبرة الإيطالية في التصميم والكفاءة المصرية في التنفيذ. ننفذ مشاريع سكنية، تجارية، صناعية، وسياحية بمعايير عالمية.",
    en: "A leader in construction and real estate development, combining Italian design expertise with Egyptian execution efficiency. We deliver residential, commercial, industrial, and touristic projects to global standards."
  },
  vision: {
    ourValues: {
      icon: "fa-regular fa-handshake",
      title: {
        ar: "قيمنا الأساسية",
        en: "Core Values"
      },
      description: {
        ar: "لالتزام بالجودة: نركز على احتياجات ورضا عملائنا، ونضمن تسليم المشاريع في الوقت المحدد دون المساس بالجودة. كشريك موثوق، نركز على تعزيز العلاقات طويلة الأمد المبنية على الموثوقية والثقة والاحترام المتبادل. النزاهة: الشفافية هي جوهر كل ما نقوم به. نؤمن بالتواصل المفتوح والممارسات الأخلاقية وبناء علاقات قوية ودائمة مع العملاء والشركاء والمجتمعات من خلال تبادل القيم الهادف. التركيز على الإنسان: نضع رفاهية أصحاب المصلحة في مقدمة أولوياتنا من خلال إنشاء مساحات تثري الحياة وتعزز المجتمع وتقدم قيمة مستدامة. التزامنا هو بناء بيئات يستفيد فيها السكان والمستثمرون والشركاء من الجودة الدائمة والممارسات المسؤولة.",
        en: "Commitment to Quality: We focus on our clients' needs and satisfaction, ensuring timely project delivery without compromising quality. As a trusted partner, we focus on fostering long-term relationships built on reliability, trust, and mutual respect. Integrity: Transparency is at the core of everything we do. We believe in open communication, ethical practices, and building strong, lasting relationships with clients, partners, and communities through meaningful value exchange. People-Centered: We prioritize the well-being of our stakeholders by creating spaces that enrich lives, enhance community, and deliver sustainable value. Our commitment is to build environments where residents, investors, and partners benefit from consistent quality and responsible practices."
      }
    },
    ourMessage: {
      icon: "fa-regular fa-bullhorn",
      title: {
        ar: "رسالتنا",
        en: "Our Message"
      },
      description: {
        ar: "هي أن نكون الرواد في إنشاء مجتمعات نابضة بالحياة وخالدة تلهم الروابط وتثري حياة الجميع. هدفنا هو تحويل الرمال إلى حياة، وخلق مجتمعات نابضة وخالدة حيث تلتقي الهندسة المعمارية مع الطموح وتصبح كل مساحة إرثاً. نسعى لإثراء الحياة وتعزيز الروابط وبناء شعور حقيقي بالانتماء للجميع.",
        en: "Our mission is to be pioneers in creating vibrant and timeless communities that inspire connections and enrich everyone's lives. Our goal is to transform sand into life, creating vibrant and timeless communities where architecture meets ambition and every space becomes a legacy. We strive to enrich lives, strengthen connections, and build a true sense of belonging for all."
      }
    }
  },
  team: [
    {
      employeeName: {
        ar: "أحمد محمود",
        en: "Ahmed Mahmoud"
      },
      employeePosition: {
        ar: "المدير التنفيذي",
        en: "CEO"
      },
      photo: "https://example.com/team/ceo.jpg"
    },
    {
      employeeName: {
        ar: "ماريا جيوفاني",
        en: "Maria Giovanni"
      },
      employeePosition: {
        ar: "مدير التصميم المعماري",
        en: "Chief Architectural Designer"
      },
      photo: "https://example.com/team/design-lead.jpg"
    }
  ],
  whyChooseUs: [
    {
      icon: "fa-regular fa-certificate",
      title: {
        ar: "شهادات الجودة",
        en: "Quality Certifications"
      },
      description: {
        ar: "حاصلون على شهادات ISO 9001 وISO 14001 الدولية",
        en: "Holder of ISO 9001 and ISO 14001 international certifications"
      }
    },
    {
      icon: "fa-regular fa-users",
      title: {
        ar: "فريق الخبراء",
        en: "Expert Team"
      },
      description: {
        ar: "فريق عمل من أكثر من 200 متخصص في مختلف التخصصات",
        en: "200+ specialists across multiple disciplines"
      }
    },
    {
      icon: "fa-regular fa-microchip",
      title: {
        ar: "التكنولوجيا المتقدمة",
        en: "Advanced Technology"
      },
      description: {
        ar: "استخدام أحدث البرمجيات والآلات في التصميم والتنفيذ",
        en: "Utilizing cutting-edge software and machinery for design and execution"
      }
    },
    {
      icon: "fa-regular fa-chart-line",
      title: {
        ar: "سجل حافل بالإنجازات",
        en: "Proven Track Record"
      },
      description: {
        ar: "أكثر من 150 مشروع ناجح في 10 محافظات مصرية",
        en: "150+ successful projects across 10 Egyptian governorates"
      }
    }
  ],
  ourPartners: [
    {
      url: "https://www.technital.com",
      logo: "https://example.com/partners/technital-logo.png",
      name: {
        ar: "تكنيتال الإيطالية",
        en: "Technital Italy"
      }
    },
    {
      url: "https://www.egyptian-contractors.com",
      logo: "https://example.com/partners/eca-logo.png",
      name: {
        ar: "اتحاد المقاولين المصريين",
        en: "Egyptian Contractors Association"
      }
    },
    {
      url: "https://www.italferr.it",
      logo: "https://example.com/partners/italferr-logo.png",
      name: {
        ar: "إيطالفر للسكك الحديدية",
        en: "Italferr Railway Engineering"
      }
    },
    {
      url: "https://www.moh.gov.eg",
      logo: "https://example.com/partners/egypt-housing-logo.png",
      name: {
        ar: "وزارة الإسكان المصرية",
        en: "Egyptian Housing Ministry"
      }
    },
    {
      url: "https://www.cemex.com",
      logo: "https://example.com/partners/cemex-logo.png",
      name: {
        ar: "سيمكس للمواد الإنشائية",
        en: "CEMEX Construction Materials"
      }
    },
    {
      url: "https://www.bureauveritas.com",
      logo: "https://example.com/partners/bureau-veritas-logo.png",
      name: {
        ar: "بيورو فيريتاس للاعتماد",
        en: "Bureau Veritas Certification"
      }
    }
  ],
  whyWeAreDifferent: {
    paragraph: {
      ar: "المجموعة العربية الايطاليه هي شركة تطوير عقاري ذات رؤية مستقبلية ونهج فريد في إنشاء المساحات الجميلة. تأسست على مبدأ تحويل الرمال إلى بيئات معيشية مذهلة، ونحن نجلب الابتكار والإبداع والتميز لكل مشروع. تهدف ريمال إلى تبسيط عملية العمل والإنشاء وتسليم المشروع للعميل النهائي لضمان الرضا التام",
      en: "The Arab Italian Group is a real estate development company with a forward-thinking vision and a unique approach to creating beautiful spaces. Founded on the principle of transforming sand into stunning living environments, we bring innovation, creativity, and excellence to every project. Rimal aims to simplify the process of work, construction, and project delivery to the end customer to ensure complete satisfaction."
    },
    features: [
      {
        icon: "https://i.imgur.com/t06L75l.png",
        title: {
          ar: "خبرة ايطالية بايادي مصرية",
          en: "Italian expertise by Egyptian hands"
        },
        description: {
          ar: "مزيج من التصميم الايطالي الفني والتنفيذ المصري الدقيق",
          en: "A combination of artistic Italian design and precise Egyptian execution."
        }
      },
      {
        icon: "https://i.imgur.com/tNLOjVx.png",
        title: {
          ar: "التزام بالجودة",
          en: "Commitment to quality"
        },
        description: {
          ar: "نستخدم خامات بناء عالمية باعلي المقاييس ونتائج تدقيق جودة اسبوعية",
          en: "We use world-class building materials with the highest standards and weekly quality audit results."
        }
      },
      {
        icon: "https://i.imgur.com/byju1sM.png",
        title: {
          ar: "استدامة",
          en: "Sustainability"
        },
        description: {
          ar: "نهتم بدمج تقنيات صديقة للبيئة داخل مشاريعنا",
          en: "We care about integrating environmentally friendly technologies into our projects."
        }
      },
      {
        icon: "https://i.imgur.com/zzlxiM9.png",
        title: {
          ar: "مرونة في التمويل",
          en: "Flexibility in financing"
        },
        description: {
          ar: "استراتيجيات تمويلية مختلفة تناسب جميع  العملاء",
          en: "Different financing strategies to suit all clients"
        }
      },
      {
        icon: "https://i.imgur.com/9MBhiRU.png",
        title: {
          ar: "فريق متعدد التخصصات",
          en: "multidisciplinary team"
        },
        description: {
          ar: "200+ خبير في الهندسة, البرمجيات,الديكور,الاستثمار جاهزين لمساعدتك",
          en: "200+ experts in engineering, software, interior design, and investment are ready to help you."
        }
      }
    ]
  },
  established:  1998,
  history: [
    {
      year: 2008,
      achievements: {
        ar: "بدء العمليات في مصر",
        en: "Began operations in Egypt"
      }
    },
    {
      year: 2012,
      achievements: {
        ar: "إنجاز 500 وحدة سكنية بمدينة 6 أكتوبر",
        en: "Completed 500 residential units in 6th October City"
      }
    },
    {
      year: 2015,
      achievements: {
        ar: "تنفيذ أول مشروع سياحي ضخم بالساحل الشمالي",
        en: "Executed first major touristic project in North Coast"
      }
    },
    {
      year: 2018,
      achievements: {
        ar: "تأهيل المنطقة الصناعية بحلوان",
        en: "Rehabilitated Helwan Industrial Zone"
      }
    },
    {
      year: 2020,
      achievements: {
        ar: "بدء مشروع توسعة مترو القاهرة",
        en: "Initiated Cairo Metro expansion project"
      }
    },
    {
      year: 2023,
      achievements: {
        ar: "الحصول على جائزة أفضل مقاول عربي",
        en: "Awarded Best Arab Contractor prize"
      }
    }
],
  socialMedia: {
    linkedin: {
      url: "https://linkedin.com/company/aig-construction",
      logo: "fab fa-linkedin"
    },
    facebook: {
      url: "https://facebook.com/AIGConstruction",
      logo: "fab fa-facebook"
    },
    tiktok: {
      url: "https://tiktok.com/@aig_construction",
      logo: "fab fa-tiktok"
    },
    twitter: {
      url: "https://twitter.com/AIG_Construct",
      logo: "fab fa-twitter"
    },
    instagram: {
      url: "https://instagram.com/aig_construction",
      logo: "fab fa-instagram"
    },
    youtube: {
      url: "https://youtube.com/AIGConstruction",
      logo: "fab fa-youtube"
    }
  }
};

const servicesData = [
  {  
    title: {  
      ar: "التشييد السكني",  
      en: "Residential Construction"  
    },  
    description: {  
      ar: "بناء مجمعات سكنية وفيلات عصرية بتصميمات إيطالية تلائم السوق المصري، مع التركيز على الجودة والمساحات الخضراء.",  
      en: "Construction of modern residential complexes and villas with Italian designs tailored to the Egyptian market, emphasizing quality and green spaces."  
    },  
    icon: ["fa-regular fa-person-digging"],  
    category: {  
      ar: "التشييد",  
      en: "Construction"  
    }  
  },  
  {  
    title: {  
      ar: "الهياكل المعدنية الصناعية",  
      en: "Industrial Metal Structures"  
    },  
    description: {  
      ar: "تصميم وتنفيذ الهياكل المعدنية للمصانع والمنشآت الصناعية، مع صيانة وتأهيل الهياكل القديمة.",  
      en: "Design and execution of metal structures for factories and industrial facilities, including maintenance and rehabilitation of old structures."  
    },  
    icon: ["fa-regular fa-industry"],  
    category: {  
      ar: "الأعمال المعدنية",  
      en: "Metal Works"  
    }  
  },  
  {  
    title: {  
      ar: "تطوير البنية التحتية",  
      en: "Infrastructure Development"  
    },  
    description: {  
      ar: "تنفيذ مشاريع البنية التحتية مثل شبكات الصرف الصحي، الطرق السريعة، ومحطات تحلية المياه.",  
      en: "Implementation of infrastructure projects including sewage networks, highways, and water desalination plants."  
    },  
    icon: ["fa-regular fa-road-bridge"],  
    category: {  
      ar: "البنية التحتية",  
      en: "Infrastructure"  
    }  
  },  
  {  
    title: {  
      ar: "التصميم المعماري والديكور",  
      en: "Architectural Design & Decoration"  
    },  
    description: {  
      ar: "تصميمات معمارية مبتكرة وتشطيبات فاخرة للوحدات السكنية والتجارية، مع استخدام مواد عالية الجودة.",  
      en: "Innovative architectural designs and luxury finishes for residential and commercial units using high-quality materials."  
    },  
    icon: ["fa-regular fa-holly-berry"],
    category: {  
      ar: "التصميم والديكور",  
      en: "Design & Decoration"  
    }  
  },  
  {  
    title: {  
      ar: "الصيانة وإعادة التأهيل",  
      en: "Maintenance & Rehabilitation"  
    },  
    description: {  
      ar: "صيانة وتحديث المنشآت القديمة لتعزيز كفاءتها وإطالة عمرها الافتراضي.",  
      en: "Maintenance and modernization of old facilities to enhance efficiency and extend their lifespan."  
    },  
    icon: ["fa-regular fa-toolbox"], 
    category: {  
      ar: "الصيانة",  
      en: "Maintenance"  
    }  
  },  
];

const projectsData = [
  {
    title: { ar: 'منتجع مالديفز', en: 'Maldives Resort' },
    description: {
      ar: 'منتجع سياحي فاخر على الساحل الشمالي بمستوى عالمي',
      en: 'A luxury tourist resort on the North Coast with world-class standards'
    },
    address: {
      city: { ar: 'الساحل الشمالي', en: 'North Coast' },
      area: { ar: 'الساحل الشمالي', en: 'North Coast' },
      government: { ar: 'مطروح', en: 'Matrouh' },
      country: { ar: 'مصر', en: 'Egypt' },
      unitPlace: { ar: 'الساحل الشمالي', en: 'North Coast' }
    },
    overview: {
      typeOfProject: { ar: 'منتجع سياحي', en: 'Touristic Resort' },
      yearOfEstablishment: 2022,
      size: 5000,
      numberOfBathrooms: 20,
      numberOfRooms: 50,
      numberOfGarages: 10,
      codeOfUnit: "MDV22RS"
    },
    status: 'completed',
    featured: true,
    media: ['https://unsplash.com/photos/beach-resort-pool', 'https://unsplash.com/photos/luxury-hotel-room'],
    type: { ar: 'سياحي', en: 'Touristic' },
    statistics: { concrete: 30000, steel: 2500 },
    prices: { maxPrice: 5000, minPrice: 2500 },
    servicesOfTheProject: {
      ar: ['سبا', 'مطعم', 'ملعب جولف', 'حديقة مائية', 'واي فاي'],
      en: ['Spa', 'Restaurant', 'Golf Court', 'Aqua Park', 'Wi-Fi']
    }
  },
];

const contactInfoData = {
    address: {
      ar: 'العنوان الرئيسي للشركة - القاهرة، مصر',
      en: 'Main Company Address - Cairo, Egypt'
    },
    phone: '123-456-7890',
    email: 'info@aig.com',
    mapCoordinates: {
      lat: 30.0444,
      lng: 31.2357
    },
    socialMedia: {
      linkedin: 'https://linkedin.com/company/aig',
      facebook: 'https://facebook.com/aig',
      instagram: 'https://instagram.com/aig',
      tiktok: 'https://tiktok.com/aig',
      youtube: 'https://youtube.com/aig',
      twitter: 'https://twitter.com/aig',
    }
};

const statisticsData = [
  {  
    title: {  
      ar: "إجمالي الخرسانة المستخدمة",  
      en: "Total Concrete Used"  
    },  
    value: 250000,  
    unit: "m³"  
  },  
  {  
    title: {  
      ar: "الهياكل المعدنية المصنعة",  
      en: "Steel Structures Fabricated"  
    },  
    value: 50000,  
    unit: "tons"  
  },  
  {  
    title: {  
      ar: "المشاريع المكتملة",  
      en: "Completed Projects"  
    },  
    value: 120,  
    unit: "" // No unit needed for count  
  },
  {  
    title: {  
      ar: "الوحدات السكنية المسلمة",  
      en: "Residential Units Delivered"  
    },  
    value: 5000,  
    unit: ""  
  },    
  {  
    title: {  
      ar: "طول البنية التحتية المنفذة",  
      en: "Infrastructure Length Developed"  
    },  
    value: 850,  
    unit: "km"  
  }, 
];

const blogPostsData = [
    {
      title: {
        ar: 'اكتمال مشروع مطروح بارك',
        en: 'Completion of Matrouh Park Project'
      },
      content: {
        ar: 'تم اكتمال مشروع مطروح بارك بنجاح في نوفمبر 2023...',
        en: 'The Matrouh Park project was successfully completed in November 2023...'
      },
      media: ['https://example.com/image1.jpg'],
      author: {
        ar : 'فريق AIG',
        en : 'AIG Team',
      },
      tags: ['project', 'completion'],
    }
    // Add more posts from your website’s "Latest News" section
  ];

const jobListing = [
    {
        title: { 
            ar: "مطور واجهات امامية", 
            en: "Frontend web developer" 
        },
        description: { 
            ar: 'مهندس برمجيات الواجهة الأمامية مسؤول عن تنفيذ العناصر المرئية التي يراها المستخدمون ويتفاعلون معها في تطبيق الويب. يُسهم هذا الدور في سد الفجوة بين التصميم الجرافيكي والتنفيذ التقني، مما يوفر تجربة مستخدم تفاعلية تتوافق مع أهداف العمل.', 
            en: 'A front-end software engineer is responsible for implementing the visual elements that users see and interact with in a web application. This role bridges the gap between graphical design and technical implementation, providing an engaging user experience that aligns with business goals.' 
        },
        requirements: { 
            ar: 'لدية معرفة بلغات البرمجة', 
            en: 'knowing programming languages'
        },
        location: 'egypt, cairo, nasr city',
    },
];

const testimonial = [
    {
        name : 'memo',
        quote: { 
            ar: "شغلهم زي الفل",
            en: 'their work is very gooood' 
        },
        company: 'الشركة',
        image: "https://example.com/image1.jpg"
    },
];

// Insert the Data
async function populateDatabase() {
    try {
      // // Insert Company data
      await Company.create(companyData);
      console.log('Company data inserted');
  
      // // Insert Services data
      // await Service.insertMany(servicesData);
      // console.log('Services data inserted');
  
      // // Insert Projects data
      // await Project.insertMany(projectsData);
      // console.log('Projects data inserted');
  
      // // Insert ContactInfo data
      // await ContactInfo.create(contactInfoData);
      // console.log('Contact info inserted');
  
      // // Insert Statistics data
      // await Statistic.insertMany(statisticsData);
      // console.log('Statistics data inserted');
  
      // Insert Blog Posts data
      // await BlogPost.insertMany(blogPostsData);
      // console.log('Blog posts inserted');

      // // Insert job list data
      // await JobListing.insertMany(jobListing);
      // console.log('jobListing inserted');

      // // Insert jtestimonials data
      // await Testimonial.insertMany(testimonial);
      // console.log('testimonial inserted');
  
  
    } catch (err) {
      console.error('Error populating database:', err);
    } finally {
      // Close the MongoDB connection
      mongoose.connection.close();
    }
  }
  
// Run the population function
populateDatabase(); // comment it to prevent executing it
