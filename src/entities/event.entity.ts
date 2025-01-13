import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  datetime: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  additionalInfo: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  ePreviewPhoto: string;
}
