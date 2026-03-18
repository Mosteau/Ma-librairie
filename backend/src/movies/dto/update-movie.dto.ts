import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { MovieFormat } from "../enums/movie-format.enum";

export class UpdateMovieDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	director?: string;

	@IsOptional()
	@IsNumber()
	year?: number;

	@IsOptional()
	@IsString()
	description?: string;

	@IsOptional()
	@IsEnum(MovieFormat)
	format?: MovieFormat;

	@IsOptional()
	@IsString()
	genre?: string;
}
