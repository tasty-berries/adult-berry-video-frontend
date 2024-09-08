import Repository from "~/repos/Repository";
import type Collection from "~/types/Collection";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";

export default class TitleRepository extends Repository {
    public index() {
        return this.client.getData<Collection<any>>('title.index', '/titles');
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`title.show.${id}`, `/titles/${id}`);
    }

    public videos(id: number, query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => `/titles/${id}/videos?` + querify(query()).toString());
    }

    public getVideos(id: number, query: any) {
        return this.client.get<PaginatedCollection<any>>(`/titles/${id}/videos?` + querify(query).toString());
    }
}