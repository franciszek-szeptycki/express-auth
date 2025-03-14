import { INVALID_TOKEN_ERROR, TOKEN_EXPIRED_ERROR } from "../constants";
import { UserDTO } from "../dtos";
import { UserRepository } from "../ports/UserRepository";
import { JwtToken } from "../types";
import * as jwt from "jsonwebtoken";

export class VerifyTokenUseCase {
    private jwtSecret: string;
    private userRepository: UserRepository;

    constructor(jwtSecret: string, userRepository: UserRepository) {
        this.userRepository = userRepository;
        this.jwtSecret = jwtSecret;
    }

    async execute(token: string): Promise<UserDTO> {
        const decoded = jwt.verify(token, this.jwtSecret);
        if (typeof decoded !== "object") {
            throw new Error(INVALID_TOKEN_ERROR);
        }

        const user = await this.userRepository.getUserById(decoded.id);
        const isExpired = decoded.expiresAt < new Date();
        if (isExpired) {
            throw new Error(TOKEN_EXPIRED_ERROR);
        }

        return user;
    }
}
