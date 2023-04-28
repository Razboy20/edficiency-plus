import type { Block } from "../types/globals";
import { BlockType } from "../types/globals";
import type { Session, UpcomingRequest, UpcomingSession } from "./api";

function isUpcomingSession(session: Session | UpcomingSession): session is UpcomingSession {
  return "groupid" in session;
}

export function parseSession(session: UpcomingSession | Session): Block {
  let block: Block;
  if (isUpcomingSession(session)) {
    block = {
      date: new Date(session.date.replaceAll("-", "/")),
      // todo: fix
      currentStudents: 0,
      maxStudents: parseInt(session.iseats),
      openSeats: parseInt(session.openseats),
      id: session.id,
      name: session.name,
      type: BlockType.Normal,
      description: session.detail,
      location: session.location,
      teacher: {
        name: session.tname,
      },
    };
  } else {
    block = {
      date: new Date(session.date.replaceAll("-", "/")),
      currentStudents: parseInt(session.notfront),
      maxStudents: parseInt(session.openseats),
      openSeats: parseInt(session.openseats) - parseInt(session.notfront),
      id: session.id,
      name: session.name,
      type: BlockType.Normal,
      description: session.detail,
      location: session.location,
      teacher: {
        name: `${session.lastname}, ${session.firstname}`,
      },
    };

    block.waitlisted = block.openSeats <= 0;
  }

  return block;
}

export function parseRoster(data: UpcomingRequest): Block[] {
  if (!data || !data.requests) return [];

  return data.requests.map((rosterBlock) => {
    const session = data.sessions[rosterBlock.sessionid][0];
    const block: Block = {
      date: new Date(session.date.replaceAll("-", "/")),
      currentStudents: parseInt(data.sessionsizes[session.sessionid].reqnum),
      maxStudents: parseInt(session.openseats),
      openSeats: 0,
      id: session.id,
      name: session.name,
      type: BlockType.Normal,
      description: session.detail,
      location: session.location,
      teacher: {
        name: session.tname,
      },
    };
    block.waitlisted = rosterBlock.pendingconfirm == "0" && block.currentStudents == block.maxStudents;
    return block;
  });
}
