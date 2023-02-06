import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { WishlistEntity } from "./wishlist.entity";

@Entity('announcement')
export class announcementEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ 
        type: "varchar", 
        length: 100, 
        nullable: false 
    })
    title: string;

    @Column({ type: "float", nullable: false})
    price: number;

    @Column({ 
        type: "text", 
        nullable: false 
    })
    description: string;

    @Column({ 
        type: "varchar",  
    })
    categories: string;

    @Column({
        type: Date,
        nullable: false
    })
    creation_date: string;

    @OneToOne(type => WishlistEntity, wishlist => wishlist.user)
    wishlist: WishlistEntity;
}