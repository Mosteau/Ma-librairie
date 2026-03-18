/**
 * CONTROLLER - Gestion des routes HTTP du module Users
 *
 * Le controller est le point d'entrée de l'API. Il:
 * - Définit les routes HTTP (GET, POST, PATCH, DELETE)
 * - Reçoit les requêtes HTTP
 * - Valide les données (via les DTOs et ValidationPipe)
 * - Délègue la logique métier au Service
 * - Retourne les réponses HTTP
 *
 * Principes SOLID appliqués:
 * - Single Responsibility: Gère uniquement la couche HTTP, pas la logique métier
 * - Dependency Inversion: Dépend du service via injection de dépendances
 */

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import type { UsersService } from "./users.service";

/**
 * @Controller('users') - Décorateur qui définit le préfixe de route
 * Toutes les routes de ce controller commenceront par /users
 *
 * Exemple: @Get() dans ce controller = GET /users
 */
@Controller("users")
export class UsersController {
	/**
	 * Injection de dépendances
	 *
	 * private readonly usersService: UsersService
	 * - private: accessible uniquement dans cette classe
	 * - readonly: ne peut pas être réassigné après l'initialisation
	 *
	 * NestJS injecte automatiquement une instance de UsersService
	 */
	constructor(private readonly usersService: UsersService) {}

	/**
	 * CREATE - POST /users
	 *
	 * @Post() - Décorateur pour définir une route POST
	 * @Body() - Décorateur qui extrait le corps de la requête HTTP
	 *
	 * Le ValidationPipe (configuré dans main.ts) valide automatiquement
	 * createUserDto selon les règles définies dans CreateUserDto
	 *
	 * Exemple de requête:
	 * POST /users
	 * Body: { "email": "user@example.com", "password": "123456", "nom": "Dupont" }
	 */
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	/**
	 * READ ALL - GET /users
	 *
	 * @Get() - Décorateur pour définir une route GET
	 *
	 * Retourne tous les utilisateurs de la base de données
	 *
	 * Exemple de requête:
	 * GET /users
	 */
	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	/**
	 * READ ONE - GET /users/:id
	 *
	 * @Get(':id') - Route avec paramètre dynamique
	 * @Param('id') - Décorateur qui extrait le paramètre 'id' de l'URL
	 *
	 * :id est un paramètre de route dynamique
	 *
	 * Exemple de requête:
	 * GET /users/507f1f77bcf86cd799439011
	 * id = "507f1f77bcf86cd799439011"
	 */
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(id);
	}

	/**
	 * UPDATE - PATCH /users/:id
	 *
	 * @Patch() - Décorateur pour une mise à jour partielle (vs @Put pour remplacement complet)
	 * @Param('id') - Extrait l'ID de l'URL
	 * @Body() - Extrait les données à mettre à jour du corps de la requête
	 *
	 * PATCH permet de ne mettre à jour que certains champs (grâce à PartialType)
	 *
	 * Exemple de requête:
	 * PATCH /users/507f1f77bcf86cd799439011
	 * Body: { "nom": "Nouveau Nom" }
	 * (email et password ne sont pas modifiés)
	 */
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	/**
	 * DELETE - DELETE /users/:id
	 *
	 * @Delete() - Décorateur pour définir une route DELETE
	 * @Param('id') - Extrait l'ID de l'utilisateur à supprimer
	 *
	 * Exemple de requête:
	 * DELETE /users/507f1f77bcf86cd799439011
	 */
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(id);
	}
}
