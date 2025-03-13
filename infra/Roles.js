import { Meteor } from "meteor/meteor";
// @ts-ignore
import { Roles } from "meteor/roles";
import { WalletRoles } from "./WalletRoles";

Roles.createRoleAsync(WalletRoles.ADMIN, { unlessExists: true });
