import type { Block } from "../types/globals";
import { BlockType } from "../types/globals";
import type { Session, UpcomingSession } from "./api";

function isUpcomingSession(session: Session | UpcomingSession): session is UpcomingSession {
  return "groupid" in session;
}

export function parseSession(session: UpcomingSession | Session): Block {
  if (isUpcomingSession(session)) {
    return {
      date: new Date(session.date),
      openSeats: parseInt(session.openseats),
      maxStudents: parseInt(session.iseats),
      id: session.id,
      name: session.name,
      type: BlockType.Normal,
      description: session.detail,
      location: session.location,
      teacher: {
        name: session.tname,
      },
      waitlisted: parseInt(session.openseats) <= 0,
    };
  } else {
    return {
      date: new Date(session.date),
      openSeats: parseInt(session.openseats),
      maxStudents: parseInt(session.seats),
      id: session.id,
      name: session.name,
      type: BlockType.Normal,
      description: session.detail,
      location: session.location,
      teacher: {
        name: `${session.lastname}, ${session.firstname}`,
      },
      waitlisted: parseInt(session.openseats) <= 0,
    };
  }
}
