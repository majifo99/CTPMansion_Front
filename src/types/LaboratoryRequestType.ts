export enum RequestStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
  }


  export interface LabRequest {
    id_LabRequest: number;
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