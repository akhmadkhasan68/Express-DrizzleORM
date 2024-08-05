import { Base } from "./base.schema";
import { Permission } from "./permission.schema";

export type Role = Base & {
    name: string | null;
    description: string | null;
    permissions?: Permission[]
}
