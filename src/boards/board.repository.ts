import { Repository } from 'typeorm';
import { CustomRepository } from '../util/typeorm-ex.decorator';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  /**
   * @description - create board data in postgres database
   * @returns {Board} - board data what you create
   */
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const board = this.create({
      ...createBoardDto,
      status: BoardStatus.PUBLIC,
    });
    await this.save(board);
    return board;
  }
}
