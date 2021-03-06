import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher.model';
import { Subject } from '../models/subjects.model';
import { Group } from '../models/group.model';
import { AttachedTeacher } from '../models/attached-teacher.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpAttachTeacherService {

  private urlTeachers = 'https://fierce-shore-32592.herokuapp.com/teachers';
  private urlSubjects = 'https://fierce-shore-32592.herokuapp.com/subjects';
  private urlClases = 'https://fierce-shore-32592.herokuapp.com/classes';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(this.urlTeachers)
      .map((response: any) => response.data)
      .pipe(tap(_ => _.map(teacher => teacher.fullname = `${teacher.lastname} ${teacher.firstname}`)));
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.urlSubjects).map((response: any) => response.data);
  }

  getClasses(): Observable<Group[]> {
    return this.http.get<Group[]>(this.urlClases).map((response: any) => response.data);
  }

  postAttachTeacher(object: AttachedTeacher): Observable<any> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${this.urlTeachers}/${object.teacherId}/classes/${object.classId}/subjects/${object.subjectId}/journal`, object);
  }
}
