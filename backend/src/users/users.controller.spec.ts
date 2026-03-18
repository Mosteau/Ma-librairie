/**
 * TESTS UNITAIRES - UsersController
 *
 * Ces tests vérifient que le controller:
 * - Appelle les bonnes méthodes du service
 * - Passe les bons paramètres
 * - Retourne les bonnes réponses
 *
 * On mocke UsersService pour isoler le controller
 */

import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

/**
 * describe() - Groupe de tests pour UsersController
 */
describe("UsersController", () => {
	let controller: UsersController;
	let service: UsersService;

	/**
	 * Mock d'un utilisateur pour les tests
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
	 * Mock du UsersService
	 * Simule toutes les méthodes du service
	 */
	const mockUsersService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		findByEmail: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	/**
	 * beforeEach() - Configuration avant chaque test
	 */
	beforeEach(async () => {
		/**
		 * Crée un module de test avec le controller et un service mocké
		 */
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					/**
					 * Remplace UsersService par notre mock
					 */
					provide: UsersService,
					useValue: mockUsersService,
				},
			],
		}).compile();

		/**
		 * Récupère les instances
		 */
		controller = module.get<UsersController>(UsersController);
		service = module.get<UsersService>(UsersService);
	});

	/**
	 * afterEach() - Nettoyage après chaque test
	 */
	afterEach(() => {
		jest.clearAllMocks();
	});

	/**
	 * Test de base
	 */
	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	/**
	 * TESTS CREATE - POST /users
	 */
	describe("create", () => {
		it("should create a new user", async () => {
			/**
			 * Arrange - Préparer les données
			 */
			const createUserDto: CreateUserDto = {
				email: "test@example.com",
				password: "password123",
				nom: "Test User",
			};

			/**
			 * Configure le mock pour retourner mockUser
			 */
			mockUsersService.create.mockResolvedValue(mockUser);

			/**
			 * Act - Appeler la méthode du controller
			 */
			const result = await controller.create(createUserDto);

			/**
			 * Assert - Vérifications
			 * 1. Le service.create a été appelé avec les bonnes données
			 * 2. Le résultat correspond à mockUser
			 */
			expect(service.create).toHaveBeenCalledWith(createUserDto);
			expect(result).toEqual(mockUser);
		});

		it("should handle validation errors", async () => {
			/**
			 * Arrange - Simuler une erreur de validation
			 */
			const invalidDto = {
				email: "invalid-email",
				password: "123", // Trop court
				nom: "Test",
			} as CreateUserDto;

			const validationError = new Error("Validation failed");
			mockUsersService.create.mockRejectedValue(validationError);

			/**
			 * Act & Assert - Vérifier que l'erreur est propagée
			 */
			await expect(controller.create(invalidDto)).rejects.toThrow(
				"Validation failed",
			);
		});
	});

	/**
	 * TESTS FINDALL - GET /users
	 */
	describe("findAll", () => {
		it("should return an array of users", async () => {
			/**
			 * Arrange
			 */
			const mockUsers = [mockUser, { ...mockUser, _id: "another-id" }];
			mockUsersService.findAll.mockResolvedValue(mockUsers);

			/**
			 * Act
			 */
			const result = await controller.findAll();

			/**
			 * Assert
			 */
			expect(service.findAll).toHaveBeenCalled();
			expect(result).toEqual(mockUsers);
			expect(result).toHaveLength(2);
		});

		it("should return an empty array when no users exist", async () => {
			/**
			 * Arrange
			 */
			mockUsersService.findAll.mockResolvedValue([]);

			/**
			 * Act
			 */
			const result = await controller.findAll();

			/**
			 * Assert
			 */
			expect(result).toEqual([]);
			expect(service.findAll).toHaveBeenCalled();
		});
	});

	/**
	 * TESTS FINDONE - GET /users/:id
	 */
	describe("findOne", () => {
		it("should return a user by id", async () => {
			/**
			 * Arrange
			 */
			const userId = "507f1f77bcf86cd799439011";
			mockUsersService.findOne.mockResolvedValue(mockUser);

			/**
			 * Act
			 */
			const result = await controller.findOne(userId);

			/**
			 * Assert
			 * - Vérifie que service.findOne a été appelé avec le bon ID
			 * - Vérifie que le résultat est correct
			 */
			expect(service.findOne).toHaveBeenCalledWith(userId);
			expect(result).toEqual(mockUser);
		});

		it("should return null when user is not found", async () => {
			/**
			 * Arrange
			 */
			mockUsersService.findOne.mockResolvedValue(null);

			/**
			 * Act
			 */
			const result = await controller.findOne("nonexistentid");

			/**
			 * Assert
			 */
			expect(result).toBeNull();
			expect(service.findOne).toHaveBeenCalledWith("nonexistentid");
		});
	});

	/**
	 * TESTS UPDATE - PATCH /users/:id
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
			mockUsersService.update.mockResolvedValue(updatedUser);

			/**
			 * Act
			 */
			const result = await controller.update(userId, updateUserDto);

			/**
			 * Assert
			 * - Vérifie que service.update a été appelé avec les bons paramètres
			 * - Vérifie que le résultat contient les modifications
			 */
			expect(service.update).toHaveBeenCalledWith(userId, updateUserDto);
			expect(result).toEqual(updatedUser);
			expect(result).not.toBeNull();
			expect(result?.nom).toBe("Updated Name");
		});

		it("should handle partial updates", async () => {
			/**
			 * Arrange - Mise à jour d'un seul champ
			 */
			const userId = "507f1f77bcf86cd799439011";
			const updateUserDto: UpdateUserDto = {
				email: "newemail@example.com",
			};

			const updatedUser = { ...mockUser, email: "newemail@example.com" };
			mockUsersService.update.mockResolvedValue(updatedUser);

			/**
			 * Act
			 */
			const result = await controller.update(userId, updateUserDto);

			/**
			 * Assert
			 */
			expect(result).not.toBeNull();
			expect(result?.email).toBe("newemail@example.com");
			expect(result?.nom).toBe(mockUser.nom); // Nom inchangé
		});

		it("should return null when user to update is not found", async () => {
			/**
			 * Arrange
			 */
			mockUsersService.update.mockResolvedValue(null);

			/**
			 * Act
			 */
			const result = await controller.update("nonexistentid", { nom: "Test" });

			/**
			 * Assert
			 */
			expect(result).toBeNull();
		});
	});

	/**
	 * TESTS REMOVE - DELETE /users/:id
	 */
	describe("remove", () => {
		it("should delete a user", async () => {
			/**
			 * Arrange
			 */
			const userId = "507f1f77bcf86cd799439011";
			mockUsersService.remove.mockResolvedValue(mockUser);

			/**
			 * Act
			 */
			const result = await controller.remove(userId);

			/**
			 * Assert
			 * - Vérifie que service.remove a été appelé avec le bon ID
			 * - Vérifie que l'utilisateur supprimé est retourné
			 */
			expect(service.remove).toHaveBeenCalledWith(userId);
			expect(result).toEqual(mockUser);
		});

		it("should return null when user to delete is not found", async () => {
			/**
			 * Arrange
			 */
			mockUsersService.remove.mockResolvedValue(null);

			/**
			 * Act
			 */
			const result = await controller.remove("nonexistentid");

			/**
			 * Assert
			 */
			expect(result).toBeNull();
			expect(service.remove).toHaveBeenCalledWith("nonexistentid");
		});
	});

	/**
	 * TESTS D'INTÉGRATION CONTROLLER-SERVICE
	 * Vérifient que le controller et le service communiquent correctement
	 */
	describe("integration tests", () => {
		it("should handle the complete user creation flow", async () => {
			/**
			 * Arrange
			 */
			const createUserDto: CreateUserDto = {
				email: "integration@example.com",
				password: "password123",
				nom: "Integration Test",
			};

			mockUsersService.create.mockResolvedValue({
				...mockUser,
				...createUserDto,
			});

			/**
			 * Act
			 */
			const result = await controller.create(createUserDto);

			/**
			 * Assert - Vérifier le flux complet
			 */
			expect(service.create).toHaveBeenCalledTimes(1);
			expect(service.create).toHaveBeenCalledWith(createUserDto);
			expect(result).not.toBeNull();
			expect(result?.email).toBe(createUserDto.email);
		});

		it("should handle the complete user update flow", async () => {
			/**
			 * Arrange
			 */
			const userId = "507f1f77bcf86cd799439011";
			const updateDto: UpdateUserDto = { nom: "New Name" };

			// Simuler: trouver l'utilisateur puis le mettre à jour
			mockUsersService.findOne.mockResolvedValue(mockUser);
			mockUsersService.update.mockResolvedValue({
				...mockUser,
				nom: "New Name",
			});

			/**
			 * Act
			 */
			const foundUser = await controller.findOne(userId);
			const updatedUser = await controller.update(userId, updateDto);

			/**
			 * Assert
			 */
			expect(foundUser).toBeDefined();
			expect(updatedUser).not.toBeNull();
			expect(updatedUser?.nom).toBe("New Name");
			expect(service.findOne).toHaveBeenCalledWith(userId);
			expect(service.update).toHaveBeenCalledWith(userId, updateDto);
		});
	});
});
