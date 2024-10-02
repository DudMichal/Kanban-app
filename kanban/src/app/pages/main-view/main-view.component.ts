import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],

})
export class MainViewComponent implements OnInit{

  newTask: string = '';  // Pole na nowe zadanie
  selectedColumn: string = '';  // Wybrana kolumna

  constructor(){}

  board: Board = new Board('Test', [
    new Column('Ideas', [
      "some ideas",
      "More ideas",
      "More more ideas"
    ]),
    new Column('Todo', [
      "some todo",
      "More todo",
      "More more todo"
    ]),
    new Column('Done', [
      "some done",
      "More done",
      "More more done"
    ]),
    new Column('Reaserch', [
      "some reaserch",
      "More reaserch",
      "More more reaserch"
    ])
  ]);

  ngOnInit(){}

  addTask() {
    const column = this.board.columns.find(col => col.name === this.selectedColumn);
    if (column && this.newTask.trim()) {
      column.tasks.push(this.newTask);
      this.newTask = ''; // Reset pola po dodaniu zadania
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
