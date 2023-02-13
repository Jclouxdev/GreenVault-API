import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { AnnouncementsEntity } from "../announcements/announcement.entity";

@Entity('wishlist')
export class WishlistEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ type:"uuid", nullable: false})
    announcement_id: string;

    @ManyToOne(() => UserEntity, user => user.wishlist)
    user: UserEntity;

    @ManyToOne(() => AnnouncementsEntity, announcements => announcements.wishlist)
    announcements: AnnouncementsEntity;
}