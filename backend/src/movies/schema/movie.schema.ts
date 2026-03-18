import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, type Types } from "mongoose";
import { MovieFormat } from "../enums/movie-format.enum";

@Schema({ timestamps: true })
export class Movie extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	director: string;

	@Prop({ required: true })
	year: number;

	@Prop({ required: true })
	description: string;

	@Prop({ required: true, enum: MovieFormat })
	format: MovieFormat;

	@Prop({ required: true })
	genre: string;

	@Prop({ required: true, ref: "User", index: true })
	userId: Types.ObjectId;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
