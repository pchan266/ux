export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    credentials: "same-origin",
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    // no JSON body
  }

  if (!response.ok) {
    throw new ApiError(
      payload?.error || `Request failed with status ${response.status}`,
      response.status
    );
  }

  return payload;
}

export function checkAuth() {
  return request("/api/auth/me");
}

export function login(password) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function logout() {
  return request("/api/auth/logout", { method: "POST" });
}

export async function listAdminEvents() {
  const data = await request("/api/admin/events");
  return data.events;
}

export async function getAdminEvent(id) {
  const data = await request(`/api/admin/events/${id}`);
  return data.event;
}

export async function createEvent(event) {
  const data = await request("/api/admin/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
  return data.event;
}

export async function updateEvent(id, changes) {
  const data = await request(`/api/admin/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
  return data.event;
}

export function deleteEvent(id) {
  return request(`/api/admin/events/${id}`, { method: "DELETE" });
}
