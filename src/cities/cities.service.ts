import { Injectable, ConflictException, GoneException } from '@nestjs/common';
import { CreateCityInput } from './types/create-city.input';
import { CityEntity } from './entities/city.object';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CityEntity)
    private cityRepository: Repository<CityEntity>,
  ) {}

  async findOneById(id: number): Promise<CityEntity> {
    const obj = await this.cityRepository.findOne(id);
    if (!obj) {
      return null;
    }
    return obj;
  }

  async findAll(): Promise<CityEntity[]> {
    return await this.cityRepository.find();
  }

  async create(city: CreateCityInput): Promise<CityEntity> {
    const obj = await this.cityRepository.save(city);
    return obj;
  }

  async remove(id: number): Promise<void> {
    await this.cityRepository.delete(id);
  }

  async update(id: number, city: Partial<CityEntity>) {
    await this.cityRepository.update(id, city);
    return this.findOneById(id);
  }
}
