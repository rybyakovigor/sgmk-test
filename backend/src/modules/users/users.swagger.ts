// Core
import { HttpStatus } from '@nestjs/common';
import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

// Entity
import { UserEntity } from './user.entity';

export class UsersSwagger {
  public static get findAllSummary(): ApiOperationOptions {
    return {
      summary: 'Получить список всех абонентов',
    };
  }

  public static get findAllOkResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.OK,
      description: 'Список абонентов успешно получен',
      schema: {
        example: [[this.userExample], 1],
      },
    };
  }

  public static get findOneSummary(): ApiOperationOptions {
    return {
      summary: 'Получить абонента по id',
    };
  }

  public static get findOneOkResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.OK,
      description: 'Абонент успешно получен',
      schema: {
        example: this.userExample,
      },
    };
  }

  public static get createSummary(): ApiOperationOptions {
    return {
      summary: 'Создать абонента',
    };
  }

  public static get createOkResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.CREATED,
      description: 'Абонент успешно создан',
      schema: {
        example: this.userExample,
      },
    };
  }

  public static get updateSummary(): ApiOperationOptions {
    return {
      summary: 'Обновить абонента',
    };
  }

  public static get updateOkResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.OK,
      description: 'Абонент успешно обновлен',
      schema: {
        example: this.userExample,
      },
    };
  }

  public static get deleteSummary(): ApiOperationOptions {
    return {
      summary: 'Удалить абонента',
    };
  }

  public static get deleteOkResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.NO_CONTENT,
      description: 'Абонент успешно удален',
    };
  }

  public static get uploadAvatarSummary(): ApiOperationOptions {
    return {
      summary: 'Загрузить аватар',
      description: 'Максимальный размер файла 5MB. Разрешенные расширения: jpg, jpeg, png, webp',
    };
  }

  public static get uploadAvatarOkResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.OK,
      description: 'Аватар успешно загружен',
      schema: {
        example: {
          path: this.userExample.avatar,
        },
      },
    };
  }

  public static get uploadAvatarLimitResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.PAYLOAD_TOO_LARGE,
      description: 'Превышен максимальный размер файла',
    };
  }

  public static get uploadAvatarConflictResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.CONFLICT,
      description: 'Неверное расширение файла или аватар уже загружен',
    };
  }

  public static get deleteAvatarSummary(): ApiOperationOptions {
    return {
      summary: 'Удалить аватар',
    };
  }

  public static get deleteAvatarOkResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.NO_CONTENT,
      description: 'Аватар успешно удален',
    };
  }

  public static get deleteAvatarConflictResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.CONFLICT,
      description: 'У пользователя нет аватара',
    };
  }

  public static get findOneNotFoundResponse(): ApiResponseOptions {
    return {
      status: HttpStatus.NOT_FOUND,
      description: 'Абонент с таким id не найден',
    };
  }

  private static get userExample(): UserEntity {
    return {
      id: '55e38b80-6404-42fe-be01-6d53be38934d',
      name: 'Василий',
      surname: 'Васильев',
      patronymic: 'Васильевич',
      city: 'Екатеринбург',
      street: 'Ленина',
      house: '1',
      flat: 1,
      avatar: 'https://example.com/avatar.png',
      phones: [
        {
          id: 'cb4adb60-85fc-4049-945f-19b27ef41e05',
          number: '+79827737771',
        },
      ],
    };
  }
}
