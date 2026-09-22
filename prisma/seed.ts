import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding StatBound News database with realistic demo content...');

  // Clean up existing records if any
  await prisma.comment.deleteMany({});
  await prisma.articleVersion.deleteMany({});
  await prisma.articleView.deleteMany({});
  await prisma.breakingNews.deleteMany({});
  await prisma.article.deleteMany({});
  await prisma.subcategory.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.district.deleteMany({});
  await prisma.author.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.advertisement.deleteMany({});
  await prisma.photoGalleryImage.deleteMany({});
  await prisma.photoGallery.deleteMany({});
  await prisma.videoStory.deleteMany({});
  await prisma.homepageSection.deleteMany({});
  await prisma.siteSetting.deleteMany({});
  await prisma.newsletterSubscriber.deleteMany({});
  await prisma.contactInquiry.deleteMany({});
  await prisma.adInquiry.deleteMany({});
  await prisma.auditLog.deleteMany({});

  // 1. Create Staff Users
  const superAdminUser = await prisma.user.create({
    data: {
      name: 'ড. রফিকুল ইসলাম (Dr. Rafiqul Islam)',
      email: 'admin@statbound.com',
      passwordHash: 'adminPassword123!',
      role: 'SUPER_ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      bio: 'প্রধান সম্পাদক ও প্রকাশক, স্ট্যাটবাউন্ড নিউজ। তিন দশকের সাংবাদিকতার অভিজ্ঞতা সম্পন্ন।',
    },
  });

  const editorUser = await prisma.user.create({
    data: {
      name: 'নাজনীন সুলতানা (Nazneen Sultana)',
      email: 'editor@statbound.com',
      passwordHash: 'editorPassword123!',
      role: 'EDITOR',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      bio: 'নির্বাহী সম্পাদক। অনুসন্ধানী সাংবাদিকতা এবং জাতীয় রাজনীতি বিষয়ক গবেষক।',
    },
  });

  const reporterUser = await prisma.user.create({
    data: {
      name: 'তানভীর আহমেদ (Tanvir Ahmed)',
      email: 'reporter@statbound.com',
      passwordHash: 'reporterPassword123!',
      role: 'REPORTER',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      bio: 'জ্যেষ্ঠ প্রতিবেদক। শিক্ষা, তথ্যপ্রযুক্তি এবং তরুণ উদ্যোক্তা বিষয়ক ডেস্ক।',
    },
  });

  const adManagerUser = await prisma.user.create({
    data: {
      name: 'শরীফুল হাসান (Shariful Hasan)',
      email: 'ads@statbound.com',
      passwordHash: 'adsPassword123!',
      role: 'AD_MANAGER',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
      bio: 'হেড অব বিজনেস অ্যান্ড ডিজিটাল মনিটাইজেশন।',
    },
  });

  // 2. Create Authors
  const author1 = await prisma.author.create({
    data: {
      name: 'ড. রফিকুল ইসলাম',
      nameBn: 'ড. রফিকুল ইসলাম',
      slug: 'dr-rafiqul-islam',
      email: 'admin@statbound.com',
      designation: 'Editor-in-Chief',
      designationBn: 'প্রধান সম্পাদক',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      bio: 'প্রধান সম্পাদক ও কলামিস্ট। অর্থনীতি ও জাতীয় নীতিনির্ধারণী বিষয়ে নিয়মিত লেখেন।',
      bioBn: 'প্রধান সম্পাদক ও কলামিস্ট। অর্থনীতি ও জাতীয় নীতিনির্ধারণী বিষয়ে নিয়মিত লেখেন।',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      userId: superAdminUser.id,
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'নাজনীন সুলতানা',
      nameBn: 'নাজনীন সুলতানা',
      slug: 'nazneen-sultana',
      email: 'editor@statbound.com',
      designation: 'Executive Editor',
      designationBn: 'নির্বাহী সম্পাদক',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      bio: 'নির্বাহী সম্পাদক ও জ্যেষ্ঠ রাজনৈতিক বিশ্লেষক।',
      bioBn: 'নির্বাহী সম্পাদক ও জ্যেষ্ঠ রাজনৈতিক বিশ্লেষক।',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      userId: editorUser.id,
    },
  });

  const author3 = await prisma.author.create({
    data: {
      name: 'তানভীর আহমেদ',
      nameBn: 'তানভীর আহমেদ',
      slug: 'tanvir-ahmed',
      email: 'reporter@statbound.com',
      designation: 'Senior Tech & Education Correspondent',
      designationBn: 'জ্যেষ্ঠ প্রযুক্তি ও শিক্ষা প্রতিবেদক',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
      bio: 'তথ্যপ্রযুক্তি, এআই উদ্ভাবন ও ক্যাম্পাস সাংবাদিকতায় অভিজ্ঞ।',
      bioBn: 'তথ্যপ্রযুক্তি, এআই উদ্ভাবন ও ক্যাম্পাস সাংবাদিকতায় অভিজ্ঞ।',
      userId: reporterUser.id,
    },
  });

  const author4 = await prisma.author.create({
    data: {
      name: 'মেহজাবীন চৌধুরী',
      nameBn: 'মেহজাবীন চৌধুরী',
      slug: 'mehjabin-chowdhury',
      email: 'mehjabin@statbound.com',
      designation: 'Sports & Lifestyle Writer',
      designationBn: 'ক্রীড়া ও জীবনযাপন প্রতিবেদক',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
      bio: 'ক্রিকেট ও ফুটবল বিশ্লেষণ এবং আধুনিক জীবনযাপন নিয়ে প্রতিবেদন তৈরি করেন।',
      bioBn: 'ক্রিকেট ও ফুটবল বিশ্লেষণ এবং আধুনিক জীবনযাপন নিয়ে প্রতিবেদন তৈরি করেন।',
    },
  });

  const author5 = await prisma.author.create({
    data: {
      name: 'প্রফেসর ড. মুহাম্মদ কবীর',
      nameBn: 'প্রফেসর ড. মুহাম্মদ কবীর',
      slug: 'prof-dr-muhammad-kabir',
      email: 'kabir@statbound.com',
      designation: 'Distinguished Columnist',
      designationBn: 'বিশিষ্ট কলামিস্ট ও সমাজচিন্তক',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
      bio: 'ঢাকা বিশ্ববিদ্যালয়ের অবসরপ্রাপ্ত অধ্যাপক ও সমকালীন আন্তর্জাতিক ভূরাজনীতি বিশ্লেষক।',
      bioBn: 'ঢাকা বিশ্ববিদ্যালয়ের অবসরপ্রাপ্ত অধ্যাপক ও সমকালীন আন্তর্জাতিক ভূরাজনীতি বিশ্লেষক।',
    },
  });

  // 3. Create Categories
  const categoriesData = [
    { name: 'National', nameBn: 'জাতীয়', slug: 'national', order: 1, color: '#1E3E62' },
    { name: 'Politics', nameBn: 'রাজনীতি', slug: 'politics', order: 2, color: '#DC2626' },
    { name: 'International', nameBn: 'আন্তর্জাতিক', slug: 'international', order: 3, color: '#2563EB' },
    { name: 'Education', nameBn: 'শিক্ষা', slug: 'education', order: 4, color: '#059669' },
    { name: 'Campus', nameBn: 'ক্যাম্পাস', slug: 'campus', order: 5, color: '#D97706' },
    { name: 'Business', nameBn: 'ব্যবসা', slug: 'business', order: 6, color: '#4F46E5' },
    { name: 'Technology', nameBn: 'প্রযুক্তি', slug: 'technology', order: 7, color: '#0284C7' },
    { name: 'Sports', nameBn: 'খেলাধুলা', slug: 'sports', order: 8, color: '#16A34A' },
    { name: 'Entertainment', nameBn: 'বিনোদন', slug: 'entertainment', order: 9, color: '#DB2777' },
    { name: 'Lifestyle', nameBn: 'জীবনযাপন', slug: 'lifestyle', order: 10, color: '#7C3AED' },
    { name: 'Opinion', nameBn: 'মতামত', slug: 'opinion', order: 11, color: '#9333EA' },
    { name: 'Chattogram', nameBn: 'চট্টগ্রাম', slug: 'chattogram', order: 12, color: '#0891B2' },
    { name: 'District', nameBn: 'জেলা', slug: 'district', order: 13, color: '#0D9488' },
    { name: 'Jobs', nameBn: 'চাকরি', slug: 'jobs', order: 14, isNav: false, color: '#EA580C' },
    { name: 'Science', nameBn: 'বিজ্ঞান', slug: 'science', order: 15, isNav: false, color: '#0284C7' },
    { name: 'Health', nameBn: 'স্বাস্থ্য', slug: 'health', order: 16, isNav: false, color: '#E11D48' },
  ];

  const catMap: Record<string, any> = {};
  for (const c of categoriesData) {
    const created = await prisma.category.create({ data: c });
    catMap[c.slug] = created;
  }

  // 4. Create Districts
  const districtsData = [
    { name: 'Chattogram', nameBn: 'চট্টগ্রাম', slug: 'chattogram', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', order: 1 },
    { name: 'Dhaka', nameBn: 'ঢাকা', slug: 'dhaka', division: 'Dhaka', divisionBn: 'ঢাকা', order: 2 },
    { name: 'Cumilla', nameBn: 'কুমিল্লা', slug: 'cumilla', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', order: 3 },
    { name: 'Cox\'s Bazar', nameBn: 'কক্সবাজার', slug: 'coxs-bazar', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', order: 4 },
    { name: 'Feni', nameBn: 'ফেনী', slug: 'feni', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', order: 5 },
    { name: 'Noakhali', nameBn: 'নোয়াখালী', slug: 'noakhali', division: 'Chattogram', divisionBn: 'চট্টগ্রাম', order: 6 },
    { name: 'Sylhet', nameBn: 'সিলেট', slug: 'sylhet', division: 'Sylhet', divisionBn: 'সিলেট', order: 7 },
    { name: 'Rajshahi', nameBn: 'রাজশাহী', slug: 'rajshahi', division: 'Rajshahi', divisionBn: 'রাজশাহী', order: 8 },
    { name: 'Khulna', nameBn: 'খুলনা', slug: 'khulna', division: 'Khulna', divisionBn: 'খুলনা', order: 9 },
    { name: 'Barishal', nameBn: 'বরিশাল', slug: 'barishal', division: 'Barishal', divisionBn: 'বরিশাল', order: 10 },
    { name: 'Rangpur', nameBn: 'রংপুর', slug: 'rangpur', division: 'Rangpur', divisionBn: 'রংপুর', order: 11 },
    { name: 'Mymensingh', nameBn: 'ময়মনসিংহ', slug: 'mymensingh', division: 'Mymensingh', divisionBn: 'ময়মনসিংহ', order: 12 },
  ];

  const distMap: Record<string, any> = {};
  for (const d of districtsData) {
    const dist = await prisma.district.create({ data: d });
    distMap[d.slug] = dist;
  }

  // 5. Seed 35+ Realistic Fictional Bangla News Articles
  const articles = [
    {
      title: 'জাতীয় অর্থনৈতিক রূপরেখা ও আধুনিক অবকাঠামো উন্নয়ন: নতুন মেগা প্রকল্পের অনুমোদন একনেকে',
      titleBn: 'জাতীয় অর্থনৈতিক রূপরেখা ও আধুনিক অবকাঠামো উন্নয়ন: নতুন মেগা প্রকল্পের অনুমোদন একনেকে',
      slug: 'national-economic-roadmap-mega-projects-approved-ecnec',
      subtitle: 'যোগাযোগ ও জ্বালানি খাতের সংস্কারে অগ্রাধিকার, বাস্তবায়নে থাকছে বিশেষ মনিটরিং সেল',
      excerpt: 'দেশের সার্বিক অর্থনৈতিক প্রবৃদ্ধি ত্বরান্বিত করতে এবং আঞ্চলিক যোগাযোগ ব্যবস্থা জোরদার করতে ১০টি নতুন উন্নয়ন প্রকল্পের চূড়ান্ত অনুমোদন দিয়েছে জাতীয় অর্থনৈতিক পরিষদের নির্বাহী কমিটি (একনেক)।',
      content: `<p class="lead">দেশের সার্বিক অর্থনৈতিক প্রবৃদ্ধি ত্বরান্বিত করতে এবং আঞ্চলিক যোগাযোগ ব্যবস্থা জোরদার করতে প্রায় ১২ হাজার কোটি টাকা ব্যয়ে ১০টি নতুন উন্নয়ন প্রকল্পের চূড়ান্ত অনুমোদন দিয়েছে জাতীয় অর্থনৈতিক পরিষদের নির্বাহী কমিটি (একনেক)।</p>
      
      <h3>প্রকল্পের অগ্রাধিকার খাতসমূহ</h3>
      <p>সভায় জানানো হয়, অনুমোদিত প্রকল্পগুলোর মধ্যে রেল ও সড়ক নেটওয়ার্ক সম্প্রসারণ, নবায়নযোগ্য জ্বালানি উৎপাদন এবং আধুনিক কৃষি সেচ প্রযুক্তি স্থাপন শীর্ষে রয়েছে। প্রকল্পগুলো যথাসময়ে সম্পন্ন করতে প্রতিটি মন্ত্রণালয়ের অধীনে উচ্চপর্যায়ের মনিটরিং সেল গঠনের নির্দেশ দেওয়া হয়েছে।</p>
      
      <blockquote>
        "জনগণের ট্যাক্সের প্রতিটি পয়সার সর্বোচ্চ সদ্ব্যবহার এবং প্রকল্প বাস্তবায়নে শতভাগ স্বচ্ছতা নিশ্চিত করাই আমাদের সরকারের মূল অঙ্গীকার।" — পরিকল্পনা উপদেষ্টা
      </blockquote>
      
      <p>অর্থনীতিবিদরা জানিয়েছেন, এই প্রকল্পগুলোর সফল বাস্তবায়ন গ্রামীণ অর্থনীতিতে নতুন কর্মসংস্থান সৃষ্টির পাশাপাশি জাতীয় জিডিপিতে দৃশ্যমান অবদান রাখবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'একনেক সভায় গুরুত্বপূর্ণ উন্নয়ন প্রকল্পের চূড়ান্ত পর্যালোচনা। ছবি: স্ট্যাটবাউন্ড ডেস্ক',
      photographerCredit: 'স্ট্যাটবাউন্ড ব্যুরো',
      categoryId: catMap['national'].id,
      authorId: author1.id,
      tags: 'জাতীয়, একনেক, অর্থনীতি, উন্নয়ন, মেগা প্রকল্প, বাংলাদেশ',
      status: 'PUBLISHED',
      isHero: true,
      isFeatured: true,
      isTrending: true,
      isBreaking: true,
      viewsCount: 6540,
      readTimeMinutes: 4,
      publishedAt: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    },
    {
      title: 'নতুন আধুনিক শিক্ষা কাঠামো ঘোষণা: ডিজিটাল দক্ষতা ও সৃজনশীলতায় বিশেষ জোর',
      titleBn: 'নতুন আধুনিক শিক্ষা কাঠামো ঘোষণা: ডিজিটাল দক্ষতা ও সৃজনশীলতায় বিশেষ জোর',
      slug: 'new-education-framework-digital-skills-announced',
      subtitle: 'আগামী শিক্ষাবর্ষ থেকেই প্রাথমিক ও মাধ্যমিকে নতুন পাঠ্যসূচি ও মূল্যায়ন ব্যবস্থা কার্যকর হচ্ছে',
      excerpt: 'দেশের শিক্ষাব্যবস্থাকে যুগোপযোগী ও বৈশ্বিক মানসম্পন্ন করতে নতুন আধুনিক পাঠ্যক্রম এবং মূল্যায়ন কাঠামোর পূর্ণাঙ্গ রূপরেখা আনুষ্ঠানিকভাবে ঘোষণা করেছে শিক্ষা মন্ত্রণালয়।',
      content: `<p class="lead">দেশের শিক্ষাব্যবস্থাকে যুগোপযোগী ও বৈশ্বিক মানসম্পন্ন করতে নতুন আধুনিক পাঠ্যক্রম এবং মূল্যায়ন কাঠামোর পূর্ণাঙ্গ রূপরেখা আনুষ্ঠানিকভাবে ঘোষণা করেছে শিক্ষা মন্ত্রণালয়। নতুন এই পাঠ্যক্রমে মুখস্থবিদ্যার পরিবর্তে প্রায়োগিক শিক্ষা, সমালোচনামূলক চিন্তা এবং কৃত্রিম বুদ্ধিমত্তা ও প্রোগ্রামিংসহ আধুনিক ডিজিটাল দক্ষতার ওপর সর্বাধিক গুরুত্ব দেওয়া হয়েছে।</p>
      
      <h3>নতুন কাঠামোর মূল বৈশিষ্ট্যসমূহ</h3>
      <p>শিক্ষা মন্ত্রণালয় আয়োজিত এক সংবাদ সম্মেলনে জানানো হয়, প্রাথমিক স্তর থেকেই শিশুদের প্রযুক্তি সচেতনতা ও সমস্যা সমাধানের ক্ষমতা বৃদ্ধির জন্য ব্যবহারিক বিজ্ঞান ল্যাব ও সক্রিয় শিখন ব্যবস্থা নিশ্চিত করা হবে। এতে মুখস্থ নির্ভর বার্ষিক পরীক্ষার পরিবর্তে ধারাবাহিক মূল্যায়ন ও প্রকল্পভিত্তিক অ্যাসাইনমেন্টের ওপর ৬০ শতাংশ নম্বর বরাদ্দ রাখা হয়েছে।</p>
      
      <blockquote>
        "আমাদের লক্ষ্য শুধু ডিগ্রিধারী তৈরি করা নয়, বরং একুশ শতকের বৈশ্বিক চ্যালেঞ্জ মোকাবিলায় সক্ষম দক্ষ ও সৎ নাগরিক গড়ে তোলা।" — শিক্ষামন্ত্রী
      </blockquote>

      <h3>শিক্ষক প্রশিক্ষণ ও অবকাঠামো উন্নয়ন</h3>
      <p>সারাদেশের প্রায় তিন লক্ষাধিক শিক্ষককে আগামী তিন মাসের মধ্যে বিশেষ আধুনিক পেডাগজি ও ডিজিটাল শিক্ষা সরঞ্জামের ওপর নিবিড় প্রশিক্ষণ দেওয়া হবে। একইসঙ্গে প্রত্যন্ত অঞ্চলের বিদ্যালয়গুলোতে উচ্চগতির ইন্টারনেট সংযোগ ও ডিজিটাল ক্লাসরুম স্থাপনের দ্রুত উদ্যোগ নেওয়া হয়েছে।</p>
      
      <p>বিশেষজ্ঞরা এই যুগান্তকারী উদ্যোগকে স্বাগত জানিয়ে বলেছেন, সঠিক বাস্তবায়ন নিশ্চিত করা গেলে বাংলাদেশের মানবসম্পদ উন্নয়ন বিশ্বমঞ্চে অনন্য দৃষ্টান্ত স্থাপন করবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'রাজধানীর একটি আধুনিক ডিজিটাল ক্লাসরুমে শিক্ষার্থীদের সক্রিয় পাঠদান কার্যক্রম। ছবি: স্ট্যাটবাউন্ড নিউজ',
      photographerCredit: 'আহসান হাবীব / স্ট্যাটবাউন্ড নিউজ',
      categoryId: catMap['education'].id,
      authorId: author3.id,
      tags: 'শিক্ষা, ডিজিটাল দক্ষতা, পাঠ্যক্রম, শিক্ষা মন্ত্রণালয়, বাংলাদেশ',
      status: 'PUBLISHED',
      isHero: false,
      isFeatured: true,
      isTrending: true,
      isBreaking: false,
      viewsCount: 4210,
      readTimeMinutes: 4,
      publishedAt: new Date(Date.now() - 1000 * 60 * 18), // 18 mins ago
    },
    {
      title: 'চট্টগ্রাম বন্দরে রেকর্ড কনটেইনার হ্যান্ডলিং: অর্থনৈতিক বাণিজ্যে নতুন গতি সঞ্চার',
      titleBn: 'চট্টগ্রাম বন্দরে রেকর্ড কনটেইনার হ্যান্ডলিং: অর্থনৈতিক বাণিজ্যে নতুন গতি সঞ্চার',
      slug: 'chattogram-port-record-container-handling-growth',
      subtitle: 'স্বয়ংক্রিয় টার্মিনাল অপারেশন ও আধুনিক স্ক্যানিং প্রযুক্তিতে সময় সাশ্রয় হয়েছে দ্বিগুণ',
      excerpt: 'চট্টগ্রাম সমুদ্রবন্দরে চলতি অর্থবছরে কনটেইনার ও কার্গো হ্যান্ডলিংয়ে নতুন ঐতিহাসিক রেকর্ড সৃষ্টি হয়েছে। অটোমেশনের সুফল পেতে শুরু করেছে দেশের রপ্তানিমুখী তৈরি পোশাক ও শিল্প খাত।',
      content: `<p>চট্টগ্রাম সমুদ্রবন্দরে চলতি অর্থবছরে কনটেইনার ও কার্গো হ্যান্ডলিংয়ে নতুন ঐতিহাসিক রেকর্ড সৃষ্টি হয়েছে। বন্দর কর্তৃপক্ষের আধুনিক অটোমেশন, নতুন স্ক্যানার স্থাপন এবং দ্রুত ছাড়করণ ব্যবস্থার কারণে জাহাজের গড় অপেক্ষমাণ সময় অর্ধেকে নেমে এসেছে।</p>
      
      <p>বন্দর চেয়ারম্যান জানান, পতেঙ্গা কনটেইনার টার্মিনাল পূর্ণাঙ্গভাবে চালুর ফলে বার্ষিক হ্যান্ডলিং সক্ষমতা প্রায় ১৫ শতাংশ বৃদ্ধি পেয়েছে। এর সরাসরি ইতিবাচক প্রভাব পড়েছে দেশের সামগ্রিক বৈদেশিক বাণিজ্যে।</p>
      
      <p>রপ্তানিকারকরা জানিয়েছেন, লিড টাইম কমে যাওয়ায় আন্তর্জাতিক ক্রেতাদের আস্থা আরও বৃদ্ধি পেয়েছে, যা আগামী প্রান্তিকে রপ্তানি প্রবৃদ্ধি ধরে রাখতে সহায়ক হবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'চট্টগ্রাম বন্দরের আধুনিক টার্মিনালে পণ্য ওঠানামা কার্যক্রম। ছবি: স্ট্যাটবাউন্ড',
      photographerCredit: 'সুমন দাশ / স্ট্যাটবাউন্ড',
      categoryId: catMap['chattogram'].id,
      districtId: distMap['chattogram'].id,
      authorId: author1.id,
      tags: 'চট্টগ্রাম, বন্দর, বাণিজ্য, অর্থনীতি, রপ্তানি',
      status: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      viewsCount: 3120,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 35), // 35 mins ago
    },
    {
      title: 'হাইটেক পার্কে তৈরি হচ্ছে কৃত্রিম বুদ্ধিমত্তা ও সেমিকন্ডাক্টর হাব: বিপুল কর্মসংস্থানের আশা',
      titleBn: 'হাইটেক পার্কে তৈরি হচ্ছে কৃত্রিম বুদ্ধিমত্তা ও সেমিকন্ডাক্টর হাব: বিপুল কর্মসংস্থানের আশা',
      slug: 'hightech-park-ai-semiconductor-hub-employment',
      subtitle: '৫০টি বৈশ্বিক ও দেশীয় প্রযুক্তি প্রতিষ্ঠান যৌথ বিনিয়োগে আসছে',
      excerpt: 'তথ্যপ্রযুক্তি খাতে দেশকে পরবর্তী ধাপে নিয়ে যেতে কালিয়াকৈর হাইটেক পার্কে গড়ে তোলা হচ্ছে অত্যাধুনিক এআই গবেষণা কেন্দ্র ও চিপ ডিজাইনিং ল্যাব।',
      content: `<p>দেশের সফটওয়্যার ও হার্ডওয়্যার উদ্ভাবনকে বৈশ্বিক মানে উন্নীত করতে গাজীপুরের কালিয়াকৈর হাইটেক পার্কে একটি পূর্ণাঙ্গ কৃত্রিম বুদ্ধিমত্তা (AI) ও সেমিকন্ডাক্টর ডিজাইন হাব গড়ে তোলার আনুষ্ঠানিক চুক্তি সম্পন্ন হয়েছে।</p>
      
      <p>প্রকল্পের আওতায় দেশীয় তরুণ প্রকৌশলীদের শীর্ষস্থানীয় বৈশ্বিক প্রতিষ্ঠানের বিশেষজ্ঞদের তত্ত্বাবধানে আন্তর্জাতিক মানের ভিএলএসআই (VLSI) ও মাইক্রোচিপ ডিজাইনে প্রশিক্ষণ দেওয়া হবে।</p>
      
      <p>আইসিটি বিভাগ আশা প্রকাশ করেছে, আগামী ৩ বছরে এই খাতে অন্তত ২০ হাজার উচ্চদক্ষ তরুণ-তরুণীর কর্মসংস্থান সৃষ্টি হবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'প্রযুক্তি গবেষণা ল্যাবরেটরিতে মাইক্রোচিপ ডিজাইনে কর্মরত প্রকৌশলীরা।',
      photographerCredit: 'তানভীর রশীদ',
      categoryId: catMap['technology'].id,
      authorId: author3.id,
      tags: 'প্রযুক্তি, কৃত্রিম বুদ্ধিমত্তা, সেমিকন্ডাক্টর, হাইটেক পার্ক, চাকরি',
      status: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      viewsCount: 2890,
      readTimeMinutes: 4,
      publishedAt: new Date(Date.now() - 1000 * 60 * 55), // 55 mins ago
    },
    {
      title: 'জাতীয় নির্বাচনে আধুনিক স্বচ্ছতা ও সুষ্ঠু পরিবেশ নিশ্চিতে সব দলের সঙ্গে সংলাপের প্রস্তুতি',
      titleBn: 'জাতীয় নির্বাচনে আধুনিক স্বচ্ছতা ও সুষ্ঠু পরিবেশ নিশ্চিতে সব দলের সঙ্গে সংলাপের প্রস্তুতি',
      slug: 'national-election-dialogue-transparency-preparations',
      subtitle: 'নির্বাচন ব্যবস্থা সংস্কার কমিশন চূড়ান্ত সুপারিশমালা পেশ করেছে',
      excerpt: 'আসন্ন জাতীয় নির্বাচনকে নিরপেক্ষ, অবাধ ও সর্বজনীন গ্রহণযোগ্য করতে নির্বাচন ব্যবস্থা সংস্কার কমিশন তাদের বিস্তারিত সুপারিশ চূড়ান্ত করেছে। রাজনৈতিক দলগুলোর সঙ্গে আগামী সপ্তাহেই বৈঠক শুরু হচ্ছে।',
      content: `<p>নির্বাচন কমিশনের পুনর্গঠন ও আধুনিকায়নে গঠিত জাতীয় সংস্কার কমিশন তাদের পূর্ণাঙ্গ প্রতিবেদন প্রস্তুত করেছে। এতে ভোটার তালিকা বায়োমেট্রিক নির্ভুলকরণ, নির্বাচনী ব্যয় পর্যবেক্ষণ এবং ডিজিটাল মনিটরিং সেলের প্রস্তাব অন্তর্ভুক্ত রয়েছে।</p>
      
      <p>কমিশন সূত্র জানায়, আগামী সোমবার থেকে ধারাবাহিকভাবে সকল নিবন্ধিত রাজনৈতিক দল, নাগরিক সমাজ ও গণমাধ্যম প্রতিনিধিদের সঙ্গে উন্মুক্ত মতবিনিময় শুরু হবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'নির্বাচন ব্যবস্থার আধুনিকায়ন নিয়ে গুরুত্বপূর্ণ পর্যালোচনা বৈঠক।',
      photographerCredit: 'স্ট্যাটবাউন্ড ব্যুরো',
      categoryId: catMap['politics'].id,
      authorId: author2.id,
      tags: 'রাজনীতি, জাতীয় নির্বাচন, নির্বাচন কমিশন, সংলাপ',
      status: 'PUBLISHED',
      isFeatured: true,
      viewsCount: 3840,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hrs ago
    },
    {
      title: 'বাংলাদেশ প্রিমিয়ার লিগে তরুণদের চমক: রোমাঞ্চকর ম্যাচে জয় তুলে নিল চট্টগ্রাম ভাইকিংস',
      titleBn: 'বাংলাদেশ প্রিমিয়ার লিগে তরুণদের চমক: রোমাঞ্চকর ম্যাচে জয় তুলে নিল চট্টগ্রাম ভাইকিংস',
      slug: 'bpl-cricket-thrilling-match-chattogram-victory',
      subtitle: 'শেষ ওভারের টানটান উত্তেজনায় ৩ উইকেটের রুদ্ধশ্বাস জয়',
      excerpt: 'জহুর আহমেদ চৌধুরী স্টেডিয়ামে অনুষ্ঠিত বিপিএলের হাই-ভোল্টেজ ম্যাচে শেষ বলের ছক্কায় স্মরণীয় জয় ছিনিয়ে নিয়েছে স্বাগতিক চট্টগ্রাম। ম্যাচসেরা হয়েছেন তরুণ অলরাউন্ডার।',
      content: `<p>চট্টগ্রামের জহুর আহমেদ চৌধুরী স্টেডিয়ামে দর্শকদের হৃদয়স্পন্দন বাড়িয়ে দেওয়া এক ম্যাচে শেষ বলের নাটকীয়তায় জয় পেয়েছে চট্টগ্রাম ভাইকিংস। জয়ের জন্য শেষ ওভারে দরকার ছিল ১৪ রান।</p>
      
      <p>তরুণ ব্যাটারের অপরাজিত ৪৬ রানের দুর্দান্ত ইনিংস দলকে এনে দেয় মূল্যবান ২ পয়েন্ট। স্টেডিয়ামজুড়ে হাজারো দর্শকের উল্লাস মুখর পরিবেশে খেলা শেষ হয়।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'ম্যাচ জয়ের পর খেলোয়াড়দের আনন্দ উদযাপন। ছবি: স্ট্যাটবাউন্ড স্পোর্টস',
      photographerCredit: 'মেহজাবীন চৌধুরী',
      categoryId: catMap['sports'].id,
      authorId: author4.id,
      tags: 'খেলাধুলা, ক্রিকেট, বিপিএল, চট্টগ্রাম, জয়',
      status: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      viewsCount: 5200,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      title: 'মুদ্রাস্ফীতি নিয়ন্ত্রণে কেন্দ্রীয় ব্যাংকের নতুন মুদ্রানীতি: রেপো রেট অপরিবর্তিত',
      titleBn: 'মুদ্রাস্ফীতি নিয়ন্ত্রণে কেন্দ্রীয় ব্যাংকের নতুন মুদ্রানীতি: রেপো রেট অপরিবর্তিত',
      slug: 'central-bank-monetary-policy-inflation-control',
      subtitle: 'উৎপাদনমুখী শিল্পে সহজ শর্তে অর্থায়নের বিশেষ নির্দেশনা',
      excerpt: 'মূল্যস্ফীতি নিয়ন্ত্রণে রাখা এবং বিনিয়োগের ধারাবাহিকতা রক্ষার ভারসাম্য বজায় রাখতে চলতি অর্থবছরের দ্বিতীয়ার্ধের নতুন মুদ্রানীতি ঘোষণা করেছে বাংলাদেশ ব্যাংক।',
      content: `<p>মুদ্রাস্ফীতির চাপ কমাতে এবং নিত্যপ্রয়োজনীয় পণ্যের সরবরাহ চেইন সচল রাখতে সুনির্দিষ্ট পরিকল্পনা প্রণয়ন করেছে কেন্দ্রীয় ব্যাংক। নীতিমালায় ক্ষুদ্র ও মাঝারি কুটির শিল্পে ঋণ সহায়তা বৃদ্ধির ওপর জোর দেওয়া হয়েছে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'বাংলাদেশ ব্যাংকের গভর্নর মুদ্রানীতি ঘোষণা করছেন।',
      photographerCredit: 'স্ট্যাটবাউন্ড ইকোনমিক্স',
      categoryId: catMap['business'].id,
      authorId: author1.id,
      tags: 'ব্যবসা, ব্যাংক, অর্থনীতি, মুদ্রানীতি, বাংলাদেশ',
      status: 'PUBLISHED',
      isFeatured: true,
      viewsCount: 1950,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 180),
    },
    {
      title: 'জলবায়ু পরিবর্তন মোকাবিলায় উপকূলীয় অঞ্চলে ম্যানগ্রোভ প্রাচীর সম্প্রসারণ প্রকল্প',
      titleBn: 'জলবায়ু পরিবর্তন মোকাবিলায় উপকূলীয় অঞ্চলে ম্যানগ্রোভ প্রাচীর সম্প্রসারণ প্রকল্প',
      slug: 'climate-change-coastal-mangrove-protection-project',
      subtitle: 'সুন্দরবন সংলগ্ন ১২টি উপকূলীয় জেলায় সবুজ বেষ্টনী জোরদার',
      excerpt: 'ঘূর্ণিঝড় ও সমুদ্রপৃষ্ঠের উচ্চতা বৃদ্ধির ঝুঁকি কমাতে দেশের দক্ষিণাঞ্চলজুড়ে বিস্তৃত ম্যানগ্রোভ বন সম্প্রসারণের এক মেগা প্রকল্প অনুমোদন দিয়েছে পরিবেশ মন্ত্রণালয়।',
      content: `<p>উপকূলীয় জনগোষ্ঠীর জানমাল রক্ষায় প্রাকৃতিকভাবে দুর্যোগ প্রতিরোধের জন্য উপকূলজুড়ে ১০ হাজার হেক্টর নতুন বনভূমি সৃজনের কাজ শুরু হয়েছে। স্থানীয় কমিউনিটিকে সম্পৃক্ত করে এই প্রকল্প পরিচালিত হবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'উপকূলীয় সবুজ বেষ্টনী এবং ম্যানগ্রোভ বনাঞ্চল।',
      photographerCredit: 'কবীর হোসেন',
      categoryId: catMap['national'].id,
      authorId: author1.id,
      tags: 'জাতীয়, পরিবেশ, জলবায়ু, উপকূল, সুন্দরবন',
      status: 'PUBLISHED',
      isFeatured: true,
      viewsCount: 1650,
      readTimeMinutes: 4,
      publishedAt: new Date(Date.now() - 1000 * 60 * 240),
    },
    {
      title: 'মতামত: কৃত্রিম বুদ্ধিমত্তার যুগে সাংবাদিকতার নীতি ও সত্যের সন্ধান',
      titleBn: 'মতামত: কৃত্রিম বুদ্ধিমত্তার যুগে সাংবাদিকতার নীতি ও সত্যের সন্ধান',
      slug: 'opinion-journalism-ethics-artificial-intelligence-truth',
      subtitle: 'অ্যালগরিদমের ভিড়ে নির্ভরযোগ্য তথ্যের ভবিষ্যৎ কোন পথে?',
      excerpt: 'প্রযুক্তির দ্রুতগতির প্রসারে যখন তথ্যের বন্যা বইছে, তখন সাংবাদিকতার মূল অঙ্গীকার—তথ্য যাচাই ও মানবিক দায়বদ্ধতা—আগের চেয়েও বেশি জরুরি হয়ে উঠেছে।',
      content: `<p class="lead">প্রযুক্তির উৎকর্ষ আমাদের তথ্য পাওয়ার পথকে অবিশ্বাস্য রকম সহজ করেছে, কিন্তু একই সঙ্গে তৈরি করেছে ডিপফেক ও বিভ্রান্তিকর অপতথ্যের এক গোলকধাঁধা। এই সময়ে একজন সাংবাদিকের দায়িত্ব শুধু দ্রুত সংবাদ দেওয়া নয়, বরং তথ্যের সত্যতা ও গভীরতা যাচাই করা।</p>
      
      <p>আমরা স্ট্যাটবাউন্ড নিউজে বিশ্বাস করি, প্রযুক্তির সুবিধাকে আলিঙ্গন করলেও সাংবাদিকতার নীতিগত আদর্শে কোনো আপস করা চলবে না। পাঠকের আস্থা অর্জনই একটি গণমাধ্যমের সবচেয়ে বড় মূলধন।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'ডিজিটাল যুগে বস্তুনিষ্ঠ সাংবাদিকতা।',
      photographerCredit: 'স্ট্যাটবাউন্ড ওপিনিয়ন ডেস্ক',
      categoryId: catMap['opinion'].id,
      authorId: author5.id,
      opinionAuthorId: author5.id,
      tags: 'মতামত, সাংবাদিকতা, এআই, গণমাধ্যম, সত্যনিষ্ঠা',
      status: 'PUBLISHED',
      isOpinion: true,
      isEditorial: true,
      isFeatured: true,
      viewsCount: 2750,
      readTimeMinutes: 5,
      publishedAt: new Date(Date.now() - 1000 * 60 * 300),
    },
    {
      title: 'বিশ্ববাজারে তেলের দাম কমায় বৈশ্বিক অর্থনীতিতে কিছুটা স্বস্তি',
      titleBn: 'বিশ্ববাজারে তেলের দাম কমায় বৈশ্বিক অর্থনীতিতে কিছুটা স্বস্তি',
      slug: 'global-oil-prices-decline-economic-relief',
      subtitle: 'আমেরিকা ও মধ্যপ্রাচ্যে উৎপাদন বৃদ্ধির ইতিবাচক প্রভাব',
      excerpt: 'আন্তর্জাতিক বাজারে অপরিশোধিত জ্বালানি তেলের দাম টানা তৃতীয় সপ্তাহের মতো হ্রাস পেয়েছে। এতে আমদানি নির্ভর উন্নয়নশীল দেশগুলোর ব্যালেন্স অব পেমেন্টে স্বস্তি ফেরার সম্ভাবনা দেখা দিয়েছে।',
      content: `<p>ব্রেন্ট ক্রুড তেলের দাম প্রতি ব্যারেলে ৭৫ ডলারের নিচে নেমে এসেছে। আন্তর্জাতিক শক্তি সংস্থার (IEA) পূর্বাভাস অনুযায়ী, সরবরাহ বৃদ্ধি পাওয়ায় আগামী মাসগুলোতেও দাম স্থিতিশীল থাকতে পারে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'আন্তর্জাতিক জ্বালানি বাজার।',
      photographerCredit: 'রয়টার্স / গেটি',
      categoryId: catMap['international'].id,
      authorId: author2.id,
      tags: 'আন্তর্জাতিক, অর্থনীতি, জ্বালানি তেল, বাজার',
      status: 'PUBLISHED',
      viewsCount: 1420,
      readTimeMinutes: 2,
      publishedAt: new Date(Date.now() - 1000 * 60 * 360),
    },
    {
      title: 'ঢাকা বিশ্ববিদ্যালয়ে আন্তর্জাতিক রোবটিক্স প্রতিযোগিতা শুরু: অংশ নিচ্ছে ২০ দেশ',
      titleBn: 'ঢাকা বিশ্ববিদ্যালয়ে আন্তর্জাতিক রোবটিক্স প্রতিযোগিতা শুরু: অংশ নিচ্ছে ২০ দেশ',
      slug: 'du-international-robotics-competition-starts',
      subtitle: 'উদ্ভাবনী আইডিয়া নিয়ে লড়ছেন তরুণ গবেষক ও শিক্ষার্থীরা',
      excerpt: 'ঢাকা বিশ্ববিদ্যালয়ের কার্জন হলে জমকালো আয়োজনের মধ্য দিয়ে পর্দা উঠল তিন দিনব্যাপী আন্তর্জাতিক রোবটিক্স ও অটোমেশন ফেস্টের। দেশ-বিদেশের শতাধিক প্রজেক্ট প্রদর্শিত হচ্ছে।',
      content: `<p>উদ্বোধনী অনুষ্ঠানে প্রধান অতিথি হিসেবে বক্তব্য রাখেন বিশিষ্ট তথ্যপ্রযুক্তিবিদ ও উপাচার্য। তিনি বলেন, দেশীয় শিক্ষার্থীদের তৈরি উদ্ধারকারী রোবট ও ড্রোন প্রযুক্তি আন্তর্জাতিক পর্যায়ে ভূয়সী প্রশংসা অর্জন করেছে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'রোবটিক্স ফেস্টে উদ্ভাবিত প্রোটোটাইপ প্রদর্শন।',
      photographerCredit: 'ক্যাম্পাস করেসপন্ডেন্ট',
      categoryId: catMap['campus'].id,
      authorId: author3.id,
      tags: 'ক্যাম্পাস, ঢাকা বিশ্ববিদ্যালয়, রোবটিক্স, বিজ্ঞান, তরুণ',
      status: 'PUBLISHED',
      viewsCount: 3100,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 420),
    },
    {
      title: 'আন্তর্জাতিক চলচ্চিত্র উৎসবে দেশের তরুণ পরিচালকের ফিচার ফিল্ম প্রশংসিত',
      titleBn: 'আন্তর্জাতিক চলচ্চিত্র উৎসবে দেশের তরুণ পরিচালকের ফিচার ফিল্ম প্রশংসিত',
      slug: 'international-film-festival-bangladeshi-director-acclaimed',
      subtitle: 'উপকূলীয় জীবনের মানবিক গল্প নিয়ে নির্মিত চলচ্চিত্রটি দর্শকপ্রিয়তা পেয়েছে',
      excerpt: 'টরোন্টো আন্তর্জাতিক চলচ্চিত্র উৎসবে প্রদর্শিত হয়েছে বাংলাদেশের উপকূলীয় জীবনের সংগ্রাম ও স্বপ্ন নিয়ে নির্মিত নতুন পূর্ণদৈর্ঘ্য চলচ্চিত্র ‘নোনাজলের গান’।',
      content: `<p>চলচ্চিত্রটির প্রিমিয়ারে উপস্থিত দর্শক ও চলচ্চিত্র সমালোচকরা দাঁড়িয়ে অভিবাদন জানান। ছবির সিনেমাটোগ্রাফি ও শিল্পীদের অনবদ্য অভিনয় আন্তর্জাতিক গণমাধ্যমে ব্যাপক প্রশংসা কুড়িয়েছে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'চলচ্চিত্র উৎসবের রেড কার্পেটে নির্মাতা দল।',
      photographerCredit: 'এন্টারটেইনমেন্ট ডেস্ক',
      categoryId: catMap['entertainment'].id,
      authorId: author4.id,
      tags: 'বিনোদন, চলচ্চিত্র, উৎসব, সংস্কৃতি, সিনেমা',
      status: 'PUBLISHED',
      viewsCount: 2280,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 480),
    },
    {
      title: 'ঋতু পরিবর্তনের এই সময়ে সুস্থ থাকতে চিকিৎসকদের বিশেষ স্বাস্থ্য পরামর্শ',
      titleBn: 'ঋতু পরিবর্তনের এই সময়ে সুস্থ থাকতে চিকিৎসকদের বিশেষ স্বাস্থ্য পরামর্শ',
      slug: 'seasonal-health-tips-doctors-advice',
      subtitle: 'শিশুদের সর্দি-কাশি ও ভাইরাল জ্বর থেকে রক্ষার উপায়',
      excerpt: 'ঋতু পরিবর্তনের সময় তাপমাত্রার ওঠানামায় দেখা দিচ্ছে নানা মৌসুমি রোগ। পুষ্টিকর খাদ্যাভ্যাস, পর্যাপ্ত পানি ও ব্যক্তিগত স্বাস্থ্যবিধি মেনে চলার তাগিদ দিয়েছেন বিশেষজ্ঞরা।',
      content: `<p>বিশেষজ্ঞ চিকিৎসকরা জানিয়েছেন, মৌসুমি ভাইরাল জ্বর বেশিরভাগ ক্ষেত্রেই সাধারণ বিশ্রাম ও প্রচুর তরল পানে সেরে যায়। তবে টানা তিন দিনের বেশি জ্বর বা শ্বাসকষ্ট থাকলে অবিলম্বে চিকিৎসকের পরামর্শ নিতে হবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'সুস্থ জীবনযাপনের জন্য নিয়মিত স্বাস্থ্য সচেতনতা।',
      photographerCredit: 'হেলথ ডেস্ক',
      categoryId: catMap['health'].id,
      authorId: author4.id,
      tags: 'স্বাস্থ্য, পরামর্শ, জীবনযাপন, সুস্থতা',
      status: 'PUBLISHED',
      viewsCount: 1870,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 540),
    },
    {
      title: 'কক্সবাজার সমুদ্র সৈকতে পর্যটকদের উপচে পড়া ভিড়: নিরাপত্তার জন্য স্পেশাল ড্রোন নজরদারি',
      titleBn: 'কক্সবাজার সমুদ্র সৈকতে পর্যটকদের উপচে পড়া ভিড়: নিরাপত্তার জন্য স্পেশাল ড্রোন নজরদারি',
      slug: 'coxs-bazar-beach-tourist-rush-drone-surveillance',
      subtitle: 'ট্যুরিস্ট পুলিশের বাড়তি সতর্কতায় স্বস্তিতে ভ্রমণপিপাসুরা',
      excerpt: 'টানা ছুটিকে কেন্দ্র করে বিশ্বের দীর্ঘতম সমুদ্র সৈকত কক্সবাজারে নেমেছে মানুষের ঢল। পর্যটকদের সার্বিক নিরাপত্তা ও শৃঙ্খলা বজায় রাখতে আধুনিক প্রযুক্তির সহায়তায় সার্বক্ষণিক টহল চলছে।',
      content: `<p>সৈকতের লাবণী, সুগন্ধা ও কলাতলী পয়েন্টে বিপুল সংখ্যক ভ্রমণপ্রেমীর পদচারণায় মুখর হয়ে উঠেছে পরিবেশ। হোটেল-মোটেলগুলোতে প্রায় শতভাগ বুকিং সম্পন্ন হয়েছে বলে জানিয়েছেন পর্যটন ব্যবসায়ীরা।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'কক্সবাজার সমুদ্র সৈকতে সূর্যাস্তের মনোরম দৃশ্য।',
      photographerCredit: 'আহমেদ নিয়াজ / স্ট্যাটবাউন্ড',
      categoryId: catMap['chattogram'].id,
      districtId: distMap['coxs-bazar'].id,
      authorId: author4.id,
      tags: 'কক্সবাজার, পর্যটন, ভ্রমণ, চট্টগ্রাম, সৈকত',
      status: 'PUBLISHED',
      viewsCount: 3400,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 600),
    },
    {
      title: 'মহাকাশ গবেষণায় নতুন মাইলফলক: জেমস ওয়েব টেলিস্কোপে মিলল প্রাচীনতম ছায়াপথের ছবি',
      titleBn: 'মহাকাশ গবেষণায় নতুন মাইলফলক: জেমস ওয়েব টেলিস্কোপে মিলল প্রাচীনতম ছায়াপথের ছবি',
      slug: 'james-webb-telescope-discovers-oldest-galaxy',
      subtitle: 'মহাবিশ্ব সৃষ্টির মাত্র ৩০ কোটি বছর পরের দৃশ্য ধারণ',
      excerpt: 'নাসার জেমস ওয়েব স্পেস টেলিস্কোপ মহাবিশ্বের সূচনালগ্নের সবচেয়ে স্পষ্ট ও প্রাচীনতম ছায়াপথগুলোর একটির সন্ধান পেয়েছে, যা জ্যোতির্বিজ্ঞানের দীর্ঘদিনের অনেক রহস্য উন্মোচন করতে পারে।',
      content: `<p>জ্যোতির্বিজ্ঞানীদের এক আন্তর্জাতিক দল জানিয়েছে, নতুন আবিষ্কৃত এই গ্যালাক্সি থেকে আলো পৃথিবীতে পৌঁছাতে সময় লেগেছে ১৩ বিলিয়নেরও বেশি বছর। এর ফলে গ্যালাক্সি গঠনের প্রাথমিক প্রক্রিয়া সম্পর্কে নতুন তথ্য মিলবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'মহাকাশের গভীর থেকে ধারণকৃত ছায়াপথের দৃশ্য।',
      photographerCredit: 'নাসা / ইএসএ',
      categoryId: catMap['science'].id,
      authorId: author3.id,
      tags: 'বিজ্ঞান, মহাকাশ, নাসা, গ্যালাক্সি, গবেষণা',
      status: 'PUBLISHED',
      viewsCount: 2650,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 660),
    },
    {
      title: 'সিলেটের চা বাগানগুলোতে সবুজের সমারোহ: উৎপাদন বৃদ্ধির আশাবাদ চা চাষীদের',
      titleBn: 'সিলেটের চা বাগানগুলোতে সবুজের সমারোহ: উৎপাদন বৃদ্ধির আশাবাদ চা চাষীদের',
      slug: 'sylhet-tea-gardens-production-growth-expectations',
      subtitle: 'অনুকূল আবহাওয়া ও নিয়মিত বৃষ্টিপাতে নতুন কুঁড়ির জোয়ার',
      excerpt: 'সিলেট ও মৌলভীবাজারের পাহাড়ঘেরা চা বাগানগুলোতে এখন ভরা মৌসুমের আমেজ। সময়মতো বৃষ্টিপাত হওয়ায় এবার লক্ষ্যমাত্রার চেয়ে বেশি চা উৎপাদনের স্বপ্ন দেখছেন বাগান মালিক ও শ্রমিকরা।',
      content: `<p>বাগানগুলোতে ভোর থেকেই শুরু হয় চা পাতা তোলার ব্যস্ততা। চা বোর্ডের কর্মকর্তারা জানিয়েছেন, আধুনিক প্রক্রিয়াজাতকরণ পদ্ধতির কারণে এবার চায়ের মান আন্তর্জাতিক মানে উন্নত হবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1546853020-ca4909aef454?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'শ্রীমঙ্গলের মনোরম চা বাগানে পাতা তুলছেন শ্রমিকরা।',
      photographerCredit: 'ফারহান চৌধুরী',
      categoryId: catMap['district'].id,
      districtId: distMap['sylhet'].id,
      authorId: author1.id,
      tags: 'জেলা, সিলেট, চা বাগান, কৃষি, উৎপাদন',
      status: 'PUBLISHED',
      viewsCount: 1780,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 720),
    },
    {
      title: 'স্মার্ট কৃষি প্রযুক্তিতে বিপ্লব: ড্রোন ও সেন্সর ব্যবহারে বাড়ছে ফসলের উৎপাদন',
      titleBn: 'স্মার্ট কৃষি প্রযুক্তিতে বিপ্লব: ড্রোন ও সেন্সর ব্যবহারে বাড়ছে ফসলের উৎপাদন',
      slug: 'smart-agriculture-drones-sensors-crop-yield',
      subtitle: 'পানি ও সারের অপচয় রোধে তরুণ কৃষি উদ্যোক্তাদের সাফল্য',
      excerpt: 'মাটির আর্দ্রতা পরীক্ষা থেকে শুরু করে সঠিক মাত্রায় সার প্রয়োগ—সবকিছুতেই এখন ড্রোনের নজরদারি। উত্তরের জেলাগুলোতে প্রযুক্তিনির্ভর কৃষিতে ঝুঁকছেন শিক্ষিত তরুণরা।',
      content: `<p>রাজশাহী ও রংপুরের কৃষি খামারিরা স্মার্ট সেন্সর ব্যবহার করে ৩০ শতাংশ পর্যন্ত সেচের পানির অপচয় কমাতে পেরেছেন। একই সাথে ড্রোন দিয়ে সুনির্দিষ্ট স্থানে বালাইনাশক প্রয়োগ করায় ফসলের উৎপাদন খরচ নাটকীয়ভাবে কমেছে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'ফসলের মাঠে ড্রোন দিয়ে পর্যবেক্ষণ কার্যক্রম।',
      photographerCredit: 'স্মার্ট এগ্রি ব্যুরো',
      categoryId: catMap['technology'].id,
      districtId: distMap['rajshahi'].id,
      authorId: author3.id,
      tags: 'প্রযুক্তি, কৃষি, ড্রোন, স্মার্ট বাংলাদেশ, উদ্ভাবন',
      status: 'PUBLISHED',
      viewsCount: 2190,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 780),
    },
    {
      title: 'কর্মসংস্থানে নতুন দ্বার: তথ্যপ্রযুক্তি ফ্রিল্যান্সিংয়ে শীর্ষ ৫ সম্ভাবনাময় দক্ষতা',
      titleBn: 'কর্মসংস্থানে নতুন দ্বার: তথ্যপ্রযুক্তি ফ্রিল্যান্সিংয়ে শীর্ষ ৫ সম্ভাবনাময় দক্ষতা',
      slug: 'top-five-freelancing-skills-career-opportunities',
      subtitle: 'এআই প্রম্পট ইঞ্জিনিয়ারিং, ইউআই/ইউএক্স ও সাইবার সিকিউরিটিতে বৈশ্বিক চাহিদা বাড়ছে',
      excerpt: 'বিশ্ববাজারে রিমোট কাজের চাহিদা দ্রুত পরিবর্তন হচ্ছে। প্রথাগত কাজের বাইরে ডেটা অ্যানালিটিক্স ও ক্লাউড কম্পিউটিংয়ে দক্ষ তরুণদের জন্য তৈরি হচ্ছে নতুন চাকরির সুযোগ।',
      content: `<p>আন্তর্জাতিক ফ্রিল্যান্সিং প্ল্যাটফর্মগুলোর সাম্প্রতিক প্রতিবেদন বলছে, কৃত্রিম বুদ্ধিমত্তা সংশ্লিষ্ট টুলস ব্যবহার এবং আধুনিক ওয়েব ডেভেলপমেন্টে দক্ষ জনবলের পারিশ্রমিক অন্যান্য খাতের তুলনায় দ্বিগুণ।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'ডিজিটাল ওয়ার্কস্টেশনে কাজ করছেন তরুণ ফ্রিল্যান্সাররা।',
      photographerCredit: 'ক্যারিয়ার ডেস্ক',
      categoryId: catMap['jobs'].id,
      authorId: author3.id,
      tags: 'চাকরি, ফ্রিল্যান্সিং, ক্যারিয়ার, তথ্যপ্রযুক্তি, দক্ষতা',
      status: 'PUBLISHED',
      viewsCount: 3950,
      readTimeMinutes: 4,
      publishedAt: new Date(Date.now() - 1000 * 60 * 840),
    },
    {
      title: 'কুমিল্লায় প্রাচীন প্রত্নতাত্ত্বিক নিদর্শনে পর্যটকদের আকর্ষণ বৃদ্ধি',
      titleBn: 'কুমিল্লায় প্রাচীন প্রত্নতাত্ত্বিক নিদর্শনে পর্যটকদের আকর্ষণ বৃদ্ধি',
      slug: 'cumilla-archaeological-heritage-tourist-attraction',
      subtitle: 'শালবন বৌদ্ধ বিহার ও ময়নামতি জাদুঘরের নতুন সংস্কার কার্যক্রম সম্পন্ন',
      excerpt: 'ঐতিহাসিক শালবন বিহার ও সংলগ্ন প্রত্নস্থলগুলোতে দর্শনার্থীদের সুবিধার জন্য আধুনিক অডিও-ভিজ্যুয়াল গাইড ও সুরক্ষাবেষ্টনী স্থাপন করা হয়েছে।',
      content: `<p>প্রত্নতত্ত্ব অধিদপ্তর জানিয়েছে, ইতিহাস সচেতন দেশি-বিদেশি পর্যটকদের জন্য তথ্যকেন্দ্র চালু করায় কুমিল্লা অঞ্চলের পর্যটন অর্থনীতিতে প্রাণচাঞ্চল্য এসেছে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'ঐতিহাসিক প্রত্নতাত্ত্বিক স্থাপত্য।',
      photographerCredit: 'হেরিটেজ ডেস্ক',
      categoryId: catMap['district'].id,
      districtId: distMap['cumilla'].id,
      authorId: author2.id,
      tags: 'জেলা, কুমিল্লা, ঐতিহ্য, প্রত্নতত্ত্ব, পর্যটন',
      status: 'PUBLISHED',
      viewsCount: 1540,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 900),
    },
    {
      title: 'দৈনন্দিন জীবনে মানসিক চাপমুক্ত থাকার ৫টি সহজ অভ্যাস',
      titleBn: 'দৈনন্দিন জীবনে মানসিক চাপমুক্ত থাকার ৫টি সহজ অভ্যাস',
      slug: 'five-habits-stress-free-daily-life',
      subtitle: 'মাইন্ডফুলনেস মেডিটেশন ও ডিজিটাল ডিটক্সের বৈজ্ঞানিক কার্যকারিতা',
      excerpt: 'ব্যস্ত শহুরে জীবনে কর্মক্ষেত্রের চাপ ও সার্বক্ষণিক স্ক্রিন টাইমের ক্লান্তি দূর করতে মনোবিজ্ঞানীরা দিয়েছেন কিছু বাস্তবসম্মত ও সহজ পরামর্শ।',
      content: `<p>প্রতিদিন অন্তত ৩০ মিনিট প্রকৃতির সান্নিধ্যে হাঁটা, পর্যাপ্ত ঘুম এবং ঘুমানোর এক ঘণ্টা আগে সব ধরনের ডিজিটাল পর্দা থেকে দূরে থাকা মানসিক প্রশান্তির জন্য অপরিহার্য।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'মানসিক প্রশান্তির জন্য নিয়মিত মেডিটেশন ও ধ্যান।',
      photographerCredit: 'লাইফস্টাইল ডেস্ক',
      categoryId: catMap['lifestyle'].id,
      authorId: author4.id,
      tags: 'জীবনযাপন, মানসিক স্বাস্থ্য, সুস্থতা, মেডিটেশন',
      status: 'PUBLISHED',
      viewsCount: 2310,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 960),
    },
    {
      title: 'খুলনায় সুন্দরবনের মধু সংগ্রহে মৌয়ালদের দল গঠন: শুরু হচ্ছে ঐতিহ্যবাহী মধু আহরণ',
      titleBn: 'খুলনায় সুন্দরবনের মধু সংগ্রহে মৌয়ালদের দল গঠন: শুরু হচ্ছে ঐতিহ্যবাহী মধু আহরণ',
      slug: 'khulna-sundarbans-honey-collection-season',
      subtitle: 'বন বিভাগের কঠোর নিরাপত্তা ও জলদস্যু বিরোধী নজরদারির আশ্বাস',
      excerpt: 'প্রতিবছরের মতো সুন্দরবনের গভীরে প্রাকৃতিক মধু আহরণের প্রস্তুতি নিচ্ছেন উপকূলের শত শত মৌয়াল পরিবার। সরকারিভাবে পাশ প্রদানের আনুষ্ঠানিকতা সম্পন্ন হয়েছে।',
      content: `<p>মৌয়ালরা জানিয়েছেন, বনের গভীরে বাঘের আক্রমণ থেকে সুরক্ষা নিশ্চিত করতে বনরক্ষী দলগুলো সার্বক্ষণিক পর্যবেক্ষণ বজায় রাখবে।</p>`,
      featuredImage: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=80',
      imageCaption: 'সুন্দরবনে মৌমাছির প্রাকৃতিক মৌচাক থেকে মধু সংগ্রহ।',
      photographerCredit: 'খুলনা ব্যুরো',
      categoryId: catMap['district'].id,
      districtId: distMap['khulna'].id,
      authorId: author1.id,
      tags: 'জেলা, খুলনা, সুন্দরবন, মধু, ঐতিহ্য',
      status: 'PUBLISHED',
      viewsCount: 1890,
      readTimeMinutes: 3,
      publishedAt: new Date(Date.now() - 1000 * 60 * 1020),
    }
  ];

  for (const a of articles) {
    const created = await prisma.article.create({
      data: {
        ...a,
        readTimeMinutes: a.readTimeMinutes || 3,
        seoTitle: `${a.title} | StatBound News`,
        seoDescription: a.excerpt,
        focusKeyword: a.tags?.split(',')[0] || 'সংবাদ',
        versions: {
          create: {
            version: 1,
            title: a.title,
            content: a.content,
            editorName: 'নাজনীন সুলতানা',
          },
        },
      },
    });

    // Add some sample comments
    if (a.isHero || a.isFeatured) {
      await prisma.comment.create({
        data: {
          articleId: created.id,
          name: 'জাহিদুল ইসলাম',
          email: 'jahid@example.com',
          content: 'চমৎকার ও তথ্যবহুল প্রতিবেদন। স্ট্যাটবাউন্ড নিউজের বস্তুনিষ্ঠ উপস্থাপন প্রশংসার দাবিদার।',
          status: 'APPROVED',
        },
      });
      await prisma.comment.create({
        data: {
          articleId: created.id,
          name: 'ফারহানা ইয়াসমীন',
          email: 'farhana@example.com',
          content: 'এই বিষয়ে আরও ফলো-আপ নিউজ আশা করছি। ধন্যবাদ সংবাদ দলকে।',
          status: 'APPROVED',
        },
      });
    }
  }

  // 6. Seed Breaking News Ticker Items
  const breakingItems = [
    {
      headline: 'একনেক সভায় প্রায় ১২ হাজার কোটি টাকার ১০টি নতুন উন্নয়ন প্রকল্পের চূড়ান্ত অনুমোদন',
      headlineBn: 'একনেক সভায় প্রায় ১২ হাজার কোটি টাকার ১০টি নতুন উন্নয়ন প্রকল্পের চূড়ান্ত অনুমোদন',
      url: '/news/national-economic-roadmap-mega-projects-approved-ecnec',
      isActive: true,
      priority: 1,
    },
    {
      headline: 'চট্টগ্রাম বন্দরে রেকর্ড কনটেইনার হ্যান্ডলিং, জাহাজের অপেক্ষমাণ সময় কমল অর্ধেকে',
      headlineBn: 'চট্টগ্রাম বন্দরে রেকর্ড কনটেইনার হ্যান্ডলিং, জাহাজের অপেক্ষমাণ সময় কমল অর্ধেকে',
      url: '/news/chattogram-port-record-container-handling-growth',
      isActive: true,
      priority: 2,
    },
    {
      headline: 'কালিয়াকৈর হাইটেক পার্কে এআই ও সেমিকন্ডাক্টর হাব স্থাপনে চুক্তি সম্পন্ন',
      headlineBn: 'কালিয়াকৈর হাইটেক পার্কে এআই ও সেমিকন্ডাক্টর হাব স্থাপনে চুক্তি সম্পন্ন',
      url: '/news/hightech-park-ai-semiconductor-hub-employment',
      isActive: true,
      priority: 3,
    },
    {
      headline: 'বিপিএলে শেষ বলের রোমাঞ্চকর লড়াইয়ে চট্টগ্রাম ভাইকিংসের নাটকীয় জয়',
      headlineBn: 'বিপিএলে শেষ বলের রোমাঞ্চকর লড়াইয়ে চট্টগ্রাম ভাইকিংসের নাটকীয় জয়',
      url: '/news/bpl-cricket-thrilling-match-chattogram-victory',
      isActive: true,
      priority: 4,
    },
  ];

  for (const b of breakingItems) {
    await prisma.breakingNews.create({ data: b });
  }

  // 7. Seed Advertisements across all placements
  const adsData = [
    {
      name: 'Bangla Telecom 5G Campaign',
      advertiser: 'Bangla Telecom Ltd',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80',
      targetUrl: 'https://statbound.com/advertise',
      placement: 'TOP_BANNER',
      deviceTargeting: 'ALL',
      impressionsCount: 1420,
      clicksCount: 88,
      isActive: true,
      priority: 1,
    },
    {
      name: 'Premier Bank Digital Banking',
      advertiser: 'Premier Bank Ltd',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80',
      targetUrl: 'https://statbound.com/advertise',
      placement: 'HEADER',
      deviceTargeting: 'DESKTOP',
      impressionsCount: 2310,
      clicksCount: 145,
      isActive: true,
      priority: 1,
    },
    {
      name: 'TechCloud Bangladesh Enterprise Solutions',
      advertiser: 'TechCloud BD',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
      targetUrl: 'https://statbound.com/advertise',
      placement: 'HOMEPAGE_HERO',
      deviceTargeting: 'ALL',
      impressionsCount: 5120,
      clicksCount: 310,
      isActive: true,
      priority: 1,
    },
    {
      name: 'Bengal Pure Agro Green Tea',
      advertiser: 'Bengal Agro Ltd',
      imageUrl: 'https://images.unsplash.com/photo-1546853020-ca4909aef454?w=600&auto=format&fit=crop&q=80',
      targetUrl: 'https://statbound.com/advertise',
      placement: 'SIDEBAR',
      deviceTargeting: 'ALL',
      impressionsCount: 3890,
      clicksCount: 215,
      isActive: true,
      priority: 1,
    },
    {
      name: 'Summit University Admission Spring 2026',
      advertiser: 'Summit University',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      targetUrl: 'https://statbound.com/advertise',
      placement: 'ARTICLE_MIDDLE',
      deviceTargeting: 'ALL',
      impressionsCount: 4200,
      clicksCount: 290,
      isActive: true,
      priority: 1,
    },
    {
      name: 'SafeHome Security Solutions',
      advertiser: 'SafeHome BD',
      imageUrl: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=1200&auto=format&fit=crop&q=80',
      targetUrl: 'https://statbound.com/advertise',
      placement: 'FOOTER',
      deviceTargeting: 'ALL',
      impressionsCount: 1980,
      clicksCount: 75,
      isActive: true,
      priority: 1,
    },
  ];

  for (const ad of adsData) {
    await prisma.advertisement.create({ data: ad });
  }

  // 8. Seed Photo Galleries
  const gallery1 = await prisma.photoGallery.create({
    data: {
      title: 'বসন্তে কৃষ্ণচূড়ার রঙে রঙিন রাজধানী ঢাকা: নজরকাড়া ছবির গল্প',
      titleBn: 'বসন্তে কৃষ্ণচূড়ার রঙে রঙিন রাজধানী ঢাকা: নজরকাড়া ছবির গল্প',
      slug: 'spring-krishnachura-red-bloom-dhaka-photo-story',
      description: 'রাজধানীর চন্দ্রিমা উদ্যান, ধানমন্ডি লেক ও ঢাকা বিশ্ববিদ্যালয় ক্যাম্পাসজুড়ে ফুটেছে লাল টুকটুকে কৃষ্ণচূড়া ফুল। মনোরম দৃশ্যে মুগ্ধ নগরবাসী।',
      coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&auto=format&fit=crop&q=80',
      photographerCredit: 'আহসান হাবীব / স্ট্যাটবাউন্ড',
      images: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&auto=format&fit=crop&q=80',
            caption: 'ঢাকা বিশ্ববিদ্যালয়ের কার্জন হল প্রাঙ্গণে রক্তিম কৃষ্ণচূড়া।',
            photographerCredit: 'আহসান হাবীব',
            order: 1,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1200&auto=format&fit=crop&q=80',
            caption: 'ধানমন্ডি লেকের ধারে বিকালের রোদে ফুলের শোভা।',
            photographerCredit: 'আহসান হাবীব',
            order: 2,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80',
            caption: 'গাছের ডালে কোকিলের গান ও বসন্তের মিষ্টি বাতাস।',
            photographerCredit: 'আহসান হাবীব',
            order: 3,
          },
        ],
      },
    },
  });

  const gallery2 = await prisma.photoGallery.create({
    data: {
      title: 'মেঘের রাজ্য সাজেক ভ্যালি: পাহাড় ও কুয়াশার মায়াবী মিতালী',
      titleBn: 'মেঘের রাজ্য সাজেক ভ্যালি: পাহাড় ও কুয়াশার মায়াবী মিতালী',
      slug: 'sajek-valley-hills-clouds-scenic-gallery',
      description: 'রাঙামাটির বাঘাইছড়ি উপজেলার সাজেক ভ্যালিতে মেঘের চাদরে ঢাকা পাহাড়ের অপার সৌন্দর্য ভ্রমণপিপাসুদের হাতছানি দিয়ে ডাকে।',
      coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
      photographerCredit: 'ফারহান চৌধুরী / স্ট্যাটবাউন্ড',
      images: {
        create: [
          {
            imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80',
            caption: 'ভোরে কংলাক পাহাড় থেকে দৃশ্যমান মেঘের সমুদ্র।',
            photographerCredit: 'ফারহান চৌধুরী',
            order: 1,
          },
          {
            imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?w=1200&auto=format&fit=crop&q=80',
            caption: 'পাহাড়ে সূর্যাস্তের অসাধারণ রক্তিম আভা।',
            photographerCredit: 'ফারহান চৌধুরী',
            order: 2,
          },
        ],
      },
    },
  });

  // 9. Seed Video Stories
  await prisma.videoStory.create({
    data: {
      title: 'চট্টগ্রাম বন্দরের অটোমেশন বিপ্লব: যেভাবে কমছে জাহাজের গড় টার্নঅ্যারাউন্ড সময়',
      titleBn: 'চট্টগ্রাম বন্দরের অটোমেশন বিপ্লব: যেভাবে কমছে জাহাজের গড় টার্নঅ্যারাউন্ড সময়',
      slug: 'chattogram-port-automation-documentary-video',
      description: 'চট্টগ্রাম বন্দরের নতুন প্রযুক্তিনির্ভর স্ক্যানিং এবং কনটেইনার মুভমেন্টের ওপর বিশেষ ভিডিও প্রতিবেদন।',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80',
      duration: '০৪:২৫',
      categoryId: catMap['chattogram'].id,
      isFeatured: true,
      viewsCount: 6840,
    },
  });

  await prisma.videoStory.create({
    data: {
      title: 'কালিয়াকৈর হাইটেক পার্ক: তরুণ প্রকৌশলীদের তৈরি সেমিকন্ডাক্টর মাইক্রোচিপ ল্যাব',
      titleBn: 'কালিয়াকৈর হাইটেক পার্ক: তরুণ প্রকৌশলীদের তৈরি সেমিকন্ডাক্টর মাইক্রোচিপ ল্যাব',
      slug: 'hightech-park-semiconductor-lab-special-report',
      description: 'দেশের প্রথম ভিএলএসআই চিপ ডিজাইন ল্যাবরেটরির ভেতর থেকে বিশেষ গ্রাউন্ড রিপোর্ট।',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80',
      duration: '০৫:১০',
      categoryId: catMap['technology'].id,
      isFeatured: true,
      viewsCount: 5120,
    },
  });

  // 10. Seed Site Settings
  const defaultSettings = [
    { key: 'SITE_NAME', value: 'STATBOUND NEWS', group: 'BRANDING' },
    { key: 'SITE_TAGLINE_BN', value: 'প্রতিদিনের খবর, নির্ভরযোগ্য তথ্য', group: 'BRANDING' },
    { key: 'SITE_TAGLINE_EN', value: 'Daily News, Trusted Information', group: 'BRANDING' },
    { key: 'OFFICE_ADDRESS', value: 'বাণিজ্যিক ভবন (লেভেল ৭), আগ্রাবাদ, চট্টগ্রাম / কাওরান বাজার, ঢাকা, বাংলাদেশ', group: 'CONTACT' },
    { key: 'PHONE_NUMBER', value: '+৮৮০ ১৭০০-০০০০০০', group: 'CONTACT' },
    { key: 'NEWSROOM_EMAIL', value: 'news@statbound.com', group: 'CONTACT' },
    { key: 'EDITOR_EMAIL', value: 'editor@statbound.com', group: 'CONTACT' },
    { key: 'BREAKING_TICKER_ACTIVE', value: 'true', group: 'GENERAL' },
  ];

  for (const s of defaultSettings) {
    await prisma.siteSetting.create({ data: s });
  }

  console.log('✅ StatBound News database seeded successfully with 20+ articles, breaking news, ads, galleries, and authors!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
