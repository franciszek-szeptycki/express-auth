import { CANNOT_CREATE_ORGANIZATION } from "../../application/constants";
import { ExternalOrganizationDTO } from "../../application/dtos";
import { OrdersServiceConnector } from "../../application/ports/OrdersServiceConnector";
import { UserId } from "../../application/types";

export class MockOrdersServiceConnector implements OrdersServiceConnector {
    public mockStatusCode: number;

    constructor(mockStatusCode: number) {
        this.mockStatusCode = mockStatusCode;
    }

    async createOrganization(userId: UserId): Promise<ExternalOrganizationDTO> {
        if (this.mockStatusCode === 201)
            return {
                id: Math.random().toString(36).substring(2, 15),
            };

        throw new Error(CANNOT_CREATE_ORGANIZATION);
    }
}
