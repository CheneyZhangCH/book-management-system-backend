import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './my-file-storage';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('list')
  list() {
    return this.bookService.list();
  }

  @Post('create')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Post('update')
  update(@Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(updateBookDto);
  }

  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.bookService.delete(id);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads', // 上传文件存储的目录
      limits: { fileSize: 5 * 1024 * 1024 }, // 限制文件大小为5MB
      storage: storage, // 使用自定义存储引擎
      // 只允许上传图片文件
      fileFilter: (req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          return callback(new BadRequestException('只允许上传图片文件'), false);
        }
        callback(null, true);
      },
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file.path;
  }
}
