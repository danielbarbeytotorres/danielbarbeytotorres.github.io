---
layout: post
title: "AD + CCN-STIC - Implementando seguridad corporativa con Active Directory y las guías CCN-STIC"
date: 2025-11-18
---

![Foto de Active Directory](/img/AD_CCN_1.png)

## Introducción

Durante mi paso por la UNIR, he realizado hace poco una de las experiencias más completas (y sinceramente, más sufridas) que he tenido durante el Master de Ciberseguridad: Implementar un dominio Windows Server desde cero y endurecerlo siguiendo las guías del CCN-CERT (*Centro Criptológico Nacional*).

El objetivo de la actividad que realice era **implantar políticas del ENS (*Esquema Nacional de Seguridad*)** sobre:
- Los **controladores de dominio y los servidores** con la guía **CCN-STIC-570A23**.
- Los **equipos cliente Windows** con la guía **CCN-STIC-599AB23**.

## Enunciado de la actividad

El objetivo era recopilar evidencias sobre la correcta implementación de lo siguiente:
- Montar un dominio *Active Directory* completamente funcional.
- Endurecerlo siguiendo las configuraciones específicas de los anexos B, C y D de la guía **CCN-STIC-570A23**.
- Configurar GPOs adaptadas a las necesidades de la empresa ficticia.
- Implementar también la seguridad en un cliente Windows 11 con la guía **CCN-STIC-599AB23** partiendo de los anexos A2, A3 y A4.

El **montaje del entorno en VMware** se dividió en 2 VMs:
- **Windows Server 2022**, que actuó como Controlador de dominio, DNS y Servidor DHCP.
- **Windows 11**, como cliente del dominio.

![Foto de evidencia del montaje](/img/AD_CCN_2.png)

## Configuración del servidor
Primero, configure la red interna en la subred 192.168.5.0, asignando la IP 192.168.5.2. Posteriormente instale los roles *Active Direcotry Domain Services*, *DNS* y *DHCP*. Luego cree el dominio, especificando el nombre del equipo, el nombre del dominio y el nombre de la NetBIOS.

![Foto de evidencia del montaje](/img/AD_CCN_3.png)

## Configuración del Cliente
Primero active la red interna con DHCP y me aseguré que usase como servidor DNS al Windows Server 2022 (192.168.5.2). Uní el equipo al dominio mediante un usuario que cree con anterioridad durante la fase previa.
Tras un reinicio y un par de clicks, ya podía autenticarme en el dominio sin problemas.

![Foto de evidencia del montaje](/img/AD_CCN_4.png) <br>

# Aplicación de políticas de seguridad del CCN-STIC en el servidor
En este punto comenzaba realmente el objetivo de la actividad, que es trasladar a este dominio real y funcional las guías nacionales de seguridad. Para aplicar las directivas, simule que estaba trabajando sobre una organización real, a la que llame **Atlántico S.L.**

**[Puedes descargar la Guía CCN-STIC 570A23 usada aquí (PDF)](/archivos_posts/CCN-STIC 570A23.pdf)**

Estas son las políticas que implementé del **CCN-STIC-570A23**:<br>

## Anexo B.2 - Mantenimiento y actualizaciones de seguridad

![Foto del Anexo B.2](/img/AD_CCN_5.png)

Configuré actualizaciones automáticas según las necesidades operativas de Atlántico S.L.:
- Actualizaciones instaladas todos los lunes a las 8:00 AM, primera semana del mes.
- Aplazamiento de 5 días para evitar fallos por parches recientes.

## Anexo B.3 - Protección frente a código dañino

![Foto del Anexo B.3](/img/AD_CCN_6.png)

En esta directiva aplique configuraciones antimalware corporativo:
- Escaneo rápido diario a las 4 AM.
- Escaneo completo todos los viernes a las 5 AM.

## Anexo B.4 - Protección de integridad y autenticidad (Firewall)

![Foto del Anexo B.4](/img/AD_CCN_7.png)

Definí reglas restrictivas, permitiendo solo el tráfico interno imprescindible para el dominio. En las evidencias aparece la regla configurada en el firewall de Windows Server con la lista exacta de puertos permitidos.<br>

## Anexo B.5 - Copias de seguridad
Configuré copia manual de scripts críticos.
Tuve un problema de espacio al intentar completar la copia por falta de un dispositivo de almacenamiento de los backups en la VM que me proporcionó la UNIR, lo cual dejé reflejado en mi documento personal, pero el objetivo quedaba cumplido a nivel de configuración.<br>

## Anexo C.2 - Segregación de funciones y tareas

![Foto del Anexo C.2](/img/AD_CCN_8.png)

Asigné el privilegio "Administrar registro de seguridad y auditoría" solo a los Administradores y al grupo Auditores (el cual fue creado con el script de Segregación de roles y funciones que el CCN aporta).<br>

## Anexo D.1 - Mensaje legal de inicio de sesión
Configuré el típico banner corporativo obligatorio del ENS. Incluye advertencias sobre uso autorizado y acciones legales.

