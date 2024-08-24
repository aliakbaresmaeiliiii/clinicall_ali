import { AbstractControl } from '@angular/forms';
import { checkLastComma } from './url-remove-comma';

export function UrlCheck(control: AbstractControl) {
  let value = control.value as string;
  // removing last , if there is
  value = checkLastComma(value);
  const urlsFromValue = value.split(',');
  const regex = new RegExp(
    '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
  );
  for (let index = 0; index < urlsFromValue.length; index++) {
    const url = urlsFromValue[index];
    if (!regex.test(url))
      return {
        urlCheck: `Input url number ${index + 1} is not valid !`,
      };
  }
  return null;
}
