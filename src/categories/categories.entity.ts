import { GroupsEntity } from "src/groups/groups.entity";
import { UserEntity } from "src/users/user.entity";
import { BeforeInsert, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('categories')
export class CategoriesEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"varchar", nullable: false, unique: true})
    name: string;

    @Column({type:'uuid', nullable: false})
    group_id: string;

    @ManyToOne(()=> GroupsEntity, categories => categories.categories)
    groups_id: GroupsEntity;

}