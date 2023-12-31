import { Test, TestingModule } from '@nestjs/testing';
import { EditorController } from './editor.controller';
import { EditorService } from './editor.service';

describe('EditorController', () => {
  let controller: EditorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EditorController],
      providers: [EditorService],
    }).compile();

    controller = module.get<EditorController>(EditorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
