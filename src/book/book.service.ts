import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  @Inject(DbService)
  private readonly dbService: DbService;

  async create(createBookDto: CreateBookDto) {
    const books: Book[] = await this.dbService.read<Book>();
    const foundBook = books.find(
      (item) =>
        item.name === createBookDto.name &&
        item.author === createBookDto.author,
    );
    if (foundBook) {
      throw new BadRequestException('该书籍已经存在');
    }
    const book = new Book();
    book.id = uuid();
    book.name = createBookDto.name;
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;
    book.createdAt = new Date().getTime();
    books.push(book);
    await this.dbService.write(books);
    return book;
  }

  async list() {
    const books: Book[] = await this.dbService.read<Book>();
    if (!Array.isArray(books) || books.length === 0) {
      return [];
    }
    return books;
  }

  async findById(id: string) {
    const books: Book[] = await this.dbService.read<Book>();
    const foundBook = books.find((item) => item.id === id);
    if (!foundBook) {
      throw new BadRequestException('该书籍不存在');
    }
    return foundBook;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.dbService.read<Book>();
    const foundBook = books.find((item) => item.id === updateBookDto.id);
    if (!foundBook) {
      throw new BadRequestException('该书籍不存在');
    }

    foundBook.name = updateBookDto.name;
    foundBook.author = updateBookDto.author;
    foundBook.description = updateBookDto.description;
    foundBook.cover = updateBookDto.cover;
    foundBook.updatedAt = new Date().getTime();
    await this.dbService.write(books);
    return updateBookDto;
  }

  async delete(id: string) {
    const books: Book[] = await this.dbService.read<Book>();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      await this.dbService.write(books);
      return { message: '删除成功' };
    } else {
      throw new BadRequestException('该书籍不存在');
    }
  }
}
