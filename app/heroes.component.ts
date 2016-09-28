import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Hero } from './hero'
import { HeroService } from './hero.service'

@Component({
  selector: 'my-heroes',
  styleUrls: ['heroes.component.css'],
  templateUrl: 'heroes.component.html',
  moduleId: module.id
})
export class HeroesComponent implements OnInit {
  heroes: Hero[]
  selectedHero: Hero

  constructor(private heroService: HeroService, private router: Router) {}

  getHeroes(): void {
    this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes)
  }

  add(name: string): void {
    name = name.trim()
    if (name) {
      this.heroService
          .create(name)
          .then(hero => {
            this.heroes.push(hero)
            this.selectedHero = null
          })
    }
  }

  destroy(hero: Hero): void {
    this.heroService
        .del(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero)
          if (this.selectedHero === hero) {
            this.selectedHero = null
          }
        })
  }

  ngOnInit(): void {
    this.getHeroes()
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id])
  }
}
