import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleService, Article } from 'src/app/Modules/article/article.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  tagLists: string[] = [];
  articleFormGroup: FormGroup;
  currArticle: Article;
  isEditor: boolean = false;
  slug: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private articleService: ArticleService,
  ) {        
    this.articleFormGroup = fb.group({
      titleArticle: ['', Validators.required],
      desArticle: [''],
      contentArticle: ['', Validators.required],
      tagList: ['']
    });

    if (this.route.snapshot.firstChild != null) {      
      const { slug } = this.route.snapshot.firstChild.params;  
      this.slug = slug;    
      this.articleService.getArticleBySlug(slug).subscribe((data: any) => {                
        this.isEditor = true;
        const { article } = data;
        this.articleFormGroup.controls['titleArticle'].setValue(article.title);
        this.articleFormGroup.controls['desArticle'].setValue(article.description);
        this.articleFormGroup.controls['contentArticle'].setValue(article.body);
        this.tagLists = article.tagList;        
      }, (err) => {
        console.log("Error: ", err);
        alert("Article not exist!");
        this.router.navigate(['/']);
      });
    }             
  }

  ngOnInit() {
  }

  createArticle() {     
    let articleInfo = {
      "article": {
        "title": this.articleFormGroup.value.titleArticle,
        "description": this.articleFormGroup.value.desArticle,
        "body": this.articleFormGroup.value.contentArticle,
        "tagList": this.tagLists
      }
    }    

    this.articleService.createArticle(articleInfo).subscribe((data: any) => {           
      const { article } = data;
      return this.router.navigate(['/','article', article.slug]);
    }, (err) => {
      console.log(err);      
    })
  }

  updateArticle() {
    let articleInfo = {
      "article": {
        "title": this.articleFormGroup.value.titleArticle,
        "description": this.articleFormGroup.value.desArticle,
        "body": this.articleFormGroup.value.contentArticle,
        "tagList": this.tagLists
      }
    }

    this.articleService.updateArticleBySlug(this.slug, articleInfo).subscribe((data:any) => {
      const { article } = data;
      return this.router.navigate(['/','article', article.slug]);
    }, (err) => {
      console.log('Error: ', err);
    });
    
  }

  onEnterTag() {
    let getTag = this.articleFormGroup.value.tagList;      
    if (getTag != '' && !this.tagLists.includes(getTag)) {
      this.tagLists.push(getTag);
    }
    this.articleFormGroup.controls.tagList.reset();    
  }

  removeTag(index) {    
    this.tagLists.splice(index, 1);
  }
}
