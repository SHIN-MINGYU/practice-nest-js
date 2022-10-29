import { IsNotEmpty } from 'class-validator';

/**
 * @property title - name of board
 * @property description - description of board
 * @description DTO of creating a new board data
 */
export class CreateBoardDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
