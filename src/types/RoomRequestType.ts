export enum RequestStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
  }


export interface RoomRequest {
  id_RoomRequest: number;    // Unique identifier for the room request
  managerName: string;       // Name of the person requesting the room
  managerLastName: string;   // First last name of the manager
  managerLastName2: string;  // Second last name of the manager
  course: string;            // Course associated with the request
  activityDescription: string; // Description of the activity
  needs: string;             // Specific needs for the room
  numberOfAttendees: number; // Number of attendees for the event
  startDate: string;         // Start date of the request
  endDate: string;           // End date of the request
  startTime: string;         // Start time of the event
  endTime: string;           // End time of the event
  roomId: number;            // Reference to the room being requested
  status?: string;           // Optional status of the request
}