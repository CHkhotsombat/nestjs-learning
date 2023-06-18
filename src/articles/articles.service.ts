import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  findAll(where = {}) {
    return this.prisma.article.findMany({
      where: { ...where },
      orderBy: { updatedAt: 'desc' },
    });
  }

  findPaging(where = {}, skip = 0, take = 10) {
    return this.prisma.$transaction([
      this.prisma.article.count({ where }),
      this.prisma.article.findMany({
        skip: skip * take,
        take,
        where,
      }),
    ]);
  }

  findDrafts(where = {}) {
    return this.prisma.article.findMany({
      where: { published: false, ...where },
    });
  }

  findOne(where = {}) {
    return this.prisma.article.findUnique({
      where: { ...where },
      include: { author: true },
    });
  }

  update(where = {}, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { ...where },
      data: updateArticleDto,
    });
  }

  remove(where = {}) {
    return this.prisma.article.delete({ where: { ...where } });
  }
}
