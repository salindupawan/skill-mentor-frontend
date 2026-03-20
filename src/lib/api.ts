import type {
  AnalyticsData,
  CreateMentorRequest,
  CreateReview,
  CreateSession,
  CreateSubjectRequest,
  Mentor,
  PatchSessionRequest,
  Session,
  Subject,
} from "@/Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function fetchWithAuth(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<Response> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res;
}

export async function addNewReview({
  token,
  data,
}: {
  token: string;
  data: CreateReview;
}) {
  return fetchWithAuth("/api/v1/reviews", token, {
    method: "POST",
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
    }
  });
}

export async function getAllSessions(token: string): Promise<Session[]> {
  const res = await fetchWithAuth("/api/v1/sessions", token);
  return res.json();
}
export async function getAnalytics(token: string): Promise<AnalyticsData> {
  const res = await fetchWithAuth("/api/v1/admin/analytics", token);
  return res.json();
}
export async function updateSession(token: string, data:PatchSessionRequest, sessionId: number): Promise<Session> {
  console.log(JSON.stringify(data));
  const res = await fetchWithAuth(`/api/v1/sessions/${sessionId}`, token, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
    }
  });
  return res.json();
}

export async function createNewSession({
  token,
  data,
}: {
  token: string;
  data: CreateSession;
}) {
  return fetchWithAuth("/api/v1/sessions", token, {
    method: "POST",
    body: JSON.stringify(data),
    headers:{
      "Content-Type": "application/json",
    }
  });
}

export async function createNewMentor({token, data, file}:{token:string, data:CreateMentorRequest, file:File}){
  const formData = new FormData();
  formData.append("details", new Blob([JSON.stringify(data)],{type:"application/json"}))
  formData.append("image",file);
  return fetchWithAuth("/api/v1/mentors", token,{
    method:"POST",
    body:formData,
  })
}
export async function createNewSubject({token, data, file}:{token:string, data:CreateSubjectRequest, file:File}){
  const formData = new FormData();
  formData.append("details", new Blob([JSON.stringify(data)],{type:"application/json"}))
  formData.append("image",file);
  return fetchWithAuth("/api/v1/subjects", token,{
    method:"POST",
    body:formData,
  })
}

export async function makePayment({
  token,
  file,
  id,
}: {
  token: string;
  file: File;
  id: number;
}): Promise<Session> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/api/v1/sessions/payment/${id}`, {
    body: formData,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function getMyEnrollments(token: string): Promise<Session[]> {
  console.log("tttttt-" + token);
  const res = await fetchWithAuth("/api/v1/sessions/enrolled", token);
  return res.json();
}

export async function getPublicMentors(): Promise<Mentor[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/mentors`);
  if (!res.ok) throw new Error("Failed to fetch mentors");
  return res.json();
}

export async function getPublicSubjects(): Promise<Subject[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/subjects`);
  if (!res.ok) throw new Error("Failed to fetch subjects");

  return res.json();
}

export async function getMentoById(mentorId: number): Promise<Mentor> {
  const res = await fetch(`${API_BASE_URL}/api/v1/mentors/${mentorId}`);
  if (!res.ok) throw new Error("Failed to fetch subjects");

  return res.json();
}
