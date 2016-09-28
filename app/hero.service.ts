import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

import { Hero } from './hero'

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes'

  constructor(private http: Http) {
  }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
        .toPromise()
        .then(resp => resp.json().data as Hero[])
        .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error(`An error occurred: ${error}`)
    return Promise.reject(error.message || error)
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
        .then(heroes => {
          return heroes.find(hero => hero.id === id)
        })
  }
}
