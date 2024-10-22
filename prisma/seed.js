// const { PrismaClient } = require('@prisma/client');

// const prisma = new PrismaClient();

// const main = async () => {
//     try {
//         await prisma.job.createMany({
//             data: [
//                 {
//                     title: 'Software Engineer',
//                     description: 'We are looking for a skilled Software Engineer to join our dynamic team.',
//                     criteria: 'Bachelor\'s degree in Computer Science or related field.',
//                     skills: 'Proficiency in JavaScript, React, Node.js, and SQL.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid-Senior',
//                     jobResponsibilities: 'Develop high-quality software design and architecture, identify, prioritize, and execute tasks in the software development life cycle, and automate tasks through appropriate tools and scripting.',
//                     country: 'USA',
//                     salary: 17,
//                     company: 'Tech Innovators Inc.',
//                     category: 'Software & Data',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Hybrid'
//                 },
//                 {
//                     title: 'Product Manager',
//                     description: 'Join our product management team to lead the product development lifecycle from ideation to launch.',
//                     criteria: 'Bachelor\'s degree in Business or related field.',
//                     skills: 'Strong leadership, communication, and project management skills.',
//                     yearsOfExperience: '5+ years',
//                     level: 'Senior',
//                     jobResponsibilities: 'Work closely with engineering, marketing, and sales teams to deliver innovative products, define product vision, roadmap, and growth opportunities, and gather and prioritize product and customer requirements.',
//                     country: 'USA',
//                     salary: 14,
//                     company: 'Creative Solutions LLC',
//                     category: 'Software & Data',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Scientist',
//                     description: 'We are seeking a Data Scientist to analyze large amounts of raw information to find patterns that will help improve our company.',
//                     criteria: 'Master\'s degree in Data Science or related field.',
//                     skills: 'Experience with Python, R, and machine learning algorithms.',
//                     yearsOfExperience: '4+ years',
//                     level: 'Mid-Senior',
//                     jobResponsibilities: 'Build predictive models and machine-learning algorithms, combine models through ensemble modeling, and present information using data visualization techniques.',
//                     country: 'USA',
//                     salary: 18,
//                     company: 'Data Insights Inc.',
//                     category: 'Software & Data',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Evaluator',
//                     description: 'We are looking for a Data Evaluator to assess and improve the quality of our datasets.',
//                     criteria: 'Bachelor\'s degree in Data Science, Statistics, or related field.',
//                     skills: 'Strong analytical skills and attention to detail.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Evaluate data sets, identify inconsistencies, and provide recommendations for improvements.',
//                     country: 'USA',
//                     salary: 12,
//                     company: 'Data Analytics Corp.',
//                     category: 'Software & Data',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'AI Translation Specialist',
//                     description: 'We are looking for an AI Translation Specialist to improve and maintain our translation services.',
//                     criteria: 'Bachelor\'s degree in Linguistics or related field.',
//                     skills: 'Fluency in multiple languages and experience with AI translation models.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Develop translation models, evaluate the quality of translations, and provide linguistic expertise to our AI team.',
//                     country: 'Canada',
//                     salary: 7,
//                     company: 'Global Translations Ltd.',
//                     category: 'Translation',
//                     jobType: 'Part-time',
//                     industry: 'Linguistics',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Bilingual Translator',
//                     description: 'Seeking a Bilingual Translator to provide accurate and timely translations of various documents and media.',
//                     criteria: 'Bachelor\'s degree in Translation or related field.',
//                     skills: 'Fluency in at least two languages and strong writing skills.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Translate content, ensure cultural relevance, and collaborate with other translators and editors.',
//                     country: 'Canada',
//                     salary: 7,
//                     company: 'Linguistic Solutions',
//                     category: 'Translation',
//                     jobType: 'Part-time',
//                     industry: 'Linguistics',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Transcriptionist',
//                     description: 'We need a detail-oriented Transcriptionist to transcribe audio and video recordings accurately.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Excellent listening and typing skills.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Listen to recordings, type out the content, and ensure the transcriptions are free of errors.',
//                     country: 'UK',
//                     salary: 8,
//                     company: 'Accurate Transcripts Inc.',
//                     category: 'Transcription',
//                     jobType: 'Part-time',
//                     industry: 'Linguistics',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Medical Transcriptionist',
//                     description: 'Looking for a Medical Transcriptionist to transcribe medical reports from audio recordings.',
//                     criteria: 'Certification in Medical Transcription.',
//                     skills: 'Knowledge of medical terminology and confidentiality protocols.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Transcribe medical terminology accurately, ensure confidentiality, and collaborate with healthcare professionals.',
//                     country: 'UK',
//                     salary: 8,
//                     company: 'Healthcare Transcription Services',
//                     category: 'Transcription',
//                     jobType: 'Part-time',
//                     industry: 'Healthcare',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Search Engine Evaluator',
//                     description: 'Join our team as a Search Engine Evaluator to assess and improve search engine results.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Strong analytical skills and attention to detail.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Analyze search results, provide feedback, and ensure the accuracy and relevance of search engine results.',
//                     country: 'USA',
//                     salary: 10,
//                     company: 'Search Quality Inc.',
//                     category: 'Search Engine Evaluation',
//                     jobType: 'Part-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'SEO Specialist',
//                     description: 'We are seeking an SEO Specialist to optimize our website and improve search engine rankings.',
//                     criteria: 'Bachelor\'s degree in Marketing or related field.',
//                     skills: 'Experience with SEO tools and techniques.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Conduct keyword research, optimize website content, and monitor performance using SEO tools.',
//                     country: 'USA',
//                     salary: 15,
//                     company: 'Web Marketing LLC',
//                     category: 'Search Engine Evaluation',
//                     jobType: 'Full-time',
//                     industry: 'Marketing',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'AI Annotator',
//                     description: 'We are seeking an AI Annotator to label and annotate data for machine learning projects.',
//                     criteria: 'Bachelor\'s degree in a relevant field.',
//                     skills: 'Attention to detail and experience with data annotation tools.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry-Mid',
//                     jobResponsibilities: 'Annotate images, videos, and text data, ensure high-quality annotations, and collaborate with the AI team to improve annotation processes.',
//                     country: 'Canada',
//                     salary: 11,
//                     company: 'AI Solutions Corp.',
//                     category: 'AI Annotation',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Labeler',
//                     description: 'Looking for a Data Labeler to provide accurate labels for training machine learning models.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Basic computer skills and attention to detail.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Label data, maintain labeling standards, and work closely with the data science team.',
//                     country: 'Canada',
//                     salary: 10,
//                     company: 'Data Annotation Services',
//                     category: 'AI Annotation',
//                     jobType: 'Part-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Collector',
//                     description: 'We are looking for a Data Collector to gather data from various sources for analysis.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Basic research skills and attention to detail.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Collect data from various sources, ensure data accuracy, and organize data for analysis.',
//                     country: 'USA',
//                     salary: 9,
//                     company: 'Data Gathering Inc.',
//                     category: 'Data Collection',
//                     jobType: 'Part-time',
//                     industry: 'Research',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Field Data Collector',
//                     description: 'We need a Field Data Collector to gather data from different locations for our projects.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Strong attention to detail and ability to work independently.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Travel to various locations, collect data, ensure data accuracy, and report findings.',
//                     country: 'Canada',
//                     salary: 10,
//                     company: 'Field Data Solutions',
//                     category: 'Data Collection',
//                     jobType: 'Part-time',
//                     industry: 'Research',
//                     workmode: 'Onsite'
//                 },
//                 {
//                     title: 'Customer Support Representative',
//                     description: 'We are looking for a Customer Support Representative to provide excellent customer service.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Excellent communication and problem-solving skills.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Assist customers with inquiries, resolve issues, and provide product information.',
//                     country: 'UK',
//                     salary: 12,
//                     company: 'Customer Support Inc.',
//                     category: 'Customer Support',
//                     jobType: 'Full-time',
//                     industry: 'Customer Service',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Technical Support Specialist',
//                     description: 'Join our team as a Technical Support Specialist to assist customers with technical issues.',
//                     criteria: 'Associate\'s degree in IT or related field.',
//                     skills: 'Strong technical knowledge and communication skills.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Provide technical support, troubleshoot issues, and assist customers with product setup.',
//                     country: 'UK',
//                     salary: 14,
//                     company: 'Tech Support Services',
//                     category: 'Customer Support',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Content Writer',
//                     description: 'We are seeking a Content Writer to create engaging content for our website and social media.',
//                     criteria: 'Bachelor\'s degree in English, Journalism, or related field.',
//                     skills: 'Excellent writing and editing skills.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Write blog posts, create social media content, and collaborate with the marketing team.',
//                     country: 'USA',
//                     salary: 13,
//                     company: 'Content Creators LLC',
//                     category: 'Content Creation',
//                     jobType: 'Full-time',
//                     industry: 'Media',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Graphic Designer',
//                     description: 'Looking for a Graphic Designer to create visually appealing graphics for our marketing materials.',
//                     criteria: 'Bachelor\'s degree in Graphic Design or related field.',
//                     skills: 'Proficiency in Adobe Creative Suite and graphic design principles.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Create graphics for social media, website, and marketing materials.',
//                     country: 'USA',
//                     salary: 14,
//                     company: 'Design Studios',
//                     category: 'Content Creation',
//                     jobType: 'Full-time',
//                     industry: 'Media',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Digital Marketing Specialist',
//                     description: 'We are looking for a Digital Marketing Specialist to develop and implement digital marketing strategies.',
//                     criteria: 'Bachelor\'s degree in Marketing or related field.',
//                     skills: 'Experience with SEO, SEM, and social media marketing.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Create and manage digital marketing campaigns, analyze performance, and optimize strategies.',
//                     country: 'Canada',
//                     salary: 15,
//                     company: 'Digital Marketing Inc.',
//                     category: 'Marketing',
//                     jobType: 'Full-time',
//                     industry: 'Marketing',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Social Media Manager',
//                     description: 'Join our team as a Social Media Manager to oversee our social media presence.',
//                     criteria: 'Bachelor\'s degree in Marketing or related field.',
//                     skills: 'Experience with social media platforms and content creation.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Create and manage social media content, engage with followers, and analyze social media performance.',
//                     country: 'Canada',
//                     salary: 14,
//                     company: 'Social Media Experts',
//                     category: 'Marketing',
//                     jobType: 'Full-time',
//                     industry: 'Marketing',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'UX/UI Designer',
//                     description: 'We are looking for a UX/UI Designer to create engaging and user-friendly designs for our products.',
//                     criteria: 'Bachelor\'s degree in Design or related field.',
//                     skills: 'Proficiency in design tools like Figma, Sketch, and Adobe XD.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Design user interfaces, conduct user research, and create wireframes and prototypes.',
//                     country: 'UK',
//                     salary: 16,
//                     company: 'Design Innovations',
//                     category: 'Design',
//                     jobType: 'Full-time',
//                     industry: 'Design',
//                     workmode: 'Hybrid'
//                 },
//                 {
//                     title: 'Marketing Coordinator',
//                     description: 'We are looking for a Marketing Coordinator to support our marketing team with various tasks and projects.',
//                     criteria: 'Bachelor\'s degree in Marketing or related field.',
//                     skills: 'Strong organizational and communication skills.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Coordinate marketing campaigns, manage social media accounts, and assist with content creation.',
//                     country: 'Canada',
//                     salary: 13,
//                     company: 'Marketing Solutions Inc.',
//                     category: 'Marketing',
//                     jobType: 'Full-time',
//                     industry: 'Marketing',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Customer Success Manager',
//                     description: 'Join our team as a Customer Success Manager to ensure customer satisfaction and retention.',
//                     criteria: 'Bachelor\'s degree in Business or related field.',
//                     skills: 'Excellent communication and relationship-building skills.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Manage customer relationships, address customer concerns, and ensure customer success.',
//                     country: 'UK',
//                     salary: 15,
//                     company: 'Customer First LLC',
//                     category: 'Customer Support',
//                     jobType: 'Full-time',
//                     industry: 'Customer Service',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Quality Assurance Tester',
//                     description: 'We are seeking a Quality Assurance Tester to test our products and ensure they meet the highest standards.',
//                     criteria: 'Bachelor\'s degree in Computer Science or related field.',
//                     skills: 'Experience with manual and automated testing.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Develop and execute test plans, report bugs, and collaborate with the development team to resolve issues.',
//                     country: 'USA',
//                     salary: 14,
//                     company: 'QA Services Ltd.',
//                     category: 'Software & Data',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Operations Manager',
//                     description: 'We are looking for an Operations Manager to oversee our daily operations and ensure efficiency.',
//                     criteria: 'Bachelor\'s degree in Business or related field.',
//                     skills: 'Strong leadership and organizational skills.',
//                     yearsOfExperience: '5+ years',
//                     level: 'Senior',
//                     jobResponsibilities: 'Manage operations, develop operational strategies, and ensure compliance with company policies.',
//                     country: 'USA',
//                     salary: 20,
//                     company: 'Business Solutions Inc.',
//                     category: 'Operations',
//                     jobType: 'Full-time',
//                     industry: 'Business',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Project Manager',
//                     description: 'Join our team as a Project Manager to lead and manage various projects from start to finish.',
//                     criteria: 'Bachelor\'s degree in Project Management or related field.',
//                     skills: 'Strong leadership, communication, and project management skills.',
//                     yearsOfExperience: '4+ years',
//                     level: 'Mid-Senior',
//                     jobResponsibilities: 'Define project scope, manage project timelines, and ensure successful project delivery.',
//                     country: 'Canada',
//                     salary: 18,
//                     company: 'Project Leaders LLC',
//                     category: 'Project Management',
//                     jobType: 'Full-time',
//                     industry: 'Management',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'HR Specialist',
//                     description: 'We are seeking an HR Specialist to manage our human resources operations and support our employees.',
//                     criteria: 'Bachelor\'s degree in Human Resources or related field.',
//                     skills: 'Strong communication and interpersonal skills.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Manage employee relations, handle recruitment, and ensure compliance with HR policies.',
//                     country: 'Canada',
//                     salary: 15,
//                     company: 'HR Solutions Ltd.',
//                     category: 'Human Resources',
//                     jobType: 'Full-time',
//                     industry: 'Human Resources',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Accountant',
//                     description: 'Looking for an Accountant to manage our financial records and ensure accuracy.',
//                     criteria: 'Bachelor\'s degree in Accounting or related field.',
//                     skills: 'Proficiency in accounting software and strong analytical skills.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Manage financial records, prepare financial reports, and ensure compliance with accounting standards.',
//                     country: 'UK',
//                     salary: 16,
//                     company: 'Accounting Services Inc.',
//                     category: 'Finance',
//                     jobType: 'Full-time',
//                     industry: 'Finance',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Administrative Assistant',
//                     description: 'We are looking for an Administrative Assistant to provide administrative support to our team.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Strong organizational and communication skills.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Manage schedules, handle correspondence, and provide administrative support.',
//                     country: 'Canada',
//                     salary: 12,
//                     company: 'Admin Support LLC',
//                     category: 'Administration',
//                     jobType: 'Full-time',
//                     industry: 'Administration',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Entry Clerk',
//                     description: 'We are looking for a Data Entry Clerk to input data accurately into our systems.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Fast typing skills and attention to detail.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Input data into databases, ensure data accuracy, and maintain confidentiality.',
//                     country: 'Canada',
//                     salary: 10,
//                     company: 'Data Services Inc.',
//                     category: 'Data Entry',
//                     jobType: 'Part-time',
//                     industry: 'Administration',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Search Engine Evaluator',
//                     description: 'We need a Search Engine Evaluator to provide feedback on search engine results.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Good understanding of search engines and attention to detail.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Evaluate search engine results, provide feedback, and suggest improvements.',
//                     country: 'Canada',
//                     salary: 9,
//                     company: 'Search Evaluations Ltd.',
//                     category: 'Search Engine Evaluation',
//                     jobType: 'Part-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Evaluator',
//                     description: 'Looking for a Data Evaluator to assess data quality and suggest improvements.',
//                     criteria: 'Bachelor\'s degree in Data Science, Statistics, or related field.',
//                     skills: 'Strong analytical skills and attention to detail.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Evaluate data sets, identify inconsistencies, and provide recommendations for improvements.',
//                     country: 'UK',
//                     salary: 12,
//                     company: 'Data Quality Ltd.',
//                     category: 'Data Evaluation',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Content Writer',
//                     description: 'We are looking for a Content Writer to create engaging content for our blog and social media.',
//                     criteria: 'Bachelor\'s degree in English, Journalism, or related field.',
//                     skills: 'Excellent writing and editing skills.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Write blog posts, create social media content, and collaborate with the marketing team.',
//                     country: 'Canada',
//                     salary: 13,
//                     company: 'Creative Content Inc.',
//                     category: 'Writing',
//                     jobType: 'Full-time',
//                     industry: 'Media',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Technical Writer',
//                     description: 'Looking for a Technical Writer to create technical documentation and manuals.',
//                     criteria: 'Bachelor\'s degree in Technical Writing or related field.',
//                     skills: 'Strong writing skills and ability to explain complex topics clearly.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Write technical manuals, create user guides, and collaborate with engineering teams.',
//                     country: 'UK',
//                     salary: 14,
//                     company: 'TechDocs Ltd.',
//                     category: 'Writing',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Junior Software Developer',
//                     description: 'We are looking for a Junior Software Developer to join our team and assist with coding tasks.',
//                     criteria: 'Bachelor\'s degree in Computer Science or related field.',
//                     skills: 'Basic knowledge of programming languages like JavaScript, Python, or Java.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Assist with coding tasks, debug software, and collaborate with senior developers.',
//                     country: 'Canada',
//                     salary: 15,
//                     company: 'DevWorks Inc.',
//                     category: 'Software Development',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Web Developer',
//                     description: 'We need a Web Developer to build and maintain our websites.',
//                     criteria: 'Bachelor\'s degree in Computer Science or related field.',
//                     skills: 'Experience with HTML, CSS, JavaScript, and web development frameworks.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Develop and maintain websites, optimize site performance, and collaborate with the design team.',
//                     country: 'UK',
//                     salary: 18,
//                     company: 'Web Solutions Ltd.',
//                     category: 'Software Development',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Search Engine Evaluator',
//                     description: 'We need a Search Engine Evaluator to provide feedback on search engine results.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Good understanding of search engines and attention to detail.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Evaluate search engine results, provide feedback, and suggest improvements.',
//                     country: 'USA',
//                     salary: 9,
//                     company: 'Search Evaluations Ltd.',
//                     category: 'Search Engine Evaluation',
//                     jobType: 'Part-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Evaluator',
//                     description: 'Looking for a Data Evaluator to assess data quality and suggest improvements.',
//                     criteria: 'Bachelor\'s degree in Data Science, Statistics, or related field.',
//                     skills: 'Strong analytical skills and attention to detail.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Evaluate data sets, identify inconsistencies, and provide recommendations for improvements.',
//                     country: 'UK',
//                     salary: 12,
//                     company: 'Data Quality Ltd.',
//                     category: 'Data Evaluation',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Entry Specialist',
//                     description: 'We are looking for a Data Entry Specialist to input and manage data efficiently.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Proficiency in data entry software and attention to detail.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Entry-Mid',
//                     jobResponsibilities: 'Enter data, verify accuracy, and maintain data confidentiality.',
//                     country: 'Canada',
//                     salary: 11,
//                     company: 'Data Management Ltd.',
//                     category: 'Data Entry',
//                     jobType: 'Full-time',
//                     industry: 'Administration',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Technical Support Engineer',
//                     description: 'We need a Technical Support Engineer to resolve customer technical issues.',
//                     criteria: 'Bachelor\'s degree in IT or related field.',
//                     skills: 'Strong technical skills and customer service experience.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Provide technical support, troubleshoot issues, and document solutions.',
//                     country: 'UK',
//                     salary: 15,
//                     company: 'Tech Support Ltd.',
//                     category: 'Customer Support',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Web Content Writer',
//                     description: 'We are looking for a Web Content Writer to create compelling content for our website.',
//                     criteria: 'Bachelor\'s degree in English, Journalism, or related field.',
//                     skills: 'Strong writing and SEO skills.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Write web content, optimize for SEO, and collaborate with the marketing team.',
//                     country: 'Canada',
//                     salary: 13,
//                     company: 'Web Content Inc.',
//                     category: 'Writing',
//                     jobType: 'Full-time',
//                     industry: 'Media',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'AI Data Annotator',
//                     description: 'Join our team as an AI Data Annotator to label and prepare data for machine learning.',
//                     criteria: 'Bachelor\'s degree in a relevant field.',
//                     skills: 'Attention to detail and experience with data annotation tools.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry-Mid',
//                     jobResponsibilities: 'Annotate data, ensure accuracy, and collaborate with the AI team.',
//                     country: 'USA',
//                     salary: 12,
//                     company: 'AI Data Inc.',
//                     category: 'AI Annotation',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Medical Data Entry Clerk',
//                     description: 'We are looking for a Medical Data Entry Clerk to input medical data accurately.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Knowledge of medical terminology and data entry skills.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Enter medical data, verify accuracy, and maintain confidentiality.',
//                     country: 'Canada',
//                     salary: 10,
//                     company: 'Medical Data Services',
//                     category: 'Data Entry',
//                     jobType: 'Part-time',
//                     industry: 'Healthcare',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'AI Model Trainer',
//                     description: 'We are looking for an AI Model Trainer to train and improve our AI models.',
//                     criteria: 'Bachelor\'s degree in AI, Data Science, or related field.',
//                     skills: 'Experience with AI model training and data annotation.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Train AI models, annotate data, and collaborate with the AI team.',
//                     country: 'UK',
//                     salary: 16,
//                     company: 'AI Training Ltd.',
//                     category: 'AI Annotation',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Technical SEO Specialist',
//                     description: 'We need a Technical SEO Specialist to optimize our website for search engines.',
//                     criteria: 'Bachelor\'s degree in Marketing or related field.',
//                     skills: 'Experience with technical SEO and web analytics tools.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Optimize website structure, improve site speed, and analyze SEO performance.',
//                     country: 'Canada',
//                     salary: 15,
//                     company: 'SEO Experts Inc.',
//                     category: 'Search Engine Evaluation',
//                     jobType: 'Full-time',
//                     industry: 'Marketing',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Customer Service Agent',
//                     description: 'Join our team as a Customer Service Agent to assist customers with inquiries.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Excellent communication and problem-solving skills.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Respond to customer inquiries, resolve issues, and provide product information.',
//                     country: 'USA',
//                     salary: 12,
//                     company: 'Customer Solutions Inc.',
//                     category: 'Customer Support',
//                     jobType: 'Full-time',
//                     industry: 'Customer Service',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'E-commerce Data Entry Specialist',
//                     description: 'We need an E-commerce Data Entry Specialist to manage product listings.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Proficiency in e-commerce platforms and attention to detail.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Entry-Mid',
//                     jobResponsibilities: 'Enter product data, manage listings, and ensure data accuracy.',
//                     country: 'Canada',
//                     salary: 11,
//                     company: 'E-commerce Solutions',
//                     category: 'Data Entry',
//                     jobType: 'Part-time',
//                     industry: 'Retail',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Freelance Content Writer',
//                     description: 'We are looking for a Freelance Content Writer to create content for various projects.',
//                     criteria: 'Bachelor\'s degree in English, Journalism, or related field.',
//                     skills: 'Strong writing skills and ability to meet deadlines.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Write articles, blog posts, and other content as needed.',
//                     country: 'UK',
//                     salary: 13,
//                     company: 'Freelance Writers Ltd.',
//                     category: 'Writing',
//                     jobType: 'Part-time',
//                     industry: 'Media',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Junior Data Analyst',
//                     description: 'We are looking for a Junior Data Analyst to assist with data analysis tasks.',
//                     criteria: 'Bachelor\'s degree in Data Science or related field.',
//                     skills: 'Basic knowledge of data analysis tools and techniques.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Assist with data analysis, create reports, and support the data team.',
//                     country: 'Canada',
//                     salary: 12,
//                     company: 'Data Analysis Inc.',
//                     category: 'Data Analysis',
//                     jobType: 'Full-time',
//                     industry: 'Technology',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Legal Transcriptionist',
//                     description: 'We need a Legal Transcriptionist to transcribe legal documents.',
//                     criteria: 'Certification in Legal Transcription.',
//                     skills: 'Knowledge of legal terminology and transcription skills.',
//                     yearsOfExperience: '2+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Transcribe legal documents, ensure accuracy, and maintain confidentiality.',
//                     country: 'UK',
//                     salary: 14,
//                     company: 'Legal Transcription Services',
//                     category: 'Transcription',
//                     jobType: 'Part-time',
//                     industry: 'Legal',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Freelance Translator',
//                     description: 'Join our team as a Freelance Translator to provide translation services.',
//                     criteria: 'Bachelor\'s degree in Translation or related field.',
//                     skills: 'Fluency in multiple languages and strong translation skills.',
//                     yearsOfExperience: '3+ years',
//                     level: 'Mid',
//                     jobResponsibilities: 'Translate documents, ensure cultural relevance, and meet deadlines.',
//                     country: 'USA',
//                     salary: 14,
//                     company: 'Translation Services Ltd.',
//                     category: 'Translation',
//                     jobType: 'Part-time',
//                     industry: 'Linguistics',
//                     workmode: 'Remote'
//                 },
//                 {
//                     title: 'Data Entry Clerk',
//                     description: 'We are looking for a Data Entry Clerk to input data accurately.',
//                     criteria: 'High school diploma or equivalent.',
//                     skills: 'Fast typing skills and attention to detail.',
//                     yearsOfExperience: '1+ years',
//                     level: 'Entry',
//                     jobResponsibilities: 'Input data into databases, ensure accuracy, and maintain confidentiality.',
//                     country: 'UK',
//                     salary: 10,
//                     company: 'Data Entry Solutions',
//                     category: 'Data Entry',
//                     jobType: 'Part-time',
//                     industry: 'Administration',
//                     workmode: 'Remote'
//                 }
//             ],
//         });
//         console.log('Job data seeded successfully.');
//     } catch (error) {
//         console.error('Error seeding job data:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// };

