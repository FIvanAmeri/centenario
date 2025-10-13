import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'; 

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.tu-servidor.com',
        port: 587,
        auth: {
          user: process.env.SMTP_USER ?? 'tu-correo@hospital.com',
          pass: process.env.SMTP_PASS ?? 'tu-contraseña',
        },
      },
      defaults: {
        from: process.env.MAIL_FROM ?? '"Hospital Centenario" <no-reply@hospital.com>',
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), 
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService], 
})
export class MailModule {}