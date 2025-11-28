export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  score: number;
  lastMessageAt: string;
  addedBy: string;
  avatar: string;
}

const firstNames = [
  "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
  "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica",
  "Thomas", "Sarah", "Charles", "Karen", "Christopher", "Nancy", "Daniel", "Lisa",
  "Matthew", "Betty", "Anthony", "Margaret", "Mark", "Sandra", "Donald", "Ashley",
  "Steven", "Kimberly", "Paul", "Emily", "Andrew", "Donna", "Joshua", "Michelle",
];

const lastNames = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
  "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas",
  "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White",
  "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young",
];

const domains = ["gmail.com", "yahoo.com", "outlook.com", "company.com", "email.com"];

const addedByNames = ["Admin", "Sales Team", "Support", "Marketing", "HR"];

// Simple hash function for deterministic randomness
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Seeded random number generator
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getRandomElement<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function generatePhone(seed: number): string {
  const area = Math.floor(seededRandom(seed) * 900) + 100;
  const prefix = Math.floor(seededRandom(seed + 1) * 900) + 100;
  const line = Math.floor(seededRandom(seed + 2) * 9000) + 1000;
  return `(${area}) ${prefix}-${line}`;
}

function generateDate(seed: number): string {
  // Generate dates within the last year
  const now = Date.now();
  const yearAgo = now - (365 * 24 * 60 * 60 * 1000);
  const randomTime = yearAgo + (seededRandom(seed) * (now - yearAgo));
  return new Date(randomTime).toISOString();
}

function generateAvatar(name: string): string {
  const initials = name.split(' ').map(n => n[0]).join('');
  const colors = ['3b82f6', 'ef4444', '10b981', 'f59e0b', '8b5cf6', 'ec4899'];
  const colorIndex = hashCode(name) % colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${colors[colorIndex]}&color=fff&size=128`;
}

export function generateCustomers(count: number): Customer[] {
  console.time('Generate customers');
  
  const customers: Customer[] = [];
  
  for (let i = 0; i < count; i++) {
    const seed = i;
    const firstName = getRandomElement(firstNames, seed);
    const lastName = getRandomElement(lastNames, seed + 100);
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i % 1000}@${getRandomElement(domains, seed + 200)}`;
    const phone = generatePhone(seed + 300);
    const score = Math.floor(seededRandom(seed + 400) * 100);
    const lastMessageAt = generateDate(seed + 500);
    const addedBy = getRandomElement(addedByNames, seed + 600);
    const avatar = generateAvatar(name);

    customers.push({
      id: `customer-${i}`,
      name,
      email,
      phone,
      score,
      lastMessageAt,
      addedBy,
      avatar,
    });
  }
  
  console.timeEnd('Generate customers');
  return customers;
}
