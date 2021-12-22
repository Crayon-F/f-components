export interface options {
  filename: string;
  action: string;
  file: File;
  onError: (e: Error) => void;
  onProgress: (e: ProgressEvent) => void;
  onSuccess: (response: XMLHttpRequestResponseType) => unknown;
}
export interface ElUploadProgressEvent extends ProgressEvent {
  percent: number;
}
