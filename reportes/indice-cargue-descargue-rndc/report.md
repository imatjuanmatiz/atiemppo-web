# Índice de cargue y descargue RNDC: ciudades y departamentos

**Corte:** 2026-09 por fecha de salida de cargue  ·  **Configuración inicial:** 3S3  ·  **Periodo:** 202501–202609

## Lectura principal

El índice compara los manifiestos completos intermunicipales con origen en un territorio frente a los manifiestos completos con destino en ese territorio. Ambos extremos del mismo registro se asignan al mes de salida del cargue, aunque la llegada ocurra después. La vista inicial usa 3S3 y cada configuración vehicular se mantiene separada.

El [mapa interactivo](index.html#mapa) abre con todos los municipios con registros y coordenadas en el corte. Tiene filtros por mes, configuración y nivel geográfico. Los colores distinguen índices menores que 1, iguales a 1 y mayores que 1. La trama indica que falta el denominador. Para municipios sin coordenadas en el maestro DIVIPOLA se utiliza un punto interior del polígono del DANE MGN 2025. La [infografía descargable](infografia-cargue-descargue-rndc.png) compara tres series de la configuración 3S3.

### Principales municipios

| Municipio | Departamento | Manifiestos con origen | Manifiestos con destino | Diferencia | Índice |
|---|---|---:|---:|---:|---:|
| BUENAVENTURA | VALLE DEL CAUCA | 37.399 | 14.417 | 22.982 | 2,59 |
| CARTAGENA DE INDIAS | BOLÍVAR | 21.535 | 15.087 | 6.448 | 1,43 |
| BARRANQUILLA | ATLÁNTICO | 17.266 | 17.106 | 160 | 1,01 |
| BOGOTÁ, D.C. | BOGOTÁ, D.C. | 11.687 | 21.796 | -10.109 | 0,54 |
| SANTA MARTA | MAGDALENA | 14.016 | 8.784 | 5.232 | 1,60 |
| YUMBO | VALLE DEL CAUCA | 10.880 | 10.488 | 392 | 1,04 |
| TOCANCIPÁ | CUNDINAMARCA | 9.069 | 7.793 | 1.276 | 1,16 |
| MEDELLÍN | ANTIOQUIA | 4.661 | 8.509 | -3.848 | 0,55 |
| FUNZA | CUNDINAMARCA | 4.099 | 6.773 | -2.674 | 0,61 |
| BARRANCABERMEJA | SANTANDER | 7.664 | 2.218 | 5.446 | 3,46 |

### Departamentos consolidados

| Departamento | Manifiestos con origen | Manifiestos con destino | Diferencia | Índice |
|---|---:|---:|---:|---:|
| VALLE DEL CAUCA | 66.622 | 51.662 | 14.960 | 1,29 |
| CUNDINAMARCA | 40.349 | 44.761 | -4.412 | 0,90 |
| ANTIOQUIA | 37.874 | 45.296 | -7.422 | 0,84 |
| ATLÁNTICO | 27.547 | 28.614 | -1.067 | 0,96 |
| BOLÍVAR | 23.633 | 17.675 | 5.958 | 1,34 |
| MAGDALENA | 23.735 | 13.031 | 10.704 | 1,82 |
| SANTANDER | 19.186 | 17.031 | 2.155 | 1,13 |
| BOGOTÁ, D.C. | 11.687 | 21.796 | -10.109 | 0,54 |
| BOYACÁ | 16.976 | 8.740 | 8.236 | 1,94 |
| META | 12.900 | 10.181 | 2.719 | 1,27 |

## Definición y alcance

- Fuente de las mediciones: registros de `manifiestos_detalle`; no se usó la tabla de estadísticas agregadas. Cada fila con campos completos cuenta una vez en origen y una vez en destino. El TXT carece de un radicado único para identificar manifiestos.
- Se incluyen manifiestos con fecha de salida y llegada válidas, llegada igual o posterior a la salida, códigos de origen y destino reconocidos, configuración vehicular y archivo fuente identificados.
- Cargue: conteo de manifiestos completos con origen en el territorio. Descargue: conteo de esos mismos manifiestos con destino en el territorio. El destino se agrupa por el mes de salida del cargue, incluso cuando su fecha de llegada cae en el mes siguiente.
- Índice: manifiestos con origen ÷ manifiestos con destino. La diferencia es origen menos destino. Un índice mayor que 1 indica más manifiestos que salen; menor que 1, más manifiestos que llegan.
- La vista intermunicipal excluye manifiestos cuyo origen y destino corresponden al mismo municipio, una vez consolidados los centros poblados al municipio padre mediante el maestro DIVIPOLA.
- Las configuraciones vehiculares se comparan por separado. El informe no suma configuraciones de capacidades distintas.
- Cobertura: 26.601.559 manifiestos completos en 21 archivos fuente; 26.601.559 filas tienen fecha de cargue dentro de la cohorte 202501–202609. Se excluyeron 0 filas de esa cohorte por no cumplir todos los criterios de inclusión.
- La última fecha de llegada registrada entre los manifiestos completos incluidos es 2026-11-11; La cohorte de cargue puede incluir llegadas de meses posteriores.
- El maestro DIVIPOLA aporta los códigos y nombres territoriales. El código RNDC 27086000 se homologa al código oficial 27493000 de Nuevo Belén de Bajirá. El índice se calcula desde las filas con campos completos.

Fuente: Ministerio de Transporte, RNDC (`manifiestos_detalle`). Cálculos ATIEMPPO 2026.
