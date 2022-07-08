import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

import { IsNotEmpty } from 'class-validator';

@Entity()
@Index(['id'])
export default class Posts {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar', width: 50, nullable: false })
    @IsNotEmpty()
    userId!: string;

    @Column({ type: 'varchar', width: 150, nullable: false })
    @IsNotEmpty()
    postUrl?: string;

    @Column({ type: 'varchar', width: 150, nullable: false })
    @IsNotEmpty()
    postOriginalUrl?: string;

    @Column({ type: 'varchar', width: 200, nullable: false })
    caption!: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdDate?: Date;
}
