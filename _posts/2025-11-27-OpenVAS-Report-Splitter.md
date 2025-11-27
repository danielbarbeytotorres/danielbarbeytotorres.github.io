---
layout: post
title: "OpenVAS-Report-Splitter: Mi nueva herramienta para el post-procesado de un informe en OpenVAS"
date: 2025-11-27
---

![Foto de OpenVAS](/img/openvas_1.png)

# OpenVAS-Report-Splitter: Mi nueva herramienta para el post-procesado de un informe en OpenVAS

[Código de OpenVAS-Report-Splitter]

Si te dedicas a la ciberseguridad o al pentesting, sabrás que OpenVAS es un servicio que posibilita escanear un host para encontrar sus vlnerabilidades. El problema no es el escano, si no que al terminar, te suelta un informe muy largo y difícil de procesar para extraer solo lo que te interesa.

Sobre este concepto me surgió una idea: Crear una herramienta que automatice y procese el informe para sacar en limpio cuales son las vulnerabilidades detectadas en dicho escaneo

## ¿Qué hace la herramienta?
En esencia, obtiene mediante la API de OpenVAS (gvm-cli) el informe en formato XML, lo parsea a JSON y divide el resultado en múltiples archivos .json donde cada uno representa cada una de las vulnerabilidades que se han encontrado.

[Output de la herramienta](/img/openvas_2.png)

## ¿Cómo descargo la herramienta?
Es muy fácil:
- Clona el repositorio desde mi Github: git clone https://github.com/danielbarbeytotorres/OpenVAS-Report-Splitter.git
- Entra en él: cd OpenVAS-Report-Splitter
- Lee el **README.md** para saber como configurar la herramienta con tus parámetros.

¡Espero que a alguien le sea útil! Todo feedbach es bienvenido.