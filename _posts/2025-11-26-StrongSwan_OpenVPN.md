---
layout: post
title: "Taller de VPNs con IPsec (strongSwan) y OpenVPN"
date: 2025-11-26
---

![Foto de portada](/img/strongswan_1.png)

## 0. Introducción
Durante la carrera, en la asignatura de Diseño de Redes, realice uno de los talleres más densos y técnicos que había hecho hasta ese momento en redes: **Crear, configurar y entender en profundidad una red con IPsec (strongSwan) y una VPN TLS con OpenVPN**.

El objetivo del taller era partir de un entorno de red simulado y, paso a paso, construir túneles seguros, comprender los mecanismos internos de cifrado y autenticación, y experimentar con routing, firewalling y rendimiento.

A continuación resumo la parte teórica, mi recorrido por el taller, y los resultados prácticos más importantes.

## 1. Entorno de laboratorio y conceptos base
El taller se basa en una red de pruebas que simula dos sedes corporativas (LAN1 y LAN2), una “Internet” simulada y varios clientes hoja (“roadwarriors”).

![Diagrama de la red del entorno de pruebas de strongSwan](/img/strongswan_2.png)

El **objetivo** era entender:
- Cómo enruta Linux
- Que es un firewall, qué permite, qué bloquea y cómo
- Cómo NAT cambia las direcciones
- Por qué IPsec necesita reglas especiales
- Cómo las VPN TLS introducen nuevas interfaces virtuales

## 2. Enrutamiento: Comprendiendo el tráfico real
En esta parte simplemente revisé tablas de rutas de cada máquina a modo de repaso para entrar en materia, siguiendo lo que se me pedía en el enunciado. La **idea clave** era que un equipo solo puede enviar tráfico a redes que conoce por su tabla de rutas. Es decir, sin rutas adicionales, *no existe conectividad cruzada*, lo cual luego será esencial para entender como IPsec "crea" dicha conectividad.

## 3. NAT y Firewall
El firewall del host usa reglas iptables para aislar redes:
- Bloquea LAN1 → LAN2
- Bloquea LAN2 → LAN1
- Bloquea el host físico
- Aíslalo todo salvo comunicaciones locales

Las **cosas que aprendí más importantes**:
- Un ACCEPT no puede ser introducido como primera regla en FORWARD, porque rompes el aislamiento.
- El MASQUERADE permite “engañar” a un host para que crea que todo viene del router.
- SNAT solo afecta al tráfico de salida, no al de retorno → por eso carol no podía responder a alice.

## 4. strongSwan (IPsec)
Aquí es donde comenzaba la parte más importante: **Crear túneles IPsec reales, analizar SA (*Security Associations*), ver algoritmos, interferencias, MTU, routing avanzado, etc.

## 5. OpenVPN (TLS)

![Diagrama de la red del entorno de pruebas de strongSwan](/img/openvpn_1.png)

Esta última parte consistía en montar una VPN TLS con OpenVPN. Aprendí que OpenVPN funciona con:
- TLS para autenticación y establecimiento de sesión.
- Certificados X.509
- Interfaces TUN/TAP
- Certificados asimétricos (AES-128-CBC por defecto)
- Infraestructura PKI creada con EasyRSA.
- Etc.

## 6. Recorrido práctico del taller
Abajo de todo incluiré la memoria sobre mi paso por el taller, con enunciados y las respuestas con capturas de los comandos realizados. Como comparación final quería mostrar una tabla que me resumia las diferencias más importantes de IPsec y TLS que recogi durante el desarrollo de mi prática:

| Aspecto       | strongSwan (IPsec)       | OpenVPN (TLS)                        |
| ------------- | ------------------------ | ------------------------------------ |
| Capa OSI      | L3 (kernel)              | L4-L5 (user space)                   |
| Autenticación | Certificados, PSK        | Certificados TLS                     |
| Complejidad   | Alta                     | Media                                |
| Rendimiento   | Muy alto (kernel)        | Menor, depende MTU/CPU               |
| Uso típico    | Empresas, sedes, routers | Clientes móviles, servidores remotos |

## 7. Qué me llevo del taller
Este taller supuso entender **redes reales**. De este, me llevo conocimiento:
- Dominio práctico de routing y NAT en Linux.
- Comprensión profunda de como funcionan los túneles IPsec.
- Capacidad para interpretar logs de IKEv2 y SAs.
- Experiencia creando PKI y configurando OpenVPN desde cero.
- Conocimiento real sobre cómo afecta la MTU a las VPN.
- Control sobre *iptables*, *policy routing* y XFRM.

## 8. Enlace para la descarga de mi memoria del taller

**[Aquí puedes descargar el enunciado para prácticar con esta herramienta (PDF)](/archivos_posts/Taller_strongSwan_enu.pdf)**

**[Aquí puedes descargar la memoria que hice para prácticar con esta herramienta (PDF)](/archivos_posts/Taller_strongSwan_mem.pdf)**
