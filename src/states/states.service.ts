import { Injectable, GoneException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicePublic } from '../common/services/public.service';

import { StateEntity } from './entities/state.object';
import { CreateStateInput } from './types/create-state.input';
import { UpdateStateInput } from './types/update-state.input';

@Injectable()
export class StatesService extends ServicePublic<
  StateEntity,
  CreateStateInput,
  UpdateStateInput
> {
  constructor(
    @InjectRepository(StateEntity)
    private repository: Repository<StateEntity>,
  ) {
    super(repository);
  }
}
