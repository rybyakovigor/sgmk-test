import type { UsersResponse, User, UsersQuery } from './types/users';

class UsersApi {
  private path: string;

  public constructor(url: string) {
    this.path = url + '/users';
  }

  public async getAll(query?: UsersQuery): Promise<User[]> {
    const response = await $fetch<UsersResponse>(this.path, { query });
    return response[0];
  }

  public async create(body: User): Promise<User> {
    return await $fetch<User>(this.path, { method: 'POST', body });
  }

  public async update(body: Partial<User>): Promise<User> {
    return await $fetch<User>(`${this.path}/${body.id}`, { method: 'PUT', body });
  }

  public async uploadAvatar(id: string, file: File): Promise<{ path: string }> {
    const body = new FormData();
    body.append('file', file);
    return await $fetch<{ path: string }>(`${this.path}/${id}/avatar`, {
      method: 'POST',
      body,
    });
  }

  public async deleteAvatar(id: string): Promise<void> {
    await $fetch(`${this.path}/${id}/avatar`, { method: 'DELETE' });
  }

  public async delete(id: string): Promise<void> {
    await $fetch<UsersResponse>(`${this.path}/${id}`, { method: 'DELETE' });
  }
}

export default UsersApi;
