import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('groups')
export class GroupsEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"varchar", nullable: false})
    name: string;
}