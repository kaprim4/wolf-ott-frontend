import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, ElementRef, OnInit } from '@angular/core';
import Quill from 'quill';

@Component({
    selector: 'app-rich-text-editor',
    templateUrl: './rich-text-editor.component.html',
    styleUrls: ['./rich-text-editor.component.scss']
})
export class RichTextEditorComponent implements OnInit, OnChanges {
    @Input() content: string = '';
    @Output() contentChanged: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('editor', { static: true }) editor: ElementRef;
    quill : any;

    ngOnInit(): void {
        this.quill = new Quill(this.editor.nativeElement, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['bold', 'italic', 'underline'],
                    ['link'],
                    ['image']
                ]
            }
        });
        this.quill.on('text-change', () => {
            this.contentChanged.emit(this.quill.root.innerHTML);
        });
        this.quill.root.innerHTML = this.content;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['content'] && !changes['content'].firstChange) {
            this.quill.root.innerHTML = this.content;
        }
    }
}
