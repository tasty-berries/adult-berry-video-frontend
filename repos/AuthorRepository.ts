import Repository from "~/repos/Repository";
import type Resource from "~/types/Resource";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Collection from "~/types/Collection";

export default class AuthorRepository extends Repository {
    public get(query: any) {
        return this.client.get<Collection<any>>('/authors?' + querify(query).toString());
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`author.show.${id}`, `/authors/${id}`);
    }

    public videos(id: number, query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => `/authors/${id}/videos?` + querify(query()).toString());
    }

    public getVideos(id: number, query: any) {
        return this.client.get<PaginatedCollection<any>>(`/authors/${id}/videos?` + querify(query).toString());
    }
}