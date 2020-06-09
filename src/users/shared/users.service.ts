import { Injectable } from '@nestjs/common';
import { NewUsers } from './../inputs/new-user.input';
import { User } from './../models/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async getByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }

  async create(user: NewUsers): Promise<User> {
    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async update(id: number, user: Partial<NewUsers>): Promise<User> {
    await this.userRepository.update(id, { ...user });
    return this.findOneById(id);
  }
}
