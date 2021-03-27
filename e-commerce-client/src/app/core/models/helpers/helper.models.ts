import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ActionButtonTypes } from '../../enums';

export interface NotificationMessage {
  notificationType: NotificationType;
  title: string;
  message: string;
}

export enum NotificationType {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export interface ActionButton {
  key: string;
  type: ActionButtonTypes;
  icon: IconDefinition;
  toolTipMessage: string;
  includeConfirm?: boolean;
  confirmMessage?: string;
  confirmButtonText?: string;
  style: {};
  hasAccess: boolean;
  disabled?(id: string, items: any[]): boolean;
}

export interface ActionButtonData {
  id: string;
  type: ActionButtonTypes;
}

export interface ListItem {
  id: string;
  text: string;
}

export interface InspectItem {
  label: string;
  text: string;
}

export interface InspectModeContent {
  title?: string;
  text?: string;
  isMultiple: boolean;
  contents?: InspectMultiple[];
}

export interface InspectMultiple {
  title: string;
  text: string;
}

export interface DropDownOptions {
  value: any;
  label: string;
  disabled?: boolean;
}
