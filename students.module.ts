import 'dotenv/config';
import { Module }          from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join }            from 'path';
import { StudentsModule }  from './students/students.module';

@Module({
  imports: [
    StudentsModule,
    ServeStaticModule.forRoot({
      rootPath:    join(__dirname, '..', 'src', 'public'),
      serveRoot:   '/',
      exclude:     ['/api/(.*)'],
    }),
  ],
})
export class AppModule {}
