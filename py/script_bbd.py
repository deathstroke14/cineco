# ------------------------------------------------------
# ------------------CONEXION BDD Y CREACION TABLA------------------------
# ------------------------------------------------------
import sqlite3
from flask import Flask, jsonify, request
from flask_cors import CORS


DATABASE = 'cineco.db'  # ombre de la base de datos


def get_db_connection():  # conexion con la bdd
    conn = sqlite3.connect(DATABASE, check_same_thread=False)
    # conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


conn = sqlite3.connect(DATABASE, check_same_thread=False)
with open('db8.sql', 'r', encoding='UTF-8') as f:
    sql_script = f.read()
# conn.executescript(sql_script.lower())
conn.executescript(sql_script)
conn.close()