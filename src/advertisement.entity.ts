import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('advertisement')
export class AdvertisementEntity {
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
}