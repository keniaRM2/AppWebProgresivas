import { Errors } from '../../../kernel/types';
import { pool } from '../../../config/postgres';
import { TArea } from '../../area/area.module.boundary';
import { TIncidence } from '../entities/incidence';
import { IIncidenceRepository } from '../use-cases/port/incidence.repository';

export class IncidenceStorageGateway implements IIncidenceRepository {
  async existsById(id: number): Promise<boolean> {
    const query = `SELECT id FROM incidences WHERE id = $1;`;
    const { rows: incidenceRow } = await pool.query(query, [id]);
    return !!incidenceRow[0]?.id;
  }
  async existsByTitle(title: string, id?: number): Promise<boolean> {
    let query = `SELECT id FROM incidences WHERE title = $1;`;
    let params: any = [title];
    if (id) {
      query = `SELECT id FROM incidences WHERE title = $1 AND id != $2`;
      params = [title, id];
    }
    const { rows: incidenceRow } = await pool.query(query, params);
    return !!incidenceRow[0]?.id;
  }
  async findAll(): Promise<TIncidence[]> {
    const query = `SELECT i.*, s.status, a2.name, a2.id as "areaId", ua.id as "usarId", u.username, p.name as "personName", p.surname, coalesce(p.lastname, '')
    FROM incidences i
             INNER JOIN statuses s on s.id = i.status_id
             INNER JOIN user_area ua on i.user_reports_id = ua.id
             INNER JOIN areas a2 on ua.area_id = a2.id
             INNER JOIN users u on u.id = ua.user_id
             INNER JOIN people p on p.id = u.person_id;`;
    const { rows: incidencesRows } = await pool.query(query);
    return incidencesRows.map<TIncidence>((incidence) => ({
      id: Number(incidence.id),
      title: incidence.title,
      createdAt: incidence.created_at,
      description: incidence.description,
      incidenceDate: incidence.incidence_date,
      status: {
        id: Number(incidence.status_id),
        description: incidence.status,
      },
      user: {
        id: incidence.usarId,
        area: {
          id: Number(incidence.areaId),
          name: incidence.name,
        },
      },
      person: {
        id: 0,
        name: incidence.personName,
        surname: incidence.surname,
        lastname: incidence.lastname,
      },
      type: incidence.type,
    }));
  }
  async findAllAcepted(): Promise<TIncidence[]> {
    const query = `SELECT i.*, s.status, a2.name, a2.id as "areaId", ua.id as "usarId", u.username, p.name as "personName", p.surname, coalesce(p.lastname, '')
    FROM incidences i
             INNER JOIN statuses s on s.id = i.status_id
             INNER JOIN user_area ua on i.user_reports_id = ua.id
             INNER JOIN areas a2 on ua.area_id = a2.id
             INNER JOIN users u on u.id = ua.user_id
             INNER JOIN people p on p.id = u.person_id WHERE i.status_id = 4 OR i.status_id = 5;`;
    const { rows: incidencesRows } = await pool.query(query);
    return incidencesRows.map<TIncidence>((incidence) => ({
      id: Number(incidence.id),
      title: incidence.title,
      createdAt: incidence.created_at,
      description: incidence.description,
      incidenceDate: incidence.incidence_date,
      status: {
        id: Number(incidence.status_id),
        description: incidence.status,
      },
      user: {
        id: incidence.usarId,
        area: {
          id: Number(incidence.areaId),
          name: incidence.name,
        },
      },
      person: {
        id: 0,
        name: incidence.personName,
        surname: incidence.surname,
        lastname: incidence.lastname,
      },
      type: incidence.type,
    }));
  }
  async findAllPending(id: number): Promise<TIncidence[]> {
    const query = `SELECT i.*, s.status, a2.name, a2.id as "areaId", ua.id as "usarId", u.username, p.name as "personName", p.surname, coalesce(p.lastname, '')
    FROM incidences i
             INNER JOIN statuses s on s.id = i.status_id
             INNER JOIN user_area ua on i.user_reports_id = ua.id
             INNER JOIN areas a2 on ua.area_id = a2.id
             INNER JOIN users u on u.id = ua.user_id
             INNER JOIN people p on p.id = u.person_id
    WHERE i.status_id = 3;`;
    const { rows: incidencesRows } = await pool.query(query);
    return incidencesRows.map<TIncidence>((incidence) => ({
      id: Number(incidence.id),
      title: incidence.title,
      createdAt: incidence.created_at,
      description: incidence.description,
      incidenceDate: incidence.incidence_date,
      status: {
        id: Number(incidence.status_id),
        description: incidence.status,
      },
      user: {
        id: incidence.usarId,
        area: {
          id: Number(incidence.areaId),
          name: incidence.name,
        },
      },
      person: {
        id: 0,
        name: incidence.personName,
        surname: incidence.surname,
        lastname: incidence.lastname,
      },
      type: incidence.type,
    }));
  }

