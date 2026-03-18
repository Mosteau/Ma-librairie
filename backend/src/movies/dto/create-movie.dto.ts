import { IsEnum, IsNumber, IsString } from "class-validator";
import { MovieFormat } from "../enums/movie-format.enum";

export class CreateMovieDto {
	@IsString()
	title: string;

	@IsString()
	director: string;

	@IsNumber()
	year: number;

	@IsString()
	description: string;

	@IsEnum(MovieFormat)
	format: MovieFormat;

	@IsString()
	genre: string;
}
