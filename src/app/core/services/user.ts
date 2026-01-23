import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  getAll(): any[] {
    throw new Error('Method not implemented.');
  }

  private key = 'users';

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getUserById(id:number){
    return this.getUsers().find(x => x.id === id);
  }

  save(user:User){
    const users = this.getUsers();
    if(user.id){
      const i = users.findIndex(x => x.id === user.id);
      users[i] = user;
    } else {
      user.id = Date.now();
      users.push(user);
    }
    localStorage.setItem(this.key, JSON.stringify(users));
  }

  delete(id:number){
    localStorage.setItem(this.key,
      JSON.stringify(this.getUsers().filter(x => x.id !== id))
    );
  }
}
