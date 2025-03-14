import { UserDTO } from "../dtos";
import { Email, HashedPassword } from "../types";

export interface UserCredentialsHashed {
    email: Email;
    passwordHash: HashedPassword;
}

export interface UserRepository {
    createUser(userCredentialsHashed: UserCredentialsHashed): Promise<UserDTO>;
    getUserByEmail(email: string): Promise<UserDTO | null>;
    getUserById(id: string): Promise<UserDTO | null>;
    updateUser(id: string, data: Partial<UserDTO>): Promise<UserDTO | null>;
}
