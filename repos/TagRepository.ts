import Repository from "~/repos/Repository";
import type Collection from "~/types/Collection";
import type PaginatedCollection from "~/types/PaginatedCollection";
import type Resource from "~/types/Resource";

export default class TagRepository extends Repository {
    public index() {
        return this.client.getData<Collection<any>>('tag.index', '/tags');
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`tag.show.${id}`, `/tags/${id}`);
    }

    public videos(id: number, query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => `/tags/${id}/videos?` + querify(query()).toString());
    }

    public getVideos(id: number, query: any) {
        return this.client.get<PaginatedCollection<any>>(`/tags/${id}/videos?` + querify(query).toString());
    }
}