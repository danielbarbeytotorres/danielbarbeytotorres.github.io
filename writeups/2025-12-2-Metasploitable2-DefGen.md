---
layout: post
title: "Metasploitable2-DefGen"
date: 2025-12-2
---

![Foto de Metasploitable 2](/img/metasploitable2_1.png)

## Introducción

Hoy quería hablar de algo que he estado programando durante unas cuantas semanas para ser una parte de mi TFG. Se trata de la herramienta **Metasploitable2-DefGen**, una herramienta que, basicamente, es como tener una inteligencia artificial que resuelta las vulnerabilidades de un equipo en concreto (en este caso, de Metasploitable 2).

Si alguna vez has tratado de buscar en google la forma de mitigar las ciento y pico vulnerabilidades que OpenVAS puede detectar en Metasploitable 2, llegarás a la conclusión de que no una sola página que haya conseguido registrar absolutamente todas las mitigaciones. Esto es un latazo cuando estas lidiando con dichas vulnerabilidades, puesto que es probable que no obtengas información de una vulnerabilidad en concreto de la máquina por Internet.

Para solucionar esto, he creado un **agente en Python** que usa inteligencia artificial (en este caso, la de la API de OpenAI) para generar scripts de defensa de forma automática

Puedes ver el repositorio de la herramienta aquí: https://github.com/danielbarbeytotorres/Metasploitable2-DefGen

## Ideas clave
**Metasploitable2-DefGen** es una herramienta que coge descripciones de vulnerabilidades (en formato JSON, porque somos gente ordenada) y usa un **LLM (como GPT-4o)** para escribir scripts de Bash que las solucionan.

Pero ojo, que no es un script cualquiera hecho a prisas: El agente está **entrenado específicamente** para saber que está tocando un **Ubuntu 8.04** (es decir, Metasploitable 2). **Utilidades de esto**:
- Sabe que en Ubuntu 8.04 **no existe systemctl** y usa SysV init, update-rc-d entre otras cosas viejas.
- Tiene una **regla muy importante**: NUNCA te cierra el puerto 22 (SSH). De esta manera un script no podrá dejarte fuera de tu propia máquina.
- Si la solución requiere que metas una contraseña a mano (como cambiar la pass de VNC), el agente no se la inventa. Te para el servicio o lo blinda en local (127.0.0.1) y te deja lo pendiente por mitigar en /tmp/mitigation_todo.log para que alguien realice dicha parte humana.
- Puedes lanzarle **una carpeta llena de vulnerabilidades** y el agente procesara concurrentemente las vulnerabilidades con varios workers a la vez. Además, dependiendo de tus recursos podrás seleccionar el número de workers que quieres usar a la vez.

## Funcionamiento
Puedes encontrar la instalación y funcionamiento completo desde cero de la herramienta en su propio README.md: https://github.com/danielbarbeytotorres/Metasploitable2-DefGen/blob/main/README.md

## Importante
Para poder usar la herramienta, si decides usar el LLM que usa por defecto, es importante saber que la API de OpenAI no es gratuita. Para la implementación de TODO mi TFG solo me gaste 5€ en todas las pruebas y testeo final, así que tampoco te vas a arruinar.

![Foto de Openai](/img/openai_1.png)

## Conclusión
Eso es todo. Si estás estudiando ciberseguridad o informática, te estás peleando con máquinas vulnerables y necesitas una ayuda, prueba a usar esta herramienta. ¡Te lo recomiendo!

https://github.com/danielbarbeytotorres/Metasploitable2-DefGen
