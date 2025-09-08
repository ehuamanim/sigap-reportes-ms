// src/shared/exceptions/custom.exceptions.ts
export class UserNotFoundException extends Error {
  constructor(id: string) {
    super(`Cliente with ID ${id} not found`);
    this.name = 'ClienteNotFoundException';
  }
}

export class ClienteAlreadyExistsException extends Error {
  constructor(id: number) {
    super(`Cliente with email ${id} already exists`);
    this.name = 'ClienteAlreadyExistsException';
  }
}