#------------------------------------------------------
#------------------CONEXION BDD Y CREACION TABLA------------------------
#------------------------------------------------------
import sqlite3
#------------------------------------------------------
#------FLASK------------------------
from flask import Flask, jsonify, request
#------CORS------------------------
from flask_cors import CORS, cross_origin


DATABASE = 'cineco.db'  # Nombre de la base de datos


def get_db_connection():
    conn = sqlite3.connect(DATABASE, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

#------------------------------------------------------
#------------------CLASE PELICULA------------------------


class Pelicula:
    def __init__(self, idPelicula, titulo, genero, duracion, descripcion, url):
        self.idPelicula = idPelicula
        self.titulo = titulo
        self.genero = genero
        self.duracion = duracion
        self.descripcion = descripcion
        self.url = url

    @staticmethod
    def consultar_pelicula(idPelicula):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f'SELECT * FROM peliculas WHERE idPelicula = {idPelicula};'
        cursor.execute(sql)
        row = cursor.fetchone()
        conexion.close()
        if row:
            idPelicula, titulo, genero, duracion, descripcion, url = row
            pelicula = Pelicula(idPelicula, titulo, genero, duracion, descripcion, url)
            return pelicula
        return None
    
#------------------------------------------------------
#------------------CLASE FUNCION------------------------

class Funcion:
    def __init__(self, idFuncion, horario, horaFinal, fecha, idPelicula):
        self.idFuncion = idFuncion
        self.horario = horario
        self.horaFinal = horaFinal
        self.fecha = fecha
        self.idPelicula = idPelicula

    @staticmethod
    def consultar_funcion(idFuncion):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f'SELECT * FROM funciones WHERE idFuncion = {idFuncion};'
        cursor.execute(sql)
        row = cursor.fetchone()
        conexion.close()
        if row:
            idFuncion, horario, horaFinal, fecha, idPelicula = row
            funcion = Funcion(idFuncion, horario, horaFinal, fecha, idPelicula)
            return funcion
        return None
    
    @staticmethod
    def consultar_funciones_dia(fecha):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f"SELECT * FROM funciones WHERE fecha = '{fecha}';"
        cursor.execute(sql)
        rows = cursor.fetchall()
        conexion.close()
        funciones = []
        for row in rows:
            idFuncion, horario, horaFinal, fecha, idPelicula = row
            funcion = {'idFuncion': idFuncion, 'horario': horario, 'horaFinal': horaFinal, 'fecha': fecha, 'idPelicula': idPelicula}
            funciones.append(funcion)
        return jsonify(funciones), 200
   
    @staticmethod
    def consultar_dias_funciones():
        # Consultar los días que hay funciones
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = "SELECT DISTINCT fecha FROM funciones;"
        cursor.execute(sql)
        rows = cursor.fetchall()
        conexion.close()
        dias_funciones = []
        for row in rows:
            dias_funciones.append(row[0])
        return jsonify(dias_funciones)

        
#------------------------------------------------------
#------------------CLASE ENTRADA------------------------
class Entrada:

    def __init__(self, asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada, nroEntrada=None):
        self.nroEntrada = nroEntrada
        self.asientoNro = asientoNro
        self.asientoFila = asientoFila
        self.idUsuario = idUsuario
        self.idFuncion = idFuncion
        self.fechaCompra = fechaCompra
        self.comprada = comprada

    @staticmethod
    def consultar_butaca_funcion(idFuncion,asientoNro,asientoFila):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f'SELECT * FROM entradas WHERE idFuncion = {idFuncion} AND asientoNro={asientoNro} AND asientoFila="{asientoFila.lower()}";'        
        print(sql)
        cursor.execute(sql)
        row = cursor.fetchone()
        conexion.close()
        if row:
            nroEntrada, asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada = row
            entrada = Entrada(asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada, nroEntrada)
            return entrada
        return None
    
    @staticmethod
    def consultar_entradas_funcion(idFuncion):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f'SELECT * FROM entradas WHERE idFuncion = {idFuncion};'
        cursor.execute(sql)
        rows = cursor.fetchall()
        conexion.close()
        funciones = []
        for row in rows:
            nroEntrada, asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada = row
            funcion = {'asientoNro':asientoNro, 'asientoFila':asientoFila, 'idUsuario':idUsuario, 'idFuncion':idFuncion, 'fechaCompra':fechaCompra, 'nroEntrada':nroEntrada, 'comprada':comprada}
            funciones.append(funcion)
        return jsonify(funciones), 200
    

    @staticmethod
    def agregar_entradas_carrito(entradas):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        
        for entrada in entradas:
            asientoNro = entrada['asientoNro']
            asientoFila = entrada['asientoFila']
            idUsuario = entrada['idUsuario']
            idFuncion = entrada['idFuncion']
            fechaCompra = entrada['fechaCompra']
            comprada = entrada['comprada']
            
            sql = f'INSERT INTO entradas (asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada) VALUES ({asientoNro}, \'{asientoFila.lower()}\', {idUsuario}, {idFuncion}, \'{fechaCompra}\', {comprada});'

            # sql = f'INSERT INTO entradas (asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada) VALUES ({asientoNro},{asientoFila.lower()}, {idUsuario}, {idFuncion}, {fechaCompra}, {comprada});'
            
            cursor.execute(sql)
        
        conexion.commit()
        conexion.close()

        # return jsonify({'message': 'Entradas agregadas al carrito correctamente.'}), 200
    

    @staticmethod
    def obtener_entradas_carrito(idFuncion, idUsuario):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f"SELECT * FROM entradas WHERE comprada = 0 AND idFuncion = '{idFuncion}' AND idUsuario = '{idUsuario}';"
        cursor.execute(sql)
        rows = cursor.fetchall()
        conexion.close()

        entradas = []
        for row in rows:
            nroEntrada, asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada = row
            entrada = {
                'nroEntrada': nroEntrada,
                'asientoNro': asientoNro,
                'asientoFila': asientoFila,
                'idUsuario': idUsuario,
                'idFuncion': idFuncion,
                'fechaCompra': fechaCompra,
                'comprada': comprada
            }
            entradas.append(entrada)

        return jsonify(entradas), 200
    

    @staticmethod
    def eliminar_entrada_carrito(asientoFila, asientoNro, idFuncion, idUsuario):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f"DELETE FROM entradas WHERE comprada = 0 AND asientoFila = '{asientoFila.lower()}' AND asientoNro = {asientoNro} AND idFuncion = {idFuncion} AND idUsuario = {idUsuario};"
        cursor.execute(sql)
        conexion.commit()
        conexion.close()
        return jsonify({'message': 'Entrada eliminada del carrito correctamente.'}), 200
    
    
    @staticmethod
    def eliminar_entradas_carrito(idFuncion, idUsuario):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f"DELETE FROM entradas WHERE comprada = 0 AND idFuncion = {idFuncion} AND idUsuario = {idUsuario};"
        cursor.execute(sql)
        conexion.commit()
        conexion.close()
        return jsonify({'message': 'Entradas eliminadas del carrito correctamente.'}), 200

    @staticmethod
    def comprar_entradas_carrito(idFuncion, idUsuario):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f"UPDATE entradas SET comprada = 1 WHERE comprada = 0 AND idFuncion = {idFuncion} AND idUsuario = {idUsuario};"
        cursor.execute(sql)
        conexion.commit()
        conexion.close()
        return jsonify({'message': 'Entradas del carrito compradas correctamente.'}), 200



#------------------------------------------------------
#------------------CLASE PERSONA------------------------
class Usuario:	
    def __init__(self, idUsuario, nombre, apellido, dni, email):
        self.idUsuario = idUsuario
        self.nombre = nombre
        self.apellido = apellido
        self.dni = dni
        self.email = email

    @staticmethod
    def consultar_usuario(idUsuario):
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f'SELECT * FROM usuarios WHERE idUsuario = {idUsuario};'
        cursor.execute(sql)
        row = cursor.fetchone()
        conexion.close()
        if row:
            idUsuario, nombre, apellido, dni, email = row
            usuario = Usuario(idUsuario, nombre, apellido, dni, email)
            return usuario
        return None
    
    @staticmethod
    def buscar_usuario(apellido, dni):
        # Buscar el usuario por apellido y DNI en la tabla "usuarios"
        conexion = get_db_connection()
        cursor = conexion.cursor()
        sql = f"SELECT * FROM usuarios WHERE apellido = '{apellido}' AND dni = {dni};"
        cursor.execute(sql)
        row = cursor.fetchone()
        conexion.close()
        if row:
            idUsuario, nombre, apellido, dni, email = row
            usuario = Usuario(idUsuario, nombre, apellido, dni, email)
            return usuario
        return None
    

#------------------------------------------------------
#------------------CLASE CARRITO------------------------






#-------------------------------------------------------
#------------------FLASK------------------------
#-------------------------------------------------------


app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return 'API CINECO'

#-------------------------------------------------------
#------------------FLASK PELICULA------------------------

@app.route('/pelicula/<int:idPelicula>', methods=['GET'])
def get_pelicula(idPelicula):
    pelicula = Pelicula.consultar_pelicula(idPelicula)
    if pelicula:
        return jsonify({
            'idPelicula': pelicula.idPelicula,
            'titulo': pelicula.titulo,
            'genero': pelicula.genero,
            'duracion': pelicula.duracion,
            'descripcion': pelicula.descripcion,
            'url': pelicula.url,
        }), 200
    return jsonify({'message': 'Película no encontrada.'}), 404

#------------------------------------------------------
#------------------FLASK FUNCION------------------------

@app.route('/funcion/<int:idFuncion>', methods=['GET'])
def get_funcion(idFuncion):
    funcion = Funcion.consultar_funcion(idFuncion)
    if funcion:
        return jsonify({
            'idFuncion': funcion.idPelicula,
            'horario': funcion.horario,
            'horaFinal': funcion.horaFinal,
            'fecha': funcion.fecha,
            'idPelicula': funcion.idPelicula,
        }), 200
    return jsonify({'message': 'Función no encontrada.'}), 404


@app.route('/funciones/<string:fecha>', methods=['GET'])
def get_funciones_dia(fecha):
    return Funcion.consultar_funciones_dia(fecha)


@app.route('/funciones/dias', methods=['GET'])
def get_dias_funciones():
    dias_funciones = Funcion.consultar_dias_funciones()
    return dias_funciones

#------------------------------------------------------
#------------------FLASK ENTRADA------------------------

@app.route('/entrada/<int:idFuncion>/<int:asientoNro>/<string:asientoFila>', methods=['GET'])
def get_butaca_funcion(idFuncion,asientoNro,asientoFila):
    # asientoNro, asientoFila, idUsuario, idFuncion, fechaCompra, comprada, nroEntrada
    entrada = Entrada.consultar_butaca_funcion(idFuncion,asientoNro,asientoFila)
    if entrada:
        return jsonify({
            'nroEntrada': entrada.nroEntrada,
            'asientoNro': entrada.asientoNro,
            'asientoFila': entrada.asientoFila,
            'idUsuario': entrada.idUsuario,
            'idFuncion': entrada.idFuncion,
            'fechaCompra': entrada.fechaCompra,
            'comprada': entrada.comprada
        }), 200
    return jsonify({'message': 'Butaca para funcion no encontrada.'}), 404

   
@app.route('/entradas/<int:idFuncion>', methods=['GET'])
def get_entradas_funcion(idFuncion):
    return Entrada.consultar_entradas_funcion(idFuncion)


@app.route('/entradas/carrito', methods=['POST'])
# @cross_origin
def add_entradas_carrito():
    entradas = request.get_json()
    Entrada.agregar_entradas_carrito(entradas)
    return jsonify({'message': 'entradas agrergadas al carrito.'}), 200


@app.route('/entradas/carrito/<int:idFuncion>/<int:idUsuario>', methods=['GET'])
def get_entradas_carrito(idFuncion, idUsuario):
    return Entrada.obtener_entradas_carrito(idFuncion, idUsuario)
    
@app.route('/entrada/carrito/eliminar', methods=['POST'])
def eliminar_entrada_carrito():
    data = request.get_json()
    asientoFila = data.get('asientoFila')
    asientoNro = data.get('asientoNro')
    idFuncion = data.get('idFuncion')
    idUsuario = data.get('idUsuario')
    Entrada.eliminar_entrada_carrito(asientoFila, asientoNro, idFuncion, idUsuario)
    return jsonify({'message': 'Entrada eliminada del carrito correctamente.'}), 200


@app.route('/entradas/carrito/eliminar', methods=['POST'])
def eliminar_entradas_carrito():
    data = request.get_json()
    idFuncion = data.get('idFuncion')
    idUsuario = data.get('idUsuario')
    Entrada.eliminar_entradas_carrito(idFuncion, idUsuario)
    return jsonify({'message': 'Entradas eliminadas del carrito correctamente.'}), 200

@app.route('/entradas/carrito/comprar', methods=['POST'])
def comprar_entradas_carrito():
    data = request.get_json()
    idFuncion = data.get('idFuncion')
    idUsuario = data.get('idUsuario')
    Entrada.comprar_entradas_carrito(idFuncion, idUsuario)
    return jsonify({'message': 'Entradas del carrito compradas correctamente.'}), 200


#------------------------------------------------------
#------------------FLASK USUARIO------------------------
@app.route('/usuario/<int:idUsuario>', methods=['GET'])
def get_usuario(idUsuario):
    usuario = Usuario.consultar_usuario(idUsuario)
    if usuario:
        return jsonify({
            'idUsuario': usuario.idUsuario,
            'nombre': usuario.nombre,
            'apellido': usuario.apellido,
            'dni': usuario.dni,
            'email': usuario.email,
        }), 200
    return jsonify({'message': 'Usuario no encontrado.'}), 404


@app.route('/usuario', methods=['POST'])
def get_usuario_apellido_dni():
    data = request.get_json()
    apellido = data.get('apellido')
    dni = data.get('dni')
    usuario = Usuario.buscar_usuario(apellido, dni)
    if usuario:
        return jsonify({
            'idUsuario': usuario.idUsuario,
            'nombre': usuario.nombre,
            'apellido': usuario.apellido,
            'dni': usuario.dni,
            'email': usuario.email
        }), 200
    return jsonify({'message': 'Usuario no encontrado.'}), 404

# @app.route('/usuario', methods=['GET'])
# def get_usuario_apellido_dni():
#     apellido = request.args.get('apellido')
#     dni = request.args.get('dni')
#     usuario = Usuario.buscar_usuario(apellido, dni)
#     if usuario:
#         return jsonify({
#             'idUsuario': usuario.idUsuario,
#             'nombre': usuario.nombre,
#             'apellido': usuario.apellido,
#             'dni': usuario.dni,
#             'email': usuario.email
#         }), 200
#     return jsonify({'message': 'Usuario no encontrado.'}), 404


if __name__ == '__main__':
    app.run()
