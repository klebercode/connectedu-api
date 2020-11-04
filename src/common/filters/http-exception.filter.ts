import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    //const status = exception.getStatus();
    //const message = exception.message;

    //console.log(status['detail']);
    //console.log(status['code']);
    //console.log(message);
  }
}

export class CustomException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
  static message: string;

  static catch(error: string, typeMessage: string, type: string) {
    switch (typeMessage.toUpperCase()) {
      case 'CREATE':
        this.message = 'Erro ao tentar gravar novo registro';
        break;
      case 'GETS':
        this.message = 'Registros não localizados';
        break;
      case 'GET':
        this.message = 'Registro não localizado';
        break;
      case 'DELETE':
        this.message = 'Erro ao tentar deletar registro';
        break;
      case 'UPDATE':
        this.message = 'Erro ao tentar salvar registro';
        break;
      case 'CREATEMANY':
        this.message = 'Erro ao tentar gravar lista de novos registros';
        break;
      case 'GETMANY':
        this.message = 'Registros da lista não localizados';
        break;
      case 'DELETEMANY':
        this.message = 'Erro ao tentar deletar lista de registros';
        break;
      case 'UPDATEMANY':
        this.message = 'Erro ao tentar salvar lista de registros';
        break;
      case 'GETPAGE':
        this.message = 'Erro ao tentar montar pagina de registros';
        break;
      default:
        this.message = 'Erro não identificado';
        break;
    }
    throw new HttpException(
      {
        message: this.message + ' - ' + type,
        code: error['code'],
        detail: error['message'],
      },
      error['status'],
    );
  }
}
