import type { Profile } from "@src/pages/content/types/globals";
import { formatDate } from "./date";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createURLParams(params: Record<string, any>) {
  return new URLSearchParams(params).toString();
}

export async function fetchProfileData(): Promise<Profile> {
  const req = await fetch("/public/ajax/getProfileInfo.php", { method: "POST" });
  if (!req.ok) throw new Error("Failed to get profile data");
  const data = (await req.json()) as { result: Profile[] };
  return data.result[0];
}

export async function fetchBlockData(): Promise<UpcomingRequest> {
  const req = await fetch("/public/ajax/getAvailableSessions.php", { method: "POST" });
  if (!req.ok) throw new Error("Failed to get block data");
  const data = (await req.json()) as UpcomingRequest;
  return data;
}

export async function fetchSessionsForDate(date: Date): Promise<SessionRequest> {
  const req = await fetch("/public/ajax/getSessions.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: createURLParams({ date: formatDate(date), period: (JSON.parse(window.siteData.periodkeys) as number[])[0] }),
  });
  if (!req.ok) throw new Error("Failed to get sessions for date");
  const data = (await req.json()) as SessionRequest;
  return data;
}

export async function joinBlock(date: Date, sessionId: number | string) {
  await fetch("/public/ajax/addStudentSessionRequest.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: createURLParams({
      date: formatDate(date),
      sesid: sessionId,
      pid: (JSON.parse(window.siteData.periodkeys) as number[])[0],
      priority: 0,
      frontrow: "",
      note: "note",
    }),
  });
}

export async function leaveBlock(date: Date) {
  await fetch("/public/ajax/deleteStudentEnrollmentRequest.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: createURLParams({ date: formatDate(date), pid: (JSON.parse(window.siteData.periodkeys) as number[])[0] }),
  });
}

export interface UpcomingRequest {
  log: number;
  sessionhash: string;
  sessions: Record<string, [first: UpcomingSession]>;
  sessionsizes: Record<string, SessionSize>;
  roster: RosterData[];
  refreshTime: number;
  requests: RequestData[];
  confirmedPeriods: UpcomingSession[];
}

export interface UpcomingSession {
  id: string;
  date: string;
  name: string;
  tname: string;
  location: string;
  period_id: string;
  porder: string;
  sessionid: string;
  detail: string;
  groupid?: string;
  openseats: string;
  iseats: string;
  vseats: string;
  modifiedtime: string;
}

export interface SessionSize {
  id: string;
  reqnum: string;
  hinum: string;
  ireqnum: string;
  ihinum: string;
  vreqnum: string;
  vhinum: string;
}

export interface RosterData {
  date: string;
  period_id: string;
  status: string;
  blendedMode: string;
}

export interface RequestData {
  sessionid: string;
  id: string;
  note: string;
  priority: string;
  frontrow: string;
  pendingconfirm: string;
}

export interface SessionRequest {
  sessions: Session[];
  stats: Stats;
  students: Students;
  availableteachers: Availableteacher[];
  availablelocations: Availablelocation[];
  pge: Pge[];
}

export interface Session {
  id: string;
  date: string;
  location: string;
  lastname: string;
  firstname: string;
  name: string;
  ownerid: string;
  locationid: string;
  openseats: string;
  frontrow: string;
  tfrontrow: string;
  seats: string;
  groupname?: string;
  limitgroup: string;
  requirerequest: string;
  detail: string;
  virtuallink: string;
  front: string;
  notfront: string;
}

export interface Stats {
  requests: string;
  random: string;
  goodSeats: string;
  limitedSeats: string;
  inpersonRequests: string;
  inpersonRandom: string;
  inpersonGoodSeats: string;
  inpersonLimitedSeats: string;
  virtualRequests: string;
  virtualRandom: string;
  virtualGoodSeats: string;
  virtualLimitedSeats: string;
}

export interface Students {
  students: string;
  inpersonStudents: string;
  virtualStudents: string;
  optinStudents: string;
  inpersonOptinStudents: string;
  virtualOptinStudents: string;
  optinSlotted: string;
  inpersonOptinSlotted: string;
  virtualOptinSlotted: string;
}

export interface Availableteacher {
  id: string;
  name: string;
}

export interface Availablelocation {
  id: string;
  location: string;
}

export interface Pge {
  name: string;
  groupstatus: string;
  priority: string;
  group_id: string;
  id: string;
}
