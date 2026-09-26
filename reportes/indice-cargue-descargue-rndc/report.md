# Índice de cargue y descargue RNDC: ciudades y departamentos

**Corte:** 2026-08  ·  **Configuración inicial:** 3S3  ·  **Periodo:** 202501–202608

## Lectura principal

El índice compara los viajes intermunicipales RNDC con origen en un territorio frente a los viajes con destino en ese territorio. La vista inicial usa 3S3; cada configuración vehicular se mantiene separada.

### Principales municipios

| Municipio | Departamento | Viajes con origen | Viajes con destino | Diferencia | Índice |
|---|---|---:|---:|---:|---:|
| BUENAVENTURA | VALLE DEL CAUCA | 27.662 | 8.272 | 19.390 | 3,34 |
| BARRANQUILLA | ATLÁNTICO | 16.890 | 17.233 | -343 | 0,98 |
| CARTAGENA DE INDIAS | BOLÍVAR | 18.766 | 13.900 | 4.866 | 1,35 |
| BOGOTÁ, D.C. | BOGOTÁ, D.C. | 10.158 | 19.005 | -8.847 | 0,53 |
| SANTA MARTA | MAGDALENA | 14.054 | 6.965 | 7.089 | 2,02 |
| TOCANCIPÁ | CUNDINAMARCA | 8.709 | 8.631 | 78 | 1,01 |
| YUMBO | VALLE DEL CAUCA | 7.275 | 9.005 | -1.730 | 0,81 |
| MEDELLÍN | ANTIOQUIA | 3.910 | 7.248 | -3.338 | 0,54 |
| FUNZA | CUNDINAMARCA | 4.141 | 6.309 | -2.168 | 0,66 |
| BARRANCABERMEJA | SANTANDER | 6.968 | 2.123 | 4.845 | 3,28 |

### Departamentos consolidados

| Departamento | Viajes con origen | Viajes con destino | Diferencia | Índice |
|---|---:|---:|---:|---:|
| VALLE DEL CAUCA | 49.823 | 39.341 | 10.482 | 1,27 |
| CUNDINAMARCA | 37.781 | 41.354 | -3.573 | 0,91 |
| ANTIOQUIA | 31.515 | 38.060 | -6.545 | 0,83 |
| ATLÁNTICO | 26.329 | 27.943 | -1.614 | 0,94 |
| BOLÍVAR | 20.642 | 16.391 | 4.251 | 1,26 |
| MAGDALENA | 22.041 | 10.146 | 11.895 | 2,17 |
| SANTANDER | 16.158 | 15.983 | 175 | 1,01 |
| BOGOTÁ, D.C. | 10.158 | 19.005 | -8.847 | 0,53 |
| BOYACÁ | 14.373 | 8.564 | 5.809 | 1,68 |
| META | 12.902 | 9.918 | 2.984 | 1,30 |

## Definición y alcance

- Fuente: `estadisticas_rndc`, campo `viajestotales`, por mes RNDC (`mes`) y código vehicular (`cod_config_vehiculo`).
- Cargue: suma de viajes con origen en el municipio o departamento. Descargue: suma de esos viajes con destino en el territorio.
- Índice: viajes con origen ÷ viajes con destino. La diferencia es origen menos destino. Un índice mayor que 1 indica más viajes que salen; menor que 1, más viajes que llegan.
- La vista intermunicipal excluye viajes cuyo origen y destino corresponden al mismo municipio, una vez consolidados los centros poblados al municipio padre por DIVIPOLA.
- Las configuraciones vehiculares se comparan por separado. El informe no suma configuraciones de capacidades distintas.
- Cobertura fuente: 3.846.018 filas RNDC y 20 archivos fuente entre 202501 y 202608; 21.433.362 viajes intermunicipales en el periodo completo.

## Diferencia frente al índice por eventos de manifiesto

El almacén conserva otra serie calculada desde `manifiestos_detalle`, con fechas de salida de cargue y llegada de descargue, cuyo corte consolidado llega a julio de 2026. Esta página usa la tabla agregada de estadísticas RNDC hasta agosto de 2026. Las dos definiciones se mantienen separadas y no se empalman.

Fuente: Ministerio de Transporte, RNDC. Cálculos ATIEMPPO 2026.
