export interface CycleType {
  id: number
  name: string
  start_date: string
  end_date: string
  is_active: boolean
  created_at: string
}

export interface UsersType {
    id: string,
    full_name: string,
    email: string,
    role: string,
    is_active: boolean
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