-- Lumbre catalog seed: therapy modules, lessons, and audio placeholders.
-- Clinical tone: validating, non-diagnostic, educational support only.
-- Does not replace professional care.

-- ---------------------------------------------------------------------------
-- Therapy modules (8 milestones)
-- ---------------------------------------------------------------------------

insert into public.therapy_modules (id, title_es, title_en, order_index, description_es) values
  (
    'understand_pain',
    'Comprender el dolor',
    'Understand pain',
    1,
    'El dolor crónico es real. Aquí exploramos cómo el sistema nervioso participa en la experiencia del dolor, sin negar lo que sientes ni culparte por ello.'
  ),
  (
    'calm_nervous_system',
    'Calmar el sistema nervioso',
    'Calm the nervous system',
    2,
    'Prácticas suaves para bajar la alerta cuando el cuerpo se siente en amenaza. No se trata de “pensar positivo”, sino de dar señales de seguridad.'
  ),
  (
    'move_safely',
    'Moverse con seguridad',
    'Move safely',
    3,
    'El movimiento puede hacerse a tu ritmo. Aprendemos a distinguir entre molestia tolerable y señales que piden pausa, sin forzar ni quedarte inmóvil por miedo.'
  ),
  (
    'pacing_flareups',
    'Ritmo y brotes',
    'Pacing and flare-ups',
    4,
    'Los brotes forman parte de muchas trayectorias de dolor. Aquí trabajamos pacing, preparación y cuidado en días difíciles, sin juzgar el “fracaso”.'
  ),
  (
    'thoughts_fear_selfcare',
    'Pensamientos, miedo y autocuidado',
    'Thoughts, fear, and self-care',
    5,
    'El miedo al dolor y los pensamientos catastróficos son respuestas humanas. Observarlos con amabilidad puede abrir espacio para cuidarte mejor.'
  ),
  (
    'sleep_energy_lifestyle',
    'Sueño, energía y estilo de vida',
    'Sleep, energy, and lifestyle',
    6,
    'Sueño, energía y ritmos diarios influyen en cómo se vive el dolor. Pequeños ajustes sostenibles, no reglas rígidas ni culpabilización.'
  ),
  (
    'trust_body',
    'Confiar en el cuerpo',
    'Trust the body',
    7,
    'Reconstruir una relación más segura con el cuerpo después de mucho tiempo en alerta. Validación, límites y presencia gradual.'
  ),
  (
    'pain_psychotherapy_continuity',
    'Continuidad y psicoterapia del dolor',
    'Pain psychotherapy and continuity',
    8,
    'Integrar lo aprendido y sostener el cuidado en el tiempo. Lumbre acompaña; no sustituye el acompañamiento clínico cuando lo necesitas.'
  )
on conflict (id) do update set
  title_es = excluded.title_es,
  title_en = excluded.title_en,
  order_index = excluded.order_index,
  description_es = excluded.description_es;

-- ---------------------------------------------------------------------------
-- Therapy lessons (2–3 per module)
-- ---------------------------------------------------------------------------