  async findAllByEmployee(id: number): Promise<TIncidence[]> {
    const query = `SELECT i.*, s.status, a2.name, a2.id as "areaId", ua.id as "usarId", u.username, p.name as "personName", p.surname,
     coalesce(p.lastname, '') 
    FROM incidences i
             INNER JOIN statuses s on s.id = i.status_id
             INNER JOIN user_area ua on i.user_reports_id = ua.id
             INNER JOIN areas a2 on ua.area_id = a2.id
             INNER JOIN users u on u.id = ua.user_id
             INNER JOIN people p on p.id = u.person_id
    WHERE i.user_reports_id in (SELECT id FROM user_area WHERE user_id = $1);`;
    const { rows: incidencesRows } = await pool.query(query, [id]);
    return incidencesRows.map<TIncidence>((incidence) => ({
      id: Number(incidence.id),
      title: incidence.title,
      createdAt: incidence.created_at,
      description: incidence.description,
      incidenceDate: incidence.incidence_date,
      status: {
        id: Number(incidence.status_id),
        description: incidence.status,
      },
      user: {
        id: incidence.usarId,
        area: {
          id: Number(incidence.areaId),
          name: incidence.name,
        },
      },
      person: {
        id: 0,
        name: incidence.personName,
        surname: incidence.surname,
        lastname: incidence.lastname,
      },
      type: incidence.type,
    }));
  }
  findById(id: number): Promise<TIncidence> {
    throw new Error('Method not implemented.');
  }
  async findAreasByEmployee(id: number): Promise<TArea[]> {
    const { rows: areaRows } = await pool.query(
      `SELECT a.id,
      a.name  as "areaName",
      ad.name as "acName",
      ad.id   as "acId"
FROM users u
        INNER JOIN user_area ua ON ua.user_id = u.id
        INNER JOIN areas a on ua.area_id = a.id
        INNER JOIN academic_divisions ad on a.academic_division_id = ad.id
WHERE u.id= $1;`,
      [id]
    );
    return areaRows.map((area) => ({
      id: Number(area.id),
      name: area.areaName,
      academicDivision: {
        id: Number(area.acId),
        name: area.acName,
      },
    }));
  }
  async save(incidence: TIncidence): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `INSERT INTO incidences (id, title, incidence_date, type, description, created_at, user_reports_id, location, status_id)
      VALUES (DEFAULT, $1, $2, $3, $4, DEFAULT, $5, $6, $7) RETURNING id;`;
      const { rows: incidenceRow } = await client.query(query, [
        incidence.title,
        incidence.incidenceDate,
        incidence.type,
        incidence.description,
        incidence.user?.id,
        JSON.stringify(incidence.location),
        3,
      ]);
      if (!incidenceRow[0]?.id) throw Error(Errors.RECORD_NOT_REGISTERED);
      incidence.annexes?.forEach((annexe) => {
        client.query(
          `INSERT INTO annexes (id, name, mime_type, file, incidence_id)
        VALUES (DEFAULT, $1, $2, $3, $4);`,
          [annexe.name, annexe.mimeType, annexe.file, incidenceRow[0].id]
        );
      });
      await client.query('COMMIT');
      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      console.log(error);
      throw Error(Errors.SQLERROR);
    } finally {
      client.release();
    }
  }
  async update(incidence: TIncidence): Promise<boolean> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const query = `UPDATE incidences
      SET title          = $1,
          incidence_date = $2,
          type           = $3,
          description    = $4 
      WHERE id = $5 RETURNING *;`;
      const { rows: incidenceRow } = await client.query(query, [
        incidence.title,
        incidence.incidenceDate,
        incidence.type,
        incidence.description,
        incidence.id,
      ]);
      console.log({ incidenceRow, incidence });

      if (!incidenceRow[0]?.id) throw Error(Errors.RECORD_NOT_UPDATED);
      incidence.annexes?.forEach((annexe) => {
        client.query(
          `INSERT INTO annexes (id, name, mime_type, file, incidence_id)
        VALUES (DEFAULT, $1, $2, $3, $4);`,
          [annexe.name, annexe.mimeType, annexe.file, incidence.id]
        );
      });
      await client.query('COMMIT');
      return true;
    } catch (error) {
      console.log(error);
      await client.query('ROLLBACK');
      throw Error(Errors.SQLERROR);
    } finally {
      client.release();
    }
  }

  async deleteAnnexe(id: number): Promise<boolean> {
    const query = `DELETE FROM annexes WHERE id = $1 RETURNING id`;
    const { rows: annexeRow } = await pool.query(query, [id]);
    return !!annexeRow[0];
  }

  async changeStatus(id: number, status: number): Promise<boolean> {
    const query = `UPDATE incidences SET status_id = $1 WHERE id = $2 RETURNING id;`;
    const { rows: annexeRow } = await pool.query(query, [status, id]);
    return !!annexeRow[0]?.id;
  }
}
