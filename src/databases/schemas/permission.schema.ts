import { Base } from "./base.schema";

export type Permission = Base & {
    name: string | null;
    description: string | null;
}
