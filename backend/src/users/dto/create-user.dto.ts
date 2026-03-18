/**
 * DTO (Data Transfer Object) - CREATE USER
 *
 * Un DTO définit la structure des données qui transitent entre le client et le serveur.
 * Il sert à:
 * - Valider les données entrantes (avec class-validator)
 * - Typer les données (TypeScript)
 * - Documenter l'API
 * - Séparer la structure de l'API de la structure en base (principe SOLID)
 *
 * Principe SOLID appliqué:
 * - Single Responsibility: Validation des données d'entrée uniquement
 * - Interface Segregation: Un DTO spécifique par action (Create, Update, etc.)
 */

import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateUserDto {
	/**
	 * Décorateurs de validation (class-validator)
	 * Ces validations sont automatiquement exécutées par NestJS si ValidationPipe est activé
	 */

	/**
	 * @IsEmail() - Vérifie que la valeur est un email valide
	 */
	@IsEmail()
	email: string;

	/**
	 * @IsString() - Vérifie que la valeur est une chaîne de caractères
	 * @MinLength(6) - Vérifie que le mot de passe fait au moins 6 caractères
	 */
	@IsString()
	@MinLength(6)
	password: string;

	/**
	 * @IsString() - Vérifie que le nom est une chaîne de caractères
	 */
	@IsString()
	nom: string;
}
