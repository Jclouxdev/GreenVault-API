import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CommentEntity } from "src/comments/comments.entity";
import { WishlistEntity } from "src/wishlist/wishlist.entity";
import { CategroriesEntity } from "src/categories/categories.entity";

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

    @Column({ type: "boolean", nullable: false})
    Admin: boolean;

    @Column({ type: "float", nullable: false})
    wallet: number;

    @Column({ 
        type: "datetime", 
        nullable: false 
    }) 
    creation_date: string;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    @OneToMany(type => CommentEntity, comment => comment.user)
    comments: CommentEntity[];

    @OneToMany(type => WishlistEntity, wishlist => wishlist.user)
    wishlist: WishlistEntity[];

    @ManyToMany(() => CategroriesEntity, categories => categories.user)
    categories: CategroriesEntity[]
}

