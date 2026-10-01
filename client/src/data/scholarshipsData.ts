export interface Scholarship {
  id: string;
  name: string;
  offeredBy: string;
  amount: string;
  deadline: string;
  courseEligibility: string[];
  categoryEligibility: string[];
  maxIncomeLimit: number;
  genderLimit?: 'All' | 'Female' | 'Male';
  summary: string;
  matchReasons: string[];
  requiredDocs: string[];
  officialSource: string;
}

export const SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 'central-sector-scheme',
    name: 'Central Sector Scheme of Scholarships for College Students',
    offeredBy: 'Department of Higher Education, Govt of India',
    amount: '₹12,000 - ₹20,000 / year',
    deadline: '31st October',
    courseEligibility: ['BCA', 'BSc', 'BA', 'B.Tech', 'B.Com'],
    categoryEligibility: ['General', 'OBC', 'SC', 'ST'],
    maxIncomeLimit: 450000,
    genderLimit: 'All',
    summary: 'Financial assistance to meritorious students from low-income families to meet day-to-day college expenses.',
    matchReasons: [
      'Matches your enrolled course (BCA)',
      'Family income is within the ₹4.5L annual threshold',
      'For 1st Semester fresh applicants'
    ],
    requiredDocs: [
      'Class 12th Marksheet',
      'Annual Income Certificate',
      'Aadhaar Card Linked Bank Passbook',
      'College Bonafide Certificate'
    ],
    officialSource: 'National Scholarship Portal (scholarships.gov.in)'
  },
  {
    id: 'post-matric-sc-st',
    name: 'Post-Matric Scholarship for SC/ST/OBC Students',
    offeredBy: 'Ministry of Social Justice and Empowerment',
    amount: '100% Tuition Fee Refund + Maintenance Allowance',
    deadline: '15th November',
    courseEligibility: ['BCA', 'BSc', 'BA', 'B.Tech', 'Diploma'],
    categoryEligibility: ['SC', 'ST', 'OBC'],
    maxIncomeLimit: 250000,
    genderLimit: 'All',
    summary: 'Provides complete financial support including non-refundable college fees and living stipend for tribal and backward category students.',
    matchReasons: [
      'Tailored specifically for Rural & Tribal Higher Education',
      'Covers 100% college tuition fees',
      'Monthly maintenance stipend'
    ],
    requiredDocs: [
      'Caste/Tribe Validity Certificate',
      'Income Certificate issued by Tehsildar',
      'Fee Receipt of 1st Semester',
      'Residence Certificate'
    ],
    officialSource: 'State Welfare Portal / NSP'
  },
  {
    id: 'aicte-pragati-girls',
    name: 'AICTE Pragati Scholarship for Girl Students',
    offeredBy: 'AICTE, Ministry of Education',
    amount: '₹50,000 per annum',
    deadline: '31st December',
    courseEligibility: ['BCA', 'B.Tech', 'Diploma'],
    categoryEligibility: ['General', 'OBC', 'SC', 'ST'],
    maxIncomeLimit: 800000,
    genderLimit: 'Female',
    summary: 'Special initiative to empower young women pursuing technical higher education degree and diploma programs.',
    matchReasons: [
      'Dedicated grant for female technical students',
      'Generous income limit (up to ₹8L)',
      'Covers college fees + laptop purchase'
    ],
    requiredDocs: [
      'Admission Letter for BCA / Tech course',
      'Declaration form signed by parents',
      'Bank details with Aadhaar seeding'
    ],
    officialSource: 'AICTE Official Portal (aicte-india.org)'
  },
  {
    id: 'ishan-uday-tribal',
    name: 'Ishan Uday Special Scholarship for NE & Tribal Regions',
    offeredBy: 'University Grants Commission (UGC)',
    amount: '₹7,800 / month',
    deadline: '20th November',
    courseEligibility: ['BCA', 'BSc', 'BA', 'B.Com'],
    categoryEligibility: ['General', 'OBC', 'SC', 'ST'],
    maxIncomeLimit: 450000,
    genderLimit: 'All',
    summary: 'Designed to promote higher education in North-East and tribal hilly belts of India.',
    matchReasons: [
      'Monthly direct benefit transfer (DBT)',
      'Covers general and professional degree courses',
      'Supports tribal district colleges'
    ],
    requiredDocs: [
      'Domicile Certificate of Tribal/NE Region',
      'Class 12 Passing Certificate',
      'Income Certificate'
    ],
    officialSource: 'UGC / National Scholarship Portal'
  }
];
