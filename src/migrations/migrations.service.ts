import { HttpException, NotFoundException } from '@nestjs/common';
import { Repository, Connection } from 'typeorm';
import { Inject } from '@nestjs/common';
import { Relationship } from '../common/enums/enum-typeuser';

import { CustomersServiceDecorator } from '../customers/customers-service.decorator';
import { CUSTOMER_CONNECTION } from '../customers/customers.module';

import { MigrationsClassromitemsInput } from './types/migrations-classroomitems.input';
import { MigrationsStudentInput } from './types/migrations-students.input';

import { ClassRoomsService } from '../classrooms/classrooms.service';
import { ClassRoomItemsService } from '../classroomitems/classroomitems.service';
import { CreateClassRoomItemInput } from '../classroomitems/types/create-classroomitem.input';
import { SubjectsService } from '../subjects/subjects.service';
import { TeachersService } from '../teachers/teachers.service';

import { StudentsService } from '../students/students.service';
import { ResponsiblesService } from '../responsibles/responsibles.service';
import { StudentInformationsService } from '../studentinformations/studentinformations.service';
import { StatesService } from '../states/states.service';
import { CitiesService } from '../cities/cities.service';
import { YearsService } from '../years/years.service';

import { CreateStudentInput } from '../students/types/create-student.input';
import { CreateResponsibleInput } from '../responsibles/types/create-responsible.input';
import { CreatStudentInformationInput } from '../studentinformations/types/create-studentinformation.input';

@CustomersServiceDecorator()
export class MigrationsService {
  constructor(
    @Inject(CUSTOMER_CONNECTION) connection: Connection,
    private readonly classRoomItemsService: ClassRoomItemsService,
    private readonly classRoomsService: ClassRoomsService,
    private readonly subjectsService: SubjectsService,
    private readonly teachersService: TeachersService,
    private readonly yearsService: YearsService,

    private readonly studentsService: StudentsService,
    private readonly responsiblesService: ResponsiblesService,
    private readonly studentInformationsService: StudentInformationsService,

    private readonly statesService: StatesService,
    private readonly citiesService: CitiesService,
  ) {}

  async migrationsClassroomItemsMany(
    input: [MigrationsClassromitemsInput],
    idUser: number,
    typeUser: string,
  ): Promise<Boolean> {
    input.map(async item => {
      const temp = new CreateClassRoomItemInput();

      let classRoom;
      let subject;
      let teacher;

      try {
        classRoom = await this.classRoomsService.findOne({
          where: { legacyCode: item.classroomLegacyCode },
        });

        subject = await this.subjectsService.findOne({
          where: { legacyCode: item.subjectLegacyCode },
        });

        teacher = await this.teachersService.findOne({
          where: { legacyCode: item.teacherLegacyCode },
        });
      } catch (error) {
        console.log('erro legacyCode');
        throw new HttpException('Erro ao consultar legacyCode !', error);
      }

      temp.classroomId = classRoom['id'];
      temp.subjectId = subject['id'];
      temp.teacherId = teacher['id'];
      temp.workHours = item.workHours;
      temp.visibleReport = item.visibleReport;
      temp.visibleMinute = item.visibleMinute;
      temp.registerCall = item.registerCall;
      temp.registerContent = item.registerContent;
      temp.registerOccurrence = item.registerOccurrence;
      temp.type = item.type;
      temp.numberGrades = item.numberGrades;
      temp.gradeMin = item.gradeMin;
      temp.gradeMax = item.gradeMax;
      temp.order = item.order;
      temp.legacyCode = item.classroomLegacyCode + '-' + item.subjectLegacyCode;

      try {
        await this.classRoomItemsService.create(temp, idUser, typeUser);
      } catch (error) {
        console.log('erro salvamento');
        throw new HttpException(
          'Erro ao tentar criar novo item de Turma !',
          error,
        );
      }
    });

    return true;
  }

