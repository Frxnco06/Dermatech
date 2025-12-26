export interface CitaRequest {
  idMedico: number;
  idPaciente: number;
  fechaHora: string;
  motivoConsulta: string;
  observaciones?: string;
  precio: number;
}