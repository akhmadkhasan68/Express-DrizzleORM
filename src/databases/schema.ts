import { relations } from 'drizzle-orm';
import { pgTable, serial, text, integer, boolean, primaryKey } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name'),
    age: integer('age'),
    is_active: boolean('is_active').default(true),
});

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
});

export const usersToRoles = pgTable('users_to_roles', 
    {
        userId: integer('user_id')
                .notNull()
                .references(() => users.id),
        roleId: integer('role_id')
                .notNull()
                .references(() => roles.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.roleId] }),
    })
);

export const usersRelations = relations(users, ({ many }) => ({
    usersToRoles: many(usersToRoles),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
    usersToRoles: many(usersToRoles),
}));

export const userRolesRelations = relations(usersToRoles, ({ one }) => ({
    user: one(users, {
        fields: [usersToRoles.userId],
        references: [users.id],
    }),
    role: one(roles, {
        fields: [usersToRoles.roleId],
        references: [roles.id],
    }),
}));

export const permissions = pgTable('permissions', {
    id: serial('id').primaryKey(),
    name: text('name'),
    description: text('description'),
});

export const rolesToPermissions = pgTable('roles_to_permissions',
    {
        roleId: integer('role_id')
                .notNull()
                .references(() => roles.id),
        permissionId: integer('permission_id')
                .notNull()
                .references(() => permissions.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.roleId, t.permissionId] }),
    })
);

export const rolesPermissionsRelations = relations(roles, ({ many }) => ({
    rolesToPermissions: many(rolesToPermissions),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
    rolesToPermissions: many(rolesToPermissions),
}));


export type Users = typeof users.$inferSelect;
export type Roles = typeof roles.$inferSelect;
export type UsersToRoles = typeof usersToRoles.$inferSelect;
export type Permissions = typeof permissions.$inferSelect;
export type RolesToPermissions = typeof rolesToPermissions.$inferSelect;
