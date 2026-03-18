import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, type Types } from "mongoose";
import { ComicFormat } from "../enums/comic-format.enum";

@Schema({ timestamps: true })
export class Comic extends Document {
	@Prop({ required: true })
	title: string;

	@Prop({ required: true })
	author: string;

	@Prop()
	illustrator: string;

	@Prop({ required: true })
	publisher: string;

	@Prop({ required: true })
	year: number;

	@Prop()
	volume: number;

	@Prop({ required: true })
	genre: string;

	@Prop({ required: true, enum: ComicFormat })
	format: ComicFormat;

	@Prop({ required: true, ref: "User", index: true })
	userId: Types.ObjectId;
}

export const ComicSchema = SchemaFactory.createForClass(Comic);
