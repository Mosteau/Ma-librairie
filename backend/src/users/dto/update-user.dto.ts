/**
 * DTO (Data Transfer Object) - UPDATE USER
 *
 * PartialType() est un utilitaire NestJS qui:
 * - Crée une copie du DTO source (CreateUserDto)
 * - Rend TOUS les champs optionnels
 * - Conserve toutes les validations
 *
 * Avantages:
 * - DRY (Don't Repeat Yourself) - Pas de duplication de code
 * - Maintenance facilitée - Si CreateUserDto change, UpdateUserDto suit automatiquement
 * - Type-safe - TypeScript garantit la cohérence
 *
 * Principe SOLID appliqué: Open/Closed - Extensible sans modification
 */

import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

/**
 * UpdateUserDto hérite de CreateUserDto mais avec tous les champs optionnels
 * Exemple: { email?: string, password?: string, nom?: string }
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {}