// main()
//     .catch((e) => {
//         console.error('Error in main function:', e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });














const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const main = async () => {
    try {
        // Create employers
        const employer1 = await prisma.user.create({
            data: {
                email: 'employer1@example.com',
                name: 'Employer One',
                age: 40,
                password: 'securepassword',
                country: 'USA',
                state: 'NY',
                city: 'New York',
                language: 'English',
                specialization: 'Management',
                ndaChecked: true,
                role: 'employer'
            }
        });

        const employer2 = await prisma.user.create({
            data: {
                email: 'seunfola1@gmail.com',
                name: 'Employer Two',
                age: 38,
                password: 'securepassword',
                country: 'USA',
                state: 'CA',
                city: 'San Francisco',
                language: 'English',
                specialization: 'Tech Recruitment',
                ndaChecked: true,
                role: 'employer'
            }
        });

        // Create employer profiles
        const employerProfile1 = await prisma.employer.create({
            data: {
                userId: employer1.id,
                company: 'Tech Innovators Inc.',
                website: 'https://techinnovators.com'
            }
        });

        const employerProfile2 = await prisma.employer.create({
            data: {
                userId: employer2.id,
                company: 'Creative Solutions LLC',
                website: 'https://creativesolutions.com'
            }
        });

        // Create job postings using the employers
        await prisma.job.createMany({
            data: [
                {
                    title: 'Software Engineer',
                    description: 'We are looking for a skilled Software Engineer to join our dynamic team.',
                    criteria: 'Bachelor\'s degree in Computer Science or related field.',
                    skills: 'Proficiency in JavaScript, React, Node.js, and SQL.',
                    yearsOfExperience: '3+ years',
                    level: 'Mid-Senior',
                    jobResponsibilities: 'Develop high-quality software design and architecture, identify, prioritize, and execute tasks in the software development life cycle, and automate tasks through appropriate tools and scripting.',
                    country: 'USA',
                    salary: 17,
                    company: 'Tech Innovators Inc.',
                    category: 'Software & Data',
                    jobType: 'Full-time',
                    industry: 'Technology',
                    workmode: 'Hybrid',
                    employerId: employerProfile1.id
                },
                {
                    title: 'Product Manager',
                    description: 'Join our product management team to lead the product development lifecycle from ideation to launch.',
                    criteria: 'Bachelor\'s degree in Business or related field.',
                    skills: 'Strong leadership, communication, and project management skills.',
                    yearsOfExperience: '5+ years',
                    level: 'Senior',
                    jobResponsibilities: 'Work closely with engineering, marketing, and sales teams to deliver innovative products, define product vision, roadmap, and growth opportunities, and gather and prioritize product and customer requirements.',
                    country: 'USA',
                    salary: 14,
                    company: 'Creative Solutions LLC',
                    category: 'Software & Data',
                    jobType: 'Full-time',
                    industry: 'Technology',
                    workmode: 'Remote',
                    employerId: employerProfile2.id
                },
                {
                    title: 'Data Scientist',
                    description: 'We are seeking a Data Scientist to analyze large amounts of raw information to find patterns that will help improve our company.',
                    criteria: 'Master\'s degree in Data Science or related field.',
                    skills: 'Experience with Python, R, and machine learning algorithms.',
                    yearsOfExperience: '4+ years',
                    level: 'Mid-Senior',
                    jobResponsibilities: 'Build predictive models and machine-learning algorithms, combine models through ensemble modeling, and present information using data visualization techniques.',
                    country: 'USA',
                    salary: 18,
                    company: 'Data Insights Inc.',
                    category: 'Software & Data',
                    jobType: 'Full-time',
                    industry: 'Technology',
                    workmode: 'Remote',
                    employerId: employerProfile1.id
                },
                {
                    title: 'Data Evaluator',
                    description: 'We are looking for a Data Evaluator to assess and improve the quality of our datasets.',
                    criteria: 'Bachelor\'s degree in Data Science, Statistics, or related field.',
                    skills: 'Strong analytical skills and attention to detail.',
                    yearsOfExperience: '2+ years',
                    level: 'Mid',
                    jobResponsibilities: 'Evaluate data sets, identify inconsistencies, and provide recommendations for improvements.',
                    country: 'USA',
                    salary: 12,
                    company: 'Data Analytics Corp.',
                    category: 'Software & Data',
                    jobType: 'Full-time',
                    industry: 'Technology',
                    workmode: 'Remote',
                    employerId: employerProfile2.id
                },
                {
                    title: 'AI Translation Specialist',
                    description: 'We are looking for an AI Translation Specialist to improve and maintain our translation services.',
                    criteria: 'Bachelor\'s degree in Linguistics or related field.',
                    skills: 'Fluency in multiple languages and experience with AI translation models.',
                    yearsOfExperience: '2+ years',
                    level: 'Mid',
                    jobResponsibilities: 'Develop translation models, evaluate the quality of translations, and provide linguistic expertise to our AI team.',
                    country: 'Canada',
                    salary: 7,
                    company: 'Global Translations Ltd.',
                    category: 'Translation',
                    jobType: 'Part-time',
                    industry: 'Linguistics',
                    workmode: 'Remote',
                    employerId: employerProfile1.id
                },
                // Add more jobs similarly
            ],
        });
        console.log('Job data seeded successfully.');
    } catch (error) {
        console.error('Error seeding job data:', error);
    } finally {
        await prisma.$disconnect();
    }
};

main()
    .catch((e) => {
        console.error('Error in main function:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
