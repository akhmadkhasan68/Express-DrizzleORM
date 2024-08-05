import { Request, Response } from "express";
import { IResponse } from "../common/interfaces/response.interface";
import { getPaginateRoles } from "../repositories/role.repository";

export const getRoles = async (req: Request, res: Response) => {
    const data = await getPaginateRoles({
        page: 1,
        perPage: 2,
    });

    const response: IResponse<any> = {
        code: 200,
        message: 'Roles fetched successfully',
        data: data
    }

    return res.json(response);
};
