import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  // URL : "/boards"
  // Method : GET
  // return all boards data
  @Get('/')
  getAllBoards(): Promise<Array<Board>> {
    return this.boardsService.getAllBoards();
  }

  // URL : "/boards"
  // Method : POST
  // return created boards data
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(createBoardDto);
  }

  // URL : "/boards/id"
  // Method : GET
  // return searched board data
  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // URL : "/boards?id='string'"
  // Method : DELETE
  // delete board data by id
  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id: number) {
    this.boardsService.deleteBoardById(id);
  }

  // URL : "/boards?id='string'"
  // Method : PATCH
  // update board data by id
  @Patch('/:id')
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<UpdateResult> {
    return this.boardsService.updateBoardStatusById(id, status);
  }
}
