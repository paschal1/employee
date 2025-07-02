export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  jobTitle: string;
  department: string;
  city: string;
  state: string;
  country: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}

export async function fetchEmployees(page = 0, size = 20): Promise<PagedResponse<Employee>> {
  const res = await fetch(`http://localhost:8080/api/employees?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("Failed to fetch employees");
  return res.json();
}
