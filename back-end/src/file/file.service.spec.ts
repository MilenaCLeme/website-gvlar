import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { getPhoto } from '../testing/get-photo.mock';
import { join } from 'path';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get(FileService);
  });

  test('Validar a definição', () => {
    expect(fileService).toBeDefined();
  });

  describe('Teste do file Service', () => {
    test('upload method', async () => {
      const photo = await getPhoto();
      const path = join(__dirname, '..', '..', 'uploads', 'photo-test.png');

      fileService.upload(photo, path);
    });

    test('delete method', async () => {
      const path = join(__dirname, '..', '..', 'uploads', 'photo-test.png');

      fileService.delete(path);
    });
  });
});
