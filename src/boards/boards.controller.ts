import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateResult } from 'typeorm';
import { User } from '../auth/auth.entity';
import { GetUser } from '../auth/get-user.decorator';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardsController');
  constructor(private boardsService: BoardsService) {}

  // URL : "/boards"
  // Method : GET
  // return all boards data
  @Get('/')
  getAllBoards(@GetUser() user: User): Promise<Array<Board>> {
    this.logger.verbose(`user ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoards(user);
  }

  // URL : "/boards"
  // Method : POST
  // return created boards data
  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto, @GetUser() user: User) {
    this.logger.verbose(
      `user ${user.username} creating a new board. Payload : ${JSON.stringify(
        createBoardDto,
      )}`,
    );
    return this.boardsService.createBoard(createBoardDto, user);
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
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    this.boardsService.deleteBoardById(id, user);
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
