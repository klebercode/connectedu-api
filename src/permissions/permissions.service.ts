import { Injectable, ConflictException, GoneException } from '@nestjs/common';
import { CreatePermissionInput } from './types/create-permission.input';
import { PermissionEntity } from './entities/permission.object';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(PermissionEntity)
    private permissionRepository: Repository<PermissionEntity>,
  ) {}

  async create(permission: CreatePermissionInput): Promise<PermissionEntity> {
    try {
      const obj = await this.permissionRepository.save(permission);
      return obj;
    } catch (error) {
      throw new GoneException(error);
    }
  }

  async findOneById(id: number): Promise<PermissionEntity> {
    const obj = await this.permissionRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.permissionRepository.delete(id);
  }

  async update(id: number, permission: Partial<PermissionEntity>) {
    try {
      await this.permissionRepository.update(id, permission);
      return this.findOneById(id);
    } catch (error) {
      throw new GoneException(error);
    }
  }
}
