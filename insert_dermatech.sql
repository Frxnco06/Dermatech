-- ============================================
-- INSERTS PARA DATOS DE PRUEBA
-- ============================================

USE dermatech;

-- ============================================
-- 1. CATÁLOGOS (tablas de configuración)
-- ============================================

-- Roles
INSERT INTO rol (nombre_rol) VALUES
('PACIENTE'),
('MEDICO'),
('ADMIN');

-- Especialidades
INSERT INTO especialidad (nombre_especialidad, descripcion) VALUES
('Dermatología General', 'Tratamiento general de enfermedades de la piel'),
('Dermatología Estética', 'Procedimientos estéticos y rejuvenecimiento facial'),
('Dermatología Pediátrica', 'Especializada en niños y adolescentes'),
('Tricología', 'Especialista en cabello y cuero cabelludo'),
('Dermatología Oncológica', 'Detección y tratamiento de cáncer de piel');

-- Estados de cita
INSERT INTO estado_cita (nombre_estado) VALUES
('PENDIENTE'),
('CONFIRMADA'),
('COMPLETADA'),
('CANCELADA'),
('NO_ASISTIO');

-- Categorías de productos
INSERT INTO categoria_producto (nombre_categoria, descripcion, activo) VALUES
('Protección Solar', 'Productos para proteger la piel del sol', TRUE),
('Hidratación', 'Cremas y lociones hidratantes', TRUE),
('Tratamiento Facial', 'Serums y tratamientos especializados', TRUE),
('Limpieza', 'Productos de limpieza facial y corporal', TRUE),
('Antiacné', 'Tratamientos para el acné y piel grasa', TRUE),
('Anti-edad', 'Productos para combatir signos de envejecimiento', TRUE);

-- Estados de orden
INSERT INTO estado_orden (nombre_estado) VALUES
('PENDIENTE'),
('PAGADA'),
('ENVIADA'),
('ENTREGADA'),
('CANCELADA');

-- Métodos de pago
INSERT INTO metodo_pago (nombre_metodo) VALUES
('EFECTIVO'),
('TARJETA_CREDITO'),
('TARJETA_DEBITO'),
('YAPE'),
('PLIN'),
('TRANSFERENCIA');

