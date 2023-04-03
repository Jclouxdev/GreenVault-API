import { CategoriesEntity } from 'src/categories/categories.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('groups')
export class GroupsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => CategoriesEntity, (groups) => groups.groups_id)
  categories: CategoriesEntity;
}
