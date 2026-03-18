import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { type Model, Types } from "mongoose";
import type { CreateMovieDto } from "./dto/create-movie.dto";
import type { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./schema/movie.schema";

@Injectable()
export class MoviesService {
	constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

	async create(createMovieDto: CreateMovieDto, userId: string): Promise<Movie> {
		const movie = new this.movieModel({ ...createMovieDto, userId });
		return movie.save();
	}

	async findAllByUser(userId: string): Promise<Movie[]> {
		return this.movieModel.find({ userId: new Types.ObjectId(userId) }).exec();
	}

	async findOne(id: string): Promise<Movie> {
		const movie = await this.movieModel.findById(id).exec();
		if (!movie) throw new NotFoundException(`Movie ${id} not found`);
		return movie;
	}

	async update(id: string, updateData: UpdateMovieDto): Promise<Movie> {
		const movie = await this.movieModel
			.findByIdAndUpdate(id, updateData, { new: true })
			.exec();
		if (!movie) throw new NotFoundException(`Movie ${id} not found`);
		return movie;
	}

	async remove(id: string): Promise<void> {
		const result = await this.movieModel.findByIdAndDelete(id).exec();
		if (!result) throw new NotFoundException(`Movie ${id} not found`);
	}
}
