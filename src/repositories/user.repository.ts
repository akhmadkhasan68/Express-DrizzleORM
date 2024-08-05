import { eq, sql } from "drizzle-orm";
import { IRequestPagination } from "../common/interfaces/request.interface"
import { db } from "../databases/connection"
import { roles, users, usersToRoles } from "../databases/schema";

export const getPaginateUsers = async (paginationRequest: IRequestPagination) => {
    const page = paginationRequest.page;
    const limit = paginationRequest.limit;
    const sort = paginationRequest.sort;
    const order = paginationRequest.order;
    const offset = (page - 1) * limit;


    const count = await db.query.users.findMany().then((data) => data.length);

    const subquery = db
        .select({
        userId: usersToRoles.userId,
        roleData: sql<string>`json_agg(json_build_object(
            'id', ${roles.id},
            'name', ${roles.name},
            'description', ${roles.description}
        ))`.as('roleData')
        })
        .from(usersToRoles)
        .leftJoin(roles, eq(usersToRoles.roleId, roles.id))
        .groupBy(usersToRoles.userId)
        .as('role_subquery');

    const query = db.select({
        id: users.id,
        name: users.name,
        age: users.age,
        isActive: users.is_active,
        roles: subquery.roleData
    }).from(users).leftJoin(subquery, eq(users.id, subquery.userId))
    
    const data = await query.offset(offset).limit(limit);

    console.log(data)

    return {
        count,
        data
    }
}
