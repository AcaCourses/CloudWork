import { ClientId } from '@/context/AppContext';

/* ── Email Definitions ─────────────────────────────────────── */
export interface Email {
  id: string;
  from: string;
  fromRole: string;
  fromAvatar: string;
  fromColor: string;
  subject: string;
  preview: string;
  time: string;
  starred: boolean;
  body: EmailBody;
  signature: SignatureData;
}

export interface SignatureData {
  name: string;
  role: string;
  phone?: string;
}

export type EmailBody =
  | { type: 'welcome'; content: WelcomeContent }
  | { type: 'instructions'; content: InstructionsContent }
  | { type: 'concepts'; content: ConceptsContent }
  | { type: 'steps'; content: StepsContent }
  | { type: 'clients'; content: ClientsContent }
  | { type: 'rubric'; content: RubricContent }
  | { type: 'checklist'; content: ChecklistContent };

export interface WelcomeContent {
  greeting: string;
  paragraphs: string[];
}

export interface InstructionsContent {
  intro: string;
  expectations: { emoji: string; text: string }[];
  closing: string;
}

export interface ConceptsContent {
  intro: string;
  serviceModels: { name: string; desc: string; example: string }[];
  deploymentModels: { name: string; desc: string }[];
  computeDefinitions: { name: string; desc: string }[];
  computeOptions: { option: string; control: string; when: string }[];
}

export interface StepsContent {
  intro: string;
  steps: { step: string; title: string; duration: string; desc: string; details: string[] }[];
  exampleInterview: string;
}

export interface ClientsContent {
  intro: string;
  backstory?: string;
  clients: Client[];
}

export interface RubricContent {
  intro: string;
  deliverables: { emoji: string; text: string }[];
  rubric: RubricItem[];
  closing: string;
}

export interface ChecklistContent {
  intro: string;
  items: { emoji: string; label: string; description: string; done: boolean }[];
  closing: string;
}

/* ── Clients ────────────────────────────────────────────────── */
export interface Client {
  id: ClientId;
  name: string;
  role: string;
  company: string;
  emoji: string;
  colorFrom: string;
  colorTo: string;
  caseSummary: string;
  gemName: string;
  gemLink: string;
}

export const CLIENTS: Client[] = [
  {
    id: 'lucia',
    name: 'Lucía Ibarra',
    role: 'Directora de Sistemas',
    company: 'Universidad Pública',
    emoji: '🎓',
    colorFrom: '#1a73e8',
    colorTo: '#4285f4',
    caseSummary: 'Necesita modernizar un sistema escolar legado con restricciones de residencia de datos.',
    gemName: 'Lucía Ibarra - Universidad Pública',
    gemLink: 'https://gemini.google.com/gem/18C6ojiXA8Npjz_0mJE3xJXybGRSU00uN?usp=sharing',
  },
  {
    id: 'diego',
    name: 'Diego Salgado',
    role: 'CTO',
    company: 'RápidoYa (Startup de delivery)',
    emoji: '🛵',
    colorFrom: '#ea4335',
    colorTo: '#ff6d5a',
    caseSummary: 'Su API tiene tráfico muy variable y no quiere administrar servidores.',
    gemName: 'Diego Salgado - RápidoYa',
    gemLink: 'https://gemini.google.com/gem/1evLuxyjVKu5mWyEFHVqXex8lfIcGC1fg?usp=sharing',
  },
  {
    id: 'ana',
    name: 'Ana Torres',
    role: 'Líder de Ingeniería',
    company: 'PagaFácil (Fintech)',
    emoji: '🏦',
    colorFrom: '#34a853',
    colorTo: '#57bb8a',
    caseSummary: 'Opera 12 microservicios en contenedores y necesita alta disponibilidad y despliegues canary.',
    gemName: 'Ana Torres - PagaFácil',
    gemLink: 'https://gemini.google.com/gem/1I6M84109bgCKSQ4EC50J6p3as6Qi4DP0?usp=sharing',
  },
  {
    id: 'roberto',
    name: 'Roberto Nájera',
    role: 'Coordinador de Plataforma',
    company: 'Institución Educativa',
    emoji: '🏫',
    colorFrom: '#fbbc04',
    colorTo: '#fdd663',
    caseSummary: 'Quiere generar miniaturas automáticamente cuando se sube un archivo.',
    gemName: 'Roberto Nájera - Plataforma Educativa',
    gemLink: 'https://gemini.google.com/gem/1fP8WD_ORJbKVXVu_4teVK-P1wjyodPig?usp=sharing',
  },
  {
    id: 'carla',
    name: 'Carla Espinoza',
    role: 'Directora de Operaciones',
    company: 'Estudio Norte (PyME de diseño)',
    emoji: '🎨',
    colorFrom: '#9334e6',
    colorTo: '#b16cee',
    caseSummary: 'Quiere dejar de administrar su propio correo, sin tener personal técnico.',
    gemName: 'Carla Espinoza - Estudio Norte',
    gemLink: 'https://gemini.google.com/gem/1rZZFBjms3PjYsGZ093sQmNOjGVXlUIW7?usp=sharing',
  },
];

