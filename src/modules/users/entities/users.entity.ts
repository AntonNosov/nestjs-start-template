import { IsDate, IsEmail, IsNotEmpty, MaxLength } from 'class-validator'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm'
import { Roles } from '../constants/Roles'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 50 })
  @MaxLength(50, { message: 'First name is too long' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string

  @Column({ length: 50 })
  @MaxLength(50, { message: 'Last name is too long' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string

  @Column({ length: 50 })
  @Unique([ 'login' ])
  @MaxLength(50, { message: 'Login is too long' })
  @IsNotEmpty({ message: 'Login is required' })
  login: string

  @Column({ nullable: true })
  @Unique([ 'email' ])
  @IsEmail()
  email: string

  @Column({ select: false, nullable: true })
  passwordHash: string

  @Column({ type: 'enum', enum: Roles, default: Roles.MANAGER })
  role: Roles

  @Column({ nullable: true })
  photo: string

  @Column({ default: false })
  active: boolean

  @Column({ type: 'timestamp', nullable: true })
  @IsDate()
  lastActivity: Date

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date
}