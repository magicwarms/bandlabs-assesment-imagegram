import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

import { IsNotEmpty, IsLowercase, MinLength, MaxLength } from 'class-validator';

@Entity()
@Index(['id'])
export default class Users {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar', width: 50, nullable: false, unique: true })
    @IsNotEmpty()
    @IsLowercase()
    username!: string;

    @Column({ type: 'varchar', width: 150, nullable: false })
    @MinLength(6, {
        message: 'Password is too short, Min. $constraint1 character',
    })
    @MaxLength(30, {
        message: 'Password is too long, Max. $constraint1 character',
    })
    @IsNotEmpty()
    password?: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdDate?: Date;
}
