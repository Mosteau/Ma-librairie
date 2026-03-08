/**
 * MODULE - Point d'assemblage du module Users
 * 
 * Un module NestJS regroupe tous les éléments liés à une fonctionnalité:
 * - Controllers (routes HTTP)
 * - Services (logique métier)
 * - Imports (dépendances externes)
 * - Exports (ce qui est accessible aux autres modules)
 * 
 * Principes SOLID appliqués:
 * - Single Responsibility: Assemble uniquement les composants du module Users
 * - Dependency Inversion: Utilise l'injection de dépendances
 * - Open/Closed: Extensible en ajoutant de nouveaux providers/controllers
 */

import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

/**
 * @Module() - Décorateur qui définit un module NestJS
 * 
 * Structure d'un module:
 * - imports: Modules externes nécessaires
 * - controllers: Controllers de ce module
 * - providers: Services et autres providers injectables
 * - exports: Ce qui est accessible aux autres modules
 */
@Module({
	/**
	 * imports - Modules dont ce module dépend
	 * 
	 * MongooseModule.forFeature() - Enregistre les schemas Mongoose pour ce module
	 * [{ name: User.name, schema: UserSchema }] - Associe le nom 'User' au UserSchema
	 * 
	 * Cela permet d'injecter Model<User> dans UsersService avec @InjectModel(User.name)
	 */
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],

	/**
	 * controllers - Liste des controllers de ce module
	 * 
	 * NestJS instancie automatiquement UsersController et configure ses routes
	 */
	controllers: [UsersController],

	/**
	 * providers - Liste des services et providers injectables
	 * 
	 * NestJS instancie UsersService et le rend disponible pour injection
	 * dans les controllers et autres services de ce module
	 */
	providers: [UsersService],

	/**
	 * exports - Ce qui est accessible aux autres modules
	 * 
	 * En exportant UsersService, d'autres modules peuvent l'importer et l'utiliser
	 * Exemple: Le module Auth pourra utiliser UsersService pour vérifier les credentials
	 * 
	 * Pour utiliser dans un autre module:
	 * 1. Importer UsersModule dans le module cible
	 * 2. Injecter UsersService dans le service/controller du module cible
	 */
	exports: [UsersService],
})
export class UsersModule {}
