---
layout: post
title: "AD + CCN-STIC - Implementando seguridad corporativa con Active Directory y las guías CCN-STIC"
date: 2025-11-18
---

## Introducción

Durante mi paso por la UNIR, he realizado hace poco una de las experiencias más completas (y sinceramente, más sufridas) que he tenido durante el Master de Ciberseguridad: Implementar un dominio Windows Server desde cero y endurecerlo siguiendo las guías del CCN-CERT (*Centro Criptológico Nacional**).

El objetivo de la actividad que realice era **implantar políticas del ENS (*Esquema Nacional de Seguridad*)** sobre:
- Los **controladores de dominio y los servidores** con la guía **CCN-STIC-570A23**.
- LOs **equipos cliente Windows** con la guía **CCN-STIC-599AB23**.

## Enunciado de la actividad

El objetivo era recopilar evidencias sobre la correcta implementación de lo siguiente:
- Montar un dominio *Active Directory* completamente funcional.
- Endurecerlo siguiendo las configuraciones específicas de los anexos B, C y D de la guía **CCN-STIC-570A23**.
- Configurar GPOs adaptadas a las necesidades de la empresa ficticia.
- Implementar también la seguridad en un cliente Windows 11 con la guía **CCN-STIC-599AB23** partiendo de los anexos A2, A3 y A4.

El **montaje del entorno en VMware** se dividió en 2 VMs:
- **Windows Server 2022**, que actuó como Controlador de dominio, DNS y Servidor DHCP.
- **Windows 11**, como cliente del dominio

## Configuración del seervidor
Primero, configure la red interna en la subred 192.168.5.0, asignando la IP 192.168.5.2. Posteriormente instale los roles *Active Direcotry Domain Services*, *DNS* y *DHCP*. Luego cree el dominio, especificando el nombre del equipo, el nombre del dominio y el nombre de la NetBIOS.

## Configuración del Cliente
Primero active la red interna con DHCP y me aseguré que usase como servidor DNS al Windows Server 2022 (192.168.5.2). Uní el equipo al dominio mediante un usuario que cree con anterioridad durante la fase previa.
Tras un reinicio y un par de clicks, ya podía autenticarme en el dominio sin problemas.

# Aplicación de políticas de seguridad del CCN-STIC en el servidor
En este punto comenzaba realmente el objetivo de la actividad, que es trasladar a este dominio real y funcional las guías nacionales de seguridad. Para aplicar las directivas, simule que estaba trabajando sobre una organización real, a la que llame **Atlántico S.L.**

Puedes descargar la Guía CCN-STIC 570A23 usada aquí:

Puedes descargar la Guía CCN-STIC 570A23 usada aquí:

Estas son las políticas que implementé del **CCN-STIC-570A23**:

### Anexo B.2 - Mantenimiento y actualizaciones de seguridad

(Foto Aquí)

Configuré actualizaciones automáticas según las necesidades operativas de Atlántico S.L.:
- Actualizaciones instaladas todos los lunes a las 8:00 AM, primera semana del mes.
- Aplazamiento de 5 días para evitar fallos por parches recientes.

### Anexo B.3 - Protección frente a código dañino

En esta directiva aplique configuraciones antimalware corporativo:
- Escaneo rápido diario a las 4 AM.
- Escaneo completo todos los viernes a las 5 AM.

### Anexo B.4 - Protección de integridad y autenticidad (Firewall)
Definí reglas restrictivas, permitiendo solo el tráfico interno imprescindible para el dominio. En las evidencias aparece la regla configurada en el firewall de Windows Server con la lista exacta de puertos permitidos.

### Anexo B.5 - Copias de seguridad
Configuré copia manual de scripts críticos.
Tuve un problema de espacio al intentar completar la copia por falta de un dispositivo de almacenamiento de los backups en la VM que me proporcionó la UNIR, lo cual dejé reflejado en mi documento personal, pero el objetivo quedaba cumplido a nivel de configuración.

### Anexo C.2 - Segregación de funciones y tareas
Asigné el privilegio "Administrar registro de seguridad y auditoría" solo a los Administradores y al grupo Auditores (el cual fue creado con el script de Segregación de roles y funciones que el CCN aporta).

### Anexo D.1 - Mensaje legal de inicio de sesión
Configuré el típico banner corporativo obligatorio del ENS. Incluye advertencias sobre uso autorizado y acciones legales.

### Anexo D.4 - Cifrado Kerberos permitidos
Añadí **RC4** exclusivamente por compatibilidad, manteniendo AES como cifrado seguro por defecto. Comprobé la aplicación real mediante:
- gpupdate /force
- gpresult /h c:\gp.html

Y verificación en el cliente Windows 11, mostrado también en el informe HTML generado

### Anexo D.5 - Bloqueo por inactividad
Aplique la directiva para que el equipo servidor se bloquease a los 10 minutos por inactividad.

### Anexo D.6 - Opciones de seguridad
Deshabilite la directiva "Apagar el sistema de inmediato si no se pueden registrar las auditorías" para evitar reinicios indeseados en equipos con recursos limitados o picos de carga.

# Aplicación de políticas de seguridad del CCN-STIC en el cliente
Las guías para clientes se aplicaron desde los anexos A2, A3 y A4:

### Anexo A2.2 - Actualizaciones automáticas
- Se realizarán los lunes a las 7 AM.
- Retraso del aplazamiento de calidad de 5 días.

### Anexo A2.3 - Protección contra el código dañino
- Se realiza un escaneo rápido diario a las 4 AM.
- Se realiza el escaneo semanal programado los lunes a las 5 AM

### Anexo A2.4 - Firewall
Cree una regla de entrada que solo permitía el tráfico de los puertos 135 y 2701 TCP, reforzando el principio de **mínimo privilegio**.

### Anexo A2.5 - Copias de seguridad locales
Configurarlo, aunque tuve limitaciones de espacio para ejecutar la copia real por el mismo motivo que al realizar la configuración en el servidor.

### Anexo A3.2 - Segregación de funciones
Igual que en el servidor: Solo Administradores y Auditores pueden gestionar el registro de seguridad.

### Anexo 4.1 - Banner de inicio de sesion
El cliente muestra el mensaje legal corporativo al iniciar sesión.

### Anexo 4.2 - Retención de registros
Configuree almacenamiento hasta 32 MB por log y retención de 1 año (donde aplica).

# Conclusión
Esta práctica me obligó a trabajar con un enfoque muy cercano al de un administrador de sistemas de una empresa real. No solo tuve que instalar y hacer funcionar un dominio, sino entender, adaptar y justificar políticas del ENS como si estuviese endureciendo un entorno corporativo. Además, pude comprobar:
- Cómo interactúan servidor y cliente a través de GPOs.
- Qué configuraciones del CCN-STIC tienen mayor impacto.
- La importancia de la segregación de funciones.
- Los problemas reales, como la falta de espacio para copias de seguridad, y cómo documentarlos adecuadamente sin romper la práctica.
Finalmente, logré aplicar con éxito todas las directivas requeridas en servidores y clientes, obteniendo un entorno seguro y compatible con las buenas prácticas del CCN-CERT.