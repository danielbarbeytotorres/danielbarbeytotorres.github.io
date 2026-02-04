---
layout: post
title: "eMarisma - Análisis de Riesgos"
date: 2026-2-4
---

![Vista general del proyecto en eMarisma](/img/eMarisma_dashboard.png)


**[Enlace de mi informe técnico de gestión de riesgos realziado en eMarisma (PDF)](</archivos_posts/AR_eMarisma>)**

## 1. Introducción

### 1.1. Visión de la dirección

Industrias Vaine se ha consolidado como una entidad de referencia en el ecosistema tecnológico de Gotan City, operando como una organización multinacional especializada en el desarrollo, implementación y despliegue de soluciones de ciberseguridad, inteligencia estratégica y sistemas de comunicaciones seguras. La naturaleza de sus operaciones sitúa a la compañía en el epicentro de un sector altamente sensible, donde la integridad de la información no es simplemente un requisito operativo, sino el activo fundamental que sustenta su modelo de negocio.   

Bajo la dirección de su propietario, Bruno Vaine, la organización ha iniciado un giro estratégico trascendental. A pesar de contar con una infraestructura técnica robusta y un capital humano altamente cualificado, la dirección ha identificado una necesidad crítica de maduración en su gobierno corporativo de TI. La motivación subyacente es la transición desde una gestión de seguridad basada en la competencia técnica individual hacia un modelo formalizado y auditable, con el objetivo explícito de alinear los procesos organizacionales con el estándar internacional ISO 27001. Esta decisión no es meramente administrativa; responde a una necesidad de garantizar la integridad de los desarrollos futuros y de mantener la confianza de un mercado que exige estándares de excelencia en la protección de datos.   

### 1.2 Proyecto Alfredo de Gotan

El catalizador principal de este análisis de riesgos es el desarrollo del denominado "Proyecto Alfredo de Gotan". Este activo representa la vanguardia tecnológica de Industrias Vaine: un prototipo avanzado que integra algoritmos de inteligencia artificial (IA) con capacidades defensivas de última generación.   

La criticidad de este proyecto es dual. Por un lado, representa una inversión masiva en Investigación y Desarrollo (I+D) y la promesa de una ventaja competitiva significativa en el mercado de defensa. Por otro lado, su alto valor tecnológico lo convierte en un objetivo prioritario ("high-value target") tanto para competidores desleales como para adversarios nacionales y actores maliciosos dentro del entorno de Gotan City. La sensibilidad de los datos procesados por este prototipo implica que cualquier compromiso en su confidencialidad, integridad o disponibilidad podría tener consecuencias catastróficas, no solo financieras, sino también reputacionales y estratégicas para la seguridad nacional.   

### 1.3 Alcance

El presente informe técnico sintetiza los resultados de un análisis de riesgos exhaustivo gestionado a través de la plataforma eMARISMA. El alcance definido para este estudio abarca la totalidad del ciclo de vida del "Proyecto Alfredo de Gotan", extendiéndose más allá de los límites lógicos del software para incluir los procedimientos operativos, el personal involucrado, las ubicaciones físicas (como el CPD) y los departamentos de soporte que interactúan con el activo.

Metodológicamente, el análisis se ha centrado en evaluar el nivel de madurez de los controles existentes, partiendo de una preauditoría inicial. Es importante destacar que esta iteración del análisis excluye dominios de control no especificados, los cuales serán abordados en fases subsiguientes de la implementación del Sistema de Gestión de Seguridad de la Información (SGSI).   

### 1.4. Contexto Interno

El análisis del contexto interno expone una dicotomía fascinante que define el perfil de riesgo actual de la empresa.
- Industrias Vaine no carece de herramientas ni de talento. La organización posee una infraestructura lógica avanzada, destacando un Centro de Procesamiento de Datos (CPD) propio y un firewall perimetral interno que segmenta el tráfico crítico. Asimismo, cuenta con equipos de respuesta a incidentes y personal técnico altamente cualificados, capaces de gestionar amenazas complejas desde una perspectiva operativa.   
- Debilidad en la Gobernanza: A pesar de la excelencia técnica, se ha detectado una "cultura de seguridad" que carece de formalización oficial.