insert into public.therapy_lessons (
  id, module_id, title_es, type, duration_min, content_es, audio_url, order_index
) values
  -- 1 understand_pain
  (
    'understand_pain_01_real',
    'understand_pain',
    'Tu dolor es real',
    'reading',
    6,
    'Si vives con dolor persistente, es posible que hayas escuchado frases que minimizan lo que sientes. En Lumbre partimos de otra premisa: tu experiencia es válida. El dolor no es “solo en la cabeza”; involucra tejido, nervios, emociones, contexto y memoria corporal. Comprender no borra el dolor, pero puede reducir la soledad y la culpa que a menudo lo acompañan. Hoy no te pedimos que “creeas” nada nuevo: solo que te permitas no pelear contra tu propia percepción.',
    null,
    1
  ),
  (
    'understand_pain_02_nervous',
    'understand_pain',
    'El sistema nervioso y la protección',
    'reading',
    8,
    'El sistema nervioso aprende a proteger. Después de lesiones, cirugías, estrés prolongado o años de molestia, puede volverse más sensible: señales que antes pasaban desapercibidas ahora se sienten intensas. Eso no significa que “inventes” el dolor; significa que tu cuerpo está haciendo un trabajo de vigilancia. Hablar de sensibilización es una forma de explicar, no de culpar. Si algo aquí no encaja con tu historia clínica, está bien: cada cuerpo tiene su mapa, y un profesional de salud puede ayudarte a interpretarlo contigo.',
    null,
    2
  ),
  (
    'understand_pain_03_reflect',
    'understand_pain',
    'Reflexión: qué te ha costado que te crean',
    'reflection',
    5,
    'Piensa (o escribe) en una ocasión en que sentiste que tu dolor no fue tomado en serio. ¿Qué necesitabas en ese momento? ¿Validación, tiempo, una explicación clara, un plan? No hay respuesta correcta. Esta reflexión no diagnostica nada; solo abre espacio a lo que ya sabes sobre ti.',
    null,
    3
  ),

  -- 2 calm_nervous_system
  (
    'calm_ns_01_safety',
    'calm_nervous_system',
    'Señales de seguridad, no de fuerza',
    'reading',
    7,
    'Cuando el cuerpo está en alerta, pedirle que “se relaje ya” puede sentirse imposible o incluso frustrante. En cambio, podemos ofrecer señales pequeñas de seguridad: un ritmo de respiración más lento, calor en las manos, un entorno predecible, una voz amable. No es magia ni cura; es una invitación a bajar un poco el volumen de la amenaza. Si en algún momento te sientes mareado/a o peor, detente. Tu ritmo manda.',
    null,
    1
  ),
  (
    'calm_ns_02_breath',
    'calm_nervous_system',
    'Práctica: respiración corta y amable',
    'practice',
    5,
    'Siéntate o recuéstate con apoyo. Nota tres puntos de contacto (espalda, asiento, pies). Inhala con suavidad por la nariz contando hasta 3; exhala un poco más largo, contando hasta 4 o 5. Repite 4–6 ciclos. Si la atención al pecho o al abdomen aumenta la ansiedad, mira un objeto fijo en la habitación y solo alarga un poco la exhalación. Esta práctica no “arregla” el dolor; puede ayudar a que el sistema nervioso note un instante de menos urgencia.',
    null,
    2
  ),
  (
    'calm_ns_03_audio',
    'calm_nervous_system',
    'Audio: anclaje en el presente',
    'audio',
    8,
    'Usa el audio de anclaje cuando notes tensión acumulada o un día de mucha alerta. Escucha con auriculares si puedes. No es necesario “hacerlo bien”: basta con acompañar la voz el tiempo que te resulte tolerable. Puedes pausar o salir cuando quieras.',
    'audio/placeholder/anclaje_presente.mp3',
    3
  ),

  -- 3 move_safely
  (
    'move_safely_01_permission',
    'move_safely',
    'Permiso para moverte a tu medida',
    'reading',
    6,
    'Después de mucho dolor, el movimiento puede asociarse a riesgo. A veces el cuerpo se queda quieto por protección; otras, se fuerza por miedo a “perder capacidad”. Ninguna de las dos extremos suele ser sostenible. Moverse con seguridad significa explorar rangos pequeños, con opción de parar, y distinguir molestia esperable de señal de alarma. No hay una cantidad “correcta” de ejercicio para todas las personas. Si tienes contraindicaciones médicas, consulta antes de cambiar tu rutina.',
    null,
    1
  ),
  (
    'move_safely_02_micro',
    'move_safely',
    'Práctica: micro-movimiento con opción de salida',
    'practice',
    5,
    'Elige un movimiento mínimo: girar suavemente los hombros, abrir y cerrar las manos, o caminar unos pasos en casa. Antes de empezar, define tu “salida”: puedes detenerte en cualquier momento sin explicar. Haz 30–60 segundos. Nota qué cambia (o no). El objetivo no es rendimiento; es recuperar agencia: yo elijo, yo puedo parar.',
    null,
    2
  ),

  -- 4 pacing_flareups
  (
    'pacing_01_what_is',
    'pacing_flareups',
    'Qué es el pacing (y qué no es)',
    'reading',
    7,
    'El pacing no es “hacer menos para siempre”. Es repartir energía, alternar actividad y descanso, y planear con realismo los días buenos y los difíciles. Los brotes (flare-ups) son comunes en dolor persistente; no significan automáticamente que hayas “hecho todo mal”. A veces aparecen sin causa clara. Preparar un plan de brote —agua, calor/frío según te ayude, contactos de apoyo, medicación según indicación médica, reducir exigencias— puede reducir el pánico cuando llega.',
    null,
    1
  ),
  (
    'pacing_02_flare_plan',
    'pacing_flareups',
    'Práctica: tu plan de día difícil',
    'practice',
    8,
    'Escribe tres cosas: (1) qué reduce un poco el sufrimiento en un brote (posición, temperatura, entorno quieto); (2) qué puedes posponer sin culpa; (3) a quién puedes avisar si necesitas ayuda práctica. Guarda esta lista donde la veas. No es un protocolo médico; es un recordatorio de cuidado cuando la mente está nublada por el dolor.',
    null,
    2
  ),
  (
    'pacing_03_reflect',
    'pacing_flareups',
    'Reflexión: el día después del brote',
    'reflection',
    5,
    'Cuando el pico baja, ¿qué te dices a ti mismo/a? ¿Aparece autocrítica (“debí haber…”)? Prueba una frase alternativa, aunque no la creas del todo: “Estoy recuperándome de un día difícil; el cuidado cuenta.”',
    null,
    3
  ),

  -- 5 thoughts_fear_selfcare
  (
    'thoughts_01_fear',
    'thoughts_fear_selfcare',
    'El miedo al dolor también es información',
    'reading',
    7,
    'Temer al dolor tiene sentido cuando el dolor ha interrumpido planes, sueño o identidad. Los pensamientos del tipo “esto nunca va a mejorar” o “si me muevo, lo voy a empeorar” suelen ser intentos de protección, no fallas de carácter. Observarlos —nombrarlos, anotarlos— no obliga a creerlos ni a pelear contra ellos. El autocuidado aquí incluye límites, descanso y pedir ayuda, no solo “pensamiento positivo”.',
    null,
    1
  ),
  (
    'thoughts_02_notice',
    'thoughts_fear_selfcare',
    'Práctica: notar sin juzgar',
    'practice',
    6,
    'Durante 2 minutos, cuando surja un pensamiento inquietante sobre el dolor, anótalo en una frase corta. Añade debajo: “Es un pensamiento.” No hace falta discutirlo. Si te desborda, vuelve a la respiración o a un objeto en la habitación. Si notas desesperanza intensa o ideas de hacerte daño, busca apoyo de urgencia en tu red local de salud; Lumbre no es un servicio de crisis.',
    null,
    2
  ),

  -- 6 sleep_energy_lifestyle
  (
    'sleep_01_rhythm',
    'sleep_energy_lifestyle',
    'Sueño y dolor: un círculo que se alimenta',
    'reading',
    6,
    'Dormir mal puede intensificar la sensibilidad al dolor; el dolor puede fragmentar el sueño. No es tu culpa. En lugar de perseguir la noche “perfecta”, a menudo ayuda estabilizar horarios suaves, reducir pantallas cerca de dormir si es posible, y ajustar expectativas en días de mal descanso. Evita cambios bruscos de medicación o suplementos sin orientación profesional.',
    null,
    1
  ),
  (
    'sleep_02_energy',
    'sleep_energy_lifestyle',
    'Práctica: presupuesto de energía del día',
    'practice',
    5,
    'Divide el día en “bloques” de energía (mañana / tarde / noche). Marca un bloque como prioritario y otro como de recuperación. Si solo puedes sostener una actividad significativa hoy, elige esa y suelta el resto sin moralizar. El estilo de vida se construye en semanas, no en un día heroico.',
    null,
    2
  ),
  (
    'sleep_03_audio',
    'sleep_energy_lifestyle',
    'Audio: transición hacia el descanso',
    'audio',
    10,
    'Escucha este audio cuando quieras marcar el paso del día a la noche. No garantiza sueño; ofrece un ritual de cierre. Si te quedas dormido/a a mitad, está bien.',
    'audio/placeholder/transicion_descanso.mp3',
    3
  ),

  -- 7 trust_body
  (
    'trust_01_relationship',
    'trust_body',
    'Rehacer el vínculo con el cuerpo',
    'reading',
    7,
    'Después de años de dolor, el cuerpo puede sentirse enemigo o traición. Recuperar confianza no significa “olvidar” lo vivido ni forzar gratitud. Significa practicar presencia gradual: notar sensaciones neutras (temperatura, textura), respetar límites, celebrar micro-avances. La confianza crece con experiencias repetidas de “puedo elegir y puedo parar”, no con una sola epifanía.',
    null,
    1
  ),
  (
    'trust_02_senses',
    'trust_body',
    'Práctica: tres sensaciones seguras',
    'practice',
    5,
    'Elige tres sensaciones que hoy se sientan relativamente neutrales o agradables (por ejemplo: agua tibia en las manos, una manta, la presión de los pies en el suelo). Quédate 20–30 segundos en cada una. Si aparece dolor o miedo, reduce el tiempo o cambia de sentido. Estás entrenando atención selectiva hacia lo que también existe en el cuerpo, además del dolor.',
    null,
    2
  ),

  -- 8 pain_psychotherapy_continuity
  (
    'continuity_01_integrate',
    'pain_psychotherapy_continuity',
    'Integrar sin exigirte “haber terminado”',
    'reading',
    6,
    'Los hitos de Lumbre no son una graduación. El dolor crónico suele ser un proceso ondulado: avances, pausas, rebrotes. Continuidad significa volver a lo que te sirvió —pacing, respiración, plan de brote, conversación con tu clínico— sin interpretarlo como fracaso. La psicoterapia del dolor, cuando está disponible y es adecuada para ti, puede profundizar este trabajo; la app es un complemento, no un reemplazo.',
    null,
    1
  ),
  (
    'continuity_02_questions',
    'pain_psychotherapy_continuity',
    'Preguntas útiles para llevar a consulta',
    'reading',
    5,
    'Puedes anotar: ¿Qué patrones de brote he notado? ¿Qué me ayuda aunque sea un poco? ¿Hay cambios recientes en sueño, medicación o ánimo que deba comentar? Llevar notas no diagnostica; facilita el diálogo con quien te acompaña clínicamente.',
    null,
    2
  ),
  (
    'continuity_03_reflect',
    'pain_psychotherapy_continuity',
    'Reflexión: qué quieres sostener este mes',
    'reflection',
    5,
    'Elige una sola práctica o hábito pequeño para sostener las próximas semanas (por ejemplo: registro de dolor 3 veces por semana, o 4 minutos de anclaje). Escribe por qué importa para ti. Si no lo cumples algunos días, vuelve sin castigo.',
    null,
    3
  )
