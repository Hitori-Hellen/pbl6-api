import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Delete,
  HttpStatus,
  HttpCode,
  Patch,
} from '@nestjs/common';
import { EditorService } from './editor.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithIdAndTitleDto } from './dto/request-with-id-and-title.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { DeletePageDto } from './dto/delete-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('editor')
@ApiTags('editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/user/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAllPage(@Param('id') userId: string) {
    return await this.editorService.getAllPageTitle(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Post('content')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPageContent(@Body() dto: RequestWithIdAndTitleDto) {
    return await this.editorService.getPageContent(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createPage(@Body() dto: CreatePageDto) {
    return await this.editorService.createPageContent(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updatePageContent(@Body() dto: UpdatePageDto) {
    return await this.editorService.updatePageContent(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':title')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deletePage(@Body() dto: DeletePageDto) {
    return await this.editorService.deletePage(dto);
  }
}
