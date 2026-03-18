import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import type { Model } from "mongoose";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
		const createdUser = new this.userModel({
			...createUserDto,
			password: hashedPassword,
		});
		return createdUser.save();
	}

	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	async findOne(id: string): Promise<User | null> {
		return this.userModel.findById(id).exec();
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({ email }).select("+password").exec();
	}

	async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
		if (updateUserDto.password) {
			updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
		}
		return this.userModel
			.findByIdAndUpdate(id, updateUserDto, { new: true })
			.exec();
	}

	async remove(id: string): Promise<User | null> {
		return this.userModel.findByIdAndDelete(id).exec();
	}
}
