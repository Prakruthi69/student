import 'dotenv/config';
import { Module }             from '@nestjs/common';
import { ServeStaticModule }  from '@nestjs/serve-static';
import { join }               from 'path';
import { StudentsModule }     from './students/students.module';

@Module({
  imports: [
    StudentsModule,
    // FIX: In production (after `nest build`) __dirname points to dist/,
    //      so the path needs to go up ONE level (dist → project root) then
    //      into src/public.  Using '../src/public' works for both dev (ts-node)
    //      and prod (compiled JS in dist/).
    ServeStaticModule.forRoot({
      rootPath:  join(__dirname, '..', 'src', 'public'),
      serveRoot: '/',
      exclude:   ['/api/(.*)'],
    }),
  ],
})
export class AppModule {}
