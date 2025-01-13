import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  additionalInfo: string;

  @Column({ nullable: true })
  link: string;

  @Column({ nullable: true })
  nPreviewPhoto: string;
}