### 1.5. Contexto Externo

El entorno operativo de Industrias Vaine, situado en Gotan City, actúa como un multiplicador de amenazas.
- Gotan City se describe como un entorno hostil con altas tasas de criminalidad y una frecuencia constante de ciberataques. Esto eleva la probabilidad base de cualquier amenaza externa, obligando a la empresa a mantener una postura defensiva permanente.   
- La naturaleza defensiva de los productos de la empresa genera una presión intensa por parte de competidores y adversarios. Además, la compañía debe navegar complejas normativas de protección de datos. El incumplimiento de estas normas, derivado de una fuga de información del "Proyecto Alfredo", podría acarrear sanciones legales graves.   
- Existe una dependencia crítica de proveedores para el desarrollo del proyecto. Además, el entorno externo presenta riesgos de incidentes ambientales que podrían impactar la disponibilidad física de las instalaciones y, por ende, del proyecto.

## 2. Identificación y valoración de activos

El proceso de análisis de riesgos comenzó con un inventario exhaustivo y la valoración de los activos involucrados en el "Proyecto Alfredo de Gotan". Se utilizó una escala de valoración del 1 (Muy Bajo) al 5 (Muy Alto), considerando dimensiones de Confidencialidad, Integridad y Disponibilidad (CID). La preponderancia de valoraciones altas (4 y 5) subraya la naturaleza crítica de la infraestructura de Industrias Vaine.

A continuación, se presenta el desglose de los activos identificados, su función dentro del ecosistema de la empresa y su valoración estratégica.   

![Vista general del proyecto en eMarisma](/img/eMarisma2_1.png)

| Activo Identificado | Descripción | Valor (1-5) | Justificación de la valoración |
| :--- | :--- | :--- | :--- |
| Proyecto Alfredo de Gotan	| Prototipo avanzado de IA y defensa. Activo principal del análisis. | 5 (Muy Alto)	| Representa el Core Business futuro y la ventaja competitiva de la empresa. Su pérdida implica el fracaso estratégico. |
| CPD de Gotan City	| Centro de Procesamiento de Datos. Instalación física con servidores y almacenamiento.	| 5 (Muy Alto) | Es el corazón físico de la organización. Soporta todos los sistemas críticos; su caída detiene la operación completa. |
| Repositorio GitLab | Plataforma de control de versiones para proyectos clasificados. | 5 (Muy Alto) | Contiene la Propiedad Intelectual (PI) en su forma más pura (código fuente). |
| Clúster de análisis criptográfico	| Servidores dedicados a pruebas de algoritmos y descifrado. | 5 (Muy Alto) | Esencial para validar la seguridad de las comunicaciones; herramienta crítica de I+D. |
| Firewall Perimetral | Dispositivo de seguridad que filtra tráfico Internet/Intranet. | 4 (Alto) | Primera línea de defensa lógica. Su compromiso expone la red interna a ataques directos. |
| Inteligencia sobre amenazas | Bases de datos y feeds sobre actores y vectores de ataque internacionales. | 4 (Alto) | Información vital para la toma de decisiones proactivas en ciberseguridad. |
| Red Wi-Fi de invitados | Red inalámbrica para visitantes externos. | 2 (Bajo) | Vector de riesgo potencial si no está aislada. Requiere control estricto. |
| Altavoces ambientales | Dispositivos IoT en zonas comunes. | 1 (Muy Bajo) | Posible punto de entrada lateral (pivote) si presentan vulnerabilidades de firmware. |
| Iluminación automatizada | Sistemas domóticos en salas comunes. | N/A (Soporte) | Activo de soporte que podría ser explotado para interrupción física o vigilancia. |
| Red cableada (descanso) | Infraestructura de red en zonas no productivas. | N/A (Soporte) | Extensión de la superficie de ataque física dentro de las instalaciones. |

