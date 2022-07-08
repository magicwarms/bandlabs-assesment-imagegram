import { DataSource } from 'typeorm';

import User from '../apps/users/model/Users';
import Posts from '../apps/posts/model/Posts';
import Comments from '../apps/comments/model/Comments';

const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'ec2-52-20-166-21.compute-1.amazonaws.com',
    port: 5432,
    username: 'cebzwqmgztokct',
    password: '4f61008659d3568b6fe79f2d2839af2c1f10f3fe035ab3057e5ff269339b505d',
    database: 'de1il4h1p95pgd',
    applicationName: 'bandlab-assesment-andhana',
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: process.env.NODE_ENV === 'production' ? false : true,
    entities: [User, Posts, Comments],
    logging: process.env.NODE_ENV === 'production' ? false : true,
});

export default AppDataSource;
