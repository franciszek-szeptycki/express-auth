import { INVALID_PASSWORD, USER_NOT_FOUND } from "../constants";
import { UserLoginDTO } from "../dtos";
import { UserRepository } from "../ports/UserRepository";
import { JwtToken } from "../types";
import { verifyPassword } from "../utils/crypto";
import * as jwt from "jsonwebtoken";

export class LoginUserService {
    constructor(
        private userRepository: UserRepository,
        private jwtSecret: JwtToken,
    ) {}

    async execute(userLoginDTO: UserLoginDTO): Promise<JwtToken> {
        const user = await this.userRepository.getUserByEmail(
            userLoginDTO.email,
        );
        if (!user) throw new Error(USER_NOT_FOUND);

        const isPasswordValid = await verifyPassword(
            userLoginDTO.password,
            user.hashedPassword,
        );
        if (!isPasswordValid) throw new Error(INVALID_PASSWORD);

        const token = jwt.sign({ id: user.id }, this.jwtSecret, {
            expiresIn: "1h",
        });
        return token;
    }
}
