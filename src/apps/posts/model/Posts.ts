import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import { IsNotEmpty } from 'class-validator';

import Users from '../../users/model/Users';
import Comments from '../../comments/model/Comments';

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

    @Column({ type: 'varchar', width: 200, nullable: true })
    caption!: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    createdDate?: Date;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'userId' })
    user?: Users;

    @OneToMany(() => Comments, (comment) => comment.post, { eager: true })
    comments?: Comments[];
}
