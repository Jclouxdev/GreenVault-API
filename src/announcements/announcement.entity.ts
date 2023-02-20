import { CategoriesEntity } from "src/categories/categories.entity";
import { CommentEntity } from "src/comments/comments.entity";
import { UserEntity } from "src/users/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { WishlistEntity } from "../wishlist/wishlist.entity";

@Entity('announcement')
export class AnnouncementsEntity {
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
    categorie: string;

    @CreateDateColumn({ 
        type: "datetime", 
        nullable: false,
    }) 
    creation_date: Date;

    @Column({
        type: "boolean",
    })
    status: boolean;

    @Column({
        type: "datetime",
        nullable: false
    })
    paiement_date: string;

    @Column({
        type: "boolean",
    })
    reported: boolean;

    @Column({
        type: "boolean",
    })
    hidden: boolean;

    @OneToOne(() => WishlistEntity, wishlist => wishlist.user)
    wishlist: WishlistEntity;

    @ManyToOne(() => CategoriesEntity, categories => categories.announcements)
    categories: CategoriesEntity[]

    @ManyToOne(() => UserEntity, user => user.user)
    users_id: UserEntity

    @OneToMany(() => CommentEntity, comment => comment.announcement)
    comments: CommentEntity
}