import psycopg2
# from psycopg2.extensions import AsIs
from psycopg2.extras import execute_values


def select_one(params, sql):
    conn = None
    records = None

    try:
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(sql)
        records = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.Error) as e:
        return (
            {
                "error": "DatabaseErrorSelect",
                "pgcode": e.pgcode,
                "pgerror": e.pgerror,
            },
            500,
        )
    finally:
        if conn is not None:
            conn.close()

    if records:
        return (records, 200)
    else:
        return (None, 204)


def select_all(params, sql):
    conn = None
    records = None

    try:
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(sql)
        records = cur.fetchall()
        cur.close()
    except (Exception, psycopg2.Error) as e:
        return (
            {
                "error": "DatabaseErrorSelect",
                "pgcode": e.pgcode,
                "pgerror": e.pgerror,
            },
            500,
        )
    finally:
        if conn is not None:
            conn.close()

    if records:
        return (records, 200)
    else:
        return (None, 204)


def insert(params, sql, values):
    conn = None
    records = None

    try:
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        execute_values(cur, sql, values)

        if "RETURNING" in sql:
            records = cur.fetchone()

        conn.commit()
        cur.close()
    except (Exception, psycopg2.Error) as e:
        return (
            {
                "error": "DatabaseErrorInsert",
                "pgcode": e.pgcode,
                "pgerror": e.pgerror,
            },
            500,
        )
    finally:
        if conn is not None:
            conn.close()

    if records:
        return (records[0], 200)
    else:
        return (records, 200)


def update(params, sql, values):
    conn = None
    records = None

    try:
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        execute_values(cur, sql, values)

        if "RETURNING" in sql:
            records = cur.fetchone()

        conn.commit()
        cur.close()
    except (Exception, psycopg2.Error) as e:
        return (
            {
                "error": "DatabaseErrorUpdate",
                "pgcode": e.pgcode,
                "pgerror": e.pgerror,
            },
            500,
        )
    finally:
        if conn is not None:
            conn.close()

    if records:
        return (records[0], 200)
    else:
        return (records, 200)


def update1(params, sql):
    conn = None

    try:
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(sql)
        conn.commit()
        cur.close()
    except (Exception, psycopg2.Error) as e:
        return (
            {
                "error": "DatabaseErrorUpdate",
                "pgcode": e.pgcode,
                "pgerror": e.pgerror,
            },
            500,
        )
    finally:
        if conn is not None:
            conn.close()

    return (None, 200)


def delete1(params, sql):
    conn = None
    records = None

    try:
        conn = psycopg2.connect(**params)
        cur = conn.cursor()
        cur.execute(sql)
        conn.commit()
        records = cur.fetchone()
        cur.close()
    except (Exception, psycopg2.Error) as e:
        return (
            {
                "error": "DatabaseErrorDelete",
                "pgcode": e.pgcode,
                "pgerror": e.pgerror,
            },
            500,
        )
    finally:
        if conn is not None:
            conn.close()

    if records:
        return (records[0], 200)
    else:
        return (None, 204)