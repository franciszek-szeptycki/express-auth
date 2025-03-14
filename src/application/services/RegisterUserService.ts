import * as bcrypt from "bcryptjs";
import { RegisterUserDTO, UserDTO } from "../dtos";
import { UserRepository } from "../ports/UserRepository";
import { USER_ALREADY_EXISTS } from "../constants";
import { encryptPassword } from "../utils/crypto";

export class RegisterUserService {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(userRegisterDTO: RegisterUserDTO): Promise<UserDTO> {
        const { email, password } = userRegisterDTO;

        const user = await this.userRepository.getUserByEmail(email);
        if (user) throw new Error(USER_ALREADY_EXISTS);

        const hashedPassword: string = await encryptPassword(password);

        return await this.userRepository.createUser({
            email,
            passwordHash: hashedPassword,
        });
    }
}
