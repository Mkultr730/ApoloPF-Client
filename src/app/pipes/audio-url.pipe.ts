import { Pipe, PipeTransform } from '@angular/core';
import * as firebase from 'firebase';

@Pipe({
  name: 'audioUrl'
})
export class AudioUrlPipe implements PipeTransform {

  transform(value: string): Promise<string> {

    const storage = firebase.storage();
    const gsReference = storage.refFromURL(value);
    return gsReference.getDownloadURL()
      .then((url) => {
        console.log(url);
        return url;
      });
  }

}
