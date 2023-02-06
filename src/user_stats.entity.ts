import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('user_stats')
export class UserStatsEntity {  
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type:"uuid", nullable: false})
    user_id: string;

    @Column({ type: "integer", nullable: false})
    comments_posted: number;

    @Column({ type: "integer", nullable: false})
    advertisements_posted: number;

    @Column({ type: "integer", nullable: false})
    advertisements_completed: number;

    @Column({ type: "float", nullable: false})
    total_earned: number;

    @Column({ type: "float", nullable: false})
    monthly_earned: number;

    @ManyToOne(type => UserEntity, user => user.stats)
    user: UserEntity;
}