/* ── Rubric ──────────────────────────────────────────────────── */
export interface RubricItem {
  rank: number;
  title: string;
  weight: string;
  weightNum: number;
  description: string;
  color: string;
}

export const RUBRIC: RubricItem[] = [
  { rank: 1, title: 'Calidad del diagnóstico', weight: '25%', weightNum: 25, description: '¿Preguntó antes de proponer? ¿Cubrió restricciones clave (regulación, presupuesto, equipo, tráfico)?', color: '#1a73e8' },
  { rank: 2, title: 'Solidez de la propuesta inicial', weight: '20%', weightNum: 20, description: '¿La arquitectura elegida tiene sentido para el caso, y la justificación usa argumentos técnicos reales?', color: '#ea4335' },
  { rank: 3, title: 'Manejo del "curveball"', weight: '25%', weightNum: 25, description: '¿Supo ajustar su propuesta ante la información nueva, sin descartar todo lo anterior sin necesidad?', color: '#fbbc04' },
  { rank: 4, title: 'Comparación con su compañero', weight: '20%', weightNum: 20, description: '¿Identifica con claridad qué preguntas hizo su compañero que él no hizo, y viceversa?', color: '#34a853' },
  { rank: 5, title: 'Presentación y documento final', weight: '10%', weightNum: 10, description: '¿El PDF está completo, ordenado y las 5 conversaciones se entienden?', color: '#9334e6' },
];

