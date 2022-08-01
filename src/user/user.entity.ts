import { genSaltSync, hashSync } from "bcrypt";
import { Poem } from "../poem/poem.entity";
import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToMany(type => Poem, poem => poem.user, { nullable: true })
    poems?: Poem[];

    @ManyToMany(() => Poem, (Poem) => Poem.likes)
    likedPoems?: Poem[];

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
    }
}