import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISupportingVideo, SupportingVideo } from 'app/shared/model/supporting-video.model';
import { SupportingVideoService } from './supporting-video.service';
import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { ExerciseOrModalityService } from 'app/entities/exercise-or-modality/exercise-or-modality.service';
import { IClinic } from 'app/shared/model/clinic.model';
import { ClinicService } from 'app/entities/clinic/clinic.service';

type SelectableEntity = IExerciseOrModality | IClinic;

@Component({
  selector: 'jhi-supporting-video-update',
  templateUrl: './supporting-video-update.component.html'
})
export class SupportingVideoUpdateComponent implements OnInit {
  isSaving = false;
  exerciseormodalities: IExerciseOrModality[] = [];
  clinics: IClinic[] = [];
  myFiles: Array<any> = [];

  editForm = this.fb.group({
    id: [],
    label: [],
    videoUrl: [],
    imageUrl: [],
    exerciseOrModality: [],
    clinic: [],
    files: [this.myFiles]
  });

  constructor(
    protected supportingVideoService: SupportingVideoService,
    protected exerciseOrModalityService: ExerciseOrModalityService,
    protected clinicService: ClinicService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supportingVideo }) => {
      this.updateForm(supportingVideo);

      this.exerciseOrModalityService
        .query()
        .subscribe((res: HttpResponse<IExerciseOrModality[]>) => (this.exerciseormodalities = res.body || []));

      this.clinicService.query().subscribe((res: HttpResponse<IClinic[]>) => (this.clinics = res.body || []));
    });
  }

  updateForm(supportingVideo: ISupportingVideo): void {
    this.editForm.patchValue({
      id: supportingVideo.id,
      label: supportingVideo.label,
      videoUrl: supportingVideo.videoUrl,
      imageUrl: supportingVideo.imageUrl,
      exerciseOrModality: supportingVideo.exerciseOrModality,
      clinic: supportingVideo.clinic
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const supportingVideo = this.createFromForm();
    const videoFiles: Array<File> = this.editForm.get(['files'])!.value;
    if (supportingVideo.id !== undefined) {
      this.subscribeToSaveResponse(this.supportingVideoService.updateV2(supportingVideo, videoFiles));
    } else {
      this.subscribeToSaveResponse(this.supportingVideoService.createV2(supportingVideo, videoFiles));
    }
  }

  private createFromForm(): ISupportingVideo {
    return {
      ...new SupportingVideo(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
      videoUrl: this.editForm.get(['videoUrl'])!.value,
      imageUrl: this.editForm.get(['imageUrl'])!.value,
      exerciseOrModality: this.editForm.get(['exerciseOrModality'])!.value,
      clinic: this.editForm.get(['clinic'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupportingVideo>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
