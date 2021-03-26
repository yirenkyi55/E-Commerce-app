import { createAction, props } from '@ngrx/store';

export const UploadStartedAction = createAction('[File Upload] Upload Started');

export const UploadProgressAction = createAction(
  '[File Upload] Upload Progress',
  props<{ progress: number }>()
);

export const UploadCompletedAction = createAction(
  '[File Upload] Upload Completed'
);

export const UploadFailureAction = createAction(
  '[File Upload] Upload Failure',
  props<{ error: string }>()
);
