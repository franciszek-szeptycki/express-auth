import { UserDTO } from "../../application/dtos";
import {
    UserCredentialsHashed,
    UserRepository,
} from "../../application/ports/UserRepository";

export class MockUserRepository implements UserRepository {
    public database: Array<UserDTO> = [];

    async createUser(user: UserCredentialsHashed): Promise<UserDTO> {
        const newUser: UserDTO = {
            id: Math.random().toString(36).substring(2, 15),
            email: user.email,
            hashedPassword: user.passwordHash,
            organizationId: "",
        };
        this.database.push(newUser);
        return newUser;
    }

    async getUserByEmail(email: string): Promise<UserDTO | null> {
        return this.database.find((user) => user.email === email) || null;
    }

    async getUserById(id: string): Promise<UserDTO | null> {
        return this.database.find((user) => user.id === id) || null;
    }

    async updateUser(
        id: string,
        data: Partial<UserDTO>,
    ): Promise<UserDTO | null> {
        const userIndex = this.database.findIndex((user) => user.id === id);
        if (userIndex === -1) return null;
        this.database[userIndex] = { ...this.database[userIndex], ...data };
        return this.database[userIndex];
    }
}
