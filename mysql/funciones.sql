-- Conocer ultimo numero de boleta de la tabla boleta
DELIMITER //
CREATE FUNCTION obtener_ultimo_numero_boleta()
RETURNS VARCHAR(10)
DETERMINISTIC
BEGIN
    DECLARE ultimo_numero VARCHAR(10);
    SELECT numero_boleta
    INTO ultimo_numero
    FROM boleta
    ORDER BY fecha_boleta DESC
    LIMIT 1;

    RETURN ultimo_numero;
END //

DELIMITER ;
SELECT obtener_ultimo_numero_boleta() AS ultimo_numero_boleta