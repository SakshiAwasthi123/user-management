import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ],
  templateUrl: './shared-table.html',
  styleUrls: ['./shared-table.scss']
})
export class SharedTable implements OnInit, AfterViewInit, OnChanges {

  @Input() data: any[] = [];
  @Input() columns: string[] = [];

  @Output() view = new EventEmitter<any>();
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.setupTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns']) {
      this.setupTable();
    }
  }

  private setupTable() {
    this.displayedColumns = [...this.columns, 'action'];
    this.dataSource.data = this.data || [];

    // ✅ Search across all visible columns
    this.dataSource.filterPredicate = (row: any, filter: string) => {
      const text = this.columns
        .map(col => row[col])
        .join(' ')
        .toLowerCase();
      return text.includes(filter);
    };
  }

  filter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
    if (this.paginator) {
      this.paginator.firstPage(); // ✅ fix blank page issue
    }
  }

  onView(row: any) {
    this.view.emit(row);
  }

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onDelete(id: number) {
    this.remove.emit(id);
  }
}
