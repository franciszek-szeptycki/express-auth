import { RegisterUserDTO, UserDTO } from "../dtos";
import { RegisterUserService } from "../services/RegisterUserService";
import { CreateOrganizationService } from "../services/CreateOrganizationService";

export class RegisterUserUseCase {
    private registerUserService: RegisterUserService;
    private createOrganizationService: CreateOrganizationService;

    constructor(
        registerUserService: RegisterUserService,
        createOrganizationService: CreateOrganizationService,
    ) {
        this.registerUserService = registerUserService;
        this.createOrganizationService = createOrganizationService;
    }

    async execute(registerUserDTO: RegisterUserDTO): Promise<UserDTO> {
        const user = await this.registerUserService.execute(registerUserDTO);

        return await this.createOrganizationService.execute(user.id);
    }
}
