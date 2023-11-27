import { Body, Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { EditorService } from './editor.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RequestWithIdDto } from './dto/request-with-id.dto';
import { CreatePageDto } from './dto/create-page.dto';

@Controller('editor')
@ApiTags('editor')
export class EditorController {
  constructor(private readonly editorService: EditorService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAllPage(@Param('id') userId: string) {
    return await this.editorService.getAllPageTitle(userId);
  }

  @Post('content')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPageContent(@Body() dto: RequestWithIdDto) {
    return await this.editorService.getPageContent(dto);
  }

  @Post('hitory')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getPageHistoryChange(@Body() dto: RequestWithIdDto) {
    return await this.editorService.getPageHistoryChange(dto);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async createPage(@Body() dto: CreatePageDto) {
    return await this.editorService.createPage(dto);
  }
}
