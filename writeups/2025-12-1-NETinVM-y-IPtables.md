---
layout: post
title: "Iptables y NETinVM - Implementación de Seguridad Perimetral y Segmentación de Redes"
date: 2025-12-1
---

![Foto de NetinVM](/img/netinvm.png)

## Introducción
En el contexto de la **defensa activa de infraestructuras**, la capacidad de diseñar y desplegar políticas de filtrado de paquetes es una competencia fundamental. Este artículo documenta el procedimiento de aseguramiento (técnicamente conocido como hardening) desarrollado en el marco de la asignatura "**Seguridad en Redes y Análisis Inteligente de Amenazas**" del Máster en Ciberseguridad de la **UNIR** (Universidad Internacional de La Rioja).

El escenario propuesto simula una respuesta a incidentes en la organización ficticia "Example", la cual ha sufrido una brecha de seguridad previa. El objetivo del proyecto es reestructurar y asegurar su perímetro, transformando una red plana y vulnerable en una arquitectura segmentada segura dividida en 3 zonas lógicas:
- **WAN** (*Internet*).
- **DMZ** (*Servicios expuestos*).
- **LAN** (*Red Interna*).
Para la implementación efectiva de las políticas y reglas de filtrado solicitadas en la práctica académica, se ha configurado y documentado un cortafuegos central basado en Linux/Netfilter.

## Entorno Tecnológico
Para la realización de este despliegue y validación de políticas, he utilizado **NETinVM**. Esta herramienta es una plataforma de virtualización de sistemas y redes completa contenida en una única imagen de máquina virtual en VMware.

NETinVM permite desplegar una topología de red compleja (incluyendo routers, cortafuegos y hosts finales) dentro de un entorno controlado, facilitando la experimentación segura con protocolos de red y mecanismos de defensa sin riesgo para la infraestructura física.
- Se puede encontrar toda la documentación de la herramienta [aquí](https://informatica.uv.es/~carlos/docencia/netinvm/netinvm.html).

## Fundamentos teóricos para comprender la práctica
La solución implementada se basa en **Netfilter**, el framework de filtrado de paquetes integrado en el kernel de Linux. A diferencia de los filtros de paquetes apátridas (stateless) tradicionales, se implementó una configuración **SPI** (*Stateful Packet Inspection*).

El uso del módulo **conntrack** permite al cortafuegos recordar el estado de las conexiones activas (*NEW, ESTABLISHED, RELATED*). Esto es crucial para la seguridad, ya que nos permite denegar todo el tráfico entrante por defecto y aceptar dinámicamente solo los paquetes de retorno que corresponden a peticiones legítimas iniciadas desde el interior de la red, reduciendo drásticamente la superficie de ataque.

## Metodología y Procedimiento de Implementación
El procedimiento adoptado para asegurar la red siguió una estrategia de "Denegar por Defecto" (Default Deny), ejecutada en las siguientes fases:
1. Se realizó una auditoría inicial de las tablas existentes (`iptables -L -v`). Dado que el sistema provenía de un estado comprometido o mal configurado, se procedió a eliminar todas las reglas existentes (*FLUSH*) para garantizar un punto de partida limpio y evitar conflictos de reglas heredadas.
2. Se configuraron las políticas por defecto de las cadenas *INPUT, FORWARD y OUTPUT* en *DROP*. Técnica y teóricamente, esto es superior a *REJECT* en el perímetro externo, ya que el cortafuegos descarta los paquetes silenciosamente, dificultando las tareas de enumeración y escaneo de puertos por parte de atacantes externos.
3. Antes de abrir nuevos servicios, se aseguró la estabilidad del sistema permitiendo el tráfico de conexiones *ESTABLISHED y RELATED*. Esto previene que el administrador se bloquee a sí mismo y optimiza el rendimiento del cortafuegos, ya que la mayoría de los paquetes coincidirán con esta regla temprana.
4. Finalmente, se habilitan algunas reglas para los servicios específicos requeridos, como **DNS, HTTP/S y SSH**, definiendo estrictamente las interfaces de entrada/ salida y las direcciones IP de origen/ destino.

## Despliegue Técnico y Configuración
En la topología que usaremos durante la aplicación práctica desplegaremos 4 máquinas dentro de la imagen la imagen VMware:
- **fw**: Un cortafuegos que une todos los segmentos de la red.
- **exta**: Un equipo en internet que nos permite tener una visión desde el exterior de nuestra arquitectura.
- **dmza**: Servidor web en nuestra DMZ, cuyo acceso gestionaremos desde el cortafuegos.
- **inta**: Un equipo en la red interna que nos permite tener una visión desde el interior de nuestra arquitectura.

La siguiente figura representa tanto la topología como las interfaces e IPs de la red.

![Foto de la topología](/img/netinvm_2.png)

A continuación, se detalla la configuración final aplicada en el cortafuegos central (**fw**), comentada para su análisis técnico.
- **Fase A:** Inicialización y Política Base
```bash
# Auditoría y limpieza de reglas
iptables -t filter -L
iptables -t filter -F

# Se descarta todo tráfico que no esté explícitamente autorizado (Política "Zero Trust")
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP
```

- **Fase B:** Gestión de Estado
```bash
# Permitir tráfico perteneciente a conexiones ya negociadas, para que las respuestas obtenidas desde el exterior entren solamente si fueron solicitadas desde dentro.
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT
iptables -A OUTPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
```

- **Fase C:** Reglas de Negocio y Segmentación
```bash
# Resolución DNS desde la LAN hacia Cloudflare (IPs 1.1.1.1 y 1.0.0.1)
iptables -A FORWARD -i eth2 -o eth0 -s 10.5.2.0/24 -d 1.1.1.1 -p udp --dport 53 -m state --state NEW -j ACCEPT
iptables -A FORWARD -i eth2 -o eth0 -s 10.5.2.0/24 -d 1.0.0.1 -p udp --dport 53 -m state --state NEW -j ACCEPT

# Forzar tráfico web interno a través del Proxy/Web Server en DMZ. Esto redirige peticiones HTTPS de la LAN hacia el servidor DMZ para inspección o centralización.
iptables -t nat -A PREROUTING -i eth2 -p tcp --dport 443 -j DNAT --to-destination 10.5.1.10

# Salida a Internet desde la DMZ (para el Servidor Web)
iptables -A FORWARD -i eth1 -o eth0 -s 10.5.1.10 -p tcp --dport 443 -m state --state NEW -j ACCEPT

# Administración SSH remota desde IP de gestión autorizada (exta)
iptables -A FORWARD -i eth0 -o eth1 -s 10.5.0.10 -d 10.5.1.10 -p tcp --dport 22 -m state --state NEW -j ACCEPT

# Actualización del propio Cortafuegos (Output)
iptables -A OUTPUT -o eth0 -d 82.194.78.250 -p tcp -m multiport --dports 22,443 -m state --state NEW -j ACCEPT

# Preparación para futuro servicio RDP en DMZ
iptables -A FORWARD -i eth2 -o eth1 -s 10.5.2.0/24 -d 10.5.1.89 -p tcp --dport 3389 -m state --state NEW -j ACCEPT
```

## Conclusión
La implementación exitosa de estas políticas en el entorno NETinVM demuestra cómo una configuración granular de **iptables** puede mitigar riesgos significativos. Al controlar el flujo de información entre zonas de diferente nivel de confianza (Internet vs. DMZ vs. LAN), protegemos los activos críticos y aseguramos la integridad de la red ante posibles amenazas externas.