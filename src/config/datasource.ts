import { DataSource } from 'typeorm';

import User from '../apps/users/model/Users';
import Posts from '../apps/posts/model/Posts';

const AppDataSource = new DataSource({
    type: 'postgres',
    // host: 'ec2-52-20-166-21.compute-1.amazonaws.com',
    host: 'localhost',
    port: 5432,
    // username: 'cebzwqmgztokct',
    username: 'postgres',
    // password: '4f61008659d3568b6fe79f2d2839af2c1f10f3fe035ab3057e5ff269339b505d',
    password: 'root',
    database: 'bandlabs-assesment',
    applicationName: 'bandlab-assesment-andhana',
    // ssl: {
    //     rejectUnauthorized: false,
    // },
    synchronize: true,
    entities: [User, Posts],
});

export default AppDataSource;
