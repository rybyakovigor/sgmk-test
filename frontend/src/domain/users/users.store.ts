// Api
import UsersApi from '~~/src/data/users/users.api';

// Types
import type { DomainUser, CreateOrUpdateUserBody, UsersDomainQuery } from './types/user';

export const useUsersStore = defineStore('usersStore', {
  state: () => ({
    users: [] as DomainUser[],
  }),
  actions: {
    async getAll(query?: UsersDomainQuery): Promise<void> {
      try {
        const users = await this.api.getAll(query);
        this.users = users;
      } catch (error) {
        throw new Error('Ошибка при загрузке');
      }
    },

    async create(body: CreateOrUpdateUserBody): Promise<void> {
      try {
        const phones = body.phones.filter((number) => number).map((number) => ({ number }));

        //@ts-ignore
        const createdUser = await this.api.create({ ...body, flat: Number(body.flat), phones });

        this.users = [...this.users, createdUser];
      } catch (error) {
        throw new Error('Ошибка при создании');
      }
    },

    async update(body: CreateOrUpdateUserBody): Promise<void> {
      let user = this.users.find((u) => u.id === body.id);

      if (!user) {
        throw new Error('Пользователь не найден');
      }

      try {
        const phones = user.phones || [];

        phones[0].number = body.phones[0];

        if (body.phones[1] && phones[1]) {
          phones[1].number = body.phones[1];
        }

        if (body.phones[1] && !phones[1]) {
          // @ts-ignore
          phones.push({ number: body.phones[1] });
        }

        if (phones[1] && !body.phones[1]) {
          phones.splice(1, 1);
        }

        user = {
          ...user,
          ...body,
          phones,
        };
        user.flat = Number(body.flat);

        const updatedUser = await this.api.update(user);

        this.users = this.users.map((u) => (u.id === updatedUser.id ? { u, ...updatedUser } : u));
      } catch (error) {
        throw new Error('Ошибка при обновлении');
      }
    },

    async delete(id: string): Promise<void> {
      try {
        await this.api.delete(id);

        this.users = this.users.filter((user) => user.id !== id);
      } catch (error) {
        throw new Error('Ошибка при удалении');
      }
    },

    async uploadAvatar(id: string, file: File): Promise<void> {
      try {
        const path = await this.api.uploadAvatar(id, file);
        this.users = this.users.map((u) => (u.id === id ? { ...u, avatar: path.path } : u));
      } catch (error) {
        throw new Error('Ошибка при загрузке аватара');
      }
    },

    async deleteAvatar(id: string): Promise<void> {
      try {
        await this.api.deleteAvatar(id);
        this.users = this.users.map((u) => (u.id === id ? { ...u, avatar: null } : u));
      } catch (error) {
        throw new Error('Ошибка при удалении аватара');
      }
    },
  },
  getters: {
    api: () => {
      const config = useRuntimeConfig();
      return new UsersApi(config.public.SERVER_URL);
    },
  },
});
