import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';
import { CommentEntity } from "src/comments/comments.entity";
import { WishlistEntity } from "src/wishlist/wishlist.entity";
import { CategoriesEntity } from "src/categories/categories.entity";

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

    @Column({ type: "boolean", nullable: false, default: false})
    Admin: boolean;

    @Column({ type: "float", nullable: false, default: 100})
    wallet: number;

    @CreateDateColumn({ 
        type: "datetime", 
        nullable: false,
    }) 
    creation_date: Date;

    @BeforeInsert()  
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);  
    }

    @OneToMany(type => CommentEntity, comment => comment.user)
    comments: CommentEntity[];

    @OneToMany(type => WishlistEntity, wishlist => wishlist.user)
    wishlist: WishlistEntity[];

    @ManyToMany(() => CategoriesEntity, categories => categories.user)
    categories: CategoriesEntity[]
}

