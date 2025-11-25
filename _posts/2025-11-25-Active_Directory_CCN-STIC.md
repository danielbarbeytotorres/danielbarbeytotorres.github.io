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

