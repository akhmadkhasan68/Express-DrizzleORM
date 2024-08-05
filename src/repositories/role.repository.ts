import { eq, sql } from "drizzle-orm";
import { TMetaItem, TMetaResponse } from "../common/types/response.type";
import { db } from "../databases/connection"
import { permissions, roles, rolesToPermissions } from "../databases/schema";
import { Role } from "../databases/schemas/role.schema";

export const getPaginateRoles = async (meta: TMetaItem): Promise<TMetaResponse<Role[]>> => {
    const page = meta?.page || 1;
    const perPage = meta?.perPage || 8;
    const offset = (page - 1) * perPage;
    const search = meta?.search;

    const permissionWithRoles = await db.select({
        id: permissions.id,
        name: permissions.name,
        description: permissions.description,
        roleId: rolesToPermissions.roleId,
    }).from(permissions)
    .leftJoin(rolesToPermissions, eq(permissions.id, rolesToPermissions.permissionId))
    .leftJoin(roles, eq(rolesToPermissions.roleId, roles.id))

    const query = db.select().from(roles);

    if (search) {
        query.where(sql`lower(${roles.name}) like lower('%' || ${search} || '%')`);
    }
    
    const data = await query.limit(perPage).offset(offset);

    const mappedData = data.map((role: Role) => {
        const permissions = permissionWithRoles.filter((permission) => permission.roleId === role.id);

        return {
            ...role,
            permissions: permissions.map((permission) => ({
                id: permission.id,
                name: permission.name,
                description: permission.description
            }))
        } as Role;
    });

    return {
        data: mappedData,
        meta: {
            page,
            perPage,
            totalPage: 1,
            search
        }
    }
}
