import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Array<Board> = [];
  private id: string = '1';

  /**
   * @return {Array<Board>} - all of the boards data
   */
  getAllBoards(): Array<Board> {
    return this.boards;
  }

  /**
   * @description - push board data in boards array
   * @returns {Board} - board data what you create
   */
  createBoard(createBoardDto: CreateBoardDto): Board {
    const board: Board = {
      id: this.id,
      status: BoardStatus.PUBLIC,
      ...createBoardDto,
    };
    this.boards.push(board);
    this.id = String(Number(this.id) + 1);

    return board;
  }

  /**
   * @description - search in Board Array by id
   * @param {string} id what board you want to search
   * @returns {Board} - Board what you searched by id
   */
  getBoardById(id: string): Board {
    const foundBaord = this.boards.find((board) => board.id === id);

    if (!foundBaord) {
      throw new NotFoundException("Can't find board by id '" + id);
    }

    return foundBaord;
  }

  /**
   * @description - delete Board in Board Array by id
   * @param {string} id what board you want to delete
   */
  deleteBoardById(id: string) {
    const foundBaord = this.boards.find((board) => board.id === id);
    this.boards.filter((board) => board.id === foundBaord.id);
  }

  /**
   * @description - update Board in Board Array by id
   * @param {string} id what board you want to update
   * @param {BoardStatus} status
   */
  updateBoardStatusById(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
