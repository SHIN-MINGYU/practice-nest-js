import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusVaild(value)) {
      throw new BadRequestException(
        `${value} is not a valid board status option`,
      );
    }
    return value;
  }

  isStatusVaild(status: any) {
    const index = this.StatusOption.indexOf(status);
    return index !== -1;
  }
}
