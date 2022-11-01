import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { User } from '../auth/auth.entity';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardRepository) {}

  /**
   * @return {Array<Board>} - all of the boards data
   */
  async getAllBoards(user: User): Promise<Array<Board>> {
    const query = await this.boardsRepository.createQueryBuilder('board');
    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
    // return await this.boardsRepository.find();
  }

  /**
   * @description - create board data
   * @returns {Board} - board data what you create
   */
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return this.boardsRepository.createBoard(createBoardDto, user);
  }

  /**
   * @description - search in Board Array by id
   * @param {number} id what board you want to search
   * @returns {Board} - Board what you searched by id
   */
  async getBoardById(id: number): Promise<Board> {
    const foundBaord = this.boardsRepository.findOne({
      where: {
        id,
      },
    });

    if (!foundBaord) {
      throw new NotFoundException("Can't find board by id '" + id);
    }

    return foundBaord;
  }

  /**
   * @description - delete Board in Board Array by id
   * @param {number} id what board you want to delete
   */
  async deleteBoardById(id: number, user: User) {
    const result = await this.boardsRepository.delete({
      id,
      user: user as any,
    });
    if (result.affected === 0) {
      throw new NotFoundException('Can not find board with id ' + id);
    }
  }

  /**
   * @description - update Board in Board Array by id
   * @param {number} id what board you want to update
   * @param {BoardStatus} status
   */
  async updateBoardStatusById(
    id: number,
    status: BoardStatus,
  ): Promise<UpdateResult> {
    const board = this.boardsRepository.update(id, {
      status,
    });

    return board;
  }
}
