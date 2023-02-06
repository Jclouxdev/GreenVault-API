import { BeforeInsert, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CommentEntity } from "src/comments.entity";
import { WishlistEntity } from "src/wishlist.entity";
import { UserStatsEntity } from "src/user_stats.entity";

@Entity('user')
export class UserEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "varchar", nullable: false})
    username: string;

    @Column({ type: "varchar", nullable: false})
    email: string;

    @Column({ type: "varchar", nullable: false})
    password: string;

    @Column({ type: "varchar", nullable: false})
    role: string;

    @Column({ type: "float", nullable: false})
    wallet: number;

    @Column({ 
        type: Date, 
        nullable: false 
    }) 
    creation_date: string;

    @Column({ 
        type: "text", 
        array: true, 
        nullable: false 
    })
    followed_categories: string[];

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    @OneToMany(type => CommentEntity, comment => comment.user)
    comments: CommentEntity[];

    @OneToMany(type => WishlistEntity, wishlist => wishlist.user)
    wishlist: WishlistEntity[];

    @OneToOne(type => UserStatsEntity, stats => stats.user)
    stats: UserStatsEntity;
}

