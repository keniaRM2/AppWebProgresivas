import { AuthRepository } from '../use-cases/port/auth.repository';
import { pool } from '../../../config/postgres';
import { Errors } from '../../../kernel/types';
import { TUser } from '../../../modules/user/user.module.boundary';
import { TRole } from '../../../modules/role/role.module.boundary';

export class AuthStorageGateway implements AuthRepository {
  async loadUserByUsername(username: string): Promise<TUser> {
    const query = `SELECT u.id,
    u.username,
    u.password,
    u.type,
    u.status_id,
    s.status,
    u.type,
    u.person_id,
    p.name,
    p.lastname,
    p.surname
FROM users u
      INNER JOIN people p on p.id = u.person_id
      inner join statuses s on s.id = u.status_id WHERE u.username = $1;`;
    const { rows: userRow } = await pool.query(query, [username]);
    if (!userRow[0]) throw Error(Errors.NO_DATA_FOUND);
    const user = userRow[0];
    const { rows: roleRows } = await pool.query(
      `SELECT r.id, r.role
        FROM user_roles ur
                 INNER JOIN roles r on r.id = ur.role_id WHERE ur.user_id = $1`,
      [user.id]
    );
    const { rows: areaRows } = await pool.query(
      `SELECT a.id,
      a.name  as "areaName",
      ad.name as "acName",
      ad.id   as "acId",
      ua.id as "userArea"
FROM users u
        INNER JOIN user_area ua ON ua.user_id = u.id
        INNER JOIN areas a on ua.area_id = a.id
        INNER JOIN academic_divisions ad on a.academic_division_id = ad.id
WHERE u.id= $1;`,
      [user.id]
    );
    return {
      id: Number(user.id),
      username: user.username,
      password: user.password,
      status: {
        id: Number(user.status_id),
        description: user.status,
      },
      person: {
        id: Number(user.person_id),
        name: user.name as string,
        surname: user.surname as string,
        lastname: user.lastname as string,
      },
      roles: roleRows.map<TRole>((role) => ({
        id: Number(role.id),
        role: role.role,
      })),
      type: user.type,
      areas: areaRows.map((area) => ({
        id: Number(area.userArea),
        area: {
        id: Number(area.id),
        name: area.areaName,
        academicDivision: {
          id: Number(area.acId),
          name: area.acName,
        },
      }
      })),
    };
  }
}
