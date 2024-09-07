import Repository from "~/repos/Repository";
import type Collection from "~/types/Collection";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";

export default class SectionRepository extends Repository {
    public index() {
        return this.client.getData<Collection<any>>('section.index', '/sections');
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`section.show.${id}`, `/sections/${id}`);
    }

    public videos(id: number, query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => `/sections/${id}/videos?` + querify(query()).toString());
    }

    public getVideos(id: number, query: any) {
        return this.client.get<PaginatedCollection<any>>(`/sections/${id}/videos?` + querify(query).toString());
    }
}