import { MockUserRepository } from "../../infrastructure/adapters/MockUserRepository";
import { UserDTO, UserLoginDTO } from "../dtos";
import { LoginUserService } from "../services/LoginUser";
import { LoginUserUseCase } from "../useCases/LoginUser";
import { encryptPassword } from "../utils/crypto";
import * as jwt from "jsonwebtoken";

describe("LoginUser", () => {
    let existingUser: UserDTO;
    const userLoginDTO: UserLoginDTO = {
        email: "test@example.com",
        password: "password",
    };

    beforeAll(async () => {
        existingUser = {
            id: "123",
            email: "test@example.com",
            hashedPassword: await encryptPassword(userLoginDTO.password),
            organizationId: "345",
        };
    });

    test("should return legit jwt token if credentials are valid", async () => {
        const userRepository = new MockUserRepository();
        userRepository.database.push(existingUser);

        const loginUserService = new LoginUserService(
            userRepository,
            "some_jwt_secret",
        );
        const useCase = new LoginUserUseCase(loginUserService);

        const token = await useCase.execute(userLoginDTO);
        expect(token).toEqual(expect.any(String));

        const decodedToken: any = jwt.verify(token, "some_jwt_secret");
        expect(decodedToken.id).toEqual(existingUser.id);
    });
});
