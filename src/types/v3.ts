export type QuickLinkType = 'subscription' | 'payment' | 'onboarding' | 'society' | 'offer' | 'custom';

export interface QuickLink {
  id: string;
  type: QuickLinkType;
  label: string;
  slug: string;
  destination: string;
  targetEntityId?: string;
  expiresAt?: string;
  maxUses?: number;
  usedCount: number;
  password?: string;
  utmSource?: string;
  utmCampaign?: string;
  isActive: boolean;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  lastClickedAt?: string;
  metadata: Record<string, unknown>;
}

export type PaymentLinkType = 'one_time' | 'subscription' | 'installment';

export interface PaymentLink {
  id: string;
  title?: string;
  societyName?: string;
  amount: number;
  currency: string;
  planId?: string;
  userId?: string;
  orgId?: string;
  type: PaymentLinkType;
  installments?: { count: number; intervalDays: number };
  description: string;
  expiresAt: string;
  paidAt?: string;
  status: 'pending' | 'paid' | 'expired' | 'cancelled' | 'active';
  paymentGateway: 'stripe' | 'razorpay' | 'paypal' | 'manual';
  gatewayLinkUrl: string;
  url?: string;
  receiptUrl?: string;
  totalCollected?: number;
  totalPayments?: number;
  reminderSchedule: { daysBefore: number; type: 'email' | 'whatsapp' | 'sms' }[];
}

export interface Society {
  id: string;
  name: string;
  societyCode: string;
  adminContacts: { name: string; email: string; phone: string; role: string }[];
  connectionStatus: 'pending' | 'connected' | 'suspended' | 'churned';
  connectedAt?: string;
  subscriptionLinkId?: string;
  onboardingChecklist: { id: string; label: string; completed: boolean }[];
  billingContact: { name: string; email: string; phone: string };
  paymentMethod: 'online' | 'manual_transfer' | 'cheque' | 'cash';
  paymentTerms: 'prepaid' | 'postpaid' | 'net30' | 'net60';
}

export interface Offer {
  id: string;
  code: string;
  description?: string;
  societyName?: string;
  type: 'percent_off' | 'fixed_off' | 'free_trial_extension' | 'plan_upgrade_free' | 'bundle';
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  value: number;
  currency?: string;
  applicablePlans: string[];
  applicableUserSegments: string[];
  maxRedemptions: number | null;
  redeemedCount: number;
  usageCount?: number;
  usageLimit?: number;
  perUserLimit: number | null;
  validFrom: string;
  validUntil: string | null;
  expiresAt?: string;
  minimumOrderAmount?: number;
  stackable: boolean;
  autoApply: boolean;
  isActive: boolean;
  status?: 'active' | 'expired' | 'scheduled';
  createdBy: string;
}

export type LeadStage = 'new' | 'contacted' | 'demo_scheduled' | 'proposal_sent' | 'negotiating' | 'won' | 'lost';

export interface Lead {
  id: string;
  societyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  totalUnits: number;
  estimatedMRR: number;
  referredBy: {
    type: 'admin' | 'existing_society' | 'agent' | 'self';
    name: string;
    societyId?: string;
    agentCode?: string;
  };
  source: 'referral_form' | 'website' | 'cold_outreach' | 'event' | 'inbound';
  stage: LeadStage;
  lostReason?: string;
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
  };
  notes: { id: string; text: string; author: string; createdAt: string }[];
  activities: { id: string; type: string; description: string; createdAt: string }[];
  demoScheduledAt?: string;
  proposalSentAt?: string;
  expectedCloseDate?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  recipientId?: string;
  type: string;
  title: string;
  body?: string;
  message?: string;
  resourceType?: string;
  resourceId?: string;
  resourceUrl?: string;
  link?: string;
  actorId?: {
    id: string;
    name: string;
    avatar?: string;
  };
  isRead?: boolean;
  status?: 'read' | 'unread';
  readAt?: string;
  isDismissed?: boolean;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
  channel?: ('in_app' | 'email' | 'slack' | 'sms')[];
  deliveredChannels?: string[];
  scheduledFor?: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Referral {
  id: string;
  referrerId: string;
  referredId: string;
  referredName: string;
  status: 'pending' | 'contacted' | 'converted' | 'lost';
  rewardAmount: number;
  rewardStatus: 'pending' | 'paid' | 'cancelled';
  createdAt: string;
  convertedAt?: string;
}
