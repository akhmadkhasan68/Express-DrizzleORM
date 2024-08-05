import { Request, Response } from "express";
import { IResponsePaginated } from "../common/interfaces/response.interface";
import { getPaginateUsers } from "../repositories/user.repository";
import { Users } from "../databases/schema";
import { User } from "../databases/schemas/user";

export const getUser = async (req: Request, res: Response) => {
    const {
        count,
        data    
    } = await getPaginateUsers({
        page: 1,
        limit: 10,
        sort: 'id',
        order: 'asc'
    });

    const response :IResponsePaginated<any> = {
        code: 200,
        message: 'User created successfully',
        data: data,
        meta: {
            page: 1,
            limit: 10,
            total: count,
            totalPages: 13,
        }
    }

    return res.json(response);
};
