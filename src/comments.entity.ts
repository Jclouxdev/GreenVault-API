import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('comment')
export class CommentEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ type:"uuid", nullable: false})
    advertisement_id: string;

    @Column({ 
        type: Date, 
        nullable: false 
    }) 
    creation_date: string;

    @Column({ 
        type: "varchar",  
    }) 
    message: string;

}