/* ── Emails (9 correos progresivos) ──────────────────────────── */
// {name} gets replaced dynamically with the student's full name
export const EMAILS: Email[] = [
  // ── 1. BIENVENIDA (RRHH) ─────────────────────────────
  {
    id: 'welcome',
    from: 'Equipo de Recursos Humanos',
    fromRole: 'Google Cloud Consulting',
    fromAvatar: 'RH',
    fromColor: '#34a853',
    subject: '¡Bienvenido/a al equipo Cloud Consulting! 🎉',
    preview: 'Tu primer día como consultor(a) junior empieza hoy...',
    time: '8:45 AM',
    starred: true,
    signature: { name: 'Equipo de People Operations', role: 'Google Cloud Consulting — Talent & Onboarding' },
    body: {
      type: 'welcome',
      content: {
        greeting: '¡Hola, {name}! 👋 ¡Bienvenido/a al equipo!',
        paragraphs: [
          'Qué gusto tenerte aquí. Soy del equipo de Recursos Humanos y quería ser la primera persona en darte la bienvenida oficialmente al equipo de Cloud Consulting. ¡Hoy es tu primer día y estamos muy emocionados de que te unas! 🎉',
          'A partir de hoy vas a hacer lo que hace un arquitecto de soluciones en la nube: hablar con clientes que tienen problemas reales, hacer las preguntas correctas para entender sus restricciones, y proponer (y defender) una arquitectura.',
          'No vas a tener una lista de opciones para elegir de un examen — vas a tener que construir el caso tú mismo/a, como en la vida real. Vas a hablar con 5 clientes distintos, cada uno con un problema diferente.',
          'Tu Team Lead, Carlos Méndez, te va a enviar más detalles en los próximos minutos. Mantente atento/a a tu bandeja de entrada.',
          'Por cierto, si necesitas algo — un café, indicaciones para la sala de reuniones, o simplemente alguien con quien platicar — no dudes en escribirnos. ¡Mucho éxito en tu primer proyecto! 🚀',
        ],
      },
    },
  },
  // ── 2. INSTRUCCIONES (Carlos Méndez) ──────────────────
  {
    id: 'instructions',
    from: 'Carlos Méndez',
    fromRole: 'Team Lead — Cloud Architecture',
    fromAvatar: 'CM',
    fromColor: '#1a73e8',
    subject: 'Tu primera asignación — léelo con calma ☁️',
    preview: 'Qué se espera de ti como consultor junior...',
    time: '8:52 AM',
    starred: false,
    signature: { name: 'Carlos Méndez', role: 'Team Lead — Cloud Architecture', phone: '+52 55 1234 5678' },
    body: {
      type: 'instructions',
      content: {
        intro: '¡Hola {name}! ¿Qué tal? Espero que ya te hayas servido un café ☕ — lo vas a necesitar, jaja. Soy Carlos, tu Team Lead. Antes de que empieces con los clientes, quiero que entiendas bien qué esperamos de ti en este proyecto. Léelo con calma, no hay prisa.',
        expectations: [
          { emoji: '🔍', text: 'Que preguntes ANTES de proponer. Un cliente real desconfía de quien propone una solución en los primeros 30 segundos.' },
          { emoji: '🧠', text: 'Que justifiques tu propuesta con argumentos técnicos reales ("creo que deberíamos usar X porque..."), no solo con la conclusión.' },
          { emoji: '🔄', text: 'Que sepas adaptarte cuando el cliente te dé información nueva a mitad de la conversación — en la vida real, los requisitos cambian.' },
          { emoji: '💬', text: 'Que al final puedas explicar, con tus propias palabras, por qué tu arquitectura tiene sentido para ese caso específico.' },
        ],
        closing: 'En los siguientes correos te mando el material de referencia y los detalles de tus clientes. Cualquier duda, aquí estoy — mi puerta siempre está abierta (bueno, mi Slack siempre está abierto 😄).',
      },
    },
  },
  // ── 3. CONCEPTOS (Carlos Méndez) ──────────────────────
  {
    id: 'concepts',
    from: 'Carlos Méndez',
    fromRole: 'Team Lead — Cloud Architecture',
    fromAvatar: 'CM',
    fromColor: '#1a73e8',
    subject: 'Material de referencia rápida — conceptos clave 📚',
    preview: 'Modelos de servicio, despliegue y opciones de cómputo...',
    time: '9:01 AM',
    starred: true,
    signature: { name: 'Carlos Méndez', role: 'Team Lead — Cloud Architecture', phone: '+52 55 1234 5678' },
    body: {
      type: 'concepts',
      content: {
        intro: 'Va, {name} — antes de que se me olvide y entre a mi siguiente reunión. Te mando un resumen rápido de los conceptos clave que necesitas tener frescos. Si necesitas repasar más a fondo, revisa las Unidades 1 y 3 del curso. Aquí va lo esencial:',
        serviceModels: [
          { 
            name: 'IaaS (Infraestructura como Servicio)', 
            desc: 'Definición: El proveedor proporciona la infraestructura básica (servidores, almacenamiento, redes), pero tú eres responsable de administrar el sistema operativo, el middleware y las aplicaciones. Nivel de abstracción: Bajo (tienes el control casi total, pero también la mayor carga administrativa).', 
            example: 'Google Compute Engine (GCE), Amazon EC2. Ej: Rentar una máquina virtual (VM) donde instalas Linux, una base de datos y tu aplicación desde cero.' 
          },
          { 
            name: 'PaaS (Plataforma como Servicio)', 
            desc: 'Definición: El proveedor administra la infraestructura subyacente y el entorno de ejecución (OS, runtime). Tú solo te encargas de subir y gestionar tu código o datos. Nivel de abstracción: Medio (te enfocas en el desarrollo, no en la infraestructura).', 
            example: 'Google App Engine, Heroku. Ej: Desplegar el código fuente de una aplicación web y dejar que la plataforma se encargue de escalarla y mantenerla corriendo.' 
          },
          { 
            name: 'SaaS (Software como Servicio)', 
            desc: 'Definición: El proveedor entrega una aplicación completa y lista para usar a través de internet. No tienes que preocuparte por el mantenimiento, la infraestructura ni el código. Nivel de abstracción: Alto (solo usas la aplicación como usuario final).', 
            example: 'Google Workspace (Gmail, Docs), Salesforce. Ej: Usar una plataforma de correo electrónico donde no tienes que instalar ni mantener ningún servidor.' 
          },
        ],
        deploymentModels: [
          { 
            name: 'Nube Pública', 
            desc: 'Definición: Los recursos informáticos (servidores, almacenamiento) son propiedad de un proveedor de nube externo y son operados por él, entregados a través de Internet. Los recursos se comparten entre múltiples organizaciones ("inquilinos"). Ejemplo: Usar los servicios estándar de AWS, Google Cloud o Azure.' 
          },
          { 
            name: 'Nube Privada', 
            desc: 'Definición: Los recursos informáticos son de uso exclusivo de una sola empresa u organización. Puede ubicarse físicamente en el centro de datos local de la compañía o ser alojada por un proveedor externo. Ejemplo: Un banco que mantiene sus servidores on-premise por estrictas regulaciones de seguridad.' 
          },
          { 
            name: 'Nube Híbrida', 
            desc: 'Definición: Combina infraestructuras de nube pública y privada, permitiendo que los datos y las aplicaciones se compartan entre ellas. Brinda mayor flexibilidad y más opciones de implementación. Ejemplo: Mantener datos sensibles en una base de datos local (nube privada) pero usar el poder de cómputo de la nube pública para procesarlos durante picos de demanda.' 
          },
        ],
        computeDefinitions: [
          { name: 'Máquina virtual (VM) / IaaS', desc: 'Emulación por software de una computadora física. Te permite ejecutar un sistema operativo completo y aplicaciones como si fuera hardware real.' },
          { name: 'Plataforma administrada (PaaS)', desc: 'Entorno de ejecución gestionado donde puedes desplegar tu código directamente sin aprovisionar servidores ni preocuparte por el sistema operativo subyacente.' },
          { name: 'Contenedores Orquestados', desc: 'Paquetes de software autónomos que incluyen el código y sus dependencias. Orquestadores como Kubernetes gestionan cientos o miles de estos contenedores automatizando su despliegue y escalado.' },
          { name: 'Contenedores Serverless', desc: 'Contenedores que se ejecutan bajo demanda sin necesidad de configurar clústeres ni nodos (ej. Cloud Run, Fargate). Pagas solo por el tiempo que el contenedor está procesando peticiones.' },
          { name: 'Funciones (Serverless / FaaS)', desc: 'Pequeños bloques de código (lógica de negocio) que se ejecutan únicamente en respuesta a un evento (ej. una subida de archivo o una llamada HTTP). No hay servidores visibles para ti.' }
        ],
        computeOptions: [
          { 
            option: 'Máquina virtual (VM) / IaaS', 
            control: 'Control Total. Debes actualizar y mantener el Sistema Operativo (OS).', 
            when: 'Ideal para: Migraciones tipo "lift-and-shift" de sistemas legacy, software con licencias o dependencias específicas de OS (ej. Windows Server antiguo), o bases de datos relacionales tradicionales muy personalizadas.' 
          },
          { 
            option: 'Plataforma administrada (PaaS)', 
            control: 'Control Medio. Te olvidas del SO; solo gestionas tu código.', 
            when: 'Ideal para: Aplicaciones web estándar, APIs o backends donde la velocidad de desarrollo es prioridad y no requieres acceso al sistema operativo subyacente.' 
          },
          { 
            option: 'Contenedores Orquestados (Kubernetes)', 
            control: 'Control Medio-Alto. Administras el clúster, los pods y la red de microservicios.', 
            when: 'Ideal para: Arquitecturas de microservicios complejas, aplicaciones que requieren portabilidad entre diferentes nubes (multi-cloud), o sistemas que necesitan escalado muy granular y despliegues canary.' 
          },
          { 
            option: 'Contenedores Serverless', 
            control: 'Control Bajo. Solo entregas la imagen del contenedor; la nube se encarga de ejecutarlo y escalarlo.', 
            when: 'Ideal para: APIs, servicios web o procesamiento de datos empaquetados en contenedores (Docker) que tienen tráfico variable y donde quieres pagar solo por el uso real, sin administrar un clúster (ej. Cloud Run).' 
          },
          { 
            option: 'Funciones (Serverless / FaaS)', 
            control: 'Control Mínimo. Solo escribes el código de la función (el fragmento de lógica).', 
            when: 'Ideal para: Tareas cortas o automatizaciones disparadas por eventos específicos (ej. generar una miniatura cuando se sube una imagen a un bucket, limpiar una base de datos cada noche, o reaccionar a un webhook).' 
          },
        ],
      },
    },
  },
  // ── 4. PASO A PASO (Carlos Méndez) ────────────────────
  {
    id: 'steps',
    from: 'Carlos Méndez',
    fromRole: 'Team Lead — Cloud Architecture',
    fromAvatar: 'CM',
    fromColor: '#1a73e8',
    subject: 'Cómo abordar cada cliente — paso a paso 🗺️',
    preview: 'Sigue este proceso con cada uno de los 5 clientes...',
    time: '9:10 AM',
    starred: false,
    signature: { name: 'Carlos Méndez', role: 'Team Lead — Cloud Architecture', phone: '+52 55 1234 5678' },
    body: {
      type: 'steps',
      content: {
        intro: '{name}, te mando el paso a paso para que no te pierdas. Sé que es mucha info pero créeme, vale la pena leerlo completo antes de hablar con el primer cliente. Cada minuto que inviertas aquí te ahorra 10 en la reunión.',
        steps: [
          {
            step: 'Paso 1', title: 'Repasa los conceptos', duration: '10 min',
            desc: 'Asegúrate de tener claros los tres modelos de servicio, los tres modelos de despliegue y las 5 opciones de cómputo antes de empezar.',
            details: ['Revisa el correo anterior con el material de referencia', 'Si algo no te queda claro, consulta las Unidades 1 y 3 del curso'],
          },
          {
            step: 'Paso 2', title: 'Habla con cada uno de los 5 clientes (Gems)', duration: '15-20 min c/u',
            desc: 'En cada conversación, sigue el mismo patrón:',
            details: [
              'Preséntate: quién eres y a qué te dedicas (aunque sea en una frase)',
              'Haz preguntas de diagnóstico antes de proponer nada. Entre más completo tu diagnóstico, mejor tu propuesta',
              'Propón tu arquitectura y justifícala: "Creo que deberíamos usar ___ porque ___"',
              'Mantente atento: el cliente puede darte información nueva a mitad de la conversación. Ajusta tu propuesta si hace falta, explicando por qué cambias de opinión',
              'Al final, pide la puntuación de tu solución ("¿me puedes dar una puntuación de mi propuesta?")',
              '📌 Guarda cada conversación completa (puedes copiar el texto o exportarlo desde Gemini)',
            ],
          },
          {
            step: 'Paso 3', title: 'Arma tu PDF final', duration: '15 min',
            desc: 'Junta las 5 conversaciones completas en un solo PDF.',
            details: [
              'Junta las 5 conversaciones completas en un solo PDF, una después de otra',
              'Pon el nombre del cliente y el tema del caso al inicio de cada conversación',
              '📌 Entregas: un PDF con las 5 conversaciones completas (incluyendo la puntuación final de cada una)',
            ],
          },
          {
            step: 'Paso 4', title: 'Llamada breve con un compañero', duration: '10 min',
            desc: 'Compara tus resultados con otro estudiante.',
            details: [
              'Júntate con otro estudiante que también haya hablado con los 5 clientes',
              'Para cada uno de los 5 casos, compartan qué preguntas de diagnóstico hizo cada quien y cuáles no',
              'Identifiquen: ¿hubo algún caso donde tu compañero llegó a una arquitectura distinta a la tuya? ¿Por qué?',
              'Anota en un documento corto las diferencias más importantes',
              '📌 Entregas: notas breves de la llamada (qué preguntas se hicieron / no se hicieron, y las diferencias encontradas)',
            ],
          },
        ],
        exampleInterview: `Estudiante: Hola, buenas tardes. Soy [nombre], consultor(a) de arquitectura en la nube, aquí para ayudarte con tu proyecto.

Roberto: ¡Hola! Qué bueno que llegaste. Mira, tengo un problema con mi plataforma educativa...

Estudiante: Cuéntame más, ¿qué necesitas exactamente?

Roberto: Cada vez que un estudiante sube una tarea en PDF, quiero generar automáticamente una vista previa en miniatura. Ahora mismo no tengo nada armado.

Estudiante: ¿Qué tan seguido se suben archivos? ¿Hay picos de tráfico en ciertas horas?

Roberto: Sí, hay mucho tráfico cuando se acercan las fechas de entrega, y casi nada el resto del tiempo.

Estudiante: Entiendo. Creo que deberíamos usar una función que se dispare automáticamente cada vez que se sube un archivo, en vez de tener un servidor corriendo todo el día, porque el uso es muy irregular y no tiene sentido pagar por algo que está inactivo la mayoría del tiempo.

Roberto: Me gusta la idea. Oye, una cosa más que se me había olvidado decirte: además de la miniatura, ahora también queremos revisar cada archivo con un antivirus antes de aceptarlo, y ese proceso a veces tarda varios minutos dependiendo del tamaño del archivo.

Estudiante: Hmm, eso cambia un poco las cosas, porque las funciones disparadas por evento suelen tener un límite de tiempo de ejecución corto. Para el escaneo de antivirus probablemente necesitemos algo con más tiempo permitido, separado de la función que genera la miniatura.

Roberto: Tiene sentido.

Estudiante: ¿Podrías darme una puntuación final de mi propuesta?

Roberto: [da la retroalimentación estructurada]`,
      },
    },
  },
  // ── 5. CLIENTES 1-2 (María López, PM) ─────────────────
  {
    id: 'clients-batch-1',
    from: 'María López',
    fromRole: 'Project Manager — Cloud Consulting',
    fromAvatar: 'ML',
    fromColor: '#9334e6',
    subject: 'Tus primeros dos clientes asignados 📋',
    preview: 'Carlos me pidió que te enviara los primeros casos...',
    time: '9:20 AM',
    starred: true,
    signature: { name: 'María López', role: 'Project Manager — Cloud Consulting', phone: '+52 55 9876 5432' },
    body: {
      type: 'clients',
      content: {
        intro: '¡Hola {name}! Carlos me platicó de ti, qué bueno que ya estés en el equipo 😊. Soy María, la PM del proyecto. Te mando los primeros dos clientes que tienes asignados esta semana. Ya les avisé que un consultor de nuestro equipo los va a contactar, así que están esperando tu reunión. ¡Éxito!',
        clients: [CLIENTS[0], CLIENTS[1]],
      },
    },
  },
  // ── 6. CLIENTES 3-4 (Andrés Ruiz, Sr. Architect) ─────
  {
    id: 'clients-batch-2',
    from: 'Andrés Ruiz',
    fromRole: 'Senior Cloud Architect',
    fromAvatar: 'AR',
    fromColor: '#ea4335',
    subject: 'Dos casos más para ti — te van a gustar 🔧',
    preview: 'Hey, soy Andrés del equipo. Te paso estos dos casos...',
    time: '9:31 AM',
    starred: false,
    signature: { name: 'Andrés Ruiz', role: 'Senior Cloud Architect — 3 años en el equipo', phone: '+52 33 5555 1234' },
    body: {
      type: 'clients',
      content: {
        intro: 'Hey {name}, ¿cómo vas con todo? Soy Andrés, llevo como 3 años en el equipo. María me pidió que te pasara estos dos casos que me habían asignado a mí pero ando saturado esta semana (la vida del consultor, ya te irás acostumbrando 😅). Son casos interesantes, te van a gustar. Cualquier duda técnica, búscame en Slack — @andres.ruiz.',
        clients: [CLIENTS[2], CLIENTS[3]],
      },
    },
  },
  // ── 7. CLIENTE 5 (Aarav Sharma, peer consultant) ────────
  {
    id: 'client-urgent',
    from: 'Aarav Sharma',
    fromRole: 'Junior Cloud Architect',
    fromAvatar: 'AS',
    fromColor: '#fbbc04',
    subject: '⚡ Urgent — Can you take over this case?',
    preview: 'A team member had an emergency, we need your help...',
    time: '9:42 AM',
    starred: true,
    signature: { name: 'Aarav Sharma', role: 'Junior Cloud Architect (also new, joined 2 months ago 😄)' },
    body: {
      type: 'clients',
      content: {
        intro: 'Hi {name}! I\'m Aarav, we are on the same team even though we haven\'t met yet 😅 — we should grab a coffee soon.',
        backstory: 'I\'m writing to you because Marcos — another junior consultant on our team — had a personal emergency and won\'t be able to meet with a client he had scheduled for this week. Carlos asked me to hand this case over to you as soon as possible. The client is Carla Espinoza, Operations Director at Estudio Norte. We don\'t know much more than the basics — Marcos was just about to start the discovery phase. You\'ll have to start from scratch, but I know you can handle it. Good luck!',
        clients: [CLIENTS[4]],
      },
    },
  },
  // ── 8. RÚBRICA (Carlos Méndez) ────────────────────────
  {
    id: 'rubric',
    from: 'Carlos Méndez',
    fromRole: 'Team Lead — Cloud Architecture',
    fromAvatar: 'CM',
    fromColor: '#1a73e8',
    subject: 'Entregables finales y cómo te evaluamos 📊',
    preview: 'Último correo del día, lo prometo...',
    time: '9:55 AM',
    starred: false,
    signature: { name: 'Carlos Méndez', role: 'Team Lead — Cloud Architecture', phone: '+52 55 1234 5678' },
    body: {
      type: 'rubric',
      content: {
        intro: '{name}, último correo del día, lo prometo 😄. Aquí te mando cómo vamos a evaluar tu trabajo y qué necesitas entregar. Léelo bien para que no te agarre de sorpresa después.',
        deliverables: [
          { emoji: '📄', text: 'Un PDF con las 5 conversaciones completas (incluyendo la puntuación final de cada una).' },
          { emoji: '📝', text: 'Notas breves de la llamada con tu compañero (preguntas hechas/no hechas y diferencias encontradas).' },
        ],
        rubric: RUBRIC,
        closing: '¡Mucho éxito armando tus 5 arquitecturas! Recuerda: en la vida real, casi nunca hay una sola respuesta correcta — hay decisiones bien o mal justificadas. Confío en ti, {name}. 💪',
      },
    },
  },
  // ── 9. CHECKLIST DE DOCUMENTOS (María López) ──────────
  {
    id: 'checklist',
    from: 'María López',
    fromRole: 'Project Manager — Cloud Consulting',
    fromAvatar: 'ML',
    fromColor: '#9334e6',
    subject: 'Checklist de entrega — no se te olvide nada ✅',
    preview: 'Te mando el checklist para que tengas todo organizado...',
    time: '10:03 AM',
    starred: true,
    signature: { name: 'María López', role: 'Project Manager — Cloud Consulting', phone: '+52 55 9876 5432' },
    body: {
      type: 'checklist',
      content: {
        intro: 'Hola de nuevo, {name} 👋 Solo para que tengas todo organizado, te mando el checklist de documentos que necesitas entregar. Yo soy la que revisa que todo esté completo antes de pasarlo a evaluación, así que por favor asegúrate de no saltarte nada. ¡Gracias!',
        items: [
          { emoji: '💬', label: 'Conversación con Lucía Ibarra (Universidad Pública)', description: 'Conversación completa exportada de Gemini, incluyendo la puntuación final.', done: false },
          { emoji: '💬', label: 'Conversación con Diego Salgado (RápidoYa)', description: 'Conversación completa exportada de Gemini, incluyendo la puntuación final.', done: false },
          { emoji: '💬', label: 'Conversación con Ana Torres (PagaFácil)', description: 'Conversación completa exportada de Gemini, incluyendo la puntuación final.', done: false },
          { emoji: '💬', label: 'Conversación con Roberto Nájera (Plataforma Educativa)', description: 'Conversación completa exportada de Gemini, incluyendo la puntuación final.', done: false },
          { emoji: '💬', label: 'Conversación con Carla Espinoza (Estudio Norte)', description: 'Conversación completa exportada de Gemini, incluyendo la puntuación final.', done: false },
          { emoji: '📄', label: 'PDF final con las 5 conversaciones', description: 'Un solo archivo PDF con las 5 conversaciones completas, una después de otra. Pon el nombre del cliente al inicio de cada una.', done: false },
          { emoji: '📞', label: 'Notas de la llamada con tu compañero', description: 'Documento breve con: qué preguntas hicieron/no hicieron cada quien, y las diferencias de arquitectura que encontraron.', done: false },
        ],
        closing: 'Tip: conforme vayas terminando cada conversación, expórtala de Gemini y guárdala. Es más fácil ir armando el PDF poco a poco que hacerlo todo al final. ¡Éxito, {name}! 🚀',
      },
    },
  },
];
