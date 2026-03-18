import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { type Model, Types } from "mongoose";
import { CreateComicDto } from "./dto/create-comic.dto";
import { UpdateComicDto } from "./dto/update-comic.dto";
import { Comic } from "./schema/comic.schema";

@Injectable()
export class ComicsService {
	constructor(@InjectModel(Comic.name) private comicModel: Model<Comic>) {}

	async create(createComicDto: CreateComicDto, userId: string): Promise<Comic> {
		const comic = new this.comicModel({ ...createComicDto, userId });
		return comic.save();
	}

	async findAllByUser(userId: string): Promise<Comic[]> {
		return this.comicModel.find({ userId: new Types.ObjectId(userId) }).exec();
	}

	async findOne(id: string): Promise<Comic> {
		const comic = await this.comicModel.findById(id).exec();
		if (!comic) throw new NotFoundException(`Comic ${id} not found`);
		return comic;
	}

	async update(id: string, updateData: UpdateComicDto): Promise<Comic> {
		const comic = await this.comicModel
			.findByIdAndUpdate(id, updateData, { new: true })
			.exec();
		if (!comic) throw new NotFoundException(`Comic ${id} not found`);
		return comic;
	}

	async remove(id: string): Promise<void> {
		const result = await this.comicModel.findByIdAndDelete(id).exec();
		if (!result) throw new NotFoundException(`Comic ${id} not found`);
	}
}
