
-- Crear base de datos
CREATE DATABASE IF NOT EXISTS dermatech CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci;
USE dermatech;

-- Tabla rol
CREATE TABLE rol (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(20) NOT NULL UNIQUE
);

-- Tabla usuarios
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    telefono VARCHAR(15),
    dni VARCHAR(8) NOT NULL UNIQUE,
    direccion VARCHAR(200),
    fecha_nacimiento DATE,
    id_rol INT NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_rol) REFERENCES rol(id_rol)
);

-- Tabla especialidad
CREATE TABLE especialidad (
    id_especialidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre_especialidad VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- Tabla medicos
CREATE TABLE medicos (
    id_medico INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL UNIQUE,
    id_especialidad INT NOT NULL,
    numero_colegiatura VARCHAR(20) NOT NULL UNIQUE,
    tarifa_consulta DECIMAL(10, 2) NOT NULL,
    anios_experiencia INT,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_especialidad) REFERENCES especialidad(id_especialidad)
);

-- Tabla estado_cita
CREATE TABLE estado_cita (
    id_estado_cita INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estado VARCHAR(20) NOT NULL UNIQUE
);

-- Tabla citas
CREATE TABLE citas (
    id_cita INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    id_medico INT NOT NULL,
    fecha_hora DATETIME NOT NULL,
    id_estado_cita INT NOT NULL,
    motivo_consulta TEXT,
    diagnostico TEXT,
    tratamiento TEXT,
    observaciones TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_paciente) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico),
    FOREIGN KEY (id_estado_cita) REFERENCES estado_cita(id_estado_cita)
);

-- Tabla categoria_producto
CREATE TABLE categoria_producto (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL UNIQUE,
    descripcion TINYTEXT,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

-- Tabla productos
CREATE TABLE productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    nombre_producto VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    imagen_url VARCHAR(255),
    sku VARCHAR(50) UNIQUE,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_categoria) REFERENCES categoria_producto(id_categoria)
);

-- Tabla estado_orden
CREATE TABLE estado_orden (
    id_estado_orden INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estado VARCHAR(20) NOT NULL UNIQUE
);

-- Tabla metodo_pago
CREATE TABLE metodo_pago (
    id_metodo_pago INT AUTO_INCREMENT PRIMARY KEY,
    nombre_metodo VARCHAR(30) NOT NULL UNIQUE
);

-- Tabla ordenes
CREATE TABLE ordenes (
    id_orden INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    numero_orden VARCHAR(20) NOT NULL UNIQUE,
    subtotal DECIMAL(10, 2) NOT NULL,
    descuento DECIMAL(10, 2) DEFAULT 0.00,
    total DECIMAL(10, 2) NOT NULL,
    id_estado_orden INT NOT NULL,
    id_metodo_pago INT,
    direccion_envio VARCHAR(200),
    fecha_orden TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_estado_orden) REFERENCES estado_orden(id_estado_orden),
    FOREIGN KEY (id_metodo_pago) REFERENCES metodo_pago(id_metodo_pago)
);

-- Tabla detalle_orden
CREATE TABLE detalle_orden (
    id_detalle INT AUTO_INCREMENT PRIMARY KEY,
    id_orden INT NOT NULL,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    
    FOREIGN KEY (id_orden) REFERENCES ordenes(id_orden) ON DELETE CASCADE,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto) ON DELETE CASCADE
);

-- Tabla horario_medico
CREATE TABLE horario_medico (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_medico INT NOT NULL,
    dia_semana INT NOT NULL CHECK (dia_semana BETWEEN 0 AND 6), -- 0=Domingo, 6=Sábado
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    
    FOREIGN KEY (id_medico) REFERENCES medicos(id_medico) ON DELETE CASCADE,
    UNIQUE KEY unique_horario (id_medico, dia_semana, hora_inicio)
);