// Core
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as sharp from 'sharp';

@Injectable()
export class FilesService {
  public async create(file: Express.Multer.File): Promise<string> {
    try {
      const buffer: Buffer = Buffer.from(file.buffer as unknown as string, 'binary');
      const handlingImage: sharp.Sharp = sharp(buffer);
      const randomName = this.generateRandomName();

      const isImage = this.isImageFile(file.originalname);

      if (!isImage) {
        throw new BadRequestException('Only image files are allowed');
      }

      const path = 'uploads/' + randomName + '.webp';

      handlingImage
        .resize({ width: 200, height: 200, fit: sharp.fit.cover, position: sharp.strategy.entropy })
        .webp()
        .toFile(path);

      return path;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  public async delete(path: string): Promise<void> {
    try {
      await fs.promises.unlink(path);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  private isImageFile(fileName: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    return imageExtensions.includes(fileExtension!);
  }

  private generateRandomName(): string {
    return crypto
      .randomBytes(Math.ceil(8 / 2))
      .toString('hex')
      .slice(0, 8);
  }
}
