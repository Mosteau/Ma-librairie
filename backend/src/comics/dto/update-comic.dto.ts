import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ComicFormat } from "../enums/comic-format.enum";

export class UpdateComicDto {
	@IsOptional()
	@IsString()
	title?: string;

	@IsOptional()
	@IsString()
	author?: string;

	@IsOptional()
	@IsString()
	illustrator?: string;

	@IsOptional()
	@IsString()
	publisher?: string;

	@IsOptional()
	@IsNumber()
	year?: number;

	@IsOptional()
	@IsNumber()
	volume?: number;

	@IsOptional()
	@IsString()
	genre?: string;

	@IsOptional()
	@IsEnum(ComicFormat)
	format?: ComicFormat;
}
