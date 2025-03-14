import { ExternalOrganizationDTO } from "../dtos";
import { UserId } from "../types";

export interface OrdersServiceConnector {
    createOrganization(userId: UserId): Promise<ExternalOrganizationDTO>;
}
