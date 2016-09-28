import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http'

import 'rxjs/add/operator/toPromise'

import { Hero } from './hero'

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes'
  private headers = new Headers({ 'Content-Type': 'application/json' })

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

  create(name: string): Promise<Hero> {
    const body = JSON.stringify({name})
    const headers = { headers: this.headers }

    return this.http
        .post(this.heroesUrl, body, headers)
        .toPromise()
        .then(resp => resp.json().data)
        .catch(this.handleError)
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`
    const body = JSON.stringify(hero)
    const headers = { headers: this.headers }

    return this.http
        .put(url, body, headers)
        .toPromise()
        .then(() => hero)
        .catch(this.handleError)
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
        .then(heroes => {
          return heroes.find(hero => hero.id === id)
        })
  }
}
