import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import {Checklist} from 'app/_models/checklist';
import {ChecklistService} from '../checklist.service';


@Component({
  selector: 'app-listar-checklist',
  templateUrl: './listar-checklist.component.html',
  styleUrls: ['./listar-checklist.component.css']
})
export class ListarChecklistComponent implements OnInit {

  subscription!: Subscription;
  errorMessage = '';
  checklists: Checklist[] = []

  constructor(private checklistService: ChecklistService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.checklistService.getChecklists().subscribe({
      next: checklists => {
        this.checklists = checklists;
      },
      error: err => {
        if (err.status === 500) {
          this.checklists = [];
        }
        this.errorMessage = err;
      }
    });
  }

}
