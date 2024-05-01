export interface Connection {
  db: string;
  user: string;
  password: string;
}

export const connection: Connection = {
  db: 'My db',
  user: 'Test user',
  password: 'My pass',
};
