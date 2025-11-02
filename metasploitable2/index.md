---
layout: default
title: Metasploitable 2 — Análisis y remediaciones
description: Colección de vulnerabilidades de Metasploitable 2 con soluciones manuales y scripts automáticos.
---

# Metasploitable 2 — Análisis completo

En este espacio publico el análisis de todas las vulnerabilidades de Metasploitable 2:  
cada una con evidencia, solución manual y script generado por IA.

## Lista de vulnerabilidades
{% for vuln in site.vulns %}
- [{{ vuln.title }}]({{ vuln.url }}) — ID: {{ vuln.vuln_id }} — CVSS: {{ vuln.cvss }}
{% endfor %}

> ⚠️ Solo ejecutar los scripts en entornos de laboratorio controlados.
