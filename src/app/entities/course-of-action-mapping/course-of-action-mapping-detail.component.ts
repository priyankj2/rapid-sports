import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICourseOfActionMapping } from 'app/shared/model/course-of-action-mapping.model';

@Component({
  selector: 'jhi-course-of-action-mapping-detail',
  templateUrl: './course-of-action-mapping-detail.component.html'
})
export class CourseOfActionMappingDetailComponent implements OnInit {
  courseOfActionMapping: ICourseOfActionMapping | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courseOfActionMapping }) => (this.courseOfActionMapping = courseOfActionMapping));
  }

  previousState(): void {
    window.history.back();
  }
}
