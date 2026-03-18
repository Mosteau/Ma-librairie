/**
 * SCHEMA MONGOOSE - Définition de la structure des données User en base MongoDB
 *
 * Un schema Mongoose définit:
 * - La structure des documents (équivalent d'une table SQL)
 * - Les types de données
 * - Les validations
 * - Les index
 *
 * Principe SOLID appliqué: Single Responsibility - Ce fichier ne gère QUE la structure des données
 */

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/**
 * @Schema() - Décorateur NestJS/Mongoose qui marque cette classe comme un schema MongoDB
 * { timestamps: true } - Ajoute automatiquement createdAt et updatedAt à chaque document
 */
@Schema({ timestamps: true })
export class User extends Document {
	/**
	 * @Prop() - Décorateur qui définit une propriété du schema
	 *
	 * Options disponibles:
	 * - required: true/false - Champ obligatoire
	 * - unique: true/false - Valeur unique dans toute la collection
	 * - default: valeur - Valeur par défaut
	 * - index: true/false - Créer un index pour optimiser les recherches
	 */

	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true, select: false })
	password: string;

	@Prop({ required: true })
	nom: string;
}

/**
 * SchemaFactory.createForClass() - Génère le schema Mongoose à partir de la classe
 * Ce schema sera utilisé par MongooseModule.forFeature() dans le module
 */
export const UserSchema = SchemaFactory.createForClass(User);
