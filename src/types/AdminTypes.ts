export interface CycleType {
  id: number
  name: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string,
  description: string
}

export interface UsersType {
    id: string,
    full_name: string,
    email: string,
    role: string,
    is_active: boolean,
    profile_picture: string
}

export interface AnalyticsType {
    total_applicants: number,
    acceptance_rate: number,
    average_review_time_days: number,
    application_funnel: {
      pending_review: number,
      in_progress: number,
    },
    school_distribution: Record<string, number>;
    country_distribution: Record<string, number>;
}

export interface AnalyticsResponseType {
  success: boolean,
  data: AnalyticsType,
  message: string
}

export interface CycleResponseType {
  success: boolean,
  data: {
    cycles: CycleType[],
    total_count: number,
    page: number,
    limit: number
  },
  message: string
}

export interface UsersResponseType {
    success: boolean,
    data: {
        users: UsersType[],
        total_count: number,
        page: number,
        limit: number
    },
    message: string
}

export interface ActiveCyclesResponse {
  success: boolean,
  data: {
    cycles: CycleType,
    total_count: number,
    page: number,
    limit: number
  },
  message: string
}

