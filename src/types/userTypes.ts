import { Role, VerifiedStatus } from './statusTypes'

export type User = {
  id: string 
	ref?: string
	name: string
	email?: string
	phone?: string
  password?: string
	role: Role
	status: string
	emailStatus?: VerifiedStatus
  phoneStatus?: VerifiedStatus
	locale: string
	timezone: string
	createdAt: Date
	updatedAt: Date
  deletedAt: Date
}