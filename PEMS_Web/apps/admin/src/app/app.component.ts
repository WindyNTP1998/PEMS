import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NxWelcomeComponent} from './nx-welcome.component';
import {
    NgbAccordionBody,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionDirective,
    NgbAccordionHeader,
    NgbAccordionItem,
    NgbModule
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterModule, NgbAccordionDirective, NgbAccordionItem, NgbAccordionButton, NgbAccordionCollapse, NgbAccordionHeader, NgbAccordionBody, NgbModule],
    selector: 'ng-mf-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'admin';
}
