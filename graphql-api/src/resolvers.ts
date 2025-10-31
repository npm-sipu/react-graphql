type User = {
  id: string | number;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
};

const mockUsers: User[] = [
  {
    id: 1,
    name: "Sujit Bhatta",
    email: "sujit@example.com",
    role: "Admin",
    createdAt: "2025-01-10T10:00:00Z",
  },
  {
    id: 2,
    name: "Emma Smith",
    email: "emma@example.com",
    role: "User",
    createdAt: "2025-01-11T10:00:00Z",
  },
  {
    id: 3,
    name: "Lukas Meyer",
    email: "lukas@example.com",
    role: "User",
    createdAt: "2025-01-12T10:00:00Z",
  },
  {
    id: 4,
    name: "Olivia Brown",
    email: "olivia@example.com",
    role: "Manager",
    createdAt: "2025-01-13T10:00:00Z",
  },
  {
    id: 5,
    name: "Liam Garcia",
    email: "liam@example.com",
    role: "User",
    createdAt: "2025-01-14T10:00:00Z",
  },
  {
    id: 6,
    name: "Sophia Müller",
    email: "sophia@example.com",
    role: "Admin",
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: 7,
    name: "Noah Fischer",
    email: "noah@example.com",
    role: "User",
    createdAt: "2025-01-16T10:00:00Z",
  },
  {
    id: 8,
    name: "Mia Becker",
    email: "mia@example.com",
    role: "User",
    createdAt: "2025-01-17T10:00:00Z",
  },
  {
    id: 9,
    name: "Ethan Weber",
    email: "ethan@example.com",
    role: "Manager",
    createdAt: "2025-01-18T10:00:00Z",
  },
  {
    id: 10,
    name: "Ava Hoffmann",
    email: "ava@example.com",
    role: "User",
    createdAt: "2025-01-19T10:00:00Z",
  },
];

// export const getUsers = (): User[] => mockUsers;

export const getUsers = async () => {
  console.log("🔥 getUsers called");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockUsers;
};
