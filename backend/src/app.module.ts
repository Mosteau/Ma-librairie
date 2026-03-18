import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ThrottlerModule } from "@nestjs/throttler";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ComicsModule } from "./comics/comics.module";
import { MoviesModule } from "./movies/movies.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRoot(
			process.env.MONGODB_URI || "mongodb://localhost:27017/collection-manager",
			{
				maxPoolSize: 10,
				minPoolSize: 2,
				serverSelectionTimeoutMS: 5000,
				socketTimeoutMS: 45000,
				connectTimeoutMS: 10000,
			},
		),
		ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
		UsersModule,
		AuthModule,
		MoviesModule,
		ComicsModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
