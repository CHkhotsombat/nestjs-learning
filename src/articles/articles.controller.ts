import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/decolator/user.decolator';
@Controller('articles')
@UseGuards(JwtAuthGuard)
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@User() user, @Body() createArticleDto: CreateArticleDto) {
    createArticleDto.authorId = user.id;

    return new ArticleEntity(
      await this.articlesService.create(createArticleDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findPaging(
    @User() user,
    @Query('published') published?: boolean,
    @Query('page', new DefaultValuePipe(1)) page?: number,
    @Query('perPage', new DefaultValuePipe(10)) perPage?: number,
  ) {
    const [count, articles] = await this.articlesService.findPaging(
      {
        authorId: user.id,
        published,
      },
      page - 1,
      perPage,
    );

    return {
      total: count,
      articles: articles.map((article) => new ArticleEntity(article)),
    };
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts(@User() user) {
    const articles = await this.articlesService.findDrafts({
      authorId: user.id,
    });

    return articles.map((article) => new ArticleEntity(article));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@User() user, @Param('id', ParseIntPipe) id: number) {
    const article = await this.articlesService.findOne({
      id: id,
      authorId: user.id,
    });

    if (!article) {
      throw new NotFoundException(`Article with id = ${id} does not exist.`);
    }

    return new ArticleEntity(article);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async update(
    @User() user,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return new ArticleEntity(
      await this.articlesService.update(
        { id, authorId: user.id },
        updateArticleDto,
      ),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@User() user, @Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(
      await this.articlesService.remove({ id, authorId: user.id }),
    );
  }
}
