import { AnnouncementsEntity } from 'src/announcements/announcement.entity';
import { GroupsEntity } from 'src/groups/groups.entity';
import { UserEntity } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class CategoriesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'uuid', nullable: false })
  group_id: string;

  @ManyToMany(() => UserEntity, (user) => user.categories)
  user: UserEntity[];

  @ManyToOne(() => GroupsEntity, (group) => group.categories)
  groups_id: GroupsEntity[];

  @OneToMany(
    () => AnnouncementsEntity,
    (announcement) => announcement.categories,
  )
  announcements: AnnouncementsEntity[];
}