A continuación, se muestra la efectividad actual de los controles analizados en la preauditoría realizada a la compañía:

![Vista general del proyecto en eMarisma](/img/eMarisma2_6.png)

## 3. Análisis de Amenazas y Evaluación de Riesgos
Utilizando el catálogo de amenazas MAGERIT integrado en eMarisma, se modelaron las amenazas más pertinentes para el entorno de Industrias Vaine. El análisis cuantitativo resultante es alarmante y justifica plenamente la iniciativa de formalización de la seguridad. Se han seleccionado las 5 amenazas más significativas por su impacto y probabilidad.

![Vista general del proyecto en eMarisma](/img/eMarisma2_2.png)

### 3.1. Amenaza 1: Divulgación de información sobre el CPD de Gotan City [A.19]

Esta amenaza se centra en la pérdida de confidencialidad respecto a la ubicación, diseño o características técnicas del Centro de Procesamiento de Datos.
- **Probabilidad de Ocurrencia**: 100%. Este valor máximo indica certeza. En el entorno de Gotan City, se asume que los adversarios están intentando activamente obtener esta información de forma continua.   
- **Riesgo Estimado**: 500. El nivel máximo de riesgo posible en la escala utilizada.
- **Vectores de Ataque Identificados**:
  - Ingeniería social dirigida a manipular personal descontento para obtener credenciales o planos.
  - Filtración inadvertida de datos por empleados debido a la falta de políticas de clasificación de información ("Security by Obscurity" fallida).
  - Intercepción de comunicaciones no cifradas relacionadas con la gestión del CPD.
- **Impacto Potencial**: La divulgación expone la infraestructura a ataques físicos (sabotaje, intrusión cinética), elimina la ventaja competitiva y erosiona la confianza de los inversores. Además, conlleva graves sanciones regulatorias.   
- **Riesgo Resultante**: 268.201.
La formalización inmediata de una política de seguridad y Acuerdos de Confidencialidad (NDA) es crítica para reducir el factor humano como vector de ataque.

### 3.2. Amenaza 2: Divulgación de información sobre el Proyecto Alfredo de Gotan [A.19]
El riesgo de espionaje industrial sobre el prototipo de IA es existencial para la compañía.
- **Probabilidad de Ocurrencia**: 100%.
- **Riesgo estimado**: 500.
- **Vectores de Ataque**: Transferencia y captura de archivos no cifrados; exfiltración por medios extraíbles o canales digitales no monitorizados.
- **Impacto Potencial**: Plagio directo del proyecto, pérdida total de la inversión en I+D y daño reputacional irreparable.
- **Medidas de Mitigación Propuestas**: Implementación de cifrado robusto en repos y tránsito, y despliegue de soluciones DLP (Data Loss Prevention) para monitorizar la salida de información sensible.
Dado que este es el activo principal del negocio, la falta de eficiencia en los controles actuales expone a la empresa a vulnerabilidades inaceptables.   

### 3.3. Amenaza 3: Divulgación de información sobre el repositorio GitLab [A.19]
El código fuente alojado en GitLab es el "secreto de la fórmula" de Industrias Vaine.
- **Probabilidad de Ocurrencia**: 100%.
- **Riesgo Estimado**: 400.
- **Vectores de Ataque**: Manipulación de personal, credenciales débiles o robadas, y exposición accidental del repositorio (p.ej., configuraciones públicas por error).
- **Riesgo Resultante**: 214.561.
- **Medidas de Mitigación**: Autenticación fuerte (MFA) obligatoria para todos los accesos y auditorías periódicas de roles y permisos para garantizar el principio de mínimo privilegio.

### 3.4. Amenaza 4: Errores del administrador sobre el Proyecto Alfredo de Gotan [E.2]
- **Probabilidad de Ocurrencia**: 80%. Muy alta debido a la informalidad de los procesos técnicos.
- **Riesgo Estimado**: 320.
- **Causas del Error**:
  - Despliegue de actualizaciones defectuosas sin pasar por entornos de staging (laboratorio).
  - Asignación accidental de permisos privilegiados a usuarios incorrectos.
