import { User } from "../user/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Poem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ length: 800 })
    description: string;

    @ManyToOne(type => User, user => user.poems, { cascade: true })
    user: User;

    @ManyToMany(() => User, (user) => user.likedPoems, { cascade: true })
    @JoinTable()
    likes?: User[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    constructor(props: Omit<Poem, 'id'>) {
        Object.assign(this, props);
    }
}