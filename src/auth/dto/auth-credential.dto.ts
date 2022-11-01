import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // available just english and number characters
  @Matches(/^[a-zA-z0-9]*$/, {
    message: 'password only access english and number',
  })
  password: string;
}
