import { Article } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true, description: 'คำอธิบาย' })
  description: string;

  @ApiProperty({ description: 'เนื้อหา' })
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty({ description: 'UTC Time' })
  createdAt: Date;

  @ApiProperty({ description: 'UTC Time' })
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true, description: 'ผู้แต่ง' })
  authorId: number | null;

  @ApiProperty({ required: false, nullable: true, description: 'ผู้แต่ง' })
  author?: UserEntity;

  constructor({ author, ...data }: Partial<ArticleEntity>) {
    Object.assign(this, data);
    if (author) {
      this.author = new UserEntity(author);
    }
  }
}