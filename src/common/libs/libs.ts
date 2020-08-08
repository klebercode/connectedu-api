import { async } from 'rxjs/internal/scheduler/async';

// gerar digito verificador modulo 11
export async function modulo11(valor: string, retornarResto: boolean) {
  if (typeof retornarResto === 'undefined') retornarResto = false;
  const multiplicadores = [2, 3, 4, 5, 6, 7, 8, 9];

  var i = 0;
  var resto =
    valor.split('').reduceRight(function(anterior, atual) {
      if (i > multiplicadores.length - 1) i = 0;
      return multiplicadores[i++] * parseInt(atual, 10) + anterior;
    }, 0) % 11;

  return retornarResto ? resto : 11 - resto >= 10 ? 0 : 11 - resto;
}
