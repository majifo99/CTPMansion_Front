export enum RequestStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected"
}

export interface LabRequest {
  id_LaboratoryRequest: number; // Cambiado para reflejar el ID correcto
  labId: number;
  managerName: string;
  managerLastName: string;
  managerLastName2: string;
  course: string;
  activityDescription: string;
  needs: string;
  numberOfAttendees: number;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  status?: string;
}
