import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('global_stats')
export class GlobalStatsEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: "float", nullable: false})
    monthly_earned: number;

    @Column({ type: "integer", nullable: false})
    total_comments_posted: number;

    @Column({ type: "integer", nullable: false})
    total_announcements_posted: number;

    @Column({ type: "integer", nullable: false})
    total_announcements_completed: number;

    @Column({ type: "float", nullable: false})
    total_earned: number;
}