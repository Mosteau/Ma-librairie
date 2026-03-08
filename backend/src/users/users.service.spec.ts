/**
 * TESTS UNITAIRES - UsersService
 * 
 * Les tests unitaires vérifient le comportement d'une unité de code isolée.
 * Ici, on teste UsersService en mockant (simulant) ses dépendances.
 * 
 * Concepts clés:
 * - Mock: Simulation d'une dépendance (ici, le Model Mongoose)
 * - Spy: Surveillance des appels de méthodes
 * - Assertion: Vérification des résultats attendus
 */

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import type { Model } from "mongoose";
import { UsersService } from "./users.service";
import { User } from "./schemas/user.schema";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";

/**
 * describe() - Groupe de tests pour UsersService
 * Organise les tests par fonctionnalité
 */
describe("UsersService", () => {
	let service: UsersService;
	let model: Model<User>;

	/**
	 * Mock du User pour les tests
	 * Simule un utilisateur retourné par MongoDB
	 */
	const mockUser = {
		_id: "507f1f77bcf86cd799439011",
		email: "test@example.com",
		password: "hashedPassword123",
		nom: "Test User",
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	/**
	 * Mock du Model Mongoose
	 * Simule les méthodes du modèle MongoDB sans vraie connexion DB
	 */
	const mockUserModel = {
		/**
		 * find() - Simule la recherche de tous les documents
		 * Retourne un objet avec exec() qui résout avec un tableau
		 */
		find: jest.fn().mockReturnValue({
			exec: jest.fn().mockResolvedValue([mockUser]),
		}),

		/**
		 * findById() - Simule la recherche par ID
		 */
		findById: jest.fn().mockReturnValue({
			exec: jest.fn().mockResolvedValue(mockUser),
		}),

		/**
		 * findOne() - Simule la recherche avec un filtre
		 */
		findOne: jest.fn().mockReturnValue({
			exec: jest.fn().mockResolvedValue(mockUser),
		}),

		/**
		 * findByIdAndUpdate() - Simule la mise à jour
		 */
		findByIdAndUpdate: jest.fn().mockReturnValue({
			exec: jest.fn().mockResolvedValue(mockUser),
		}),

		/**
		 * findByIdAndDelete() - Simule la suppression
		 */
		findByIdAndDelete: jest.fn().mockReturnValue({
			exec: jest.fn().mockResolvedValue(mockUser),
		}),
	};

	/**
	 * beforeEach() - Exécuté avant chaque test
	 * Configure le module de test et initialise les dépendances
	 */
	beforeEach(async () => {
		/**
		 * Test.createTestingModule() - Crée un module NestJS pour les tests
		 * Similaire à @Module() mais pour l'environnement de test
		 */
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UsersService,
				{
					/**
					 * getModelToken(User.name) - Récupère le token d'injection du modèle
					 * useValue: mockUserModel - Remplace le vrai modèle par notre mock
					 * 
					 * IMPORTANT: On transforme mockUserModel en fonction constructeur
					 * pour que "new this.userModel()" fonctionne dans le service
					 */
					provide: getModelToken(User.name),
					useValue: Object.assign(
						jest.fn().mockImplementation((dto) => ({
							...dto,
							save: jest.fn().mockResolvedValue({ ...mockUser, ...dto }),
						})),
						mockUserModel,
					),
				},
			],
		}).compile();

		/**
		 * Récupère les instances du service et du modèle mocké
		 */
		service = module.get<UsersService>(UsersService);
		model = module.get<Model<User>>(getModelToken(User.name));
	});

	/**
	 * afterEach() - Exécuté après chaque test
	 * Nettoie les mocks pour éviter les interférences entre tests
	 */
	afterEach(() => {
		jest.clearAllMocks();
	});

	/**
	 * Test de base: vérifier que le service est défini
	 */
	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	/**
	 * TESTS CREATE
	 */
	describe("create", () => {
		it("should create a new user", async () => {
			/**
			 * Arrange - Préparer les données de test
			 */
			const createUserDto: CreateUserDto = {
				email: "test@example.com",
				password: "password123",
				nom: "Test User",
			};

			/**
			 * Mock du constructeur et de la méthode save()
			 * 
			 * Explication:
			 * - On espionne (spy) le modèle pour intercepter son utilisation comme constructeur
			 * - mockImplementation simule le comportement de "new this.userModel()"
			 * - Retourne un objet avec une méthode save() qui résout avec mockUser
			 */
			const saveMock = jest.fn().mockResolvedValue(mockUser);
			jest.spyOn(model as any, "constructor").mockImplementation(() => ({
				save: saveMock,
			}));

			// Alternative: mocker directement le modèle comme fonction constructeur
			(model as any).mockImplementation(() => ({
				save: saveMock,
			}));

			/**
			 * Act - Exécuter la méthode à tester
			 */
			const result = await service.create(createUserDto);

			/**
			 * Assert - Vérifier les résultats
			 */
			expect(saveMock).toHaveBeenCalled();
			expect(result).toEqual(mockUser);
		});
	});

	/**
	 * TESTS FINDALL
	 */
	describe("findAll", () => {
		it("should return an array of users", async () => {
			/**
			 * Act
			 */
			const result = await service.findAll();

			/**
			 * Assert
			 * - Vérifie que le résultat est un tableau contenant mockUser
			 * - Vérifie que model.find() a été appelé
			 */
			expect(result).toEqual([mockUser]);
			expect(model.find).toHaveBeenCalled();
		});

		it("should return an empty array when no users exist", async () => {
			/**
			 * Arrange - Mock pour retourner un tableau vide
			 */
			jest.spyOn(model, "find").mockReturnValue({
				exec: jest.fn().mockResolvedValue([]),
			} as any);

			/**
			 * Act
			 */
			const result = await service.findAll();

			/**
			 * Assert
			 */
			expect(result).toEqual([]);
			expect(model.find).toHaveBeenCalled();
		});
	});

	/**
	 * TESTS FINDONE
	 */
	describe("findOne", () => {
		it("should return a user by id", async () => {
			/**
			 * Arrange
			 */
			const userId = "507f1f77bcf86cd799439011";

			/**
			 * Act
			 */
			const result = await service.findOne(userId);

			/**
			 * Assert
			 * - Vérifie que le résultat correspond à mockUser
			 * - Vérifie que findById a été appelé avec le bon ID
			 */
			expect(result).toEqual(mockUser);
			expect(model.findById).toHaveBeenCalledWith(userId);
		});

		it("should return null when user is not found", async () => {
			/**
			 * Arrange - Mock pour retourner null
			 */
			jest.spyOn(model, "findById").mockReturnValue({
				exec: jest.fn().mockResolvedValue(null),
			} as any);

			/**
			 * Act
			 */
			const result = await service.findOne("nonexistentid");

			/**
			 * Assert
			 */
			expect(result).toBeNull();
		});
	});

	/**
	 * TESTS FINDBYEMAIL
	 */
	describe("findByEmail", () => {
		it("should return a user by email", async () => {
			/**
			 * Arrange
			 */
			const email = "test@example.com";

			/**
			 * Act
			 */
			const result = await service.findByEmail(email);

			/**
			 * Assert
			 */
			expect(result).toEqual(mockUser);
			expect(model.findOne).toHaveBeenCalledWith({ email });
		});

		it("should return null when email is not found", async () => {
			/**
			 * Arrange
			 */
			jest.spyOn(model, "findOne").mockReturnValue({
				exec: jest.fn().mockResolvedValue(null),
			} as any);

			/**
			 * Act
			 */
			const result = await service.findByEmail("notfound@example.com");

			/**
			 * Assert
			 */
			expect(result).toBeNull();
		});
	});

	/**
	 * TESTS UPDATE
	 */
	describe("update", () => {
		it("should update a user", async () => {
			/**
			 * Arrange
			 */
			const userId = "507f1f77bcf86cd799439011";
			const updateUserDto: UpdateUserDto = {
				nom: "Updated Name",
			};

			const updatedUser = { ...mockUser, nom: "Updated Name" };
			jest.spyOn(model, "findByIdAndUpdate").mockReturnValue({
				exec: jest.fn().mockResolvedValue(updatedUser),
			} as any);

			/**
			 * Act
			 */
			const result = await service.update(userId, updateUserDto);

			/**
			 * Assert
			 * - Vérifie que le résultat contient les modifications
			 * - Vérifie que findByIdAndUpdate a été appelé avec les bons paramètres
			 */
			expect(result).toEqual(updatedUser);
			expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
				userId,
				updateUserDto,
				{ new: true },
			);
		});

		it("should return null when user to update is not found", async () => {
			/**
			 * Arrange
			 */
			jest.spyOn(model, "findByIdAndUpdate").mockReturnValue({
				exec: jest.fn().mockResolvedValue(null),
			} as any);

			/**
			 * Act
			 */
			const result = await service.update("nonexistentid", { nom: "Test" });

			/**
			 * Assert
			 */
			expect(result).toBeNull();
		});
	});

	/**
	 * TESTS REMOVE
	 */
	describe("remove", () => {
		it("should delete a user", async () => {
			/**
			 * Arrange
			 */
			const userId = "507f1f77bcf86cd799439011";

			/**
			 * Act
			 */
			const result = await service.remove(userId);

			/**
			 * Assert
			 */
			expect(result).toEqual(mockUser);
			expect(model.findByIdAndDelete).toHaveBeenCalledWith(userId);
		});

		it("should return null when user to delete is not found", async () => {
			/**
			 * Arrange
			 */
			jest.spyOn(model, "findByIdAndDelete").mockReturnValue({
				exec: jest.fn().mockResolvedValue(null),
			} as any);

			/**
			 * Act
			 */
			const result = await service.remove("nonexistentid");

			/**
			 * Assert
			 */
			expect(result).toBeNull();
		});
	});
});
