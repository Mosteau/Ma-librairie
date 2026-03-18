import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ComicsController } from "./comics.controller";
import { ComicsService } from "./comics.service";
import { Comic, ComicSchema } from "./schema/comic.schema";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Comic.name, schema: ComicSchema }]),
	],
	controllers: [ComicsController],
	providers: [ComicsService],
})
export class ComicsModule {}
