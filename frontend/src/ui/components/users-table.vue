<template>
  <v-data-table :headers="headers" :items="props.users" filter-keys="['city']">
    <template #[`header.city`]="{ column }">
      {{ column.title }}
      <v-icon :id="column.key" @click.stop="() => (currentFilter = column.key as string)"> mdi-filter </v-icon>
      <v-menu :close-on-content-click="false" :activator="`#${column.key}`">
        <v-card>
          <v-text-field
            v-model="search"
            density="compact"
            variant="outlined"
            label="Поиск"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            autofocus
          ></v-text-field>
          <v-list v-if="filterValues?.length">
            <v-list-item v-for="city in filterValues" :key="city">
              <v-checkbox
                v-model="activeFilters.city"
                :label="city"
                :value="city"
                density="compact"
                hide-details
              ></v-checkbox
            ></v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </template>

    <template #top>
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ props: tProps }">
            <v-btn class="mb-2" color="primary" dark v-bind="tProps"> Создать абонента </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.name"
                      :error="!!errors.name"
                      :error-messages="errors.name?._errors"
                      label="Имя"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.surname"
                      :error="!!errors.surname"
                      :error-messages="errors.surname?._errors"
                      label="Фамилия"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.patronymic"
                      :error="!!errors.patronymic"
                      :error-messages="errors.patronymic?._errors"
                      label="Отчество"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.city"
                      :error="!!errors.city"
                      :error-messages="errors.city?._errors"
                      label="Город"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.street"
                      :error="!!errors.street"
                      :error-messages="errors.street?._errors"
                      label="Улица"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.house"
                      :error="!!errors.house"
                      :error-messages="errors.house?._errors"
                      label="Дом"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.flat"
                      :error="!!errors.flat"
                      :error-messages="errors.flat?._errors"
                      type="number"
                      label="Квартира"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.phones[0]"
                      :error="!!errors.phone1"
                      :error-messages="errors.phone1?._errors"
                      label="Телефон 1"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="editedUser.phones[1]"
                      :error="!!errors.phone2"
                      :error-messages="errors.phone2?._errors"
                      label="Телефон 2"
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="editedIndex > -1" cols="12" md="4" sm="6">
                    <v-btn
                      v-if="editedUser.avatar"
                      @click="
                        () => {
                          deleteAvatar(editedUser.id);
                          close();
                        }
                      "
                      >Удалить аватар</v-btn
                    >
                    <v-file-input
                      v-else
                      accept="image/*"
                      label="Загрузить аватар"
                      @update:model-value="
                        (e) => {
                          uploadAvatar(editedUser.id, e[0]);
                          close();
                        }
                      "
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close"> Отмена </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save"> Сохранить </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Уверены, что ходите удалить абонента?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Отмена</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.avatar="{ item }">
      <v-avatar v-if="item.avatar" :image="config.public.SERVER_URL + '/' + item.avatar" size="40"></v-avatar>

      <v-avatar v-else color="indigo" size="40">
        {{ item.name[0].toUpperCase() }}{{ item.surname[0].toUpperCase() }}
      </v-avatar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue';
import { type ZodFormattedError } from 'zod';
import { type DomainUser, type CreateOrUpdateUserBody, type UsersDomainQuery } from '../../domain/users/types/user';
import { UserSchema } from '../../domain/users/validations/user.validation';

const config = useRuntimeConfig();

const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const errors = ref(
  {} as ZodFormattedError<
    {
      phone1: string;
      phone2: string;
      name: string;
      surname: string;
      patronymic: string;
      city: string;
      street: string;
      house: string;
      flat: number;
    },
    string
  >
);

const defaultUser = {
  name: '',
  surname: '',
  patronymic: '',
  phones: ['', ''],
  city: '',
  street: '',
  house: '',
  flat: 0,
};

const editedUser = reactive({
  id: '',
  name: '',
  surname: '',
  patronymic: '',
  phones: ['', ''],
  city: '',
  street: '',
  house: '',
  flat: 0,
  avatar: null,
});