-- Admin
INSERT INTO usuarios (nombre_completo, email, contrasenia, telefono, dni, direccion, fecha_nacimiento, id_rol, activo) VALUES
('Administrador Sistema', 'admin@clinica.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '999888777', '12345678', 'Av. Javier Prado 123, San Isidro', '1980-01-15', 3, TRUE);

-- Médicos
INSERT INTO usuarios (nombre_completo, email, contrasenia, telefono, dni, direccion, fecha_nacimiento, id_rol, activo) VALUES
('Dr. Juan Carlos Pérez López', 'drperez@clinica.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '987654321', '45678912', 'Av. Arequipa 1234, Miraflores', '1985-03-15', 2, TRUE),
('Dra. María Fernanda Torres', 'drtorres@clinica.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '987123456', '78945612', 'Calle Los Pinos 456, San Borja', '1990-07-22', 2, TRUE),
('Dr. Roberto Silva Campos', 'drsilva@clinica.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '965432187', '32165498', 'Jr. Cusco 789, Lima', '1982-11-30', 2, TRUE),
('Dra. Ana Patricia Rojas', 'drojas@clinica.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '912876543', '65498732', 'Av. La Marina 321, Pueblo Libre', '1988-05-18', 2, TRUE);

-- Pacientes
INSERT INTO usuarios (nombre_completo, email, contrasenia, telefono, dni, direccion, fecha_nacimiento, id_rol, activo) VALUES
('María Elena González Rojas', 'maria.gonzalez@email.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '912345678', '65432178', 'Jr. Lampa 456, Lima', '1995-11-08', 1, TRUE),
('Carlos Alberto Ramírez', 'carlos.ramirez@email.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '923456789', '87654321', 'Av. Colonial 789, Callao', '1988-05-20', 1, TRUE),
('Lucía Fernández Soto', 'lucia.fernandez@email.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '934567890', '12398745', 'Calle Las Flores 123, Surco', '1992-08-14', 1, TRUE),
('Pedro José Martínez', 'pedro.martinez@email.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '945678901', '98765432', 'Av. Universitaria 555, Los Olivos', '1985-12-03', 1, TRUE),
('Andrea Sofía Vargas', 'andrea.vargas@email.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '956789012', '45612378', 'Jr. Huancayo 234, Breña', '1998-03-25', 1, TRUE),
('Miguel Ángel Castro', 'miguel.castro@email.com', '$2a$12$A4nq41fwwXwIkxo8QHWf5.acBZKoh0ggfTJlU2h7Sn7oKAkLzJxJu', '967890123', '75395148', 'Av. Brasil 890, Magdalena', '1990-09-17', 1, TRUE);

-- ============================================
-- 3. MÉDICOS (extendiendo usuarios)
-- ============================================

INSERT INTO medicos (id_usuario, id_especialidad, numero_colegiatura, tarifa_consulta, anios_experiencia) VALUES
(2, 1, 'CMP-54321', 150.00, 15),  -- Dr. Pérez - Dermatología General
(3, 2, 'CMP-98765', 180.00, 10),  -- Dra. Torres - Dermatología Estética
(4, 3, 'CMP-65432', 160.00, 12),  -- Dr. Silva - Dermatología Pediátrica
(5, 4, 'CMP-11223', 170.00, 8);   -- Dra. Rojas - Tricología

-- ============================================
-- 4. HORARIOS DE MÉDICOS
-- ============================================

-- Dr. Pérez (Lunes a Viernes: 9am-1pm y 3pm-7pm)
INSERT INTO horario_medico (id_medico, dia_semana, hora_inicio, hora_fin, activo) VALUES
(1, 1, '09:00:00', '13:00:00', TRUE), -- Lunes mañana
(1, 1, '15:00:00', '19:00:00', TRUE), -- Lunes tarde
(1, 2, '09:00:00', '13:00:00', TRUE), -- Martes mañana
(1, 2, '15:00:00', '19:00:00', TRUE),
(1, 3, '09:00:00', '13:00:00', TRUE), -- Miércoles
(1, 3, '15:00:00', '19:00:00', TRUE),
(1, 4, '09:00:00', '13:00:00', TRUE), -- Jueves
(1, 4, '15:00:00', '19:00:00', TRUE),
(1, 5, '09:00:00', '13:00:00', TRUE); -- Viernes

-- Dra. Torres (Martes a Sábado: 10am-2pm y 4pm-8pm)
INSERT INTO horario_medico (id_medico, dia_semana, hora_inicio, hora_fin, activo) VALUES
(2, 2, '10:00:00', '14:00:00', TRUE), -- Martes
(2, 2, '16:00:00', '20:00:00', TRUE),
(2, 3, '10:00:00', '14:00:00', TRUE), -- Miércoles
(2, 3, '16:00:00', '20:00:00', TRUE),
(2, 4, '10:00:00', '14:00:00', TRUE), -- Jueves
(2, 4, '16:00:00', '20:00:00', TRUE),
(2, 5, '10:00:00', '14:00:00', TRUE), -- Viernes
(2, 6, '10:00:00', '14:00:00', TRUE); -- Sábado

-- Dr. Silva (Lunes, Miércoles, Viernes: 8am-12pm)
INSERT INTO horario_medico (id_medico, dia_semana, hora_inicio, hora_fin, activo) VALUES
(3, 1, '08:00:00', '12:00:00', TRUE), -- Lunes
(3, 3, '08:00:00', '12:00:00', TRUE), -- Miércoles
(3, 5, '08:00:00', '12:00:00', TRUE); -- Viernes

-- Dra. Rojas (Lunes a Jueves: 2pm-6pm)
INSERT INTO horario_medico (id_medico, dia_semana, hora_inicio, hora_fin, activo) VALUES
(4, 1, '14:00:00', '18:00:00', TRUE), -- Lunes
(4, 2, '14:00:00', '18:00:00', TRUE), -- Martes
(4, 3, '14:00:00', '18:00:00', TRUE), -- Miércoles
(4, 4, '14:00:00', '18:00:00', TRUE); -- Jueves

-- ============================================
-- 5. CITAS
-- ============================================

INSERT INTO citas (id_paciente, id_medico, fecha_hora, id_estado_cita, motivo_consulta, diagnostico, tratamiento, observaciones, precio) VALUES
-- Citas completadas
(6, 1, '2025-09-15 10:00:00', 3, 'Consulta por acné facial', 'Acné vulgar grado II', 'Tratamiento tópico con adapaleno 0.1% y peróxido de benzoilo', 'Control en 4 semanas. Evitar exposición solar directa.', 150.00),
(7, 2, '2025-09-20 16:00:00', 3, 'Tratamiento anti-edad', 'Envejecimiento cutáneo leve', 'Limpieza facial profunda + aplicación de ácido hialurónico', 'Programar segunda sesión en 15 días.', 180.00),
(8, 1, '2025-09-28 09:00:00', 3, 'Revisión de lunar en espalda', 'Nevus melanocítico benigno', 'Solo observación. No requiere tratamiento', 'Control anual recomendado.', 150.00),

-- Citas confirmadas (próximas)
(6, 1, '2025-10-15 11:00:00', 2, 'Control de tratamiento para acné', NULL, NULL, NULL, 150.00),
(9, 3, '2025-10-16 08:30:00', 2, 'Consulta dermatitis en niño de 5 años', NULL, NULL, NULL, 160.00),
(10, 4, '2025-10-18 15:00:00', 2, 'Caída de cabello excesiva', NULL, NULL, NULL, 170.00),
(11, 2, '2025-10-20 17:00:00', 2, 'Consulta para tratamiento de manchas faciales', NULL, NULL, NULL, 180.00),

-- Citas pendientes
(7, 1, '2025-10-22 10:30:00', 1, 'Primera consulta dermatológica', NULL, NULL, NULL, 150.00),
(8, 2, '2025-10-25 11:00:00', 1, 'Interesada en peeling químico', NULL, NULL, NULL, 180.00),

-- Citas canceladas
(6, 1, '2025-10-05 09:00:00', 4, 'Consulta general', NULL, NULL, NULL, 150.00);

-- ============================================
-- 6. PRODUCTOS
-- ============================================

-- Protección Solar
INSERT INTO productos (id_categoria, nombre_producto, descripcion, precio, stock, sku, activo) VALUES
(1, 'Protector Solar Facial SPF 50+', 'Protección muy alta contra rayos UVA/UVB. No comedogénico. Textura ultra ligera. Resistente al agua. 50ml', 45.00, 50, 'PS-FACIAL-50', TRUE),
(1, 'Protector Solar Corporal SPF 30', 'Protección alta para todo el cuerpo. Textura ligera de rápida absorción. 200ml', 38.00, 60, 'PS-CORP-30', TRUE),
(1, 'Protector Solar Kids SPF 50+', 'Especial para piel sensible de niños. Hipoalergénico. 150ml', 42.00, 35, 'PS-KIDS-50', TRUE);

-- Hidratación
INSERT INTO productos (id_categoria, nombre_producto, descripcion, precio, stock, sku, activo) VALUES
(2, 'Crema Hidratante Facial Intensiva', 'Hidratación profunda 24h para todo tipo de piel. Con ácido hialurónico y vitamina E. 50ml', 42.00, 40, 'HID-FACIAL-01', TRUE),
(2, 'Loción Corporal Hidratante', 'Hidratación corporal con vitamina E y aloe vera. Textura no grasa. 400ml', 32.00, 45, 'HID-CORP-01', TRUE),
(2, 'Crema de Manos Reparadora', 'Reparación intensiva de manos secas y agrietadas. 75ml', 18.00, 55, 'HID-MANOS-01', TRUE);

-- Tratamiento Facial
INSERT INTO productos (id_categoria, nombre_producto, descripcion, precio, stock, sku, activo) VALUES
(3, 'Serum Vitamina C 10%', 'Tratamiento antioxidante y antimanchas. Ilumina y unifica el tono. Uso diario. 30ml', 65.00, 30, 'SER-VITC-10', TRUE),
(3, 'Serum Ácido Hialurónico', 'Hidratación profunda y efecto relleno. Reduce líneas finas. Anti-edad. 30ml', 58.00, 25, 'SER-AH-01', TRUE),
(3, 'Serum Niacinamida 5%', 'Reduce poros y controla el exceso de grasa. Mejora textura de la piel. 30ml', 52.00, 28, 'SER-NIAC-05', TRUE);

-- Limpieza
INSERT INTO productos (id_categoria, nombre_producto, descripcion, precio, stock, sku, activo) VALUES
(4, 'Gel Limpiador Facial', 'Limpieza profunda sin resecar. Para rostro y cuello. Uso diario. 200ml', 28.00, 55, 'LIMP-GEL-01', TRUE),
(4, 'Agua Micelar Desmaquillante', 'Limpia, desmaquilla y tonifica en un solo paso. Para todo tipo de piel. 400ml', 35.00, 40, 'LIMP-MIC-01', TRUE),
(4, 'Espuma Limpiadora Suave', 'Limpieza delicada para pieles sensibles. Sin jabón. 150ml', 32.00, 38, 'LIMP-ESP-01', TRUE);

-- Antiacné
INSERT INTO productos (id_categoria, nombre_producto, descripcion, precio, stock, sku, activo) VALUES
(5, 'Gel Tratamiento Antiacné', 'Con ácido salicílico 2%. Reduce imperfecciones, granitos y puntos negros. 40ml', 48.00, 35, 'ACNE-GEL-02', TRUE),
(5, 'Crema Control Grasa', 'Matifica y controla el exceso de grasa. Piel mixta a grasa. 50ml', 40.00, 30, 'ACNE-CREAM-01', TRUE),
(5, 'Tónico Purificante', 'Con extracto de hamamelis. Cierra poros y previene imperfecciones. 200ml', 30.00, 42, 'ACNE-TON-01', TRUE);

-- Anti-edad
INSERT INTO productos (id_categoria, nombre_producto, descripcion, precio, stock, sku, activo) VALUES
(6, 'Crema Anti-Edad Noche', 'Con retinol y péptidos. Reduce arrugas y líneas de expresión. 50ml', 75.00, 22, 'ANTI-CREAM-NOC', TRUE),
(6, 'Contorno de Ojos Anti-Edad', 'Reduce bolsas, ojeras y patas de gallo. 15ml', 55.00, 28, 'ANTI-OJOS-01', TRUE),
(6, 'Mascarilla Anti-Edad Intensiva', 'Tratamiento semanal con colágeno y elastina. Pack 5 unidades', 68.00, 20, 'ANTI-MASK-05', TRUE);

-- ============================================
-- 7. ÓRDENES Y DETALLES
-- ============================================

-- Orden 1: María González - ENTREGADA
INSERT INTO ordenes (id_usuario, numero_orden, subtotal, descuento, total, id_estado_orden, id_metodo_pago, direccion_envio) 
VALUES (6, 'ORD-2025-0001', 110.00, 10.00, 100.00, 4, 4, 'Jr. Lampa 456, Lima');

INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 45.00, 45.00),  -- Protector facial
(1, 10, 1, 28.00, 28.00), -- Gel limpiador
(1, 7, 1, 65.00, 65.00);  -- Serum Vit C

-- Orden 2: Carlos Ramírez - PAGADA
INSERT INTO ordenes (id_usuario, numero_orden, subtotal, descuento, total, id_estado_orden, id_metodo_pago, direccion_envio) 
VALUES (7, 'ORD-2025-0002', 148.00, 0.00, 148.00, 2, 2, 'Av. Colonial 789, Callao');

INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES
(2, 13, 2, 48.00, 96.00), -- Gel antiacné x2
(2, 14, 1, 40.00, 40.00), -- Crema control grasa
(2, 4, 1, 42.00, 42.00);  -- Crema hidratante

-- Orden 3: Lucía Fernández - ENVIADA
INSERT INTO ordenes (id_usuario, numero_orden, subtotal, descuento, total, id_estado_orden, id_metodo_pago, direccion_envio) 
VALUES (8, 'ORD-2025-0003', 250.00, 25.00, 225.00, 3, 5, 'Calle Las Flores 123, Surco');

INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES
(3, 16, 1, 75.00, 75.00),  -- Crema anti-edad noche
(3, 17, 1, 55.00, 55.00),  -- Contorno ojos
(3, 7, 1, 65.00, 65.00),   -- Serum Vit C
(3, 8, 1, 58.00, 58.00);   -- Serum ácido hialurónico

-- Orden 4: Pedro Martínez - PENDIENTE
INSERT INTO ordenes (id_usuario, numero_orden, subtotal, descuento, total, id_estado_orden, id_metodo_pago, direccion_envio) 
VALUES (9, 'ORD-2025-0004', 76.00, 0.00, 76.00, 1, NULL, 'Av. Universitaria 555, Los Olivos');

INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES
(4, 2, 1, 38.00, 38.00),  -- Protector corporal
(4, 5, 1, 32.00, 32.00);  -- Loción corporal

-- Orden 5: Andrea Vargas - ENTREGADA
INSERT INTO ordenes (id_usuario, numero_orden, subtotal, descuento, total, id_estado_orden, id_metodo_pago, direccion_envio) 
VALUES (10, 'ORD-2025-0005', 163.00, 13.00, 150.00, 4, 4, 'Jr. Huancayo 234, Breña');

INSERT INTO detalle_orden (id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES
(5, 1, 1, 45.00, 45.00),   -- Protector facial
(5, 11, 1, 35.00, 35.00),  -- Agua micelar
(5, 9, 1, 52.00, 52.00),   -- Serum niacinamida
(5, 15, 1, 30.00, 30.00);  -- Tónico purificante