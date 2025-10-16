import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config'; 

@Module({
  imports: [
    MailerModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            transport: {
                host: configService.get<string>('SMTP_HOST'),
                port: configService.get<number>('SMTP_PORT'),
                secure: configService.get<string>('SMTP_SECURE') === 'true', 
                auth: {
                    user: configService.get<string>('SMTP_USER'),
                    pass: configService.get<string>('SMTP_PASS'),
                },
            },
            defaults: {
                from: configService.get<string>('MAIL_FROM'),
            },
            template: {
                dir: join(process.cwd(), 'dist', 'mail', 'templates'), 
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}