on conflict (id) do update set
  module_id = excluded.module_id,
  title_es = excluded.title_es,
  type = excluded.type,
  duration_min = excluded.duration_min,
  content_es = excluded.content_es,
  audio_url = excluded.audio_url,
  order_index = excluded.order_index;

-- ---------------------------------------------------------------------------
-- Audio assets (~12 placeholders across categories)
-- storage_path points to future Supabase Storage objects; files may not exist yet.
-- ---------------------------------------------------------------------------

insert into public.audio_assets (
  id, category, title_es, title_en, description_es, duration_sec, storage_path, transcript_es
) values
  (
    'a1000000-0000-4000-8000-000000000001',
    'grounding',
    'Anclaje en el presente',
    'Present-moment grounding',
    'Guía breve para notar el entorno y el cuerpo sin forzar la relajación.',
    480,
    'audio/placeholder/anclaje_presente.mp3',
    'Nota tres cosas que puedes ver… tres que puedes oír… y un punto de apoyo en el cuerpo. No hay forma correcta; solo presencia a tu ritmo.'
  ),
  (
    'a1000000-0000-4000-8000-000000000002',
    'grounding',
    'Cinco sentidos suaves',
    'Gentle five senses',
    'Recorrido sensorial corto para días de mucha alerta.',
    360,
    'audio/placeholder/cinco_sentidos.mp3',
    'Elige un sentido a la vez. Si un sentido aumenta el malestar, pasa al siguiente o pausa.'
  ),
  (
    'a1000000-0000-4000-8000-000000000003',
    'breath',
    'Exhalación alargada',
    'Lengthened exhale',
    'Respiración simple con exhalación un poco más larga que la inhalación.',
    300,
    'audio/placeholder/exhalacion_alargada.mp3',
    'Inhala con suavidad… exhala un poco más largo. Si te mareas, vuelve a tu respiración habitual.'
  ),
  (
    'a1000000-0000-4000-8000-000000000004',
    'breath',
    'Respiración con permiso de parar',
    'Breathing with permission to stop',
    'Práctica de respiración que enfatiza la opción de detenerte cuando quieras.',
    240,
    'audio/placeholder/respiracion_permiso.mp3',
    'Puedes dejar esta práctica en cualquier momento. Tu autonomía es parte del cuidado.'
  ),
  (
    'a1000000-0000-4000-8000-000000000005',
    'body_scan',
    'Escaneo corporal amable',
    'Kind body scan',
    'Atención gradual por regiones, con permiso de saltar zonas dolorosas.',
    720,
    'audio/placeholder/escaneo_amable.mp3',
    'Recorre el cuerpo como quien visita, no como quien juzga. Si una zona duele mucho, salta o reduce el tiempo.'
  ),
  (
    'a1000000-0000-4000-8000-000000000006',
    'body_scan',
    'Manos y pies: zonas seguras',
    'Hands and feet: safer zones',
    'Enfoque en manos y pies cuando el tronco o la zona dolorosa se siente abrumadora.',
    420,
    'audio/placeholder/manos_pies.mp3',
    'Nota temperatura y contacto en manos o pies. Son anclas frecuentes cuando el resto del cuerpo pide distancia.'
  ),
  (
    'a1000000-0000-4000-8000-000000000007',
    'sleep',
    'Transición hacia el descanso',
    'Transition toward rest',
    'Ritual de cierre del día; no promete sueño inmediato.',
    600,
    'audio/placeholder/transicion_descanso.mp3',
    'Vamos cerrando el día con lentitud. Si te duermes, está bien. Si no, el descanso quieto también cuenta.'
  ),
  (
    'a1000000-0000-4000-8000-000000000008',
    'sleep',
    'Noche de bajo estímulo',
    'Low-stimulus night',
    'Audio corto para ambientes calmados antes de dormir.',
    480,
    'audio/placeholder/noche_bajo_estimulo.mp3',
    'Baja luces si puedes. Escucha sin esfuerzo. No hay meta de “quedarte dormido/a ya”.'
  ),
  (
    'a1000000-0000-4000-8000-000000000009',
    'flareup',
    'Acompañamiento en un brote',
    'Flare-up companionship',
    'Voz de apoyo para momentos de dolor alto; valida y orienta a cuidados básicos.',
    540,
    'audio/placeholder/acompanamiento_brote.mp3',
    'Estás en un momento difícil y tu dolor es real. Si puedes, busca una posición un poco más tolerable. Agua, calor o frío según te ayude, y permiso para no rendir hoy.'
  ),
  (
    'a1000000-0000-4000-8000-000000000010',
    'flareup',
    'Después del pico',
    'After the peak',
    'Suaviza la autocrítica cuando el brote empieza a ceder.',
    300,
    'audio/placeholder/despues_del_pico.mp3',
    'El pico puede bajar despacio. Hoy el cuidado es suficiente. No necesitas recuperarte “perfecto” de inmediato.'
  ),
  (
    'a1000000-0000-4000-8000-000000000011',
    'movement',
    'Micro-movimiento guiado',
    'Guided micro-movement',
    'Movimientos mínimos con énfasis en parar cuando lo necesites.',
    360,
    'audio/placeholder/micro_movimiento.mp3',
    'Elige un movimiento pequeño. Yo cuento contigo. Puedes detenerme cuando quieras; eso también es éxito.'
  ),
  (
    'a1000000-0000-4000-8000-000000000012',
    'compassion',
    'Frases de autocompasión',
    'Self-compassion phrases',
    'Frases breves para días de culpa o exigencia alta.',
    240,
    'audio/placeholder/autocompasion.mp3',
    'Esto es difícil. No estoy solo/a en el sufrimiento. Puedo ofrecerme un poco de amabilidad, aunque sea imperfecta.'
  )
on conflict (id) do update set
  category = excluded.category,
  title_es = excluded.title_es,
  title_en = excluded.title_en,
  description_es = excluded.description_es,
  duration_sec = excluded.duration_sec,
  storage_path = excluded.storage_path,
  transcript_es = excluded.transcript_es;
