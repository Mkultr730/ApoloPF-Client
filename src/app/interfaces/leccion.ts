export interface Leccion {
    id: string;
    año: string;
    ejercicios: Array<string>;
    icon: string;
    objetivos: Array<string>;
    titulo: string;
}

export interface Ejercicio {
    enunciado: string;
    preguntas: Array<Pregunta>;
}

export interface Pregunta {
    pregunta: string;
    respuestas: Array<string>;
    solucion: string;
}