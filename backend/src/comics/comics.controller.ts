import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { ComicsService } from "./comics.service";
import { CreateComicDto } from "./dto/create-comic.dto";
import { UpdateComicDto } from "./dto/update-comic.dto";

@Controller("comics")
@UseGuards(JwtAuthGuard)
export class ComicsController {
	constructor(private readonly comicsService: ComicsService) {}

	@Post()
	create(@Body() dto: CreateComicDto, @Request() req: { user: { userId: string } }) {
		return this.comicsService.create(dto, req.user.userId);
	}

	@Get()
	findAll(@Request() req: { user: { userId: string } }) {
		return this.comicsService.findAllByUser(req.user.userId);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.comicsService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() dto: UpdateComicDto) {
		return this.comicsService.update(id, dto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.comicsService.remove(id);
	}
}
