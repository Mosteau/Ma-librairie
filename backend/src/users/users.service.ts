/**
 * SERVICE - Logique métier du module Users
 * 
 * Le service contient toute la logique métier et les interactions avec la base de données.
 * C'est la couche qui fait le lien entre le Controller (HTTP) et la base de données (Mongoose).
 * 
 * Principes SOLID appliqués:
 * - Single Responsibility: Gère uniquement la logique métier des utilisateurs
 * - Dependency Inversion: Dépend d'abstractions (Model<User>) pas d'implémentations concrètes
 * - Open/Closed: Extensible via héritage ou composition
 */

import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";

/**
 * @Injectable() - Décorateur qui marque cette classe comme injectable
 * Permet à NestJS de gérer l'injection de dépendances automatiquement
 */
@Injectable()
export class UsersService {
	/**
	 * Injection de dépendances via le constructeur
	 * 
	 * @InjectModel(User.name) - Injecte le modèle Mongoose User
	 * private userModel: Model<User> - Le modèle permet d'interagir avec la collection MongoDB
	 * 
	 * Principe SOLID: Dependency Injection - Les dépendances sont fournies de l'extérieur
	 */
	constructor(@InjectModel(User.name) private userModel: Model<User>) {}

	/**
	 * CREATE - Créer un nouvel utilisateur
	 * 
	 * @param createUserDto - Données validées provenant du controller
	 * @returns Promise<User> - L'utilisateur créé avec son _id MongoDB
	 * 
	 * Étapes:
	 * 1. Créer une nouvelle instance du modèle avec les données
	 * 2. Sauvegarder en base avec .save()
	 * 3. MongoDB génère automatiquement un _id et ajoute createdAt/updatedAt
	 */
	async create(createUserDto: CreateUserDto): Promise<User> {
		const createdUser = new this.userModel(createUserDto);
		return createdUser.save();
	}

	/**
	 * READ ALL - Récupérer tous les utilisateurs
	 * 
	 * @returns Promise<User[]> - Tableau de tous les utilisateurs
	 * 
	 * .find() - Requête MongoDB sans filtre (récupère tout)
	 * .exec() - Exécute la requête et retourne une Promise
	 */
	async findAll(): Promise<User[]> {
		return this.userModel.find().exec();
	}

	/**
	 * READ ONE - Récupérer un utilisateur par son ID
	 * 
	 * @param id - L'ID MongoDB (_id) de l'utilisateur
	 * @returns Promise<User | null> - L'utilisateur trouvé ou null
	 * 
	 * .findById() - Méthode Mongoose pour chercher par _id
	 * Retourne null si aucun document ne correspond
	 */
	async findOne(id: string): Promise<User | null> {
		return this.userModel.findById(id).exec();
	}

	/**
	 * READ BY EMAIL - Récupérer un utilisateur par son email
	 * 
	 * @param email - L'email de l'utilisateur
	 * @returns Promise<User | null> - L'utilisateur trouvé ou null
	 * 
	 * Utile pour l'authentification (vérifier si un email existe)
	 * .findOne({ email }) - Cherche le premier document avec cet email
	 */
	async findByEmail(email: string): Promise<User | null> {
		return this.userModel.findOne({ email }).exec();
	}

	/**
	 * UPDATE - Mettre à jour un utilisateur
	 * 
	 * @param id - L'ID de l'utilisateur à modifier
	 * @param updateUserDto - Les champs à mettre à jour (tous optionnels)
	 * @returns Promise<User | null> - L'utilisateur mis à jour ou null
	 * 
	 * .findByIdAndUpdate() - Trouve et met à jour en une seule opération
	 * { new: true } - Option importante: retourne le document APRÈS modification
	 * Sans cette option, retournerait le document AVANT modification
	 */
	async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
		return this.userModel
			.findByIdAndUpdate(id, updateUserDto, { new: true })
			.exec();
	}

	/**
	 * DELETE - Supprimer un utilisateur
	 * 
	 * @param id - L'ID de l'utilisateur à supprimer
	 * @returns Promise<User | null> - L'utilisateur supprimé ou null
	 * 
	 * .findByIdAndDelete() - Trouve et supprime en une seule opération
	 * Retourne le document supprimé (utile pour logs ou confirmation)
	 */
	async remove(id: string): Promise<User | null> {
		return this.userModel.findByIdAndDelete(id).exec();
	}
}