// Dao | "Service Repositorio"
import { pool } from '../../../config/postgres';
import { TUser } from '../entities/user';
import { IUserRepository } from '../use-cases/ports/user.repository';
import { Errors } from '../../../kernel/types';

export class UserStorageGateway implements IUserRepository {
  async existsByCurp(curp: string, id: number): Promise<boolean> {
    let query = `SELECT id FROM people WHERE curp = $1;`;
    let params: any[] = [curp];
    if (id) {
      query = `SELECT id FROM people WHERE curp = $1 AND id != $2`;
      params = [curp, id];
    }
    const { rows: userRow } = await pool.query(query, params);
    return !!userRow[0]?.id;
  }
  async existsByRfc(rfc: string, id: number): Promise<boolean> {
    let query = `SELECT id FROM people WHERE curp = $1;`;
    let params: any[] = [rfc];
    if (id) {
      query = `SELECT id FROM people WHERE curp = $1 AND id != $2`;
      params = [rfc, id];
    }
    const { rows: userRow } = await pool.query(query, params);
    return !!userRow[0]?.id;
  }
  async existsById(id: number): Promise<boolean> {
    const query = `SELECT id FROM users WHERE id = $1`;
    const { rows: userRow } = await pool.query(query, [id]);
    return !!userRow[0]?.id;
  }
  async findAll(): Promise<TUser[]> {
    const query = `SELECT u.id,u.type, u.username, u.user_details, u.type, u.status_id, s.status, u.person_id,
     p.name, p.lastname, p.surname, p.curp, p.rfc, p.birthdate FROM users u
    INNER JOIN people p on p.id = u.person_id
    inner join statuses s on s.id = u.status_id ORDER BY u.id DESC;`;
    const { rows: userRows } = await pool.query(query);
    const users: TUser[] = [];
    for (const user of userRows) {
      const { rows: areaRows } = await pool.query(
        `SELECT a.id,
        a.name  as "areaName",
        ad.name as "acName",
        ua.id as "idUserArea",
        ad.id   as "acId"
  FROM users u
          INNER JOIN user_area ua ON ua.user_id = u.id
          INNER JOIN areas a on ua.area_id = a.id
          INNER JOIN academic_divisions ad on a.academic_division_id = ad.id
  WHERE u.id= $1;`,
        [user.id]
      );
      const { rows: roleRows } = await pool.query(
        `SELECT r.id, r.role
        FROM user_roles ur
                 INNER JOIN roles r on r.id = ur.role_id WHERE ur.user_id = $1`,
        [user.id]
      );
      const roles = [];
      for (const role of roleRows) {
        roles.push({ id: Number(role.id), role: role.role });
      }
      users.push({
        id: Number(user.id),
        username: user.username,
        userDetails: user.user_details,
        status: {
          id: Number(user.status_id),
          description: user.status,
        },
        person: {
          id: Number(user.person_id),
          name: user.name as string,
          surname: user.surname as string,
          lastname: user.lastname as string,
          curp: user.curp as string,
          rfc: user.rfc as string,
          birthdate: user.birthdate as string,
          createdAt: '',
        },
        roles: roles,
        type: user.type,
        areas: areaRows.map((area) => ({
          idUserArea: Number(area.idUserArea),
          id: Number(area.id),
          name: area.areaName,
          academicDivision: {
            id: Number(area.acId),
            name: area.acName,
          },
        })),
      });
    }

    return users;
  }
  async findById(id: number): Promise<TUser> {
    const query = `SELECT u.id,u.type, u.username, u.user_details, u.type, u.status_id, s.status, u.person_id, p.name, p.lastname, p.surname, p.curp, p.rfc, p.birthdate FROM users u
    INNER JOIN people p on p.id = u.person_id
    inner join statuses s on s.id = u.status_id WHERE u.id = $1 `;
    const { rows: userRow } = await pool.query(query, [id]);
    const user = userRow[0];
    const { rows: roleRows } = await pool.query(
      `SELECT r.id, r.role
      FROM user_roles ur
               INNER JOIN roles r on r.id = ur.role_id WHERE ur.user_id = $1`,
      [user.id]
    );
    return {
      id: Number(user.id),
      username: user.username,
      userDetails: user.user_details,
      status: {
        id: Number(user.status_id),
        description: user.status,
      },
      person: {
        id: Number(user.person_id),
        name: user.name as string,
        surname: user.surname as string,
        lastname: user.lastname as string,
        curp: user.curp as string,
        rfc: user.rfc as string,
        birthdate: user.birthdate as string,
        createdAt: '',
      },
      roles: roleRows.map((role) => ({
        id: Number(role.id),
        role: role.role,
      })),
      type: user.type,
    };
  }
  async save(user: TUser): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `INSERT INTO people (id, name, surname, lastname, birthdate, curp, rfc, created_at)
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, DEFAULT) RETURNING id;`;
      const { name, surname, lastname, curp, rfc, birthdate } = user.person!;
      const { rows: personRow } = await client.query(query, [
        name,
        surname,
        lastname,
        birthdate,
        curp,
        rfc,
      ]);
      if (!personRow[0]?.id) throw Error(Errors.RECORD_NOT_REGISTERED);
      const person = personRow[0];
      const userQuery = `INSERT INTO users (id, username, password, user_details, type, status_id, person_id)
      VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id;`;
      const { rows: userRow } = await client.query(userQuery, [
        user.username,
        user.password,
        JSON.stringify(user.userDetails),
        user.type,
        1,
        person.id,
      ]);
      if (!userRow[0]?.id) throw Error(Errors.RECORD_NOT_REGISTERED);
      const savedUser = userRow[0];
      user.roles?.forEach(async (role) => {
        await client.query(
          `INSERT INTO user_roles (id, created_at, user_id, role_id)
        VALUES (DEFAULT, DEFAULT, $1, $2);`,
          [savedUser.id, role.id]
        );
      });
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      console.log(error);
      throw error;
    } finally {
      client.release();
    }
  }

  async update(user: TUser): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `UPDATE people SET name =$1, surname= $2, lastname= $3, birthdate= $4, curp= $5, rfc= $6 WHERE id = $7 RETURNING id`;
      const { name, surname, lastname, curp, rfc, birthdate, id } =
        user.person!;
      const { rows: personRow } = await client.query(query, [
        name,
        surname,
        lastname,
        birthdate,
        curp,
        rfc,
        id,
      ]);
      if (!personRow[0]?.id) throw Error(Errors.RECORD_NOT_REGISTERED);
      const person = personRow[0];
      const userQuery = `UPDATE users SET username = $1, password = $2, user_details = $3, type = $4, status_id = $5, person_id = $6 WHERE id = $7 RETURNING id;`;
      const { rows: userRow } = await client.query(userQuery, [
        user.username,
        user.password,
        JSON.stringify(user.userDetails),
        user.type,
        1,
        person.id,
        user.id,
      ]);
      if (!userRow[0]?.id) throw Error(Errors.RECORD_NOT_REGISTERED);
      const savedUser = userRow[0];
      await client.query(`DELETE FROM user_roles WHERE user_id = $1`, [
        user.id,
      ]);
      user.roles?.forEach(async (role) => {
        await client.query(
          `INSERT INTO user_roles (id, created_at, user_id, role_id)
        VALUES (DEFAULT, DEFAULT, $1, $2);`,
          [savedUser.id, role.id]
        );
      });
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const user = await this.findById(id);
      const query = `UPDATE users SET status_id = $1 WHERE id = $2 RETURNING id;`;
      const { rows: userRow } = await client.query(query, [
        Number(user.status?.id) === 1 ? 2 : 1,
        id,
      ]);
      if (!userRow[0]?.id) throw Error(Errors.RECORD_NOT_UPDATED);
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
  async subscribe(user: TUser): Promise<boolean> {
    const query = `UPDATE users SET user_details = $1 WHERE id = $2 RETURNING id;`;
    const { rows: userRow } = await pool.query(query, [
      JSON.stringify(user.userDetails),
      user.id,
    ]);
    return !!userRow[0]?.id;
  }
  async key(user: TUser): Promise<any> {
    return true;
  }
}
