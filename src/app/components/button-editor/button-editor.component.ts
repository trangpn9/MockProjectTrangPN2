import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from 'src/app/Modules/article/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-editor',
  templateUrl: './button-editor.component.html',
  styleUrls: ['./button-editor.component.css']
})
export class ButtonEditorComponent implements OnInit {

  @Input() slug: string;

  constructor(private articleServie: ArticleService, private router: Router) { }

  ngOnInit() {        
  }

  deleteArticle() {
    this.articleServie.deleteArticleBySlug(this.slug).subscribe(() => {
      this.router.navigate(['/']);
    });
    
  }  

}
