DELIMITER //
CREATE PROCEDURE InsertarVenta(
    IN cliente_nombre VARCHAR(100),
    IN cliente_celular VARCHAR(15),
    IN cliente_direccion VARCHAR(100),
    IN fecha_registro DATETIME,
    IN metodo_pago_id INT,
    IN fecha_boleta DATETIME,
    IN metodo_entrega_id INT,
    IN total_venta DECIMAL(10,2),
    IN productos_json JSON
)
BEGIN
    DECLARE numero_boleta VARCHAR(10);
    -- Obtener el último número de boleta
    SELECT LPAD(SUBSTRING((SELECT MAX(numero_boleta) FROM boleta), 4) + 1, 6, '0') INTO numero_boleta;
    CALL InsertarCliente(cliente_nombre, cliente_celular, cliente_direccion, fecha_registro);
    CALL InsertarBoleta(numero_boleta, metodo_pago_id, fecha_boleta, metodo_entrega_id, total_venta);
    CALL InsertarDetalleBoleta(numero_boleta, productos_json);
END //
