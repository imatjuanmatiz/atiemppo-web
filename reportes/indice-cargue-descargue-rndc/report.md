# Índice de cargue y descargue RNDC: ciudades y departamentos

**Corte:** 2026-07 por fecha de salida de cargue  ·  **Configuración inicial:** 3S3  ·  **Periodo:** 202501–202607

## Lectura principal

El índice compara los manifiestos completos intermunicipales con origen en un territorio frente a los manifiestos completos con destino en ese territorio. El mes corresponde a la fecha de salida del cargue; ambos extremos del mismo manifiesto se asignan a esa cohorte, aunque la llegada ocurra después. La vista inicial usa 3S3; cada configuración vehicular se mantiene separada.

### Principales municipios

| Municipio | Departamento | Manifiestos con origen | Manifiestos con destino | Diferencia | Índice |
|---|---|---:|---:|---:|---:|
| BUENAVENTURA | VALLE DEL CAUCA | 36.564 | 12.910 | 23.654 | 2,83 |
| CARTAGENA DE INDIAS | BOLÍVAR | 22.433 | 14.646 | 7.787 | 1,53 |
| BARRANQUILLA | ATLÁNTICO | 17.161 | 16.665 | 496 | 1,03 |
| BOGOTÁ, D.C. | BOGOTÁ, D.C. | 10.488 | 20.460 | -9.972 | 0,51 |
| SANTA MARTA | MAGDALENA | 14.245 | 8.709 | 5.536 | 1,64 |
| YUMBO | VALLE DEL CAUCA | 9.390 | 8.993 | 397 | 1,04 |
| TOCANCIPÁ | CUNDINAMARCA | 7.839 | 7.321 | 518 | 1,07 |
| FUNZA | CUNDINAMARCA | 4.078 | 7.350 | -3.272 | 0,55 |
| MEDELLÍN | ANTIOQUIA | 3.934 | 7.419 | -3.485 | 0,53 |
| GUADALAJARA DE BUGA | VALLE DEL CAUCA | 2.986 | 6.537 | -3.551 | 0,46 |

### Departamentos consolidados

| Departamento | Manifiestos con origen | Manifiestos con destino | Diferencia | Índice |
|---|---:|---:|---:|---:|
| VALLE DEL CAUCA | 63.117 | 47.621 | 15.496 | 1,33 |
| CUNDINAMARCA | 38.584 | 41.499 | -2.915 | 0,93 |
| ANTIOQUIA | 33.457 | 40.980 | -7.523 | 0,82 |
| ATLÁNTICO | 27.884 | 28.316 | -432 | 0,98 |
| BOLÍVAR | 24.270 | 17.327 | 6.943 | 1,40 |
| MAGDALENA | 22.819 | 13.407 | 9.412 | 1,70 |
| SANTANDER | 17.587 | 16.696 | 891 | 1,05 |
| BOGOTÁ, D.C. | 10.488 | 20.460 | -9.972 | 0,51 |
| BOYACÁ | 14.099 | 8.387 | 5.712 | 1,68 |
| META | 12.172 | 10.088 | 2.084 | 1,21 |

## Definición y alcance

- Fuente de las mediciones: registros de `manifiestos_detalle`; no se usó la tabla de estadísticas agregadas. Cada fila completa representa un manifiesto y cuenta una vez en origen y una vez en destino.
- Se incluyen manifiestos con fecha de salida y llegada válidas, llegada igual o posterior a la salida, códigos de origen y destino reconocidos, configuración vehicular y archivo fuente identificados.
- Cargue: conteo de manifiestos completos con origen en el territorio. Descargue: conteo de esos mismos manifiestos con destino en el territorio. El destino se agrupa por el mes de salida del cargue, incluso cuando su fecha de llegada cae en el mes siguiente.
- Índice: manifiestos con origen ÷ manifiestos con destino. La diferencia es origen menos destino. Un índice mayor que 1 indica más manifiestos que salen; menor que 1, más manifiestos que llegan.
- La vista intermunicipal excluye manifiestos cuyo origen y destino corresponden al mismo municipio, una vez consolidados los centros poblados al municipio padre mediante el maestro DIVIPOLA.
- Las configuraciones vehiculares se comparan por separado. El informe no suma configuraciones de capacidades distintas.
- Cobertura: 23.796.078 manifiestos completos en 19 archivos fuente; 23.796.078 filas tienen fecha de cargue dentro de la cohorte 202501–202607. Se excluyeron 0 filas de esa cohorte por no cumplir todos los criterios de inclusión.
- La última fecha de llegada registrada entre los manifiestos completos incluidos es 2026-08-21; por eso la cohorte de cargue de julio de 2026 puede incluir llegadas de agosto.
- El maestro DIVIPOLA se utiliza solo para homologar códigos y nombres de municipios y departamentos; todas las cantidades e índices se calculan desde las filas completas de manifiesto.

Fuente: Ministerio de Transporte, RNDC (`manifiestos_detalle`). Cálculos ATIEMPPO 2026.
