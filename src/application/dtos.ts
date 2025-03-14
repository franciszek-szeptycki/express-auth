import * as types from "./types";

export interface RegisterUserDTO {
    email: types.Email;
    password: types.Password;
}

export interface UserDTO {
    id: types.UserId;
    email: types.Email;
    hashedPassword: types.HashedPassword;
    organizationId: types.OrganizationId;
}

export interface ExternalOrganizationDTO {
    id: types.OrganizationId;
}

export interface UserLoginDTO {
    email: types.Email;
    password: types.Password;
}
