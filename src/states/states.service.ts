import { Injectable, GoneException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
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
    @InjectConnection() connection: Connection,
    @InjectRepository(StateEntity)
    repository: Repository<StateEntity>,
  ) {
    super(connection, repository, StateEntity);
  }
}
