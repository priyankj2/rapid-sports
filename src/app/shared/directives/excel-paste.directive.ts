import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[jhiExcelPaste]'
})
export class ExcelPasteDirective {
  @Output()
  public excelPaste: EventEmitter<any[]> = new EventEmitter<any[]>();

  @HostListener('paste', ['$event'])
  public onPaste(e: any): void {
    // todo: this should really just parse into rows and hand it back as raw strings
    if (e.target.tagName && e.target.tagName.match(/(input|textarea)/i)) {
      // Do not handle past when an input element is currently focused
      return;
    }

    // Get clipboard data as text
    const data = e.clipboardData.getData('text');

    // Simplified parsing of the TSV data with hard-coded columns
    const rows = data.split('\r\n');
    const result = rows.map((row: string) => {
      const cells = row.split('\t');
      return {
        percentile: cells[0],
        age0: cells[1],
        age7: cells[2],
        age9: cells[3],
        age11: cells[4],
        age14: cells[5],
        age17: cells[6],
        age20: cells[7],
        age30: cells[8],
        age40: cells[9],
        age50: cells[10],
        age60: cells[11],
        age65: cells[12],
        age70: cells[13],
        age75: cells[14],
        age80: cells[15]
      };
    });

    this.excelPaste.emit(result);
  }
}
