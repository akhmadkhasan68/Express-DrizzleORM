import { Base } from "./base.schema";
import { Role } from "./role.schema";

export type User = Base & {
    name: string | null;
    age: number | null;
    isActive: boolean | null;
    roles: Role[];
};
