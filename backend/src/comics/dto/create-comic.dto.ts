import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ComicFormat } from "../enums/comic-format.enum";

export class CreateComicDto {
	@IsString()
	title: string;

	@IsString()
	author: string;

	@IsOptional()
	@IsString()
	illustrator?: string;

	@IsString()
	publisher: string;

	@IsNumber()
	year: number;

	@IsOptional()
	@IsNumber()
	volume?: number;

	@IsString()
	genre: string;

	@IsEnum(ComicFormat)
	format: ComicFormat;
}
