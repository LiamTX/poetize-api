import { genSaltSync, hashSync } from "bcrypt";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    avatar?: string;

    @Column({ unique: true })
    username: string;

    @Column({ nullable: true })
    email?: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    constructor(props: Omit<User, 'id'>) {
        Object.assign(this, props);
    }

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, genSaltSync());
        console.log(this.password);
    }
}