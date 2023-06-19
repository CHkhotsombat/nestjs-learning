import { Injectable } from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

@Injectable()
export class AppService {
  getHello(i18n: I18nContext) {
    return {
      service: i18n.t('general.service'),
      welcome: i18n.t('general.welcome'),
      language: i18n.lang,
    };
  }
}
