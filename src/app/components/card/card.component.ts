import { Component, OnInit, AfterViewInit } from '@angular/core';
import { OPTIONS } from './options';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent{
  public sixtySeconds = 60;
  public remainingSeconds = this.sixtySeconds;

  public isTimerRunning = false;
  public isTimerPaused = false;
  public rounds = 1;
  public roundInputs: string[] = [];
  public currentRound = 1;
  public totalTime = (this.sixtySeconds/60)*this.rounds;
 
  inputValues: string[] = [""];
  inputValuesNumber: string[] = [""];
  inputValuesTemp: string[] = [];
  input: string = this.inputValues[0];
  inputNumber: string = this.inputValuesNumber[0];

  repeatNumbers: number = 1;
  isRepeatShow= false;
  baseValues:string[] = [];
  baseValuesNumber:string[] = [];
  doubledValues = false;

  public options:any[] = OPTIONS;
  public selectedOption: any;
  public searchText: string = '';



  public audio: any;
  constructor() {
    this.audio = new Audio('../assets/Tick-DeepFrozenApps-397275646.mp3');
  }







  public startTimer(remainingSeconds = this.sixtySeconds): void {
    if(this.input === ""){
      this.input = this.inputValues[0];
      this.inputNumber = this.inputValuesNumber[0];
    }

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
        this.inputNumber = this.inputValuesNumber[this.currentRound - 1]; // Modifier le texte pour afficher celui du round en cours
        this.startTimer(this.remainingSeconds);

      } 

        else if (this.remainingSeconds === 0 && this.currentRound === this.rounds) {
        this.isTimerRunning = false;
        this.currentRound = 1;
        this.remainingSeconds = this.sixtySeconds;
        this.input = this.inputValues[0]; // Réinitialiser le texte à celui du premier round
        this.inputNumber = this.inputValuesNumber[0]; // Réinitialiser le texte à celui du premier round
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
      if ( increment === +1) {
        this.inputValues.push('');
        this.inputValuesNumber.push('');

      }else if (increment === -1) {
        this.inputValues.pop();
        this.inputValuesNumber.push('');
      }
      this.totalTime = parseFloat((this.sixtySeconds/60 * this.rounds).toFixed(1));

    }

  }

  public repeatRounds(increment: number): void {

      if(increment === 1){
        if (!this.doubledValues) {
          const newValues = this.inputValues;
          this.baseValues = this.inputValues;
          this.inputValues = this.inputValues.concat(newValues);
          const newValuesNumber = this.inputValuesNumber;
          this.baseValuesNumber = this.inputValuesNumber;
          this.inputValuesNumber = this.inputValuesNumber.concat(newValuesNumber);
          this.doubledValues = true;
        } else {
          this.inputValues = this.inputValues.concat(this.baseValues);
          this.inputValuesNumber = this.inputValuesNumber.concat(this.baseValuesNumber);
        }
        this.totalTime = parseFloat((this.sixtySeconds/60 * this.rounds).toFixed(1));
        this.isRepeatShow = true;
        this.repeatNumbers = this.repeatNumbers + 1;
        this.rounds = this.rounds + this.baseValues.length;
    }

  }




  public onSearchTextChange(event: any): void {
    this.searchText = event.target.value;
  }


  
  trackByIndex(index: number, item: any) {
    return index;
  }



}
