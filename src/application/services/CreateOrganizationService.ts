import { USER_NOT_FOUND } from "../constants";
import { UserDTO } from "../dtos";
import { OrdersServiceConnector } from "../ports/OrdersServiceConnector";
import { UserRepository } from "../ports/UserRepository";
import { UserId } from "../types";

export class CreateOrganizationService {
    private userRepository: UserRepository;
    private ordersServiceConnector: OrdersServiceConnector;

    constructor(
        userRepository: UserRepository,
        ordersServiceConnector: OrdersServiceConnector,
    ) {
        this.userRepository = userRepository;
        this.ordersServiceConnector = ordersServiceConnector;
    }

    async execute(userId: UserId): Promise<UserDTO | null> {
        const user = await this.userRepository.getUserById(userId);
        if (!user) throw new Error(USER_NOT_FOUND);

        const organization =
            await this.ordersServiceConnector.createOrganization(user.id);
        const updatedUser = await this.userRepository.updateUser(user.id, {
            organizationId: organization.id,
        });

        return updatedUser;
    }
}
