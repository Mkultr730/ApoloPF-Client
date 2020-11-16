import { DocumentReference } from '@angular/fire/firestore';

export interface Leccion {
  id: string;
  year: string;
  ejercicios: Array<DocumentReference>;
  enunciado: string;
  icon: string;
  objetivos: Array<string>;
  titulo: string;
}

export interface Ejercicio {
  enunciado: string;
  leccion: DocumentReference;
  preguntas: Array<Pregunta>;
}

export interface Pregunta {
  pregunta: string;
  respuestas: Array<string>;
  solucion: string;
}
