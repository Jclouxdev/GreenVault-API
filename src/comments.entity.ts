import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./users/user.entity";

@Entity('comment')
export class CommentEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ type:"uuid", nullable: false})
    announcement_id: string;

    @Column({ 
        type: Date, 
        nullable: false 
    }) 
    creation_date: string;

    @Column({ 
        type: "varchar",  
    }) 
    message: string;

    @ManyToOne(type => UserEntity, user => user.comments)
    user: UserEntity;

}