  async migrationsStundetMany(
    input: [MigrationsStudentInput],
    idUser: number,
    typeUser: string,
  ): Promise<String[]> {
    let retErros: String[];

    retErros = ['Inicio da Rotina'];

    const promisesLog = input.map(async item => {
      const stundetNew = new CreateStudentInput();
      const stundetInfNew = new CreatStudentInformationInput();
      const resp_father = new CreateResponsibleInput();
      const resp_mather = new CreateResponsibleInput();
      const resp_financ = new CreateResponsibleInput();

      let respMother;
      let respFather;
      let respFinanc;
      let respPedag;
      let student;
      let studentInf;

      // MAE
      respMother = await this.responsiblesService.findOneId({
        where: { name: item.mother_name },
      });

      if (!respMother) {
        resp_mather.name = item.mother_name;
        resp_mather.dateBirth = item.mother_dateBirth;
        resp_mather.gender = item.mother_gender;
        resp_mather.nationality = item.mother_nationality;
        resp_mather.adress = item.mother_adress;
        resp_mather.district = item.mother_district;
        resp_mather.complement = item.mother_complement;

        resp_mather.stateId = await this.statesService.findOneId({
          where: { uf: item.mother_state },
        });

        resp_mather.cityId = await this.citiesService.findOneId({
          where: [
            {
              stateId: resp_mather.stateId,
              description: '%' + item.mother_city.substr(2, 8) + '%',
            },
          ],
        });

        resp_mather.zipCode = item.mother_zipCode;
        resp_mather.email = item.mother_email;
        resp_mather.phone = item.mother_phone;
        resp_mather.cellphone = item.mother_cellphone;
        resp_mather.whatsapp = item.mother_whatsapp;
        resp_mather.cpf = item.mother_cpf;
        resp_mather.identity = item.mother_identity;
        resp_mather.orgIdentity = item.mother_OrgIdentity;
        resp_mather.civilStatus = item.mother_civilStatus;

        resp_mather.profession = item.mother_profession;
        resp_mather.workCompany = item.mother_workCompany;
        resp_mather.workPhone = item.mother_workPhone;
        resp_mather.legacyCode = item.legacyCode;

        try {
          const objRet = await this.responsiblesService.create(
            resp_mather,
            idUser,
            typeUser,
          );
          respMother = objRet['id'];
        } catch (error) {
          console.log('passe Mae');
          retErros.push('Erro Criar Mãe ! - Matricula: ' + item.legacyCode);
          throw new HttpException(
            'Erro ao tentar criar registro de novo Mãe  ! - Matricula: ' +
              item.legacyCode,
            error,
          );
        }
      }

      // PAI
      respFather = await this.responsiblesService.findOneId({
        where: { name: item.father_name },
      });

      if (!respFather) {
        resp_father.name = item.father_name;
        resp_father.dateBirth = item.father_dateBirth;
        resp_father.gender = item.father_gender;
        resp_father.nationality = item.father_nationality;
        resp_father.adress = item.father_adress;
        resp_father.district = item.father_district;
        resp_father.complement = item.father_complement;

        resp_father.stateId = await this.statesService.findOneId({
          where: { uf: item.father_state },
        });

        resp_father.cityId = await this.citiesService.findOneId({
          where: [
            {
              stateId: resp_father.stateId,
              description: '%' + item.father_city.substr(2, 8) + '%',
            },
          ],
        });

        resp_father.zipCode = item.father_zipCode;
        resp_father.email = item.father_email;
        resp_father.phone = item.father_phone;
        resp_father.cellphone = item.father_cellphone;
        resp_father.whatsapp = item.father_whatsapp;
        resp_father.cpf = item.father_cpf;
        resp_father.identity = item.father_identity;
        resp_father.orgIdentity = item.father_OrgIdentity;
        resp_father.civilStatus = item.father_civilStatus;

        resp_father.profession = item.father_profession;
        resp_father.workCompany = item.father_workCompany;
        resp_father.workPhone = item.father_workPhone;
        resp_father.legacyCode = item.legacyCode;

        try {
          const objRet = await this.responsiblesService.create(
            resp_father,
            idUser,
            typeUser,
          );
          respFather = objRet['id'];
        } catch (error) {
          console.log('passe Pai');
          retErros.push('Erro Criar Pai ! - Matricula: ' + item.legacyCode);

          throw new HttpException(
            'Erro ao tentar criar registro de novo Pai ! - Matricula: ' +
              item.legacyCode,
            error,
          );
        }
      }

      // FINANCEIRO
      respFinanc = await this.responsiblesService.findOneId({
        where: { name: item.respfin_name },
      });

      if (!respFinanc) {
        resp_financ.name = item.respfin_name;
        resp_financ.dateBirth = item.respfin_dateBirth;
        resp_financ.gender = item.respfin_gender;
        resp_financ.nationality = item.respfin_nationality;
        resp_financ.adress = item.respfin_adress;
        resp_financ.district = item.respfin_district;
        resp_financ.complement = item.respfin_complement;

        resp_financ.stateId = await this.statesService.findOneId({
          where: { uf: item.respfin_state },
        });

        resp_financ.cityId = await this.citiesService.findOneId({
          where: [
            {
              stateId: resp_father.stateId,
              description: '%' + item.respfin_city.substr(2, 8) + '%',
            },
          ],
        });

        resp_financ.zipCode = item.respfin_zipCode;
        resp_financ.email = item.respfin_email;
        resp_financ.phone = item.respfin_phone;
        resp_financ.cellphone = item.respfin_cellphone;
        resp_financ.whatsapp = item.respfin_whatsapp;
        resp_financ.cpf = item.respfin_cpf;
        resp_financ.identity = item.respfin_identity;
        resp_financ.orgIdentity = item.respfin_OrgIdentity;
        resp_financ.civilStatus = item.respfin_civilStatus;

        resp_financ.profession = item.respfin_profession;
        resp_financ.workCompany = item.respfin_workCompany;
        resp_financ.workPhone = item.respfin_workPhone;
        resp_financ.legacyCode = item.legacyCode;

        try {
          const objRet = await this.responsiblesService.create(
            resp_financ,
            idUser,
            typeUser,
          );
          respFinanc = objRet['id'];
        } catch (error) {
          console.log('passe Fin');
          retErros.push(
            'Erro Criar Financeiro ! - Matricula: ' + item.legacyCode,
          );
          throw new HttpException(
            'Erro ao tentar criar registro de novo Responsável Financeiro  ! - Matricula: ' +
              item.legacyCode,
            error,
          );
        }
      }

      // ALUNO
      stundetNew.name = item.name;
      stundetNew.useNickName = item.useNickName;
      stundetNew.nickName = item.nickName;
      stundetNew.dateBirth = item.dateBirth;
      stundetNew.gender = item.gender;
      stundetNew.codeNationality = '0';

      stundetNew.stateNaturalnessId = await this.statesService.findOneId({
        where: { uf: item.stateNaturalness },
      });

      stundetNew.cityNaturalnessId = await this.citiesService.findOneId({
        where: [
          {
            stateId: stundetNew.stateNaturalnessId,
            description: '%' + item.cityNaturalness.substr(2, 8) + '%',
          },
        ],
      });

      stundetNew.stateNaturalnessForeign = ' ';
      stundetNew.naturalnessForeign = ' ';
      stundetNew.nationalityForeign = ' ';
      stundetNew.reside = item.reside;

      if ((item.separatedParents = 'S')) {
        stundetNew.separatedParents = true;
      } else {
        stundetNew.separatedParents = false;
      }

      stundetNew.fatherId = respFather;
      stundetNew.motherId = respMother;
      stundetNew.resideFather = true;
      stundetNew.resideMother = true;
      stundetNew.typeReside = '1';
      stundetNew.adress = item.adress;
      stundetNew.district = item.district;
      stundetNew.complement = item.complement;

      stundetNew.stateId = await this.statesService.findOneId({
        where: { uf: item.state },
      });

      stundetNew.cityId = await this.citiesService.findOneId({
        where: [
          {
            stateId: stundetNew.stateId,
            description: '%' + item.city.substr(2, 8) + '%',
          },
        ],
      });

      stundetNew.zipCode = item.zipCode;
      stundetNew.schoolLast = item.schoolLast;
      stundetNew.email = item.email;
      stundetNew.phone = item.phone;
      stundetNew.cellphone = item.cellphone;
      stundetNew.whatsapp = item.whatsapp;
      stundetNew.cpf = item.cpf;
      stundetNew.identity = item.identity;
      stundetNew.OrgIdentity = item.OrgIdentity;
      stundetNew.registryName = item.registryName;
      stundetNew.certificateNumber = item.certificateNumber;
      stundetNew.bookNumber = item.bookNumber;
      stundetNew.bookSheet = item.bookSheet;
      stundetNew.legacyCode = item.legacyCode;

      try {
        const objRet = await this.studentsService.create(
          stundetNew,
          idUser,
          typeUser,
        );
        student = objRet['id'];
      } catch (error) {
        console.log('passe Aluno');
        retErros.push('Erro Criar Aluno ! - Matricula: ' + item.legacyCode);
        throw new HttpException(
          'Erro ao tentar criar registro de novo Aluno ! - Matricula: ' +
            item.legacyCode,
          error,
        );
      }

      // INFORMAÇÕES
      stundetInfNew.studentId = student;

      stundetInfNew.yearId = await this.yearsService.findOneId({
        where: { year: item.year },
      });

      stundetInfNew.dateRegistration = item.dateRegistration;

      stundetInfNew.classroomId = await this.classRoomsService.findOneId({
        where: { legacyCode: item.classroom_legacyCode },
      });

      stundetInfNew.situation = item.situation;
      stundetInfNew.numberStudent = item.numberStudent;
      stundetInfNew.payday = item.payday;
      stundetInfNew.formPayment = Number(item.formPayment);
      stundetInfNew.monthlyDiscount = item.monthlyDiscount;
      stundetInfNew.dateExit = item.dateExit;
      stundetInfNew.reasonExit = item.reasonExit;
      stundetInfNew.descriptionReason = item.descriptionReason;

      stundetInfNew.responsible1Id = respFinanc;

      if (respFather == respFinanc) {
        stundetInfNew.relationship1 = Relationship.P;
      } else {
        if (respMother == respFinanc) {
          stundetInfNew.relationship1 = Relationship.M;
        } else {
          stundetInfNew.relationship1 = Relationship.O;
        }
      }

      stundetInfNew.responsible2Id = null;
      stundetInfNew.relationship2 = null;

      respPedag = await this.responsiblesService.findOneId({
        where: { name: item.responsiblePedag },
      });

      stundetInfNew.responsiblePedagId = respPedag;

      if (respFather == respPedag) {
        stundetInfNew.relationshipPedag = Relationship.P;
      } else {
        if (respMother == respPedag) {
          stundetInfNew.relationshipPedag = Relationship.M;
        } else {
          stundetInfNew.relationshipPedag = Relationship.O;
        }
      }

      if (item.newStudent == 'S') {
        stundetInfNew.newStudent = true;
      } else {
        stundetInfNew.newStudent = false;
      }

      stundetInfNew.legacyCode =
        item.classroom_legacyCode + '-' + item.legacyCode;

      try {
        studentInf = await this.studentInformationsService.create(
          stundetInfNew,
          idUser,
          typeUser,
        );
      } catch (error) {
        retErros.push(
          'Erro Criar Inform. Aluno ! - Matricula: ' + item.legacyCode,
        );
        throw new HttpException(
          'Erro ao tentar criar registro de novo Informação do Aluno ! - Matricula: ' +
            item.legacyCode,
          error,
        );
      }

      return studentInf;
    });

    await Promise.all(promisesLog);

    retErros.push('Rotina Finalizada');

    return retErros;
  }
}
