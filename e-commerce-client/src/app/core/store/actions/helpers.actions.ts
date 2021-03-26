import { createAction, props } from '@ngrx/store';
import { NotificationMessage } from '../../models';

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

export const DisplayNotification = createAction(
  '[Notification] Display Notification',
  props<NotificationMessage>()
);

export const CloseNotification = createAction(
  '[Notification] Close Notification'
);
