import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  login: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  contactInfo: string;

  @Column({ nullable: true })
  avatar: string;
}
