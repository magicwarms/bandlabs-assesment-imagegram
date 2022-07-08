import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';

import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

import Posts from '../../posts/model/Posts';
import Users from '../../users/model/Users';

@Entity()
@Index(['id'])
export default class Comments {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ type: 'varchar', width: 50, nullable: false })
    @IsNotEmpty()
    commentedBy!: string;

    @Column({ type: 'varchar', width: 120, nullable: false })
    @MinLength(2, {
        message: 'Comment is too short, Min. $constraint1 character',
    })
    @MaxLength(120, {
        message: 'Comment is too long, Max. $constraint1 character',
    })
    @IsNotEmpty()
    comments!: string;

    @Column({ type: 'varchar', width: 150, nullable: false })
    @IsNotEmpty()
    postId!: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdDate?: Date;

    @ManyToOne(() => Posts)
    post!: Posts;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'commentedBy' })
    user!: Users;
}
