import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import type { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async register(createUserDto: CreateUserDto) {
		const existing = await this.usersService.findByEmail(createUserDto.email);
		if (existing) throw new ConflictException("Email already in use");

		const user = await this.usersService.create(createUserDto);
		const payload = { sub: user._id.toString(), email: user.email };
		return { access_token: this.jwtService.sign(payload) };
	}

	async login(email: string, password: string) {
		const user = await this.usersService.findByEmail(email);
		if (!user) throw new UnauthorizedException("Invalid credentials");

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new UnauthorizedException("Invalid credentials");

		const payload = { sub: user._id.toString(), email: user.email };
		return { access_token: this.jwtService.sign(payload) };
	}
}
