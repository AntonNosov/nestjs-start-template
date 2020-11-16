export enum Roles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  TECHNOLOGIST = 'technologist'
}

export function getAllRoles() {
  return Object.values(Roles)
}

export function getAdminRoles() {
  return [ Roles.SUPER_ADMIN, Roles.ADMIN ]
}