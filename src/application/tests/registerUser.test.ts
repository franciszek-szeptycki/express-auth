import { MockOrdersServiceConnector } from "../../infrastructure/adapters/MockOrdersServiceConnector";
import { MockUserRepository } from "../../infrastructure/adapters/MockUserRepository";
import { CANNOT_CREATE_ORGANIZATION, USER_ALREADY_EXISTS } from "../constants";
import { RegisterUserDTO, UserDTO } from "../dtos";
import { CreateOrganizationService } from "../services/CreateOrganizationService";
import { RegisterUserService } from "../services/RegisterUserService";
import { RegisterUserUseCase } from "../useCases/RegisterUser";

describe("RegisterUser", () => {
    const user: RegisterUserDTO = {
        email: "test@example.com",
        password: "password",
    };

    test("should register a new user", async () => {
        const userRepository = new MockUserRepository();
        const registerUserService = new RegisterUserService(userRepository);

        const ordersServiceConnector = new MockOrdersServiceConnector(201);
        const createOrganizationService = new CreateOrganizationService(
            userRepository,
            ordersServiceConnector,
        );

        const useCase = new RegisterUserUseCase(
            registerUserService,
            createOrganizationService,
        );

        const newUser: UserDTO = await useCase.execute(user);

        expect(newUser).toBeDefined();
        expect(newUser.id).toBeDefined();
        expect(newUser.email).toBe(user.email);
        expect(newUser.hashedPassword).not.toBe(user.password);
        expect(newUser.organizationId).toBeDefined();
    });

    test("should throw an error if user already exists", async () => {
        const userRepository = new MockUserRepository();
        const registerUserService = new RegisterUserService(userRepository);

        const ordersServiceConnector = new MockOrdersServiceConnector(201);
        const createCompanyUserService = new CreateOrganizationService(
            userRepository,
            ordersServiceConnector,
        );

        const useCase = new RegisterUserUseCase(
            registerUserService,
            createCompanyUserService,
        );
        try {
            await useCase.execute(user);
        } catch (error) {
            expect(error.message).toBe(USER_ALREADY_EXISTS);
        }
    });

    test("should not return organizationId if service is not available", async () => {
        const userRepository = new MockUserRepository();
        const registerUserService = new RegisterUserService(userRepository);

        const ordersServiceConnector = new MockOrdersServiceConnector(500);
        const createCompanyUserService = new CreateOrganizationService(
            userRepository,
            ordersServiceConnector,
        );

        const useCase = new RegisterUserUseCase(
            registerUserService,
            createCompanyUserService,
        );
        try {
            await useCase.execute(user);
        } catch (error) {
            expect(error.message).toBe(CANNOT_CREATE_ORGANIZATION);
        }
    });
});
