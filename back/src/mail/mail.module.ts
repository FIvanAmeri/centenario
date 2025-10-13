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
          user: 'tu-correo@hospital.com',
          pass: 'tu-contraseña',
        },
      },
      defaults: {
        from: '"Hospital Centenario" <no-reply@hospital.com>',
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