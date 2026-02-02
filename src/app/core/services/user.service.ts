import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {

  private key = 'users';

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getUserById(id: number): User | undefined {
    return this.getUsers().find(u => u.id === id);
  }

  save(user: User): void {
    const users = this.getUsers();

    if (user.id) {
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
      }
    } else {
      user.id = Date.now();
      users.push(user);
    }

    localStorage.setItem(this.key, JSON.stringify(users));
  }

  delete(id: number): void {
    const updatedUsers = this.getUsers().filter(u => u.id !== id);
    localStorage.setItem(this.key, JSON.stringify(updatedUsers));
  }

  clearAll(): void {
    localStorage.removeItem(this.key);
  }
}
