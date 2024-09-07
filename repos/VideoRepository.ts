import Repository from "~/repos/Repository";
import type Resource from "~/types/Resource";
import type PaginatedCollection from "~/types/PaginatedCollection";

export default class VideoRepository extends Repository {
    public index(query: () => any) {
        return this.client.getLazyFetch<PaginatedCollection<any>>(() => '/videos?' + querify(query()).toString());
    }

    public get(query: any) {
        return this.client.get<PaginatedCollection<any>>('/videos?' + querify(query).toString());
    }

    public show(id: number) {
        return this.client.getData<Resource<any>>(`video.show.${id}`, `/videos/${id}`);
    }
}