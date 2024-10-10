export interface Principal {
    id: string;          // or number, based on your implementation
    email: string;
    roles: string[];
    exp: number;        // Expiration time in seconds since the epoch
    // Add any other fields you expect in the payload
  }
  