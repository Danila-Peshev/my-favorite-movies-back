import { BaseMovie } from "./BaseMovie";

export type MoviesResponse = {
  page: number;
  results: BaseMovie[];
  totalPages: number;
  totalResult: number;
}