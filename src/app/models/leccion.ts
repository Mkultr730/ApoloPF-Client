export interface Leccion {
    id: string;
    year: string;
    ejercicios: Array<string>;
    enunciado: string;
    icon: string;
    objetivos: Array<string>;
    titulo: string;
}

export interface Ejercicio {
    enunciado: string;
    leccion: string;
    preguntas: Array<Pregunta>;
}

export interface Pregunta {
    pregunta: string;
    respuestas: Array<string>;
    solucion: string;
}
