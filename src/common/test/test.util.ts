import { YearEntity } from '../../years/entities/year.entity';

export class TestUtil {
  static giveMeAvalidYear(): YearEntity {
    const year = new YearEntity();
    year.id = 1;
    year.year = '2020';
    year.deleted = false;
    year.dateBegin = new Date('20200201T00:00:00Z');
    year.dateEnd = new Date('20201201T00:00:00Z');
    year.dateModule1 = new Date('20200201T00:00:00Z');
    year.dateModule2 = new Date('20200501T00:00:00Z');
    year.dateModule3 = new Date('20200701T00:00:00Z');
    year.dateModule4 = new Date('20201001T00:00:00Z');
    return year;
  }

  static giveMeAvalidYearNew(): YearEntity {
    const year = new YearEntity();

    year.year = '2021';
    year.deleted = false;
    year.dateBegin = new Date('20200201T00:00:00Z');
    year.dateEnd = new Date('20201201T00:00:00Z');
    year.dateModule1 = new Date('20200201T00:00:00Z');
    year.dateModule2 = new Date('20200501T00:00:00Z');
    year.dateModule3 = new Date('20200701T00:00:00Z');
    year.dateModule4 = new Date('20201001T00:00:00Z');
    return year;
  }
}
