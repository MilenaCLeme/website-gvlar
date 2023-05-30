import { Body, Controller, Post } from '@nestjs/common';
import { ImmobileOnOwnerService } from './immobileonowner.service';
import { DeleteImmobileOnOwnerDTO } from './dto/delete-immobileonowner.dto';
import { InsertImmobileOnOwnerDTO } from './dto/insert-immobileonowner.dto';

@Controller('immobileonowner')
export class ImmobileOnOwnerController {
  constructor(
    private readonly immobileOnOwnerService: ImmobileOnOwnerService,
  ) {}

  @Post('delete')
  async delete(@Body() data: DeleteImmobileOnOwnerDTO) {
    return await this.immobileOnOwnerService.delete(data);
  }

  @Post('insert')
  async insert(@Body() data: InsertImmobileOnOwnerDTO) {
    return await this.immobileOnOwnerService.insert(data);
  }
}
