export enum ApplicationStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW'
}

export enum CaseStatus {
  CREATED = 'CREATED',
  ASSIGNED_TO_AGENCY = 'ASSIGNED_TO_AGENCY',
  DOCUMENT_COLLECTION = 'DOCUMENT_COLLECTION',
  LEGAL_REVIEW = 'LEGAL_REVIEW',
  MEDICAL_PREPARATION = 'MEDICAL_PREPARATION',
  EMBRYO_TRANSFER = 'EMBRYO_TRANSFER',
  PREGNANCY_MONITORING = 'PREGNANCY_MONITORING',
  DELIVERY = 'DELIVERY',
  COMPLETED = 'COMPLETED'
}

export interface SurrogateApplication {
  id: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  age: number
  location: {
    country: string
    state: string
    city: string
  }
  maritalStatus: string
  numberOfChildren: number
  previousSurrogacyExperience: boolean
  medicalHistory: string
  motivation: string
  expectedCompensation: number
  availabilityDate: string
  status: ApplicationStatus
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNotes?: string
  documents: ApplicationDocument[]
}

export interface IntendedParentApplication {
  id: string
  coupleNames: string
  primaryEmail: string
  secondaryEmail?: string
  phone: string
  location: {
    country: string
    state: string
    city: string
  }
  ageRange: string
  relationshipStatus: string
  fertilityHistory: string
  previousAttempts: number
  expectedTimeline: string
  budget: {
    min: number
    max: number
  }
  preferredSurrogateProfile: {
    ageRange: string
    location: string
    experience: boolean
    other: string
  }
  medicalRequirements: string
  legalQuestions: string
  status: ApplicationStatus
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  reviewNotes?: string
  documents: ApplicationDocument[]
}

export interface ApplicationDocument {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
  verified: boolean
}

export interface SurrogacyCase {
  id: string
  caseNumber: string
  intendedParents: {
    applicationId: string
    names: string
    email: string
    location: {
      country: string
      state: string
      city: string
    }
    budget: {
      min: number
      max: number
    }
    urgency: 'high' | 'medium' | 'low'
  }
  surrogate: {
    applicationId: string
    name: string
    email: string
    age: number
    location: {
      country: string
      state: string
      city: string
    }
    experience: string
    status: string
    expectedCompensation: number
    availableFrom: string
  }
  assignedAgency?: {
    agencyId: string
    agencyName: string
    agentName: string
  }
  status: CaseStatus
  createdAt: string
  startDate: string
  createdBy: string
  assignedAt?: string
  timeline: CaseTimeline[]
  documents: CaseDocument[]
  notes: CaseNote[]
}

export interface CaseTimeline {
  id: string
  stage: CaseStatus
  completedAt?: string
  notes?: string
  completedBy?: string
}

export interface CaseDocument {
  id: string
  name: string
  type: string
  category: 'legal' | 'medical' | 'financial' | 'other'
  url: string
  uploadedAt: string
  uploadedBy: string
  verified: boolean
  visibleTo: ('admin' | 'agency' | 'surrogate' | 'intended_parent')[]
}

export interface CaseNote {
  id: string
  content: string
  createdAt: string
  createdBy: string
  type: 'general' | 'medical' | 'legal' | 'communication'
  visibleTo: ('admin' | 'agency' | 'surrogate' | 'intended_parent')[]
}

export interface SocialPost {
  id: string
  surrogateId: string
  caseId: string
  content: string
  images: string[]
  type: 'daily_life' | 'health_update' | 'milestone' | 'mood'
  postedAt: string
  likes: number
  comments: SocialComment[]
  visibleTo: ('intended_parent' | 'admin' | 'agency')[]
}

export interface SocialComment {
  id: string
  content: string
  authorId: string
  authorName: string
  authorRole: string
  createdAt: string
}

export interface TrustAccount {
  id: string
  parentId: string
  accountNumber: string
  currentBalance: number
  initialDeposit: number
  totalDeposits: number
  totalWithdrawals: number
  status: 'active' | 'suspended' | 'closed'
  createdAt: string
  lastUpdated: string
  transactions: TrustAccountTransaction[]
}

export interface TrustAccountTransaction {
  id: string
  accountId: string
  type: 'deposit' | 'withdrawal' | 'fee' | 'refund'
  amount: number
  description: string
  reference: string
  processedBy: string
  processedAt: string
  status: 'pending' | 'completed' | 'failed'
}
