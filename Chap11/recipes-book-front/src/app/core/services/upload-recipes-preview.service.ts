import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadStatus } from '../model/upload.status.model';
import { environment } from 'src/environments/environment';

const BASE_PATH = environment.basePath

@Injectable({
  providedIn: 'root'
})
export class UploadRecipesPreviewService {

  constructor(private http: HttpClient) { }


  upload(recipeId: number|undefined|null, fileToUpload: File):Observable<UploadStatus> {
    const formData = new FormData()
    formData.append('fileToUpload', fileToUpload as File)
    return this.http.post<UploadStatus>(`${BASE_PATH}/recipes/upload/${recipeId}`,formData)
  }
}
