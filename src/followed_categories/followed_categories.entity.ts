import { BeforeInsert, Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../users/user.entity";
import { AnnouncementsEntity } from "../announcements/announcement.entity";

@Entity('wishlist')
export class FollowedCategoriesEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ type:"uuid", nullable: false})
    categories_id: string;

    @ManyToMany(() => UserEntity, user => user.categories)
    user: UserEntity[]

    @ManyToOne(() => AnnouncementsEntity, announcements => announcements.wishlist)
    announcements: AnnouncementsEntity;
}