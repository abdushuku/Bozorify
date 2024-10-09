import { IsIn } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 15 })
  phone_number: string;

  @IsIn(['male', 'female'], {
    message:'Gender must be male or female'
  })
  @Column({default:null})
  gender: string;
  
  
  
}