**Evidencia de funcionamiento**:

![Evidenvia del Anexo D.1](/img/AD_CCN_9.png)<br>

### Anexo D.2 - Retención de registros de actividad

![Foto del Anexo D.2](/img/AD_CCN_10.png)

Se ha configurado en la organización la retención de los registros de las aplicaciones durante 1 año. Además, se han establecido tamaños máximos grandes (32 MB) para evitar pérdida de información. También se ha configurado la restricción del acceso a los registros para proteger su integridad ante manipulaciones no autorizadas.<br>

## Anexo D.3 - Privilegios

![Foto del Anexo D.3](/img/AD_CCN_11.png)

Se han asignado los privilegios básicos para los equipos de la organización Atlántico S.L. Se han establecido con especial atención con las directivas “Iniciar sesión como proceso por lotes, “Iniciar sesión como servicio”, “Permitir el inicio de sesión local” y “Permitir inicio de sesión a través de Servicios de Escritorio remoto”.
En concreto, los administradores pueden iniciar sesión localmente, por Escritorio remoto, como proceso por lotes y como servicio y los usuarios únicamente pueden iniciar sesión de forma local. 
De esta manera se garantiza una correcta separación de roles.<br>

## Anexo D.4 - Cifrado Kerberos permitidos
Añadí **RC4** exclusivamente por compatibilidad, manteniendo AES como cifrado seguro por defecto. Comprobé la aplicación real mediante:
- gpupdate /force
- gpresult /h c:\gp.html

Y verificación en el cliente Windows 11, mostrado también en el informe HTML generado:

![Evidenvia del Anexo D.4](/img/AD_CCN_12.png)<br>

## Anexo D.5 - Bloqueo por inactividad

![Evidenvia del Anexo D.5](/img/AD_CCN_13.png)

Aplique la directiva para que el equipo servidor se bloquease a los 10 minutos por inactividad.<br>

## Anexo D.6 - Opciones de seguridad

![Evidenvia del Anexo D.6](/img/AD_CCN_14.png)

Deshabilite la directiva "Apagar el sistema de inmediato si no se pueden registrar las auditorías" para evitar reinicios indeseados en equipos con recursos limitados o picos de carga.<br>

# Aplicación de políticas de seguridad del CCN-STIC en el cliente

**[Puedes descargar la Guía CCN-STIC 599AB23 usada aquí (PDF)](/archivos_posts/CCN-STIC 599AB23.pdf)**

Estas son las políticas que implementé del **CCN-STIC-599AB23**. Las guías para clientes se aplicaron desde los anexos A2, A3 y A4.<br>

## Anexo A2.2 - Mantenimiento y actualizaciones de seguridad

![Evidenvia del Anexo A2.2](/img/AD_CCN_15.png)

- Se realizarán los lunes a las 7 AM de la primera semana del mes.
- Retraso del aplazamiento de calidad de 5 días.

## Anexo A2.3 - Protección contra el código dañino

![Evidenvia del Anexo A2.3](/img/AD_CCN_16.png)

- Se realiza un escaneo rápido diario a las 4 AM.
- Se realiza el escaneo semanal programado los lunes a las 5 AM

## Anexo A2.4 - Firewall

![Evidencia del Anexo A2.3](/img/AD_CCN_17.png)

Cree una regla de entrada que solo permitía el tráfico de los puertos 135 y 2701 TCP, reforzando el principio de **mínimo privilegio**.<br>

## Anexo A2.5 - Copias de seguridad locales
Configurarlo, aunque tuve limitaciones de espacio para ejecutar la copia real por el mismo motivo que al realizar la configuración en el servidor.<br>

## Anexo A3.2 - Segregación de funciones
Igual que en el servidor: Solo Administradores y Auditores pueden gestionar el registro de seguridad.<br>

## Anexo 4.1 - Información de obligaciones

![Foto del Anexo A4.1](/img/AD_CCN_18.png)

El cliente muestra el mensaje legal corporativo al iniciar sesión.

Evidencia de funcionamiento:

![Evidencia del Anexo A4.1](/img/AD_CCN_19.png)<br>

## Anexo 4.2 - Retención de registros
Configuree almacenamiento hasta 32 MB por log y retención de 1 año (donde aplica).<br>

## Conclusión
Esta práctica me obligó a trabajar con un enfoque muy cercano al de un administrador de sistemas de una empresa real. No solo tuve que instalar y hacer funcionar un dominio, sino entender, adaptar y justificar políticas del ENS como si estuviese endureciendo un entorno corporativo. Además, pude comprobar:
- Cómo interactúan servidor y cliente a través de GPOs.
- Qué configuraciones del CCN-STIC tienen mayor impacto.
- La importancia de la segregación de funciones.
- Los problemas reales, como la falta de espacio para copias de seguridad, y cómo documentarlos adecuadamente sin romper la práctica.
Finalmente, logré aplicar con éxito todas las directivas requeridas en servidores y clientes, obteniendo un entorno seguro y compatible con las buenas prácticas del CCN-CERT.