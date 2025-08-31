import { 
  SurrogateApplication, 
  IntendedParentApplication, 
  SurrogacyCase, 
  SocialPost,
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
    status: ApplicationStatus.PENDING,
    submittedAt: '2024-01-20T10:30:00Z',
    documents: [
      {
        id: 'doc-001',
        name: '医疗报告.pdf',
        type: 'medical',
        url: '/documents/medical-report-001.pdf',
        uploadedAt: '2024-01-20T10:30:00Z',
        verified: false
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
    status: ApplicationStatus.PENDING,
    submittedAt: '2024-01-25T16:45:00Z',
    documents: [
      {
        id: 'doc-003',
        name: '收入证明.pdf',
        type: 'financial',
        url: '/documents/income-proof-001.pdf',
        uploadedAt: '2024-01-25T16:45:00Z',
        verified: false
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
