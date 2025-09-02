import { 
  SurrogateApplication, 
  IntendedParentApplication, 
  SurrogacyCase, 
  SocialPost,
  TrustAccount,
  TrustAccountTransaction,
  ApplicationStatus,
  CaseStatus 
} from '@/types/application'

export const mockSurrogateApplications: SurrogateApplication[] = [
  {
    id: 'sa-001',
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0123',
    dateOfBirth: '1990-03-15',
    age: 34,
    location: {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles'
    },
    maritalStatus: 'Married',
    numberOfChildren: 2,
    previousSurrogacyExperience: true,
    medicalHistory: '两次健康妊娠，无妊娠并发症，体重指数正常',
    motivation: '希望帮助无法自然怀孕的家庭实现梦想，同时为家庭提供经济支持',
    expectedCompensation: 60000,
    availabilityDate: '2024-03-01',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-20T10:30:00Z',
    reviewedAt: '2024-01-25T14:20:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '经验丰富，医疗报告良好，推荐通过',
    documents: [
      {
        id: 'doc-001',
        name: '医疗报告.pdf',
        type: 'medical',
        url: '/documents/medical-report-001.pdf',
        uploadedAt: '2024-01-20T10:30:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-002',
    fullName: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1-555-0124',
    dateOfBirth: '1987-07-22',
    age: 37,
    location: {
      country: 'USA',
      state: 'Texas',
      city: 'Dallas'
    },
    maritalStatus: 'Married',
    numberOfChildren: 3,
    previousSurrogacyExperience: false,
    medicalHistory: '三次健康妊娠，无重大健康问题',
    motivation: '想要帮助他人建立家庭，同时挑战自己',
    expectedCompensation: 55000,
    availabilityDate: '2024-04-15',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-15T14:20:00Z',
    reviewedAt: '2024-01-22T09:15:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '申请者条件优秀，医疗报告良好，推荐通过',
    documents: [
      {
        id: 'doc-002',
        name: '身份证明.pdf',
        type: 'identity',
        url: '/documents/identity-002.pdf',
        uploadedAt: '2024-01-15T14:20:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-003',
    fullName: 'Jennifer Martinez',
    email: 'jennifer.martinez@email.com',
    phone: '+1-555-0125',
    dateOfBirth: '1985-11-08',
    age: 38,
    location: {
      country: 'USA',
      state: 'Florida',
      city: 'Miami'
    },
    maritalStatus: 'Married',
    numberOfChildren: 2,
    previousSurrogacyExperience: true,
    medicalHistory: '两次健康妊娠，一次成功代孕经验，身体健康',
    motivation: '享受帮助他人实现家庭梦想的过程，经济上也能帮助自己的家庭',
    expectedCompensation: 65000,
    availabilityDate: '2024-02-15',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-10T09:45:00Z',
    reviewedAt: '2024-01-18T11:30:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '有代孕经验，医疗状况优秀，强烈推荐',
    documents: [
      {
        id: 'doc-014',
        name: '医疗检查报告.pdf',
        type: 'medical',
        url: '/documents/medical-check-003.pdf',
        uploadedAt: '2024-01-10T09:45:00Z',
        verified: true
      },
      {
        id: 'doc-015',
        name: '代孕经验证明.pdf',
        type: 'experience',
        url: '/documents/surrogacy-experience-003.pdf',
        uploadedAt: '2024-01-10T09:45:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-004',
    fullName: 'Amanda Thompson',
    email: 'amanda.thompson@email.com',
    phone: '+1-555-0126',
    dateOfBirth: '1992-05-20',
    age: 31,
    location: {
      country: 'USA',
      state: 'Washington',
      city: 'Seattle'
    },
    maritalStatus: 'Married',
    numberOfChildren: 1,
    previousSurrogacyExperience: false,
    medicalHistory: '一次健康妊娠，无并发症，定期运动，生活方式健康',
    motivation: '想要帮助无法生育的家庭，同时为孩子的未来教育储蓄',
    expectedCompensation: 58000,
    availabilityDate: '2024-05-01',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-08T16:20:00Z',
    reviewedAt: '2024-01-15T13:45:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '年轻健康，生活方式良好，推荐通过',
    documents: [
      {
        id: 'doc-016',
        name: '健康证明.pdf',
        type: 'medical',
        url: '/documents/health-certificate-004.pdf',
        uploadedAt: '2024-01-08T16:20:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-005',
    fullName: 'Lisa Anderson',
    email: 'lisa.anderson@email.com',
    phone: '+1-555-0127',
    dateOfBirth: '1988-09-12',
    age: 35,
    location: {
      country: 'USA',
      state: 'Illinois',
      city: 'Chicago'
    },
    maritalStatus: 'Married',
    numberOfChildren: 3,
    previousSurrogacyExperience: true,
    medicalHistory: '三次健康妊娠，两次成功代孕，经验丰富',
    motivation: '代孕让我感到非常有意义，能够帮助他人实现梦想',
    expectedCompensation: 70000,
    availabilityDate: '2024-03-15',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-05T12:10:00Z',
    reviewedAt: '2024-01-12T15:30:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '经验非常丰富，医疗状况优秀，强烈推荐',
    documents: [
      {
        id: 'doc-017',
        name: '代孕历史记录.pdf',
        type: 'experience',
        url: '/documents/surrogacy-history-005.pdf',
        uploadedAt: '2024-01-05T12:10:00Z',
        verified: true
      },
      {
        id: 'doc-018',
        name: '医疗评估报告.pdf',
        type: 'medical',
        url: '/documents/medical-evaluation-005.pdf',
        uploadedAt: '2024-01-05T12:10:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-006',
    fullName: 'Rachel Wilson',
    email: 'rachel.wilson@email.com',
    phone: '+1-555-0128',
    dateOfBirth: '1991-12-03',
    age: 32,
    location: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta'
    },
    maritalStatus: 'Married',
    numberOfChildren: 2,
    previousSurrogacyExperience: false,
    medicalHistory: '两次健康妊娠，无并发症，定期体检',
    motivation: '想要帮助他人建立家庭，同时为家庭提供经济支持',
    expectedCompensation: 56000,
    availabilityDate: '2024-06-01',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-03T14:30:00Z',
    reviewedAt: '2024-01-10T10:15:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '健康状况良好，推荐通过',
    documents: [
      {
        id: 'doc-019',
        name: '体检报告.pdf',
        type: 'medical',
        url: '/documents/health-check-006.pdf',
        uploadedAt: '2024-01-03T14:30:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-007',
    fullName: 'Michelle Davis',
    email: 'michelle.davis@email.com',
    phone: '+1-555-0129',
    dateOfBirth: '1986-04-18',
    age: 37,
    location: {
      country: 'USA',
      state: 'Arizona',
      city: 'Phoenix'
    },
    maritalStatus: 'Married',
    numberOfChildren: 4,
    previousSurrogacyExperience: true,
    medicalHistory: '四次健康妊娠，一次代孕经验，身体状况良好',
    motivation: '代孕让我感到非常有成就感，能够帮助他人实现梦想',
    expectedCompensation: 62000,
    availabilityDate: '2024-04-01',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-01T11:00:00Z',
    reviewedAt: '2024-01-08T14:20:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '有代孕经验，健康状况良好，推荐通过',
    documents: [
      {
        id: 'doc-020',
        name: '代孕证明.pdf',
        type: 'experience',
        url: '/documents/surrogacy-proof-007.pdf',
        uploadedAt: '2024-01-01T11:00:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-008',
    fullName: 'Stephanie Brown',
    email: 'stephanie.brown@email.com',
    phone: '+1-555-0130',
    dateOfBirth: '1989-08-25',
    age: 34,
    location: {
      country: 'USA',
      state: 'Colorado',
      city: 'Denver'
    },
    maritalStatus: 'Married',
    numberOfChildren: 2,
    previousSurrogacyExperience: false,
    medicalHistory: '两次健康妊娠，无并发症，热爱运动',
    motivation: '想要帮助无法生育的家庭，同时为孩子的教育储蓄',
    expectedCompensation: 59000,
    availabilityDate: '2024-07-01',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2023-12-28T15:45:00Z',
    reviewedAt: '2024-01-05T09:30:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '年轻健康，生活方式积极，推荐通过',
    documents: [
      {
        id: 'doc-021',
        name: '健康证明.pdf',
        type: 'medical',
        url: '/documents/health-certificate-008.pdf',
        uploadedAt: '2023-12-28T15:45:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-009',
    fullName: 'Nicole Taylor',
    email: 'nicole.taylor@email.com',
    phone: '+1-555-0131',
    dateOfBirth: '1984-01-14',
    age: 40,
    location: {
      country: 'USA',
      state: 'Nevada',
      city: 'Las Vegas'
    },
    maritalStatus: 'Married',
    numberOfChildren: 3,
    previousSurrogacyExperience: true,
    medicalHistory: '三次健康妊娠，两次代孕经验，身体状况良好',
    motivation: '代孕是我能帮助他人的最好方式，让我感到非常有意义',
    expectedCompensation: 68000,
    availabilityDate: '2024-02-01',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2023-12-25T10:20:00Z',
    reviewedAt: '2024-01-02T16:45:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '经验丰富，医疗状况优秀，强烈推荐',
    documents: [
      {
        id: 'doc-022',
        name: '代孕经验证明.pdf',
        type: 'experience',
        url: '/documents/surrogacy-experience-009.pdf',
        uploadedAt: '2023-12-25T10:20:00Z',
        verified: true
      },
      {
        id: 'doc-023',
        name: '医疗报告.pdf',
        type: 'medical',
        url: '/documents/medical-report-009.pdf',
        uploadedAt: '2023-12-25T10:20:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'sa-010',
    fullName: 'Ashley Miller',
    email: 'ashley.miller@email.com',
    phone: '+1-555-0132',
    dateOfBirth: '1993-06-30',
    age: 30,
    location: {
      country: 'USA',
      state: 'Oregon',
      city: 'Portland'
    },
    maritalStatus: 'Married',
    numberOfChildren: 1,
    previousSurrogacyExperience: false,
    medicalHistory: '一次健康妊娠，无并发症，生活方式健康',
    motivation: '想要帮助他人实现家庭梦想，同时为家庭提供经济支持',
    expectedCompensation: 57000,
    availabilityDate: '2024-08-01',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2023-12-20T13:15:00Z',
    reviewedAt: '2023-12-28T11:00:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '年轻健康，推荐通过',
    documents: [
      {
        id: 'doc-024',
        name: '健康检查报告.pdf',
        type: 'medical',
        url: '/documents/health-check-010.pdf',
        uploadedAt: '2023-12-20T13:15:00Z',
        verified: true
      }
    ]
  }
]

export const mockIntendedParentApplications: IntendedParentApplication[] = [
  {
    id: 'ipa-001',
    coupleNames: 'David & Emma Smith',
    primaryEmail: 'david.smith@email.com',
    secondaryEmail: 'emma.smith@email.com',
    phone: '+1-555-0200',
    location: {
      country: 'USA',
      state: 'New York',
      city: 'New York City'
    },
    ageRange: '30-35',
    relationshipStatus: 'Married for 5 years',
    fertilityHistory: '尝试自然怀孕3年未成功，经医生诊断为子宫因素不孕',
    previousAttempts: 2,
    expectedTimeline: '6-12个月内开始',
    budget: {
      min: 120000,
      max: 180000
    },
    preferredSurrogateProfile: {
      ageRange: '25-35',
      location: '美国西海岸',
      experience: true,
      other: '希望代孕母亲有健康的生活方式，非吸烟者'
    },
    medicalRequirements: '需要进行全面的医疗筛查，包括遗传学检测',
    legalQuestions: '希望了解详细的法律流程和权利保障',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-25T16:45:00Z',
    reviewedAt: '2024-01-28T10:30:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '财务状况良好，医疗需求明确，推荐通过',
    documents: [
      {
        id: 'doc-003',
        name: '收入证明.pdf',
        type: 'financial',
        url: '/documents/income-proof-001.pdf',
        uploadedAt: '2024-01-25T16:45:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'ipa-002',
    coupleNames: 'Michael & Sarah Johnson',
    primaryEmail: 'michael.johnson@email.com',
    secondaryEmail: 'sarah.johnson@email.com',
    phone: '+1-555-0201',
    location: {
      country: 'USA',
      state: 'California',
      city: 'Los Angeles'
    },
    ageRange: '35-40',
    relationshipStatus: 'Married for 8 years',
    fertilityHistory: '女方有子宫内膜异位症，多次IVF失败',
    previousAttempts: 4,
    expectedTimeline: '3-6个月内开始',
    budget: {
      min: 150000,
      max: 220000
    },
    preferredSurrogateProfile: {
      ageRange: '28-38',
      location: '加州或德州',
      experience: true,
      other: '希望代孕母亲有成功代孕经验，身体健康'
    },
    medicalRequirements: '需要详细的遗传学检测和心理健康评估',
    legalQuestions: '关注代孕过程中的法律保护和风险控制',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-20T14:20:00Z',
    reviewedAt: '2024-01-23T09:15:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '高预算客户，医疗需求复杂但可满足，已批准',
    documents: [
      {
        id: 'doc-004',
        name: '银行对账单.pdf',
        type: 'financial',
        url: '/documents/bank-statement-002.pdf',
        uploadedAt: '2024-01-20T14:20:00Z',
        verified: true
      },
      {
        id: 'doc-005',
        name: '医疗报告.pdf',
        type: 'medical',
        url: '/documents/medical-report-002.pdf',
        uploadedAt: '2024-01-20T14:20:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'ipa-003',
    coupleNames: 'James & Lisa Chen',
    primaryEmail: 'james.chen@email.com',
    secondaryEmail: 'lisa.chen@email.com',
    phone: '+1-555-0202',
    location: {
      country: 'USA',
      state: 'Texas',
      city: 'Houston'
    },
    ageRange: '28-32',
    relationshipStatus: 'Married for 3 years',
    fertilityHistory: '男方精子质量问题，需要捐精',
    previousAttempts: 1,
    expectedTimeline: '12个月内开始',
    budget: {
      min: 100000,
      max: 140000
    },
    preferredSurrogateProfile: {
      ageRange: '25-35',
      location: '德州本地',
      experience: false,
      other: '希望代孕母亲性格开朗，有爱心'
    },
    medicalRequirements: '需要捐精程序和相关法律文件',
    legalQuestions: '关注捐精者的权利和义务',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-15T11:30:00Z',
    reviewedAt: '2024-01-18T16:45:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '年轻夫妇，预算合理，需求明确，已批准',
    documents: [
      {
        id: 'doc-006',
        name: '工作证明.pdf',
        type: 'financial',
        url: '/documents/employment-proof-003.pdf',
        uploadedAt: '2024-01-15T11:30:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'ipa-004',
    coupleNames: 'Robert & Jennifer Williams',
    primaryEmail: 'robert.williams@email.com',
    secondaryEmail: 'jennifer.williams@email.com',
    phone: '+1-555-0203',
    location: {
      country: 'USA',
      state: 'Florida',
      city: 'Miami'
    },
    ageRange: '40-45',
    relationshipStatus: 'Married for 12 years',
    fertilityHistory: '女方已绝经，需要卵子捐赠',
    previousAttempts: 3,
    expectedTimeline: '立即开始',
    budget: {
      min: 180000,
      max: 250000
    },
    preferredSurrogateProfile: {
      ageRange: '25-35',
      location: '美国任何地区',
      experience: true,
      other: '希望代孕母亲有成功经验，身体健康，无不良嗜好'
    },
    medicalRequirements: '需要卵子捐赠和全面的医疗检查',
    legalQuestions: '关注卵子捐赠的法律程序和权利保护',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-10T09:15:00Z',
    reviewedAt: '2024-01-12T14:20:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '紧急需求，高预算，医疗需求复杂，已批准',
    documents: [
      {
        id: 'doc-007',
        name: '资产证明.pdf',
        type: 'financial',
        url: '/documents/asset-proof-004.pdf',
        uploadedAt: '2024-01-10T09:15:00Z',
        verified: true
      },
      {
        id: 'doc-008',
        name: '医疗诊断书.pdf',
        type: 'medical',
        url: '/documents/medical-diagnosis-004.pdf',
        uploadedAt: '2024-01-10T09:15:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'ipa-005',
    coupleNames: 'Alex & Maria Rodriguez',
    primaryEmail: 'alex.rodriguez@email.com',
    secondaryEmail: 'maria.rodriguez@email.com',
    phone: '+1-555-0204',
    location: {
      country: 'USA',
      state: 'Illinois',
      city: 'Chicago'
    },
    ageRange: '32-37',
    relationshipStatus: 'Married for 6 years',
    fertilityHistory: '女方有多次流产史，医生建议代孕',
    previousAttempts: 2,
    expectedTimeline: '6-9个月内开始',
    budget: {
      min: 130000,
      max: 170000
    },
    preferredSurrogateProfile: {
      ageRange: '26-36',
      location: '中西部地区',
      experience: true,
      other: '希望代孕母亲有稳定的家庭环境'
    },
    medicalRequirements: '需要详细的产科检查和心理评估',
    legalQuestions: '关注代孕过程中的医疗风险和法律保护',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-08T13:45:00Z',
    reviewedAt: '2024-01-11T10:30:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '医疗需求明确，预算合理，已批准',
    documents: [
      {
        id: 'doc-009',
        name: '收入证明.pdf',
        type: 'financial',
        url: '/documents/income-proof-005.pdf',
        uploadedAt: '2024-01-08T13:45:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'ipa-006',
    coupleNames: 'Kevin & Amanda Taylor',
    primaryEmail: 'kevin.taylor@email.com',
    secondaryEmail: 'amanda.taylor@email.com',
    phone: '+1-555-0205',
    location: {
      country: 'USA',
      state: 'Washington',
      city: 'Seattle'
    },
    ageRange: '29-34',
    relationshipStatus: 'Married for 4 years',
    fertilityHistory: '女方有PCOS，自然怀孕困难',
    previousAttempts: 1,
    expectedTimeline: '9-12个月内开始',
    budget: {
      min: 110000,
      max: 150000
    },
    preferredSurrogateProfile: {
      ageRange: '25-35',
      location: '西海岸',
      experience: false,
      other: '希望代孕母亲生活方式健康，有运动习惯'
    },
    medicalRequirements: '需要PCOS相关的医疗管理',
    legalQuestions: '希望了解代孕过程中的医疗监测',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-05T16:20:00Z',
    reviewedAt: '2024-01-08T11:15:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '年轻夫妇，需求明确，已批准',
    documents: [
      {
        id: 'doc-010',
        name: '银行对账单.pdf',
        type: 'financial',
        url: '/documents/bank-statement-006.pdf',
        uploadedAt: '2024-01-05T16:20:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'ipa-007',
    coupleNames: 'Daniel & Rachel Brown',
    primaryEmail: 'daniel.brown@email.com',
    secondaryEmail: 'rachel.brown@email.com',
    phone: '+1-555-0206',
    location: {
      country: 'USA',
      state: 'Georgia',
      city: 'Atlanta'
    },
    ageRange: '36-41',
    relationshipStatus: 'Married for 10 years',
    fertilityHistory: '女方有子宫肌瘤，需要手术切除',
    previousAttempts: 3,
    expectedTimeline: '6个月内开始',
    budget: {
      min: 140000,
      max: 190000
    },
    preferredSurrogateProfile: {
      ageRange: '28-38',
      location: '东南部地区',
      experience: true,
      other: '希望代孕母亲有成功经验，身体健康'
    },
    medicalRequirements: '需要子宫肌瘤手术后的恢复期管理',
    legalQuestions: '关注手术风险对代孕过程的影响',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-03T12:10:00Z',
    reviewedAt: '2024-01-06T15:30:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '医疗需求复杂，预算充足，已批准',
    documents: [
      {
        id: 'doc-011',
        name: '医疗报告.pdf',
        type: 'medical',
        url: '/documents/medical-report-007.pdf',
        uploadedAt: '2024-01-03T12:10:00Z',
        verified: true
      },
      {
        id: 'doc-012',
        name: '资产证明.pdf',
        type: 'financial',
        url: '/documents/asset-proof-007.pdf',
        uploadedAt: '2024-01-03T12:10:00Z',
        verified: true
      }
    ]
  },
  {
    id: 'ipa-008',
    coupleNames: 'Christopher & Jessica Davis',
    primaryEmail: 'christopher.davis@email.com',
    secondaryEmail: 'jessica.davis@email.com',
    phone: '+1-555-0207',
    location: {
      country: 'USA',
      state: 'Arizona',
      city: 'Phoenix'
    },
    ageRange: '31-36',
    relationshipStatus: 'Married for 5 years',
    fertilityHistory: '男方有遗传疾病，需要基因筛查',
    previousAttempts: 2,
    expectedTimeline: '12个月内开始',
    budget: {
      min: 120000,
      max: 160000
    },
    preferredSurrogateProfile: {
      ageRange: '25-35',
      location: '西南部地区',
      experience: false,
      other: '希望代孕母亲无遗传疾病史'
    },
    medicalRequirements: '需要进行全面的基因检测和遗传咨询',
    legalQuestions: '关注遗传疾病的法律责任和风险',
    status: ApplicationStatus.APPROVED,
    submittedAt: '2024-01-01T10:00:00Z',
    reviewedAt: '2024-01-04T14:45:00Z',
    reviewedBy: 'admin-001',
    reviewNotes: '遗传疾病筛查需求，预算合理，已批准',
    documents: [
      {
        id: 'doc-013',
        name: '基因检测报告.pdf',
        type: 'medical',
        url: '/documents/genetic-test-008.pdf',
        uploadedAt: '2024-01-01T10:00:00Z',
        verified: true
      }
    ]
  }
]

export const mockSurrogacyCases: SurrogacyCase[] = [
  {
    id: 'case-001',
    caseNumber: 'YD-2024-001',
    intendedParents: {
      applicationId: 'ipa-001',
      names: 'David & Emma Smith',
      email: 'david.smith@email.com',
      location: {
        country: 'USA',
        state: 'New York',
        city: 'New York City'
      },
      budget: {
        min: 120000,
        max: 180000
      },
      urgency: 'medium'
    },
    surrogate: {
      applicationId: 'sa-002',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      age: 32,
      location: {
        country: 'USA',
        state: 'Texas',
        city: 'Dallas'
      },
      experience: '2次成功代孕经验',
      status: 'matched',
      expectedCompensation: 55000,
      availableFrom: '2024-01-28'
    },
    assignedAgency: {
      agencyId: 'agency-001',
      agencyName: '优质代理服务',
      agentName: '张经理'
    },
    status: CaseStatus.DOCUMENT_COLLECTION,
    createdAt: '2024-01-28T10:00:00Z',
    startDate: '2024-01-28T10:00:00Z',
    createdBy: 'admin-001',
    assignedAt: '2024-01-29T14:30:00Z',
    timeline: [
      {
        id: 'timeline-001',
        stage: CaseStatus.CREATED,
        completedAt: '2024-01-28T10:00:00Z',
        notes: '案例创建，匹配完成',
        completedBy: 'admin-001'
      },
      {
        id: 'timeline-002',
        stage: CaseStatus.ASSIGNED_TO_AGENCY,
        completedAt: '2024-01-29T14:30:00Z',
        notes: '已分配给代理机构处理',
        completedBy: 'admin-001'
      }
    ],
    documents: [],
    notes: [
      {
        id: 'note-001',
        content: '双方初步沟通良好，准父母对代孕母亲的背景很满意',
        createdAt: '2024-01-28T15:20:00Z',
        createdBy: 'admin-001',
        type: 'communication',
        visibleTo: ['admin', 'agency']
      }
    ]
  }
]

export const mockSocialPosts: SocialPost[] = [
  {
    id: 'post-001',
    surrogateId: 'sa-002',
    caseId: 'case-001',
    content: '今天去产检了，宝宝很健康！医生说一切指标都很正常 😊',
    images: ['/images/ultrasound-001.jpg'],
    type: 'health_update',
    postedAt: '2024-02-01T14:30:00Z',
    likes: 5,
    comments: [
      {
        id: 'comment-001',
        content: '太好了！我们很高兴听到这个消息 ❤️',
        authorId: 'ipa-001',
        authorName: 'David & Emma Smith',
        authorRole: 'intended_parent',
        createdAt: '2024-02-01T15:45:00Z'
      }
    ],
    visibleTo: ['intended_parent', 'admin', 'agency']
  },
  {
    id: 'post-002',
    surrogateId: 'sa-002',
    caseId: 'case-001',
    content: '今天天气很好，和家人一起去公园散步，心情很棒！',
    images: ['/images/park-walk-001.jpg'],
    type: 'daily_life',
    postedAt: '2024-02-02T09:15:00Z',
    likes: 3,
    comments: [],
    visibleTo: ['intended_parent', 'admin', 'agency']
  }
]

export const mockTrustAccounts: TrustAccount[] = [
  {
    id: 'ta-001',
    parentId: 'ipa-001',
    accountNumber: 'TA-2024-001',
    currentBalance: 85000,
    initialDeposit: 100000,
    totalDeposits: 100000,
    totalWithdrawals: 15000,
    status: 'active',
    createdAt: '2024-01-28T10:00:00Z',
    lastUpdated: '2024-02-01T14:30:00Z',
    transactions: [
      {
        id: 'tx-001',
        accountId: 'ta-001',
        type: 'deposit',
        amount: 100000,
        description: '初始信托账户存款',
        reference: 'INIT-001',
        processedBy: 'admin-001',
        processedAt: '2024-01-28T10:00:00Z',
        status: 'completed'
      },
      {
        id: 'tx-002',
        accountId: 'ta-001',
        type: 'withdrawal',
        amount: 15000,
        description: '代孕母亲补偿金支付',
        reference: 'PAY-001',
        processedBy: 'admin-001',
        processedAt: '2024-02-01T14:30:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ta-002',
    parentId: 'ipa-002',
    accountNumber: 'TA-2024-002',
    currentBalance: 180000,
    initialDeposit: 200000,
    totalDeposits: 200000,
    totalWithdrawals: 20000,
    status: 'active',
    createdAt: '2024-01-23T09:15:00Z',
    lastUpdated: '2024-01-30T11:20:00Z',
    transactions: [
      {
        id: 'tx-003',
        accountId: 'ta-002',
        type: 'deposit',
        amount: 200000,
        description: '初始信托账户存款',
        reference: 'INIT-002',
        processedBy: 'admin-001',
        processedAt: '2024-01-23T09:15:00Z',
        status: 'completed'
      },
      {
        id: 'tx-004',
        accountId: 'ta-002',
        type: 'withdrawal',
        amount: 20000,
        description: '法律费用支付',
        reference: 'LEGAL-001',
        processedBy: 'admin-001',
        processedAt: '2024-01-30T11:20:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ta-003',
    parentId: 'ipa-003',
    accountNumber: 'TA-2024-003',
    currentBalance: 120000,
    initialDeposit: 120000,
    totalDeposits: 120000,
    totalWithdrawals: 0,
    status: 'active',
    createdAt: '2024-01-18T16:45:00Z',
    lastUpdated: '2024-01-18T16:45:00Z',
    transactions: [
      {
        id: 'tx-005',
        accountId: 'ta-003',
        type: 'deposit',
        amount: 120000,
        description: '初始信托账户存款',
        reference: 'INIT-003',
        processedBy: 'admin-001',
        processedAt: '2024-01-18T16:45:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ta-004',
    parentId: 'ipa-004',
    accountNumber: 'TA-2024-004',
    currentBalance: 220000,
    initialDeposit: 250000,
    totalDeposits: 250000,
    totalWithdrawals: 30000,
    status: 'active',
    createdAt: '2024-01-12T14:20:00Z',
    lastUpdated: '2024-01-25T09:45:00Z',
    transactions: [
      {
        id: 'tx-006',
        accountId: 'ta-004',
        type: 'deposit',
        amount: 250000,
        description: '初始信托账户存款',
        reference: 'INIT-004',
        processedBy: 'admin-001',
        processedAt: '2024-01-12T14:20:00Z',
        status: 'completed'
      },
      {
        id: 'tx-007',
        accountId: 'ta-004',
        type: 'withdrawal',
        amount: 30000,
        description: '医疗检查费用',
        reference: 'MED-001',
        processedBy: 'admin-001',
        processedAt: '2024-01-25T09:45:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ta-005',
    parentId: 'ipa-005',
    accountNumber: 'TA-2024-005',
    currentBalance: 150000,
    initialDeposit: 150000,
    totalDeposits: 150000,
    totalWithdrawals: 0,
    status: 'active',
    createdAt: '2024-01-11T10:30:00Z',
    lastUpdated: '2024-01-11T10:30:00Z',
    transactions: [
      {
        id: 'tx-008',
        accountId: 'ta-005',
        type: 'deposit',
        amount: 150000,
        description: '初始信托账户存款',
        reference: 'INIT-005',
        processedBy: 'admin-001',
        processedAt: '2024-01-11T10:30:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ta-006',
    parentId: 'ipa-006',
    accountNumber: 'TA-2024-006',
    currentBalance: 130000,
    initialDeposit: 130000,
    totalDeposits: 130000,
    totalWithdrawals: 0,
    status: 'active',
    createdAt: '2024-01-08T11:15:00Z',
    lastUpdated: '2024-01-08T11:15:00Z',
    transactions: [
      {
        id: 'tx-009',
        accountId: 'ta-006',
        type: 'deposit',
        amount: 130000,
        description: '初始信托账户存款',
        reference: 'INIT-006',
        processedBy: 'admin-001',
        processedAt: '2024-01-08T11:15:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ta-007',
    parentId: 'ipa-007',
    accountNumber: 'TA-2024-007',
    currentBalance: 160000,
    initialDeposit: 160000,
    totalDeposits: 160000,
    totalWithdrawals: 0,
    status: 'active',
    createdAt: '2024-01-06T15:30:00Z',
    lastUpdated: '2024-01-06T15:30:00Z',
    transactions: [
      {
        id: 'tx-010',
        accountId: 'ta-007',
        type: 'deposit',
        amount: 160000,
        description: '初始信托账户存款',
        reference: 'INIT-007',
        processedBy: 'admin-001',
        processedAt: '2024-01-06T15:30:00Z',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ta-008',
    parentId: 'ipa-008',
    accountNumber: 'TA-2024-008',
    currentBalance: 140000,
    initialDeposit: 140000,
    totalDeposits: 140000,
    totalWithdrawals: 0,
    status: 'active',
    createdAt: '2024-01-04T14:45:00Z',
    lastUpdated: '2024-01-04T14:45:00Z',
    transactions: [
      {
        id: 'tx-011',
        accountId: 'ta-008',
        type: 'deposit',
        amount: 140000,
        description: '初始信托账户存款',
        reference: 'INIT-008',
        processedBy: 'admin-001',
        processedAt: '2024-01-04T14:45:00Z',
        status: 'completed'
      }
    ]
  }
]