- **Impacto Potencial**: Borrado involuntario de datos, paradas de servicio (Downtime) y desactivación accidental de mecanismos de defensa, dejando el sistema expuesto.
- **Riesgo Resultante**: 163.832.
- **Mitigación**: Formalización de políticas de Gestión de Cambios y procedimientos de respaldo (backups/snapshots).

### 3.5. Amenaza 5: Acceso no autorizado sobre el CPD de Gotan City [A.11]
Intrusión física o lógica directa al corazón de la infraestructura.
- **Probabilidad de Ocurrencia**: 80%.
- **Riesgo Estimado**: 320.
- **Vectores de Ataque**: Uso de credenciales comprometidas para superar el perímetro y realizar movimiento lateral hacia la red de gestión del CPD.
- **Impacto Potencial**: Sabotaje directo al hardware, robo físico de discos/servidores y compromiso total de la red.
- **Riesgo Resultante**: 172.296.
- **Mitigación**: Segmentación de red estricta (aislamiento lógico de la red de gestión) y endurecimiento del control de acceso físico. 

## 4. Interpretación de Resultados
El informe de análisis incluye representaciones visuales que sintetizan la situación de riesgo de la empresa. Aunque las imágenes residen en el documento original, su descripción textual nos permite extraer conclusiones vitales sobre la eficacia de la estrategia de seguridad propuesta.

### 4.1 Mapas de Calor

![Vista general del proyecto en eMarisma](/img/eMarisma2_3.png)

#### Mapa de Riesgo Estimado
Este gráfico muestra una densidad preocupante de riesgos ubicados en los cuadrantes "Grave" y "Moderado". Esto valida la hipótesis inicial de que la falta de gobernanza formal está exponiendo a la organización a niveles de riesgo insostenibles. Las amenazas al CPD y al Proyecto Alfredo dominan esta zona roja.

![Vista general del proyecto en eMarisma](/img/eMarisma2_4.png)

#### Mapa De Riesgo Resultante
Tras la aplicación teórica de los controles y planes de tratamiento, se observa un desplazamiento vertical de los puntos de riesgo. El desplazamiento vertical indica una reducción significativa en el Impacto de las amenazas. Sin embargo, el informe señala explícitamente que no hay mejorías notables en la probabilidad de ocurrencia.

Esto sugiere que los controles propuestos son principalmente mitigadores (reducen el daño) o detectivos, pero la organización sigue operando en un entorno donde la probabilidad de que ocurran incidentes (ataques, errores) sigue siendo muy alta. Esto es coherente con el entorno hostil de Gotan City y la cultura interna informal.

### 4.2 Gráfico de Vulnerabilidad vs Riesgo Inherente
El gráfico de dispersión que correlaciona la exposición del sistema (vulnerabilidad) con el riesgo inherente revela la distribución de las amenazas:

![Vista general del proyecto en eMarisma](/img/eMarisma2_5.png)

- **Zona de Riesgos Aceptables**: La mayoría de los activos caen en esta zona tras el tratamiento, lo cual es positivo.
- **Zona de Riesgos Mayores y Límite**: Persiste un porcentaje significativo de riesgos en estas categorías críticas.
- Se destacan visualmente valores extremos (en rojo) con un Riesgo Inherente entre 200 y 300. Estos puntos corresponden inequívocamente a las amenazas críticas analizadas anteriormente (CPD y Proyecto Alfredo). La persistencia de estos valores altos incluso en el escenario "Resultante" indica que ciertos riesgos inherentes al negocio de defensa son difíciles de eliminar por completo y requieren monitorización constante. 

## 5. Plan de tratamiento del riesgo (PTR)
Para cerrar la brecha entre el riesgo estimado (500) y el apetito de riesgo de la empresa (Bajo), se han diseñado dos planes de tratamiento específicos. Estos planes no son meras sugerencias técnicas, sino iniciativas de gestión del cambio organizacional.

