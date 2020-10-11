import { YearEntity } from '../../years/entities/year.entity';
import { UpdateYearInput } from '../../years/types/update-year.input';
import { CreateYearInput } from '../../years/types/create-year.input';
import { SubjectEntity } from '../../subjects/entities/subject.entity';

import { StateEntity } from '../../states/entities/state.object';
import { CreateStateInput } from '../../states/types/create-state.input';
import { UpdateStateInput } from '../../states/types/update-state.input';

import { Customer } from '../../customers/entities/customer.object';
import { CreateUserLogDTO } from '../../userlogs/types/create.userlog.dto';

export class TestUtil {
  static giveMeAvalidYear(): YearEntity {
    const obj = new YearEntity();
    obj.id = 1;
    obj.year = '2020';
    obj.deleted = false;
    obj.dateBegin = new Date('20200201T00:00:00Z');
    obj.dateEnd = new Date('20201201T00:00:00Z');
    obj.dateModule1 = new Date('20200201T00:00:00Z');
    obj.dateModule2 = new Date('20200501T00:00:00Z');
    obj.dateModule3 = new Date('20200701T00:00:00Z');
    obj.dateModule4 = new Date('20201001T00:00:00Z');
    return obj;
  }

  static giveMeAvalidYearNew(): YearEntity {
    const obj = new YearEntity();

    obj.year = '2021';
    obj.deleted = false;
    obj.dateBegin = new Date('20200201T00:00:00Z');
    obj.dateEnd = new Date('20201201T00:00:00Z');
    obj.dateModule1 = new Date('20200201T00:00:00Z');
    obj.dateModule2 = new Date('20200501T00:00:00Z');
    obj.dateModule3 = new Date('20200701T00:00:00Z');
    obj.dateModule4 = new Date('20201001T00:00:00Z');
    return obj;
  }

  static giveMeAvalidUpdateYearInput(): UpdateYearInput {
    const obj = new UpdateYearInput();

    obj.id = 1;
    obj.year = '2020';
    obj.dateBegin = new Date('20200201T00:00:00Z');
    obj.dateEnd = new Date('20201201T00:00:00Z');
    obj.dateModule1 = new Date('20200201T00:00:00Z');
    obj.dateModule2 = new Date('20200501T00:00:00Z');
    obj.dateModule3 = new Date('20200701T00:00:00Z');
    obj.dateModule4 = new Date('20201001T00:00:00Z');
    return obj;
  }

  static giveMeAvalidCreateYearInput(): CreateYearInput {
    const obj = new CreateYearInput();

    obj.year = '2021';
    obj.dateBegin = new Date('20200201T00:00:00Z');
    obj.dateEnd = new Date('20201201T00:00:00Z');
    obj.dateModule1 = new Date('20200201T00:00:00Z');
    obj.dateModule2 = new Date('20200501T00:00:00Z');
    obj.dateModule3 = new Date('20200701T00:00:00Z');
    obj.dateModule4 = new Date('20201001T00:00:00Z');
    return obj;
  }

  static giveMeAvalidSubjectEntity(): SubjectEntity {
    const obj = new SubjectEntity();
    obj.id = 1;
    obj.description = 'Matematíca';
    obj.abbreviation = 'Matem';
    obj.descriptionMinutes = 'Matematíca';
    obj.status = true;
    obj.legacyCode = '001';
    obj.deleted = false;
    return obj;
  }

  static giveMeAvalidStateEntity(): StateEntity {
    const obj = new StateEntity();
    obj.id = 1;
    obj.description = 'Pernambuco';
    obj.legacyCode = '001';
    obj.deleted = false;
    obj.codeState = '25';
    obj.uf = 'PE';
    return obj;
  }

  static giveMeAvalidStateEntityNew(): StateEntity {
    const obj = new StateEntity();

    obj.description = 'Ceara';
    obj.legacyCode = '002';
    obj.deleted = false;
    obj.codeState = '30';
    obj.uf = 'CE';

    return obj;
  }

  static giveMeAvalidUpdateStateInput(): UpdateStateInput {
    const obj = new UpdateStateInput();

    obj.id = 1;
    obj.description = 'Pernambuco';
    obj.codeState = '25';
    obj.uf = 'PE';

    return obj;
  }

  static giveMeAvalidCreateStateInput(): CreateStateInput {
    const obj = new CreateStateInput();

    obj.description = 'Pernambuco';
    obj.codeState = '25';
    obj.uf = 'PE';

    return obj;
  }

  static giveMeAvalidCustomer(): Customer {
    const obj = new Customer();
    obj.id = 1;
    obj.name = 'Empresa 1';
    obj.domain = 'customer1';
    obj.host = 'customer1.local:3000';
    obj.organizationId = 1;
    obj.legacyCode = '001';
    obj.deleted = false;
    return obj;
  }

  static giveMeAvalidCreateUserLogDTO(): CreateUserLogDTO {
    const obj = {
      table: 'Tabela',
      idregister: 1,
      iduser: 10,
      usertype: 'I',
      operation: 'C',
      description: '{ informações descrição }',
    };
    return obj;
  }
}
