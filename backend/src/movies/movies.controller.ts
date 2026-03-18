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
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MoviesService } from "./movies.service";

@Controller("movies")
@UseGuards(JwtAuthGuard)
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Post()
	create(@Body() dto: CreateMovieDto, @Request() req: { user: { userId: string } }) {
		return this.moviesService.create(dto, req.user.userId);
	}

	@Get()
	findAll(@Request() req: { user: { userId: string } }) {
		return this.moviesService.findAllByUser(req.user.userId);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.moviesService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() dto: UpdateMovieDto) {
		return this.moviesService.update(id, dto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.moviesService.remove(id);
	}
}
