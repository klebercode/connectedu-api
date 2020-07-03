import { UseGuards, HttpException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/jwt-gqlauth.guard';
import { UserAuthGuard } from '../../auth/guards/userauth.guard';

import { StudentEntity } from '../entities/student.entity';
import { StudentsService } from '../students.service';
import { CreateStudentInput } from '../types/create-student.input';

import { MyContext } from '../../common/types/myContext';
import { StatesService } from '../../states/states.service';
import { UsersService } from '../../users/users.service';
import { CitiesService } from '../../cities/cities.service';
import { ResponsiblesService } from '../../responsibles/responsibles.service';

@UseGuards(GqlAuthGuard, UserAuthGuard)
@Resolver(of => StudentEntity)
export class studentsResolver {
  constructor(
    private readonly studentsblesService: StudentsService,
    private readonly usersService: UsersService,
    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
    private readonly responsiblesService: ResponsiblesService,
  ) {}

  @Query(() => StudentEntity, { name: 'student' })
  async getStudent(@Args('id') id: number): Promise<StudentEntity> {
    return await this.studentsblesService.findOneById(id);
  }

  @Query(() => [StudentEntity], { name: 'studentAll' })
  async getStudents(): Promise<StudentEntity[]> {
    return await this.studentsblesService.findAll();
  }

  @Mutation(() => StudentEntity, { name: 'studentCreate' })
  async createStudent(
    @Context() context: MyContext,
    @Args('input') input: CreateStudentInput,
  ): Promise<StudentEntity> {
    try {
      const { user } = context.req;
      const student = await this.studentsblesService.create(input, user['id']);

      return student;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => StudentEntity, { name: 'studentUpdate' })
  async updateStudent(
    @Context() context: MyContext,
    @Args('id') id: number,
    @Args('input') input: CreateStudentInput,
  ): Promise<StudentEntity> {
    try {
      const { user } = context.req;
      const student = await this.studentsblesService.update(
        id,
        { ...input },
        user['id'],
      );

      return student;
    } catch (exception) {
      throw new HttpException(exception.message, 409);
    }
  }

  @Mutation(() => Boolean, { name: 'studentDelete' })
  async deteleStudent(@Args('id') id: number): Promise<boolean> {
    await this.studentsblesService.remove(id);
    const student = await this.studentsblesService.findOneById(id);
    if (!student) {
      return true;
    }
    return false;
  }

  @ResolveField('mother')
  async mother(@Parent() student: StudentEntity) {
    const id = student.motherId;
    if (!id) {
      return null;
    }
    return this.responsiblesService.findOneById(id);
  }

  @ResolveField('father')
  async father(@Parent() student: StudentEntity) {
    const id = student.fatherId;
    if (!id) {
      return null;
    }
    return this.responsiblesService.findOneById(id);
  }

  @ResolveField('resideResponsable')
  async resideResponsable(@Parent() student: StudentEntity) {
    const id = student.resideResponsableId;
    if (!id) {
      return null;
    }
    return this.responsiblesService.findOneById(id);
  }

  @ResolveField('stateNaturalness')
  async stateNaturalness(@Parent() student: StudentEntity) {
    const id = student.stateNaturalnessId;
    if (!id) {
      return null;
    }
    return this.statesService.findOneById(id);
  }

  @ResolveField('cityNaturalness')
  async cityNaturalness(@Parent() student: StudentEntity) {
    const id = student.cityNaturalnessId;
    if (!id) {
      return null;
    }
    return this.citiesService.findOneById(id);
  }

  @ResolveField('state')
  async state(@Parent() student: StudentEntity) {
    const id = student.stateId;
    if (!id) {
      return null;
    }
    return this.statesService.findOneById(id);
  }

  @ResolveField('city')
  async city(@Parent() student: StudentEntity) {
    const id = student.cityId;
    if (!id) {
      return null;
    }
    return this.citiesService.findOneById(id);
  }

  @ResolveField('userCreated')
  async userCreated(@Parent() student: StudentEntity): Promise<any> {
    const id = student.userCreatedId;
    return this.usersService.findOneById(id);
  }

  @ResolveField('userUpdated')
  async userUpdated(@Parent() student: StudentEntity) {
    const id = student.userUpdatedId;
    return this.usersService.findOneById(id);
  }
}
