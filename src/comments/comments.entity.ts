import { AnnouncementsEntity } from "src/announcements/announcement.entity";
import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";

@Entity('comment')
export class CommentEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ type:"uuid", nullable: false})
    announcement_id: string;

    @CreateDateColumn({ 
        type: "datetime", 
        nullable: false,
    }) 
    creation_date: Date;

    @Column({ 
        type: "varchar",  
    }) 
    message: string;

    @ManyToOne(() => UserEntity, user => user.comments)
    user: UserEntity;

    @ManyToOne(() => AnnouncementsEntity, announcement => announcement.comments)
    announcement: AnnouncementsEntity

}