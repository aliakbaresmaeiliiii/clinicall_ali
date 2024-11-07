// import { Component } from '@angular/core';
// import { SpeechService } from '../../services/speech.service';
// import {
//   RxSpeechRecognitionService,
//   resultList
// } from '@kamiazya/ngx-speech-recognition';


// @Component({
//   selector: 'app-audio-transcriber',
//   templateUrl: './audio-transcriber.component.html',
//   styleUrl: './audio-transcriber.component.scss',
// })
// export class AudioTranscriberComponent {
//   message = '';
//   placeholder = '';
//   listening = false;
//   subscription;

//   constructor(public service: RxSpeechRecognitionService) {}

//   listen(): void {
//     this.listening = true;

//     const timeout = setInterval(() => {
//       location.reload();
//     }, 10000);

//     this.subscription = this.service
//       .listen()
//       .pipe(resultList)
//       .subscribe((list: SpeechRecognitionResultList) => {
//         clearTimeout(timeout);
//         this.listening = false;
//         this.placeholder = '';

//         let message = list.item(0).item(0).transcript;

//         if (message === 'apagar' || message === 'limpar') {
//           message = '';
//         }

//         this.message = message;

//         console.log('RxComponent:onresult', list);
//       });
//   }
// }
