// import { DataSource } from '@angular/cdk/collections';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { map } from 'rxjs/operators';
// import { Observable, of as observableOf, merge } from 'rxjs';

// // // TODO: Replace this with your own data model type
// // export interface MaterialtableItem {
// //   name: string;
// //   id: number;
// // }


// // mock api data interface
// export interface Mockdata {
//     id: number;
//     title: string;
// }

// // TODO: replace this with real data from your application
// const EXAMPLE_DATA: Mockdata[] = [
//   {id: 1, title: 'Hydrogen'},
//   {id: 2, title: 'Helium'},
//   {id: 3, title: 'Lithium'},
//   {id: 4, title: 'Beryllium'},
//   {id: 5, title: 'Boron'},
//   {id: 6, title: 'Carbon'},
//   {id: 7, title: 'Nitrogen'},
//   {id: 8, title: 'Oxygen'},
//   {id: 9, title: 'Fluorine'},
//   {id: 10, title: 'Neon'},
//   {id: 11, title: 'Sodium'},
//   {id: 12, title: 'Magnesium'},
//   {id: 13, title: 'Aluminum'},
//   {id: 14, title: 'Silicon'},
//   {id: 15, title: 'Phosphorus'},
//   {id: 16, title: 'Sulfur'},
//   {id: 17, title: 'Chlorine'},
//   {id: 18, title: 'Argon'},
//   {id: 19, title: 'Potassium'},
//   {id: 20, title: 'Calcium'},
// ];


// /**
//  * Data source for the Materialtable view. This class should
//  * encapsulate all logic for fetching and manipulating the displayed data
//  * (including sorting, pagination, and filtering).
//  */
// export class MaterialtableDataSource extends DataSource<Mockdata> {
//   // data: Mockdata[] = EXAMPLE_DATA;
//   data: Mockdata[] = [];
//   paginator: MatPaginator | undefined;
//   sort: MatSort | undefined;

//   constructor() {
//     super();
//   }

//   /**
//    * Connect this data source to the table. The table will only update when
//    * the returned stream emits new items.
//    * @returns A stream of the items to be rendered.
//    */
//   connect(): Observable<Mockdata[]> {
//     console.log("table observer connected:");
//     if (this.paginator && this.sort) {
//       // Combine everything that affects the rendered data into one update
//       // stream for the data-table to consume.
//       return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
//         .pipe(map(() => {
//           return this.getPagedData(this.getSortedData([...this.data ]));
//         }));
//     } else {
//       throw Error('Please set the paginator and sort on the data source before connecting.');
//     }
//   }

//   /**
//    *  Called when the table is being destroyed. Use this function, to clean up
//    * any open connections or free any held resources that were set up during connect.
//    */
//   disconnect(): void {
//     console.log("table observer disconnected:");

//   }

//   /**
//    * Paginate the data (client-side). If you're using server-side pagination,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getPagedData(data: Mockdata[]): Mockdata[] {
//     console.log("Paginator working");

//     if (this.paginator) {
//       const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
//       return data.splice(startIndex, this.paginator.pageSize);
//     } else {
//       return data;
//     }
//   }

//   /**
//    * Sort the data (client-side). If you're using server-side sorting,
//    * this would be replaced by requesting the appropriate data from the server.
//    */
//   private getSortedData(data: Mockdata[]): Mockdata[] {
//     console.log("sorting working");

//     if (!this.sort || !this.sort.active || this.sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       const isAsc = this.sort?.direction === 'asc';
//       switch (this.sort?.active) {
//         // case 'userId': return compare(a.userId, b.userId, isAsc);
//         case 'id': return compare(+a.id, +b.id, isAsc);
//         case 'title': return compare(a.title, b.title, isAsc);
//         // case 'body': return compare(+a.body, +b.body, isAsc);
//         default: return 0;
//       }
//     });
//   }
// }

// /** Simple sort comparator for example ID/Name columns (for client-side sorting). */
// function compare(a: string | number, b: string | number, isAsc: boolean): number {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