const props = defineProps({
  users: {
    type: Array<DomainUser>,
    default: () => [],
  },
  getAll: {
    type: Function as PropType<(query: UsersDomainQuery) => Promise<void>>,
    default: () => {},
  },
  create: {
    type: Function as PropType<(body: CreateOrUpdateUserBody) => Promise<void>>,
    default: () => {},
  },
  update: {
    type: Function as PropType<(body: CreateOrUpdateUserBody) => Promise<void>>,
    default: () => {},
  },
  delete: {
    type: Function as PropType<(id: string) => Promise<void>>,
    default: () => {},
  },
  uploadAvatar: {
    type: Function as PropType<(id: string, file: File) => Promise<void>>,
    default: () => {},
  },
  deleteAvatar: {
    type: Function as PropType<(id: string) => Promise<void>>,
    default: () => {},
  },
});

const search = ref('');
const currentFilter = ref('');
const activeFilters = reactive({
  city: [],
});

watch(activeFilters, async () => {
  await props.getAll(activeFilters);
});

const filters = ref({
  city: Array.from(new Set(props.users.map((user) => user.city))),
});

const filterValues = computed(() => {
  return search.value.length
    ? filters.value[currentFilter.value as keyof typeof filters.value].filter((item) =>
        item.toLowerCase().includes(search.value.toLowerCase().trim())
      )
    : filters.value[currentFilter.value as keyof typeof filters.value];
});

const headers = [
  {
    title: 'Фото',
    key: 'avatar',
    sortable: false,
  },
  {
    title: 'Имя',
    sortable: false,
    key: 'name',
  },
  { title: 'Фамилия', key: 'surname', sortable: false },
  { title: 'Отчество', key: 'patronymic', sortable: false },
  {
    title: 'Телефон',
    key: 'phones',
    sortable: false,
    value: (row: DomainUser) => {
      return row.phones.map((phone) => phone.number).join(', ');
    },
  },
  {
    title: 'Город',
    key: 'city',
    sortable: false,
  },
  { title: 'Улица', key: 'street', sortable: false },
  { title: 'Дом', key: 'house', sortable: false },
  { title: 'Квартира', key: 'flat', sortable: false },
  { title: 'Действия', key: 'actions', sortable: false },
];

const formTitle = computed(() => (editedIndex.value > -1 ? 'Редактировать абонента' : 'Создать абонента'));

watch(dialog, (newVal) => {
  if (!newVal) close();
});
watch(dialogDelete, (newVal) => {
  if (!newVal) closeDelete();
});

const editItem = (item: DomainUser): void => {
  editedIndex.value = props.users.indexOf(item);
  const temp = {
    ...item,
    phones: item.phones.map((phone) => phone.number),
  };
  Object.assign(editedUser, temp);
  dialog.value = true;
};

const deleteItem = (item: DomainUser): void => {
  editedIndex.value = props.users.indexOf(item);
  Object.assign(editedUser, item);
  dialogDelete.value = true;
};

const deleteItemConfirm = async (): Promise<void> => {
  await props.delete(editedUser.id);
  closeDelete();
};

const close = (): void => {
  dialog.value = false;
  nextTick(() => {
    // @ts-ignore
    errors.value = {};
    Object.assign(editedUser, defaultUser);
    editedIndex.value = -1;
  });
};

const closeDelete = (): void => {
  dialogDelete.value = false;
  nextTick(() => {
    Object.assign(editedUser, defaultUser);
    editedIndex.value = -1;
  });
};

const save = async (): Promise<void> => {
  const body = {
    ...editedUser,
    flat: Number(editedUser.flat),
    phone1: editedUser.phones[0]?.trim(),
    phone2: editedUser.phones[1] ? editedUser.phones[1]?.trim() : '',
  };
  const result = UserSchema.safeParse(body);

  if (result.success) {
    if (editedIndex.value > -1) {
      await props.update(editedUser);
    } else {
      await props.create(editedUser);
    }
    // @ts-ignore
    errors.value = {};
    close();
  } else {
    errors.value = result.error.format();
  }
};
</script>