### 5.1. Plan de Tratamiento 1: Formalización del Proceso Disciplinario
Este plan aborda la dimensión humana y legal de la seguridad, atacando la "cultura informal" de raíz.
- **Código de control**: [A.06.04] Proceso Disciplinario.
- **Responsables de ejecución**: Departamento de Recursos Humanos (RRHH) y el Responsable de Seguridad de la Información (CISO/RSI).   
- **Calendario de implementación**:
  - Inicio Previsto: 1 de marzo de 2026.
  - Finalización Prevista: 1 de mayo de 2026.
  - Ejecución Total: 1 de junio de 2026.
- **Descripción de la acción**: El plan consiste en la definición, formalización y comunicación de políticas sancionadoras claras. Estas políticas se vincularán contractualmente a la Política General de Seguridad de la Información. Se incluirán cláusulas específicas en los contratos laborales que detallen las consecuencias (hasta el despido procedente) por incumplimiento de normas de seguridad.   
- **Objetivo y resultado esperado**: El objetivo es la disuasión. Se busca eliminar la percepción de impunidad ante malas prácticas de seguridad y estandarizar la respuesta ante incidentes internos. El resultado esperado es una reducción drástica de incidentes causados por negligencia o malicia interna.
- **Riesgo residual objetivo**: Bajo / Aceptable.

### 5.2 Plan de Tratamiento 2: Aprendizaje y Mejora Continua
Este plan busca transformar los incidentes en activos de conocimiento, rompiendo el ciclo de errores repetitivos.
- **Código de Control**: [A.05.27] Aprendizaje de los incidentes de seguridad de la información.
- **Responsables de Ejecución**: Responsable de Seguridad de la Información (RSI) y el Equipo de Respuesta a Incidentes.   
- **Calendario de Implementación**:
  - Inicio Previsto: 1 de abril de 2026.
  - Finalización Prevista: 15 de junio de 2026.
  - Ejecución Total: 1 de julio de 2026.
- **Descripción de la Acción**: Desarrollo de un protocolo estandarizado para el análisis forense y operativo posterior a los incidentes (post-mortem). Este proceso no busca culpables, sino causas raíz. La inteligencia obtenida se utilizará para actualizar dinámicamente las políticas de seguridad, los planes de formación y la matriz de riesgos.   
- **Objetivo y Resultado Esperado**: Instaurar un ciclo de mejora continua (PDCA - Plan, Do, Check, Act). El resultado será una defensa evolutiva: cada incidente sufrido fortalecerá la inmunidad de la organización frente a amenazas futuras similares.
- **Riesgo Residual Objetivo**: Bajo / Aceptable.

## 6. Conclusión
1. El análisis de riesgos realizado sobre Industrias Vaine ofrece una radiografía clara de una organización en transición. La empresa posee los activos tecnológicos necesarios para liderar el mercado, pero su infraestructura de gestión de riesgos se encuentra peligrosamente rezagada respecto a la sofisticación de sus propias creaciones.

2. La discrepancia entre el riesgo estimado (500) y el riesgo aceptable exige una actuación inmediata. La tecnología por sí sola no puede mitigar amenazas que explotan la falta de procedimientos, como la ingeniería social o los errores administrativos

3. Las amenazas más probables (100%) y de mayor impacto están vinculadas al factor humano. La implementación del Plan de Tratamiento 1 (Proceso Disciplinario) es tan crítica como cualquier actualización de firewall.

4. Los pasos propuestos en este análisis sientan las bases sólidas para la futura certificación ISO 27001. Al documentar procesos, definir roles y establecer ciclos de mejora continua, Industrias Vaine no solo reduce su riesgo actual, sino que se alinea con los estándares internacionales que su dirección persigue.

---
**Escrito por Daniel Barbeyto Torres**, *apoyado de herramientas de modelos de lenguaje para la redacción.*