import type { Subject } from "@/Types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


async function fetchWithAuth(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<Response> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
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

export async function getMyEnrollments(token: string) {
  const res = await fetchWithAuth("/api/v1/sessions/enrolled", token);
  return res.json();
}

export async function getPublicMentors() {
  const res = await fetch(
    `${API_BASE_URL}/api/v1/mentors`,
  );
  if (!res.ok) throw new Error("Failed to fetch mentors");
  return res.json();
}

export async function getPublicSubjects(): Promise<Subject[]> {
    const res = await fetch(`${API_BASE_URL}/api/v1/subjects`);
    if(!res.ok) throw new Error("Failed to fetch subjects");

    return res.json();
    
}

export async function createSubject() {
    
}