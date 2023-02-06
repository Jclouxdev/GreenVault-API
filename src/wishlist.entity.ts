import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('wishlist')
export class WishlistEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ type:"uuid", nullable: false})
    advertisement_id: string;

    @ManyToOne(type => UserEntity, user => user.wishlist)
    user: UserEntity;

    @ManyToOne(type => AdvertisementEntity, advertisement => advertisement.wishlist)
    advertisement: AdvertisementEntity;
}