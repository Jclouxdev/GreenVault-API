import { UserEntity } from "src/users/user.entity";
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('categories')
export class CategroriesEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"varchar", nullable: false})
    name: string;

    @Column({type:'uuid', nullable: false})
    groupe_id: string;

    @ManyToMany(() => UserEntity, user => user.categories)
    user: UserEntity[]
}