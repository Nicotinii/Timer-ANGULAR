import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  public sixtySeconds = 5;
  public remainingSeconds = this.sixtySeconds;
  public isTimerRunning = false;
  public isTimerPaused = false;
  public rounds = 1;
  public roundInputs: string[] = [];
  public currentRound = 1;
 

  input: string = "";
  inputValues: string[] = [this.input];



  public audio: any;
  constructor() {
    this.audio = new Audio('../assets/Tick-DeepFrozenApps-397275646.mp3');
  }

  ngOnInit() {
  }

  public startTimer(remainingSeconds = this.sixtySeconds): void {

    this.remainingSeconds = remainingSeconds;
    this.isTimerRunning = true;

    setTimeout(() => {

      if (this.remainingSeconds > 0 && this.isTimerRunning && !this.isTimerPaused) {
        this.remainingSeconds = --remainingSeconds;

        if (this.remainingSeconds <= 5) {
          this.audio.play();
        }

        this.startTimer(this.remainingSeconds);
      } 
      
        else if (this.remainingSeconds === 0 && this.currentRound < this.rounds) {
        ++this.currentRound;
        this.remainingSeconds = this.sixtySeconds;
        this.input = this.inputValues[this.currentRound - 1]; // Modifier le texte pour afficher celui du round en cours
        this.startTimer(this.remainingSeconds);

      } 

        else if (this.remainingSeconds === 0 && this.currentRound === this.rounds) {
        this.isTimerRunning = false;
        this.currentRound = 1;
        this.remainingSeconds = this.sixtySeconds;
        this.input = this.inputValues[0]; // Réinitialiser le texte à celui du premier round
      }

    }, 1000);

  }

  public pause(): void {
    this.isTimerPaused = true;
  }

  public continue(): void {
    this.isTimerPaused = false;
    this.startTimer(this.remainingSeconds);
  }

  public stop(): void {
    this.isTimerPaused = false;
    this.isTimerRunning = false;
    this.currentRound = 1;
    this.remainingSeconds = this.sixtySeconds;
  }


  


  public editRounds(increment: number): void {


    if (this.rounds >= 1) {
      this.rounds = this.rounds + increment;
      if ( increment === 1) {
        this.inputValues.push('');
      }else if (increment != 1) {
        this.inputValues.pop();
      }


    }


  }

  
  trackByIndex(index: number, item: any) {
    return index;
  }
  








  // addInput() {
  //   this.inputs.push({ value: '' });
  // }

  // combineInputs() {
  //   this.combinedInputs = '';
  //   for (let input of this.inputs) {
  //     this.combinedInputs += input.value + ' ';
  //   }
  // }




}
